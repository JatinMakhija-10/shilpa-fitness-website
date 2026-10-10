'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Video,
  Play,
  Calendar,
  Clock,
  Award,
  Shield,
  CheckCircle,
  ArrowRight,
  Lock,
  AlertTriangle,
  RefreshCw,
  Plus,
  CreditCard,
  User,
  Users,
} from 'lucide-react';
import { Member, ClassSession, getReplayRemainingTime } from '@/lib/membershipStore';
import ZoomLiveRoom from '@/components/live/ZoomLiveRoom';
import ReplayPlayer from '@/components/live/ReplayPlayer';

export default function MemberPortalPage() {
  const [member, setMember] = useState<Member | null>(null);
  const [allMembers, setAllMembers] = useState<Member[]>([]);
  const [classes, setClasses] = useState<ClassSession[]>([]);
  const [loading, setLoading] = useState(true);

  // Active Live Room state
  const [activeLiveClass, setActiveLiveClass] = useState<ClassSession | null>(null);

  // Active Replay state
  const [activeReplayClass, setActiveReplayClass] = useState<ClassSession | null>(null);

  // Plan Checkout Modal state
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [selectedPlanForPurchase, setSelectedPlanForPurchase] = useState<'monthly' | 'annual' | 'pack25'>('monthly');

  // Load Member & Class data
  const loadPortalData = async () => {
    try {
      const res = await fetch('/api/membership');
      const data = await res.json();
      setMember(data.currentMember);
      setAllMembers(data.allMembers || []);
      setClasses(data.classes || []);
    } catch (err) {
      console.error('Failed to load portal data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPortalData();
  }, []);

  // Switch Member Persona (for testing)
  const handleSwitchMember = async (targetId: string) => {
    setLoading(true);
    try {
      const res = await fetch('/api/membership', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'switch_member', memberId: targetId }),
      });
      if (res.ok) {
        await loadPortalData();
      }
    } finally {
      setLoading(false);
    }
  };

  // Book a Class (Deducts Credit)
  const handleBookClass = async (classId: string) => {
    try {
      const res = await fetch('/api/membership', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'book_class', classId }),
      });
      const data = await res.json();
      if (res.ok) {
        alert(data.message || 'Class booked successfully!');
        await loadPortalData();
      } else {
        alert(`Booking Failed: ${data.error}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Cancel Booking (Restores Credit)
  const handleCancelBooking = async (classId: string) => {
    try {
      const res = await fetch('/api/membership', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'cancel_booking', classId }),
      });
      const data = await res.json();
      if (res.ok) {
        alert(data.message || 'Booking canceled. Credit restored.');
        await loadPortalData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Complete Plan Purchase (Razorpay Simulation)
  const handlePurchasePlan = async () => {
    try {
      const res = await fetch('/api/membership', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'purchase_plan', planType: selectedPlanForPurchase }),
      });
      if (res.ok) {
        setShowCheckoutModal(false);
        alert(`Payment successful via Razorpay! ${selectedPlanForPurchase.toUpperCase()} plan is now active.`);
        await loadPortalData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading || !member) {
    return (
      <div className="pt-32 pb-20 min-h-screen bg-[#141211] text-cream flex items-center justify-center">
        <div className="flex items-center gap-3 text-sm">
          <RefreshCw className="w-5 h-5 animate-spin text-blush" />
          <span>Loading Member Portal...</span>
        </div>
      </div>
    );
  }

  // 1. If inside Live Zoom Room
  if (activeLiveClass) {
    return (
      <ZoomLiveRoom
        member={member}
        classSession={activeLiveClass}
        onLeave={() => setActiveLiveClass(null)}
        onUpgradePlan={() => {
          setActiveLiveClass(null);
          setShowCheckoutModal(true);
        }}
      />
    );
  }

  // 2. If inside Replay Player
  if (activeReplayClass) {
    return (
      <div className="pt-24 pb-20 min-h-screen bg-[#141211] px-4">
        <ReplayPlayer
          classSession={activeReplayClass}
          member={member}
          onBack={() => setActiveReplayClass(null)}
          onUpgradePlan={() => {
            setActiveReplayClass(null);
            setShowCheckoutModal(true);
          }}
        />
      </div>
    );
  }

  const liveClass = classes.find((c) => c.status === 'live') || classes[0];
  const upcomingClasses = classes.filter((c) => c.status === 'scheduled');
  const replayClasses = classes.filter((c) => c.recordingStatus === 'ready' || c.recordingStatus === 'expired');

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#141211] text-cream selection:bg-blush selection:text-plum">
      {/* Top QA Testing Switcher Bar */}
      <div className="bg-[#221B1E] border-b border-white/10 px-4 py-2.5">
        <div className="max-w-site mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-cream-light/70">
            <User className="w-4 h-4 text-blush" />
            <span><strong>Testing Persona Switcher:</strong></span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {allMembers.map((m) => (
              <button
                key={m.id}
                onClick={() => handleSwitchMember(m.id)}
                className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all ${
                  member.id === m.id
                    ? 'bg-plum text-cream ring-1 ring-blush'
                    : 'bg-white/10 text-cream-light/70 hover:bg-white/20'
                }`}
              >
                {m.name} ({m.planType} • {m.entitlementState})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Banner */}
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6 border-b border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="text-xs uppercase tracking-widest text-blush font-semibold">
                Member Portal • Live Zoom & 7-Day Replays
              </span>
              <span
                className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase ${
                  member.entitlementState === 'active'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : member.entitlementState === 'past_due'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'bg-red-500/20 text-red-300 border border-red-500/30'
                }`}
              >
                {member.entitlementState}
              </span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl text-cream font-bold mt-1">
              Welcome back, {member.name}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowCheckoutModal(true)}
              className="bg-plum hover:bg-plum-hover text-cream text-xs font-bold px-4 py-2.5 rounded-full shadow-plum flex items-center gap-1.5"
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Manage / Upgrade Plan</span>
            </button>
            <Link
              href="/admin"
              className="text-xs text-cream-light/60 hover:text-cream px-3 py-2 rounded-full border border-white/15"
            >
              Admin View
            </Link>
          </div>
        </div>
      </div>

      {/* Dashboard Body */}
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Metric Architectural Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-dark-glass p-5 rounded-sm border border-white/10">
            <span className="text-xs text-cream-light/60 block">Current Plan</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-serif text-xl sm:text-2xl font-bold text-cream uppercase">
                {member.planType}
              </span>
            </div>
            <span className="text-[10px] text-cream-light/50 block mt-1">
              Expires: {new Date(member.planExpiresAt).toLocaleDateString()}
            </span>
          </div>

          <div className="bg-dark-glass p-5 rounded-sm border border-white/10">
            <span className="text-xs text-cream-light/60 block">Class Credits Remaining</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-emerald-400">
                {member.planType === 'pack25' ? member.classCreditsRemaining : 'Unlimited'}
              </span>
              {member.planType === 'pack25' && <span className="text-xs text-cream-light/70">/ 25</span>}
            </div>
            <span className="text-[10px] text-cream-light/50 block mt-1">
              {member.planType === 'pack25' ? 'Atomic auto-deduct' : 'Full access pass'}
            </span>
          </div>

          <div className="bg-dark-glass p-5 rounded-sm border border-white/10">
            <span className="text-xs text-cream-light/60 block">Replay Access Window</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-blush">7</span>
              <span className="text-xs text-cream-light/80">days rolling</span>
            </div>
            <span className="text-[10px] text-cream-light/50 block mt-1">Strict TTL auto-lock</span>
          </div>

          <div className="bg-dark-glass p-5 rounded-sm border border-white/10">
            <span className="text-xs text-cream-light/60 block">Classes Booked</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-cream">
                {member.bookedClassIds.length}
              </span>
              <span className="text-xs text-cream-light/80">sessions</span>
            </div>
            <span className="text-[10px] text-emerald-400 block mt-1">Attendance active</span>
          </div>
        </div>

        {/* Live Class Hero Banner */}
        {liveClass && (
          <div className="bg-gradient-to-r from-[#3B151C] via-plum to-[#4F1A25] rounded-sm p-6 sm:p-8 border border-white/20 shadow-2xl relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    LIVE SESSION NOW
                  </span>
                  <span className="text-xs text-cream-light/70">{liveClass.date}</span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-cream">
                  {liveClass.title}
                </h2>

                <p className="text-xs sm:text-sm text-cream-light/85 max-w-xl leading-relaxed">
                  Instructor: <strong>{liveClass.instructor}</strong>. Focus: {liveClass.focusArea}.
                  Embedded Zoom Web SDK connects directly inside this tab with camera & audio sync.
                </p>

                <div className="flex items-center gap-4 text-xs text-cream-light/70 pt-1">
                  <span>{liveClass.time}</span>
                  <span>•</span>
                  <span>Zoom ID: {liveClass.zoomMeetingNumber}</span>
                </div>
              </div>

              <div className="flex flex-col gap-2 flex-shrink-0">
                <button
                  onClick={() => setActiveLiveClass(liveClass)}
                  className="bg-cream hover:bg-cream-light text-plum font-bold text-xs sm:text-sm px-8 py-4 rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                >
                  <Video className="w-4 h-4 text-plum" />
                  <span>Join Live Zoom Room</span>
                </button>
                <span className="text-[11px] text-cream-light/60 text-center">
                  Entitlement verified upon entry
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Section: Upcoming Schedule & Booking */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-cream">
                Upcoming Live Class Calendar
              </h3>
              <p className="text-xs text-cream-light/60">
                Reserve your seat. Class credits are automatically tracked and decremented upon booking.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {upcomingClasses.map((cls) => {
              const isBooked = member.bookedClassIds.includes(cls.id);
              return (
                <div
                  key={cls.id}
                  className="bg-dark-glass rounded-sm p-5 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white/10 text-cream">
                        {cls.date}
                      </span>
                      <span className="text-xs text-blush">{cls.time}</span>
                    </div>
                    <h4 className="font-serif text-lg font-bold text-cream">{cls.title}</h4>
                    <p className="text-xs text-cream-light/60">
                      Focus: {cls.focusArea} • Capacity: {cls.roster.length} / {cls.capacity} booked
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    {isBooked ? (
                      <>
                        <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                          <CheckCircle className="w-4 h-4" />
                          <span>Booked</span>
                        </span>
                        <button
                          onClick={() => handleCancelBooking(cls.id)}
                          className="text-xs text-cream-light/60 hover:text-red-400 px-3 py-1.5 rounded-lg border border-white/10"
                        >
                          Cancel Booking (Restore Credit)
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleBookClass(cls.id)}
                        className="bg-plum hover:bg-plum-hover text-cream text-xs font-bold px-5 py-2.5 rounded-full shadow-plum transition-transform hover:scale-105 active:scale-95"
                      >
                        Book Seat (1 Credit)
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section: 7-Day Replay Library with Real-Time Expiry */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-cream">
                Missed-Class 7-Day Replay Library
              </h3>
              <p className="text-xs text-cream-light/60">
                Transferred automatically from Zoom Cloud. Replays strictly expire 7 days after broadcast.
              </p>
            </div>
            <span className="text-xs text-blush">{replayClasses.length} Replays</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {replayClasses.map((rep) => {
              const remaining = getReplayRemainingTime(rep.recordingExpiresAt);
              return (
                <div
                  key={rep.id}
                  className={`rounded-sm overflow-hidden border p-5 flex flex-col justify-between space-y-4 transition-all ${
                    remaining.isExpired
                      ? 'bg-white/[0.02] border-white/5 opacity-60'
                      : 'bg-dark-glass border-white/10 hover:border-blush/40'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-cream-light/60">{rep.date}</span>
                      <span
                        className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                          remaining.isExpired
                            ? 'bg-red-500/20 text-red-300'
                            : 'bg-amber-400/15 text-amber-300'
                        }`}
                      >
                        {remaining.isExpired ? 'Expired (Locked)' : remaining.text}
                      </span>
                    </div>

                    <h4 className="font-serif text-lg font-bold text-cream">
                      {rep.title}
                    </h4>

                    <div className="flex items-center gap-3 text-xs text-cream-light/70">
                      <span className="bg-white/5 px-2 py-0.5 rounded text-[11px]">{rep.focusArea}</span>
                      <span>•</span>
                      <span>{rep.durationMinutes} mins</span>
                    </div>
                  </div>

                  <div>
                    {remaining.isExpired ? (
                      <div className="p-3 rounded-sm bg-white/5 text-xs text-cream-light/60 flex items-center gap-2">
                        <Lock className="w-4 h-4 text-red-400" />
                        <span>7-Day window ended. Recording archived.</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => setActiveReplayClass(rep)}
                        className="w-full py-3 rounded-sm bg-plum hover:bg-plum-hover text-cream text-xs font-bold flex items-center justify-center gap-2 transition-transform hover:scale-[1.02]"
                      >
                        <Play className="w-3.5 h-3.5 fill-cream" />
                        <span>Watch Replay Stream</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Razorpay Plan Checkout Modal */}
      {showCheckoutModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1D171A] border border-white/20 rounded-sm p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-xs uppercase tracking-widest text-blush font-semibold">
                  Secure Checkout
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-cream mt-0.5">
                  Choose Membership Plan
                </h3>
              </div>
              <button
                onClick={() => setShowCheckoutModal(false)}
                className="text-cream-light/60 hover:text-cream text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              {/* Option 1: Monthly */}
              <div
                onClick={() => setSelectedPlanForPurchase('monthly')}
                className={`p-4 rounded-sm border cursor-pointer transition-all ${
                  selectedPlanForPurchase === 'monthly'
                    ? 'border-blush bg-plum/40 ring-1 ring-blush'
                    : 'border-white/10 bg-white/5 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center justify-between">
                  <strong className="font-serif text-base text-cream">Monthly Live Pass</strong>
                  <span className="font-bold text-cream">₹1,999 / mo</span>
                </div>
                <p className="text-xs text-cream-light/70 mt-1">
                  8 Live Zoom classes + 7-day replays. Recurring monthly billing.
                </p>
              </div>

              {/* Option 2: 25-Class Pack */}
              <div
                onClick={() => setSelectedPlanForPurchase('pack25')}
                className={`p-4 rounded-sm border cursor-pointer transition-all ${
                  selectedPlanForPurchase === 'pack25'
                    ? 'border-blush bg-plum/40 ring-1 ring-blush'
                    : 'border-white/10 bg-white/5 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center justify-between">
                  <strong className="font-serif text-base text-cream">25-Class Credit Pack</strong>
                  <span className="font-bold text-cream">₹12,500</span>
                </div>
                <p className="text-xs text-cream-light/70 mt-1">
                  25 Class credits. Valid for 12 months. Tracked and decremented per booking.
                </p>
              </div>

              {/* Option 3: Annual */}
              <div
                onClick={() => setSelectedPlanForPurchase('annual')}
                className={`p-4 rounded-sm border cursor-pointer transition-all ${
                  selectedPlanForPurchase === 'annual'
                    ? 'border-blush bg-plum/40 ring-1 ring-blush'
                    : 'border-white/10 bg-white/5 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center justify-between">
                  <strong className="font-serif text-base text-cream">Annual All-Access Membership</strong>
                  <span className="font-bold text-cream">₹18,999 / yr</span>
                </div>
                <p className="text-xs text-cream-light/70 mt-1">
                  Unlimited live Zoom classes, rolling 7-day replays, and monthly workshops.
                </p>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={handlePurchasePlan}
                className="w-full py-4 rounded-full bg-plum hover:bg-plum-hover text-cream font-bold text-sm shadow-plum flex items-center justify-center gap-2"
              >
                <CreditCard className="w-4 h-4" />
                <span>Verify Payment & Activate Plan</span>
              </button>
              <p className="text-[11px] text-cream-light/50 text-center">
                Simulates Razorpay webhook with idempotent server signature verification.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
