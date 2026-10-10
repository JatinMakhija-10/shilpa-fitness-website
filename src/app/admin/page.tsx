'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Shield,
  Plus,
  Users,
  Video,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  RotateCcw,
  Film,
  Key,
  ArrowRight,
  Search,
  Filter,
  UserCheck,
  UserX,
  CreditCard,
  MessageCircle,
  Phone,
  Calendar,
  Sparkles,
  RefreshCw,
  Sliders,
  Play,
  Volume2,
  Trash2,
  Bell,
  Activity,
  Send,
  ExternalLink,
} from 'lucide-react';
import { Member, ClassSession, TrialLead, StudioAnnouncement, getReplayRemainingTime } from '@/lib/membershipStore';
import ZoomLiveRoom from '@/components/live/ZoomLiveRoom';

type AdminTab = 'pulse' | 'classes' | 'attendance' | 'members' | 'leads' | 'replays' | 'broadcasts' | 'diagnostics';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>('pulse');
  const [members, setMembers] = useState<Member[]>([]);
  const [classes, setClasses] = useState<ClassSession[]>([]);
  const [leads, setLeads] = useState<TrialLead[]>([]);
  const [announcements, setAnnouncements] = useState<StudioAnnouncement[]>([]);
  const [selectedClassId, setSelectedClassId] = useState<string>('cls-1');
  const [loading, setLoading] = useState(true);

  // Search & Filter state
  const [memberSearch, setMemberSearch] = useState('');
  const [memberPlanFilter, setMemberPlanFilter] = useState<'all' | 'monthly' | 'pack25' | 'annual' | 'none'>('all');
  const [leadStatusFilter, setLeadStatusFilter] = useState<'all' | 'new' | 'contacted' | 'scheduled' | 'attended' | 'converted'>('all');

  // Shilpa Live Host Mode State
  const [hostModeClass, setHostModeClass] = useState<ClassSession | null>(null);

  // New Class Form State
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<'studio' | 'online'>('online');
  const [newDate, setNewDate] = useState('Next Tuesday');
  const [newTime, setNewTime] = useState('08:30 PM – 09:15 PM IST');
  const [newZoomId, setNewZoomId] = useState('872 9012 4431');
  const [newPasscode, setNewPasscode] = useState('SHILPA2026');
  const [newCapacity, setNewCapacity] = useState('25');
  const [newFocus, setNewFocus] = useState('Jaw Sculpt & Lymph Drainage');

  // Walk-in form state
  const [walkinName, setWalkinName] = useState('');

  // Medical note edit modal
  const [editingMemberNotes, setEditingMemberNotes] = useState<{ id: string; name: string; notes: string } | null>(null);

  // Announcement form state
  const [newAnnouncementMsg, setNewAnnouncementMsg] = useState('');
  const [newAnnouncementType, setNewAnnouncementType] = useState<'info' | 'alert' | 'highlight'>('highlight');

  // Diagnostics test state
  const [diagnosticsOutput, setDiagnosticsOutput] = useState<string | null>(null);

  // Load initial data
  const loadData = async () => {
    try {
      const res = await fetch('/api/membership');
      const data = await res.json();
      setMembers(data.allMembers || []);
      setClasses(data.classes || []);
      setLeads(data.leads || []);
      setAnnouncements(data.announcements || []);
      if (data.classes && data.classes.length > 0 && !selectedClassId) {
        setSelectedClassId(data.classes[0].id);
      }
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Admin action execution helper
  const executeAdminAction = async (payload: Record<string, unknown>) => {
    try {
      const res = await fetch('/api/membership', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        await loadData();
        return await res.json();
      }
    } catch (err) {
      console.error('Admin action failed:', err);
    }
    return null;
  };

  // 1. Create Class
  const handleCreateClass = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    await executeAdminAction({
      action: 'admin_create_class',
      title: newTitle.trim(),
      type: newType,
      date: newDate,
      time: newTime,
      zoomMeetingNumber: newZoomId,
      zoomPasscode: newPasscode,
      capacity: newCapacity,
      focusArea: newFocus,
    });

    setNewTitle('');
    alert('Class session created and synced to member schedules.');
  };

  // 2. Publish Recording (Trigger 7-Day Window)
  const handleReleaseRecording = async (classId: string) => {
    await executeAdminAction({
      action: 'admin_release_recording',
      classId,
    });
    alert('Recording published! 7-day expiration countdown started.');
  };

  // 3. Extend Replay by 24h
  const handleExtendReplay = async (classId: string) => {
    const res = await executeAdminAction({
      action: 'admin_extend_replay',
      classId,
      additionalHours: 24,
    });
    if (res && res.message) {
      alert(res.message);
    }
  };

  // 4. Mark Attendance
  const handleToggleAttendance = async (classId: string, memberId: string, currentStatus: boolean) => {
    await executeAdminAction({
      action: 'admin_mark_attendance',
      classId,
      memberId,
      attended: !currentStatus,
    });
  };

  // 5. Refund Credit for Excused Absence
  const handleRefundCredit = async (classId: string, memberId: string) => {
    const res = await executeAdminAction({
      action: 'admin_refund_attendance_credit',
      classId,
      memberId,
    });
    if (res && res.message) {
      alert(res.message);
    }
  };

  // 6. Add Walk-In Attendee
  const handleAddWalkin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!walkinName.trim()) return;

    await executeAdminAction({
      action: 'admin_add_walkin',
      classId: selectedClassId,
      attendeeName: walkinName.trim(),
    });

    setWalkinName('');
  };

  // 7. Adjust Member Credits
  const handleAdjustCredits = async (memberId: string, delta: number) => {
    await executeAdminAction({
      action: 'admin_update_member_crm',
      memberId,
      deltaCredits: delta,
    });
  };

  // 8. Toggle Member Entitlement (Active / Past Due / Expired)
  const handleSetEntitlement = async (memberId: string, newState: 'active' | 'past_due' | 'expired') => {
    await executeAdminAction({
      action: 'admin_update_member_crm',
      memberId,
      entitlementState: newState,
    });
  };

  // 9. Save Member Medical Notes
  const handleSaveMedicalNotes = async () => {
    if (!editingMemberNotes) return;
    await executeAdminAction({
      action: 'admin_update_member_crm',
      memberId: editingMemberNotes.id,
      medicalNotes: editingMemberNotes.notes,
    });
    setEditingMemberNotes(null);
  };

  // 10. Update Lead Pipeline Stage
  const handleUpdateLeadStatus = async (leadId: string, newStatus: string) => {
    await executeAdminAction({
      action: 'admin_update_lead_status',
      leadId,
      newStatus,
    });
  };

  // 11. Convert Lead to Active Member
  const handleConvertLead = async (leadId: string, chosenPlan: 'monthly' | 'pack25') => {
    const res = await executeAdminAction({
      action: 'admin_convert_lead_to_member',
      leadId,
      chosenPlan,
    });
    if (res && res.message) {
      alert(res.message);
    }
  };

  // 12. Create Studio Announcement
  const handleCreateAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnnouncementMsg.trim()) return;

    await executeAdminAction({
      action: 'admin_create_announcement',
      message: newAnnouncementMsg.trim(),
      type: newAnnouncementType,
    });

    setNewAnnouncementMsg('');
  };

  // 13. Toggle Announcement
  const handleToggleAnnouncement = async (annId: string) => {
    await executeAdminAction({
      action: 'admin_toggle_announcement',
      annId,
    });
  };

  // 14. Cancel / Delete Class
  const handleCancelClass = async (classId: string) => {
    if (!confirm('Are you sure you want to cancel this class session? Booked credits will be restored.')) return;
    await executeAdminAction({
      action: 'admin_delete_class',
      classId,
    });
  };

  // 15. Run Diagnostics Test
  const handleRunDiagnostics = async () => {
    setDiagnosticsOutput('Running security pre-flight checks...');
    try {
      const sigRes = await fetch('/api/zoom/signature', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ meetingNumber: '849 2049 1920', role: 1 }),
      });
      const sigData = await sigRes.json();

      setDiagnosticsOutput(
        JSON.stringify(
          {
            timestamp: new Date().toISOString(),
            status: 'HEALTHY',
            zoomSdkCredentials: {
              serverSideSignatureGenerated: !!sigData.signature,
              algorithm: 'HMAC-SHA256 (Server Secret Safe)',
              tokenLength: sigData.signature?.length || 0,
            },
            storage: {
              activeMembers: members.length,
              classesCount: classes.length,
              leadsPipeline: leads.length,
            },
            ttlEngine: {
              policy: 'Strict 168-Hour Expiration',
              activeReplaysCount: classes.filter((c) => c.recordingStatus === 'ready').length,
            },
          },
          null,
          2
        )
      );
    } catch (err) {
      setDiagnosticsOutput(`Diagnostics failed: ${err}`);
    }
  };

  // Host Mode (Shilpa launches live session directly from Admin)
  if (hostModeClass) {
    const adminPersona: Member = {
      id: 'coach-shilpa',
      name: 'Shilpa Kanodia (Head Coach & Host)',
      email: 'shilpa@shilpakanodia.com',
      planType: 'annual',
      entitlementState: 'active',
      classCreditsRemaining: 9999,
      planExpiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      bookedClassIds: [hostModeClass.id],
      joinedDate: 'Studio Founder',
      totalClassesAttended: 450,
    };

    return (
      <ZoomLiveRoom
        member={adminPersona}
        classSession={hostModeClass}
        isHost={true}
        onLeave={() => setHostModeClass(null)}
        onUpgradePlan={() => setHostModeClass(null)}
      />
    );
  }

  const selectedClass = classes.find((c) => c.id === selectedClassId) || classes[0];

  // Filtered lists
  const filteredMembers = members.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(memberSearch.toLowerCase()) ||
      m.email.toLowerCase().includes(memberSearch.toLowerCase()) ||
      (m.phone && m.phone.includes(memberSearch));
    const matchesPlan = memberPlanFilter === 'all' || m.planType === memberPlanFilter;
    return matchesSearch && matchesPlan;
  });

  const filteredLeads = leads.filter((l) => {
    if (leadStatusFilter === 'all') return true;
    return l.status === leadStatusFilter;
  });

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#0E0C0D] text-cream font-sans">
      {/* Admin Top Header */}
      <div className="bg-[#141012] border-b border-white/10">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-sm bg-plum flex items-center justify-center text-cream border border-clay/40">
                <Shield className="w-5 h-5 text-blush" />
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-widest text-blush font-semibold block">
                  Studio Operations & Member Management
                </span>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-cream">
                  Shilpa&rsquo;s Admin Command Center
                </h1>
              </div>
            </div>

            {/* Quick Testing Links */}
            <div className="flex flex-wrap items-center gap-2.5">
              <Link
                href="/book-trial"
                className="text-xs font-semibold px-3.5 py-1.5 rounded-sm border border-white/15 text-cream hover:bg-white/10 transition-colors flex items-center gap-1.5"
              >
                <span>Sample Booking Test</span>
                <ExternalLink className="w-3 h-3 text-blush" />
              </Link>
              <Link
                href="/my-classes"
                className="text-xs font-semibold px-3.5 py-1.5 rounded-sm border border-white/15 text-cream hover:bg-white/10 transition-colors flex items-center gap-1.5"
              >
                <span>Member Portal</span>
                <ExternalLink className="w-3 h-3 text-blush" />
              </Link>
              <Link
                href="/zoom-test"
                className="text-xs font-semibold px-3.5 py-1.5 rounded-sm bg-plum hover:bg-plum-hover text-cream shadow-sm flex items-center gap-1.5"
              >
                <Video className="w-3.5 h-3.5" />
                <span>WebRTC Pre-Flight Lab</span>
              </Link>
            </div>
          </div>

          {/* Tab Navigation Segmented Bar */}
          <div className="flex items-center gap-1 overflow-x-auto pt-6 scrollbar-none border-t border-white/5 mt-6">
            <button
              onClick={() => setActiveTab('pulse')}
              className={`px-4 py-2 rounded-sm text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeTab === 'pulse' ? 'bg-plum text-cream border border-blush/30' : 'text-cream-light/70 hover:text-cream hover:bg-white/5'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Executive Pulse</span>
            </button>

            <button
              onClick={() => setActiveTab('classes')}
              className={`px-4 py-2 rounded-sm text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeTab === 'classes' ? 'bg-plum text-cream border border-blush/30' : 'text-cream-light/70 hover:text-cream hover:bg-white/5'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Class Timetable ({classes.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('attendance')}
              className={`px-4 py-2 rounded-sm text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeTab === 'attendance' ? 'bg-plum text-cream border border-blush/30' : 'text-cream-light/70 hover:text-cream hover:bg-white/5'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Attendance & Roster</span>
            </button>

            <button
              onClick={() => setActiveTab('members')}
              className={`px-4 py-2 rounded-sm text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeTab === 'members' ? 'bg-plum text-cream border border-blush/30' : 'text-cream-light/70 hover:text-cream hover:bg-white/5'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Member CRM ({members.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('leads')}
              className={`px-4 py-2 rounded-sm text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeTab === 'leads' ? 'bg-plum text-cream border border-blush/30' : 'text-cream-light/70 hover:text-cream hover:bg-white/5'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Trial Leads ({leads.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('replays')}
              className={`px-4 py-2 rounded-sm text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeTab === 'replays' ? 'bg-plum text-cream border border-blush/30' : 'text-cream-light/70 hover:text-cream hover:bg-white/5'
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              <span>7-Day Replay Lifecycle</span>
            </button>

            <button
              onClick={() => setActiveTab('broadcasts')}
              className={`px-4 py-2 rounded-sm text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeTab === 'broadcasts' ? 'bg-plum text-cream border border-blush/30' : 'text-cream-light/70 hover:text-cream hover:bg-white/5'
              }`}
            >
              <Bell className="w-3.5 h-3.5" />
              <span>Broadcasts ({announcements.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('diagnostics')}
              className={`px-4 py-2 rounded-sm text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeTab === 'diagnostics' ? 'bg-plum text-cream border border-blush/30' : 'text-cream-light/70 hover:text-cream hover:bg-white/5'
              }`}
            >
              <Key className="w-3.5 h-3.5" />
              <span>Diagnostics</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Tab Content Body */}
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* ========================================================= */}
        {/* TAB 1: EXECUTIVE PULSE (STUDIO METRICS)                   */}
        {/* ========================================================= */}
        {activeTab === 'pulse' && (
          <div className="space-y-8">
            {/* KPI Cards Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-[#161214] p-5 rounded-sm border border-white/10">
                <span className="text-[11px] text-cream-light/60 block">Active Members</span>
                <span className="font-serif text-3xl font-bold text-cream block mt-1">
                  {members.filter((m) => m.entitlementState === 'active').length}
                </span>
                <span className="text-[10px] text-emerald-400 mt-1 block">
                  {members.filter((m) => m.entitlementState === 'past_due').length} past due • {members.filter((m) => m.entitlementState === 'expired').length} expired
                </span>
              </div>

              <div className="bg-[#161214] p-5 rounded-sm border border-white/10">
                <span className="text-[11px] text-cream-light/60 block">25-Pack Credits in Circ</span>
                <span className="font-serif text-3xl font-bold text-emerald-400 block mt-1">
                  {members
                    .filter((m) => m.planType === 'pack25')
                    .reduce((acc, cur) => acc + cur.classCreditsRemaining, 0)}
                </span>
                <span className="text-[10px] text-cream-light/50 mt-1 block">
                  Across {members.filter((m) => m.planType === 'pack25').length} pack holders
                </span>
              </div>

              <div className="bg-[#161214] p-5 rounded-sm border border-white/10">
                <span className="text-[11px] text-cream-light/60 block">Trial Inquiries Pipeline</span>
                <span className="font-serif text-3xl font-bold text-blush block mt-1">
                  {leads.length}
                </span>
                <span className="text-[10px] text-blush mt-1 block">
                  {leads.filter((l) => l.status === 'new').length} new uncontacted
                </span>
              </div>

              <div className="bg-[#161214] p-5 rounded-sm border border-white/10">
                <span className="text-[11px] text-cream-light/60 block">Active Replay Streams</span>
                <span className="font-serif text-3xl font-bold text-cream block mt-1">
                  {classes.filter((c) => c.recordingStatus === 'ready').length}
                </span>
                <span className="text-[10px] text-emerald-400 mt-1 block">
                  Enforcing 168h TTL clock
                </span>
              </div>
            </div>

            {/* Quick Actions Band */}
            <div className="bg-[#161214] p-6 rounded-sm border border-white/10 space-y-4">
              <h3 className="font-serif text-lg font-bold text-cream">
                Instant Operations
              </h3>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setActiveTab('classes')}
                  className="px-4 py-2.5 bg-plum hover:bg-plum-hover text-cream text-xs font-semibold rounded-sm flex items-center gap-2"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Schedule Class Session</span>
                </button>
                <button
                  onClick={() => setActiveTab('leads')}
                  className="px-4 py-2.5 bg-white/10 hover:bg-white/15 text-cream text-xs font-semibold rounded-sm flex items-center gap-2"
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Review New Trial Leads</span>
                </button>
                <button
                  onClick={() => setActiveTab('replays')}
                  className="px-4 py-2.5 bg-white/10 hover:bg-white/15 text-cream text-xs font-semibold rounded-sm flex items-center gap-2"
                >
                  <Film className="w-3.5 h-3.5" />
                  <span>Manage 7-Day Recording TTLs</span>
                </button>
              </div>
            </div>

            {/* Recent Leads Preview */}
            <div className="bg-[#161214] p-6 rounded-sm border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-lg font-bold text-cream">
                  Latest In-Website Trial Reservations
                </h3>
                <button
                  onClick={() => setActiveTab('leads')}
                  className="text-xs text-blush hover:underline"
                >
                  View All ({leads.length}) →
                </button>
              </div>

              <div className="space-y-2.5">
                {leads.slice(0, 3).map((lead) => (
                  <div
                    key={lead.id}
                    className="p-4 bg-white/5 rounded-sm border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <strong className="text-cream text-sm">{lead.fullName}</strong>
                        <span className="text-[10px] font-mono bg-white/10 px-2 py-0.5 text-blush rounded-sm">
                          {lead.voucherCode}
                        </span>
                      </div>
                      <p className="text-cream-light/70 mt-0.5">
                        {lead.service} • {lead.area} • {lead.timePreference}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(lead.fullName)},%20Shilpa%20Kanodia%20here%20regarding%20your%20trial%20voucher%20${lead.voucherCode}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 font-semibold rounded-sm flex items-center gap-1.5"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WhatsApp Client</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: CLASS & TIMETABLE MANAGER                          */}
        {/* ========================================================= */}
        {activeTab === 'classes' && (
          <div className="space-y-8">
            {/* Create New Class Form */}
            <div className="bg-[#161214] p-6 sm:p-7 rounded-sm border border-white/10 space-y-5">
              <div className="border-b border-white/10 pb-3 flex items-center justify-between">
                <div>
                  <span className="text-[11px] uppercase tracking-widest text-blush font-semibold block">
                    Session Scheduler
                  </span>
                  <h3 className="font-serif text-xl font-bold text-cream mt-0.5">
                    Schedule & Publish New Live / Studio Class
                  </h3>
                </div>
                <span className="text-xs text-cream-light/60">Zoom Web SDK Sync</span>
              </div>

              <form onSubmit={handleCreateClass} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold mb-1 text-cream-light">
                    Class Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Evening Jaw & TMJ Massage Flow"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-sm bg-white/10 border border-white/15 text-cream placeholder-cream/40 focus:outline-none focus:border-blush"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1 text-cream-light">
                    Format *
                  </label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as 'studio' | 'online')}
                    className="w-full text-xs px-3.5 py-2.5 rounded-sm bg-white/10 border border-white/15 text-cream focus:outline-none focus:border-blush"
                  >
                    <option value="online" className="bg-[#161214] text-white">Online (Zoom Web SDK Live)</option>
                    <option value="studio" className="bg-[#161214] text-white">In-Studio (Goregaon West)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1 text-cream-light">
                    Date *
                  </label>
                  <input
                    type="text"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-sm bg-white/10 border border-white/15 text-cream focus:outline-none focus:border-blush"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1 text-cream-light">
                    Time Slot *
                  </label>
                  <input
                    type="text"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-sm bg-white/10 border border-white/15 text-cream focus:outline-none focus:border-blush"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1 text-cream-light">
                    Max Capacity
                  </label>
                  <input
                    type="number"
                    value={newCapacity}
                    onChange={(e) => setNewCapacity(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-sm bg-white/10 border border-white/15 text-cream focus:outline-none focus:border-blush"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1 text-cream-light">
                    Zoom Meeting Number
                  </label>
                  <input
                    type="text"
                    value={newZoomId}
                    onChange={(e) => setNewZoomId(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-sm bg-white/10 border border-white/15 text-cream focus:outline-none focus:border-blush"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1 text-cream-light">
                    Zoom Passcode
                  </label>
                  <input
                    type="text"
                    value={newPasscode}
                    onChange={(e) => setNewPasscode(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-sm bg-white/10 border border-white/15 text-cream focus:outline-none focus:border-blush"
                  />
                </div>

                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 rounded-sm bg-plum hover:bg-plum-hover text-cream font-bold text-xs shadow-plum flex items-center justify-center gap-1.5 transition-transform hover:scale-[1.01]"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Publish Class Session</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Existing Classes List */}
            <div className="bg-[#161214] p-6 sm:p-7 rounded-sm border border-white/10 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="font-serif text-lg font-bold text-cream">
                  Active & Scheduled Classes ({classes.length})
                </h3>
              </div>

              <div className="space-y-3">
                {classes.map((cls) => (
                  <div
                    key={cls.id}
                    className="p-5 bg-white/5 rounded-sm border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-bold px-2.5 py-0.5 rounded-sm uppercase tracking-wider ${
                            cls.status === 'live'
                              ? 'bg-emerald-500/30 text-emerald-300 animate-pulse'
                              : cls.status === 'completed'
                              ? 'bg-blue-500/20 text-blue-300'
                              : cls.status === 'canceled'
                              ? 'bg-red-500/20 text-red-300'
                              : 'bg-white/10 text-cream-light'
                          }`}
                        >
                          {cls.status}
                        </span>
                        <span className="font-semibold text-cream">{cls.date}</span>
                        <span className="text-cream-light/60">• {cls.time}</span>
                        <span className="text-blush">({cls.type.toUpperCase()})</span>
                      </div>

                      <h4 className="font-serif text-base font-bold text-cream">{cls.title}</h4>

                      <div className="flex items-center gap-4 text-cream-light/70 text-[11px]">
                        <span>Meeting ID: {cls.zoomMeetingNumber}</span>
                        <span>•</span>
                        <span>Roster: {cls.roster.length} / {cls.capacity} booked</span>
                        <span>•</span>
                        <span>Focus: {cls.focusArea}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      {cls.type === 'online' && cls.status !== 'completed' && cls.status !== 'canceled' && (
                        <button
                          onClick={() => setHostModeClass(cls)}
                          className="px-3 py-1.5 rounded-sm bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1.5 shadow-sm"
                        >
                          <Video className="w-3.5 h-3.5" />
                          <span>Start as Host (Live)</span>
                        </button>
                      )}

                      <button
                        onClick={() => {
                          setSelectedClassId(cls.id);
                          setActiveTab('attendance');
                        }}
                        className="px-3 py-1.5 rounded-sm bg-white/10 hover:bg-white/15 text-cream font-semibold"
                      >
                        Roster ({cls.roster.length})
                      </button>

                      {cls.status !== 'completed' && cls.status !== 'canceled' && (
                        <button
                          onClick={() => handleCancelClass(cls.id)}
                          className="px-3 py-1.5 rounded-sm bg-red-500/20 hover:bg-red-500/30 text-red-300 font-semibold"
                        >
                          Cancel Class
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: ATTENDANCE & LIVE ROSTER                           */}
        {/* ========================================================= */}
        {activeTab === 'attendance' && (
          <div className="space-y-8">
            {/* Class Selector Header */}
            <div className="bg-[#161214] p-5 rounded-sm border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] uppercase tracking-widest text-blush font-semibold block">
                  Select Session Roster
                </span>
                <select
                  value={selectedClassId}
                  onChange={(e) => setSelectedClassId(e.target.value)}
                  className="mt-1 text-sm font-serif font-bold bg-white/10 border border-white/15 text-cream px-3 py-2 rounded-sm focus:outline-none focus:border-blush"
                >
                  {classes.map((c) => (
                    <option key={c.id} value={c.id} className="bg-[#161214] text-white">
                      {c.title} ({c.date} • {c.time})
                    </option>
                  ))}
                </select>
              </div>

              <div className="text-xs text-cream-light/70">
                <span>Roster Capacity: </span>
                <strong className="text-cream">{selectedClass?.roster.length} / {selectedClass?.capacity}</strong>
              </div>
            </div>

            {/* Quick Add Walk-In Attendee */}
            <div className="bg-[#161214] p-5 rounded-sm border border-white/10">
              <form onSubmit={handleAddWalkin} className="flex flex-col sm:flex-row items-center gap-3">
                <input
                  type="text"
                  placeholder="Walk-in student name (e.g. Meera Desai)"
                  value={walkinName}
                  onChange={(e) => setWalkinName(e.target.value)}
                  className="w-full sm:flex-1 text-xs px-3.5 py-2.5 rounded-sm bg-white/10 border border-white/15 text-cream placeholder-cream/40 focus:outline-none focus:border-blush"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto px-4 py-2.5 rounded-sm bg-plum hover:bg-plum-hover text-cream text-xs font-bold whitespace-nowrap shadow-plum"
                >
                  + Add Walk-In to Roster
                </button>
              </form>
            </div>

            {/* Attendee Roster Table */}
            <div className="bg-[#161214] p-6 rounded-sm border border-white/10 space-y-4">
              <h3 className="font-serif text-lg font-bold text-cream">
                Attendees for: {selectedClass?.title}
              </h3>

              {selectedClass?.roster.length === 0 ? (
                <p className="text-xs text-cream-light/60 italic py-6 text-center">
                  No members booked for this class session yet.
                </p>
              ) : (
                <div className="space-y-3">
                  {selectedClass?.roster.map((attendee, idx) => {
                    const mem = members.find((m) => m.id === attendee.memberId);
                    return (
                      <div
                        key={idx}
                        className="p-4 bg-white/5 rounded-sm border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <strong className="text-cream text-sm">{attendee.memberName}</strong>
                            {mem && (
                              <span className="text-[10px] px-2 py-0.5 rounded-sm bg-white/10 text-blush uppercase font-bold">
                                {mem.planType}
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-cream-light/60 block mt-0.5">
                            Booked: {attendee.bookedAt} • Credit Deducted: {attendee.creditDeducted ? 'Yes' : 'No (Refunded)'}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`px-2.5 py-1 rounded-sm text-[11px] font-semibold ${
                              attendee.attended
                                ? 'bg-emerald-500/20 text-emerald-300'
                                : 'bg-amber-500/20 text-amber-300'
                            }`}
                          >
                            {attendee.attended ? 'Attended' : 'Pending / Registered'}
                          </span>

                          <button
                            onClick={() =>
                              handleToggleAttendance(selectedClass.id, attendee.memberId, attendee.attended)
                            }
                            className="px-3 py-1.5 rounded-sm bg-white/10 hover:bg-white/20 text-cream font-semibold"
                          >
                            {attendee.attended ? 'Mark Absent' : 'Mark Attended'}
                          </button>

                          {attendee.creditDeducted && !attendee.attended && mem?.planType === 'pack25' && (
                            <button
                              onClick={() => handleRefundCredit(selectedClass.id, attendee.memberId)}
                              className="px-3 py-1.5 rounded-sm bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 font-semibold"
                            >
                              Refund Credit (Excused)
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: MEMBER CRM & CREDIT LEDGER                         */}
        {/* ========================================================= */}
        {activeTab === 'members' && (
          <div className="space-y-6">
            {/* Search and Filters */}
            <div className="bg-[#161214] p-4 rounded-sm border border-white/10 flex flex-col sm:flex-row items-center gap-4">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 absolute left-3 top-3 text-cream-light/40" />
                <input
                  type="text"
                  placeholder="Search client by name, email, or phone..."
                  value={memberSearch}
                  onChange={(e) => setMemberSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-white/10 rounded-sm border border-white/15 text-xs text-cream focus:outline-none focus:border-blush"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-xs text-cream-light/60">Filter:</span>
                <select
                  value={memberPlanFilter}
                  onChange={(e) => setMemberPlanFilter(e.target.value as 'all' | 'monthly' | 'pack25' | 'annual' | 'none')}
                  className="bg-white/10 border border-white/15 text-xs text-cream px-3 py-2 rounded-sm focus:outline-none focus:border-blush"
                >
                  <option value="all" className="bg-[#161214] text-white">All Plans</option>
                  <option value="monthly" className="bg-[#161214] text-white">Monthly Pass</option>
                  <option value="pack25" className="bg-[#161214] text-white">25-Class Pack</option>
                  <option value="annual" className="bg-[#161214] text-white">Annual Membership</option>
                  <option value="none" className="bg-[#161214] text-white">Expired / None</option>
                </select>
              </div>
            </div>

            {/* Members List */}
            <div className="bg-[#161214] p-6 rounded-sm border border-white/10 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="font-serif text-lg font-bold text-cream">
                  Member Directory & Credit Ledger ({filteredMembers.length})
                </h3>
              </div>

              <div className="space-y-4">
                {filteredMembers.map((m) => (
                  <div
                    key={m.id}
                    className="p-5 bg-white/5 rounded-sm border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
                  >
                    <div className="space-y-1.5 max-w-xl">
                      <div className="flex items-center gap-2">
                        <strong className="font-serif text-base text-cream">{m.name}</strong>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase ${
                            m.entitlementState === 'active'
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : m.entitlementState === 'past_due'
                              ? 'bg-amber-500/20 text-amber-400'
                              : 'bg-red-500/20 text-red-400'
                          }`}
                        >
                          {m.entitlementState}
                        </span>
                        <span className="text-[10px] bg-white/10 px-2 py-0.5 text-blush rounded-sm font-semibold uppercase">
                          {m.planType}
                        </span>
                      </div>

                      <p className="text-cream-light/60">
                        {m.email} {m.phone && `• ${m.phone}`} • Joined: {m.joinedDate}
                      </p>

                      <div className="text-[11px] text-cream-light/80">
                        Credits: <strong className="text-emerald-400">{m.planType === 'pack25' ? `${m.classCreditsRemaining} credits remaining` : 'Unlimited Pass'}</strong>
                        {' '}• Total Attended: <strong>{m.totalClassesAttended}</strong>
                      </div>

                      {/* Medical Notes Callout */}
                      {m.medicalNotes && (
                        <div className="p-2.5 rounded-sm bg-black/40 border border-white/10 text-[11px] text-blush">
                          <strong>Medical / Posture Note:</strong> {m.medicalNotes}
                        </div>
                      )}
                    </div>

                    {/* Quick Admin Actions for this member */}
                    <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-2">
                      {m.planType === 'pack25' && (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleAdjustCredits(m.id, 5)}
                            className="px-2.5 py-1.5 rounded-sm bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-semibold"
                          >
                            +5 Credits
                          </button>
                          <button
                            onClick={() => handleAdjustCredits(m.id, -1)}
                            className="px-2.5 py-1.5 rounded-sm bg-red-500/20 hover:bg-red-500/30 text-red-300 font-semibold"
                          >
                            -1 Credit
                          </button>
                        </div>
                      )}

                      {/* Entitlement State Switcher */}
                      <select
                        value={m.entitlementState}
                        onChange={(e) => handleSetEntitlement(m.id, e.target.value as 'active' | 'past_due' | 'expired')}
                        className="bg-white/10 border border-white/15 text-[11px] text-cream px-2.5 py-1.5 rounded-sm focus:outline-none"
                      >
                        <option value="active" className="bg-[#161214] text-emerald-400">Status: Active</option>
                        <option value="past_due" className="bg-[#161214] text-amber-400">Status: Past Due</option>
                        <option value="expired" className="bg-[#161214] text-red-400">Status: Expired</option>
                      </select>

                      {/* Edit Medical Notes */}
                      <button
                        onClick={() =>
                          setEditingMemberNotes({
                            id: m.id,
                            name: m.name,
                            notes: m.medicalNotes || '',
                          })
                        }
                        className="px-3 py-1.5 rounded-sm bg-white/10 hover:bg-white/15 text-cream font-semibold"
                      >
                        Edit Notes
                      </button>

                      {/* Login as Member Preview */}
                      <button
                        onClick={async () => {
                          await executeAdminAction({ action: 'switch_member', memberId: m.id });
                          window.location.href = '/my-classes';
                        }}
                        className="px-3 py-1.5 rounded-sm border border-white/20 text-cream-light hover:text-cream hover:bg-white/10"
                      >
                        Portal View →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Medical Notes Modal */}
            {editingMemberNotes && (
              <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-[#1A1517] border border-white/20 rounded-sm p-6 max-w-lg w-full space-y-4 shadow-2xl">
                  <h3 className="font-serif text-lg font-bold text-cream">
                    Update Medical Notes for {editingMemberNotes.name}
                  </h3>
                  <textarea
                    rows={4}
                    value={editingMemberNotes.notes}
                    onChange={(e) =>
                      setEditingMemberNotes({ ...editingMemberNotes, notes: e.target.value })
                    }
                    placeholder="e.g. L4-L5 disc stiffness, 18 weeks pregnant, or TMJ bruxism..."
                    className="w-full text-xs p-3 rounded-sm bg-white/10 border border-white/15 text-cream placeholder-cream/40 focus:outline-none focus:border-blush"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setEditingMemberNotes(null)}
                      className="px-4 py-2 rounded-sm text-xs font-semibold text-cream-light/70 hover:text-cream"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveMedicalNotes}
                      className="px-4 py-2 rounded-sm text-xs font-bold bg-plum hover:bg-plum-hover text-cream shadow-plum"
                    >
                      Save Notes
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 5: TRIAL LEADS PIPELINE                               */}
        {/* ========================================================= */}
        {activeTab === 'leads' && (
          <div className="space-y-6">
            {/* Filter Pipeline Bar */}
            <div className="bg-[#161214] p-4 rounded-sm border border-white/10 flex flex-wrap items-center gap-3">
              <span className="text-xs text-cream-light/60">Pipeline Stage:</span>
              {(['all', 'new', 'contacted', 'scheduled', 'attended', 'converted'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setLeadStatusFilter(st)}
                  className={`px-3 py-1 rounded-sm text-xs font-semibold capitalize transition-colors ${
                    leadStatusFilter === st
                      ? 'bg-plum text-cream border border-blush/30'
                      : 'bg-white/5 text-cream-light/70 hover:bg-white/10'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            {/* Leads Table */}
            <div className="bg-[#161214] p-6 rounded-sm border border-white/10 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="font-serif text-lg font-bold text-cream">
                  Website Inquiries & Direct Bookings ({filteredLeads.length})
                </h3>
              </div>

              <div className="space-y-4">
                {filteredLeads.map((lead) => (
                  <div
                    key={lead.id}
                    className="p-5 bg-white/5 rounded-sm border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
                  >
                    <div className="space-y-1.5 max-w-xl">
                      <div className="flex items-center gap-2">
                        <strong className="font-serif text-base text-cream">{lead.fullName}</strong>
                        <span className="font-mono text-[11px] bg-white/10 px-2 py-0.5 text-blush rounded-sm">
                          {lead.voucherCode}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-sm font-bold uppercase bg-stone text-ink">
                          {lead.status}
                        </span>
                      </div>

                      <p className="text-cream-light/70">
                        Phone: <strong>{lead.phone}</strong> • Area: {lead.area} • Time: {lead.timePreference}
                      </p>

                      <p className="text-cream-light/80">
                        Program: <strong className="text-blush">{lead.service}</strong>
                        {lead.scheduledDate && ` • Scheduled: ${lead.scheduledDate}`}
                      </p>

                      {lead.notes && (
                        <p className="text-[11px] text-cream-light/60 italic">
                          &ldquo;{lead.notes}&rdquo;
                        </p>
                      )}
                    </div>

                    {/* Lead Workflow Actions */}
                    <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-2">
                      <a
                        href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(lead.fullName)},%20Shilpa%20Kanodia%20here%20regarding%20your%20trial%20voucher%20${lead.voucherCode}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 font-semibold rounded-sm flex items-center gap-1.5"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </a>

                      {/* Status Dropdown */}
                      <select
                        value={lead.status}
                        onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value)}
                        className="bg-white/10 border border-white/15 text-[11px] text-cream px-2.5 py-1.5 rounded-sm focus:outline-none"
                      >
                        <option value="new" className="bg-[#161214] text-white">New Request</option>
                        <option value="contacted" className="bg-[#161214] text-white">Contacted</option>
                        <option value="scheduled" className="bg-[#161214] text-white">Scheduled</option>
                        <option value="attended" className="bg-[#161214] text-white">Attended</option>
                        <option value="converted" className="bg-[#161214] text-emerald-400">Converted to Member</option>
                      </select>

                      {/* 1-Click Convert to Member */}
                      {lead.status !== 'converted' && (
                        <button
                          onClick={() => handleConvertLead(lead.id, 'pack25')}
                          className="px-3 py-1.5 bg-plum hover:bg-plum-hover text-cream font-bold rounded-sm shadow-sm"
                        >
                          Enroll as Member (25-Pack)
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 6: 7-DAY REPLAY LIFECYCLE MANAGER                     */}
        {/* ========================================================= */}
        {activeTab === 'replays' && (
          <div className="space-y-6">
            <div className="bg-[#161214] p-6 rounded-sm border border-white/10 space-y-4">
              <div className="border-b border-white/10 pb-3 flex items-center justify-between">
                <div>
                  <span className="text-[11px] uppercase tracking-widest text-blush font-semibold block">
                    Cloud Video Retention Engine
                  </span>
                  <h3 className="font-serif text-xl font-bold text-cream mt-0.5">
                    Missed-Class Recording TTL & Expiration Control
                  </h3>
                </div>
                <span className="text-xs text-emerald-400 font-bold">168-Hour Window Active</span>
              </div>

              <div className="space-y-4">
                {classes.map((cls) => {
                  const remaining = getReplayRemainingTime(cls.recordingExpiresAt);
                  return (
                    <div
                      key={cls.id}
                      className="p-5 bg-white/5 rounded-sm border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
                    >
                      <div className="space-y-1.5 max-w-xl">
                        <div className="flex items-center gap-2">
                          <strong className="font-serif text-base text-cream">{cls.title}</strong>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase ${
                              cls.recordingStatus === 'ready'
                                ? 'bg-emerald-500/20 text-emerald-400'
                                : cls.recordingStatus === 'expired'
                                ? 'bg-red-500/20 text-red-400'
                                : 'bg-amber-500/20 text-amber-400'
                            }`}
                          >
                            {cls.recordingStatus}
                          </span>
                        </div>

                        <p className="text-cream-light/70">
                          Broadcast: {cls.date} • {cls.time} • Instructor: {cls.instructor}
                        </p>

                        <div className="text-[11px]">
                          {cls.recordingStatus === 'ready' && (
                            <span className="text-emerald-400 font-medium">
                              ✓ Replay Active — Remaining: <strong>{remaining.text}</strong>
                            </span>
                          )}
                          {cls.recordingStatus === 'expired' && (
                            <span className="text-red-400 font-medium">
                              ✗ Access Expired (168-hour window terminated)
                            </span>
                          )}
                          {cls.recordingStatus === 'pending' && (
                            <span className="text-amber-400 font-medium">
                              ⏳ Recording processing from Zoom Cloud...
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Recording Actions */}
                      <div className="flex flex-wrap items-center gap-2">
                        {cls.recordingStatus !== 'ready' && (
                          <button
                            onClick={() => handleReleaseRecording(cls.id)}
                            className="px-3 py-1.5 bg-plum hover:bg-plum-hover text-cream font-bold rounded-sm shadow-sm flex items-center gap-1.5"
                          >
                            <Film className="w-3.5 h-3.5" />
                            <span>Publish Recording (Start 7d Clock)</span>
                          </button>
                        )}

                        {cls.recordingStatus === 'ready' && (
                          <button
                            onClick={() => handleExtendReplay(cls.id)}
                            className="px-3 py-1.5 bg-white/10 hover:bg-white/15 text-cream font-semibold rounded-sm flex items-center gap-1.5"
                          >
                            <Clock className="w-3.5 h-3.5 text-blush" />
                            <span>+24h Extension Override</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 7: STUDIO BROADCASTS                                  */}
        {/* ========================================================= */}
        {activeTab === 'broadcasts' && (
          <div className="space-y-6">
            {/* Create Announcement */}
            <div className="bg-[#161214] p-6 rounded-sm border border-white/10 space-y-4">
              <h3 className="font-serif text-lg font-bold text-cream">
                Create Studio Broadcast Alert
              </h3>

              <form onSubmit={handleCreateAnnouncement} className="space-y-4">
                <div>
                  <textarea
                    rows={2}
                    required
                    placeholder="e.g. ✨ New Saturday 10:00 AM Face Yoga & Gua Sha Sculpt workshop batch now open!"
                    value={newAnnouncementMsg}
                    onChange={(e) => setNewAnnouncementMsg(e.target.value)}
                    className="w-full text-xs p-3 rounded-sm bg-white/10 border border-white/15 text-cream placeholder-cream/40 focus:outline-none focus:border-blush"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-cream-light/60">Type:</span>
                    <select
                      value={newAnnouncementType}
                      onChange={(e) => setNewAnnouncementType(e.target.value as 'info' | 'alert' | 'highlight')}
                      className="bg-white/10 border border-white/15 text-xs text-cream px-3 py-1.5 rounded-sm focus:outline-none"
                    >
                      <option value="highlight" className="bg-[#161214] text-white">Highlight (Gold/Blush)</option>
                      <option value="info" className="bg-[#161214] text-white">Info (Neutral)</option>
                      <option value="alert" className="bg-[#161214] text-white">Alert (Red/Notice)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="px-4 py-2 bg-plum hover:bg-plum-hover text-cream text-xs font-bold rounded-sm shadow-plum flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Broadcast Notice</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Existing Announcements */}
            <div className="bg-[#161214] p-6 rounded-sm border border-white/10 space-y-4">
              <h3 className="font-serif text-lg font-bold text-cream">
                Active & Previous Announcements ({announcements.length})
              </h3>

              <div className="space-y-3">
                {announcements.map((ann) => (
                  <div
                    key={ann.id}
                    className="p-4 bg-white/5 rounded-sm border border-white/10 flex items-center justify-between gap-4 text-xs"
                  >
                    <div>
                      <p className="text-cream font-medium">{ann.message}</p>
                      <span className="text-[10px] text-cream-light/50 mt-1 block">
                        Posted: {ann.createdAt} • Type: {ann.type}
                      </span>
                    </div>

                    <button
                      onClick={() => handleToggleAnnouncement(ann.id)}
                      className={`px-3 py-1.5 rounded-sm text-xs font-semibold ${
                        ann.isActive ? 'bg-emerald-500/20 text-emerald-300' : 'bg-white/10 text-cream-light/50'
                      }`}
                    >
                      {ann.isActive ? 'Active (Visible)' : 'Archived (Hidden)'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 8: DIAGNOSTICS & SYSTEM INTEGRITY                     */}
        {/* ========================================================= */}
        {activeTab === 'diagnostics' && (
          <div className="space-y-6">
            <div className="bg-[#161214] p-6 rounded-sm border border-white/10 space-y-4">
              <div className="border-b border-white/10 pb-3 flex items-center justify-between">
                <div>
                  <span className="text-[11px] uppercase tracking-widest text-blush font-semibold block">
                    Security & Health
                  </span>
                  <h3 className="font-serif text-xl font-bold text-cream mt-0.5">
                    Server-Side Secrets & Diagnostic Simulator
                  </h3>
                </div>
                <button
                  onClick={handleRunDiagnostics}
                  className="px-4 py-2 bg-plum hover:bg-plum-hover text-cream text-xs font-bold rounded-sm shadow-plum flex items-center gap-2"
                >
                  <Activity className="w-3.5 h-3.5" />
                  <span>Execute Diagnostic Check</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-4 bg-white/5 rounded-sm border border-white/10 space-y-1">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold">
                    <CheckCircle className="w-4 h-4" />
                    <span>Zoom HMAC Token</span>
                  </div>
                  <p className="text-cream-light/70 text-[11px]">
                    API keys and Meeting SDK tokens generate exclusively inside `/api/zoom/signature`. Never exposed to client bundle.
                  </p>
                </div>

                <div className="p-4 bg-white/5 rounded-sm border border-white/10 space-y-1">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold">
                    <CheckCircle className="w-4 h-4" />
                    <span>Strict TTL Policy</span>
                  </div>
                  <p className="text-cream-light/70 text-[11px]">
                    168-hour hard limit computed server-side. Once diff &le; 0, streams are blocked by ReplayPlayer gates.
                  </p>
                </div>

                <div className="p-4 bg-white/5 rounded-sm border border-white/10 space-y-1">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold">
                    <CheckCircle className="w-4 h-4" />
                    <span>Entitlement Enforcement</span>
                  </div>
                  <p className="text-cream-light/70 text-[11px]">
                    Accounts with `past_due` or `expired` status or 0 class credits are strictly barred from joining meetings.
                  </p>
                </div>
              </div>

              {diagnosticsOutput && (
                <div className="mt-4">
                  <span className="text-[11px] text-cream-light/60 block mb-1 font-mono">
                    System Diagnostic Log:
                  </span>
                  <pre className="p-4 bg-black/60 border border-white/10 text-emerald-400 font-mono text-xs overflow-x-auto rounded-sm">
                    {diagnosticsOutput}
                  </pre>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
