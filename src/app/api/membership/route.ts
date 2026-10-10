import { NextResponse } from 'next/server';
import {
  initialMembers,
  initialClasses,
  initialLeads,
  initialAnnouncements,
  Member,
  ClassSession,
  TrialLead,
  StudioAnnouncement,
  calculateSevenDaysExpiry,
} from '@/lib/membershipStore';

// In-memory state maintained across active server session
let members: Member[] = [...initialMembers];
let classes: ClassSession[] = [...initialClasses];
let leads: TrialLead[] = [...initialLeads];
let announcements: StudioAnnouncement[] = [...initialAnnouncements];
let currentMemberId = 'mem-1'; // Default: Priyanka Sharma

export async function GET() {
  const currentMember = members.find((m) => m.id === currentMemberId) || members[0];
  return NextResponse.json({
    currentMember,
    allMembers: members,
    classes,
    leads,
    announcements,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action } = body;

    // 1. Switch Active Member Persona (QA Testing)
    if (action === 'switch_member') {
      const { memberId } = body;
      const target = members.find((m) => m.id === memberId);
      if (target) {
        currentMemberId = target.id;
        return NextResponse.json({ success: true, currentMember: target });
      }
      return NextResponse.json({ error: 'Member not found' }, { status: 404 });
    }

    // 2. Direct Sample Booking (Instant Confirmation - No WhatsApp/Razorpay)
    if (action === 'direct_sample_booking') {
      const { fullName, phone, email, service, timePreference, notes, area = 'Goregaon West' } = body;
      if (!fullName || !phone) {
        return NextResponse.json({ error: 'Name and phone are required.' }, { status: 400 });
      }

      const voucherCode = `SHILPA-BOK-${Math.floor(1000 + Math.random() * 9000)}`;
      const newLead: TrialLead = {
        id: `lead-${Date.now().toString(36)}`,
        fullName,
        phone,
        email: email || `${fullName.toLowerCase().replace(/\s+/g, '.')}@client.in`,
        area,
        service: service || 'Classical Reformer Pilates',
        timePreference: timePreference || 'Morning (08:00 AM)',
        notes: notes || 'Direct in-website sample booking.',
        status: 'scheduled',
        createdAt: 'Just now',
        voucherCode,
        scheduledDate: 'Next Available Batch',
      };
      leads.unshift(newLead);

      // Also register or find member in store so they can immediately test Zoom live session
      let existingMember = members.find((m) => m.phone === phone || m.name.toLowerCase() === fullName.toLowerCase());
      if (!existingMember) {
        existingMember = {
          id: `mem-${Date.now().toString(36)}`,
          name: fullName,
          email: newLead.email || 'client@shilpakanodia.com',
          phone,
          planType: 'monthly',
          entitlementState: 'active',
          classCreditsRemaining: 999,
          planExpiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          bookedClassIds: ['cls-1'],
          medicalNotes: notes || 'New trial client.',
          joinedDate: 'Today',
          totalClassesAttended: 0,
        };
        members.unshift(existingMember);
      } else {
        existingMember.entitlementState = 'active';
        if (!existingMember.bookedClassIds.includes('cls-1')) {
          existingMember.bookedClassIds.push('cls-1');
        }
      }

      currentMemberId = existingMember.id;

      // Add to live class roster
      const liveCls = classes.find((c) => c.id === 'cls-1');
      if (liveCls && !liveCls.roster.some((r) => r.memberId === existingMember!.id)) {
        liveCls.roster.push({
          memberId: existingMember.id,
          memberName: existingMember.name,
          attended: false,
          bookedAt: 'Just now',
          creditDeducted: true,
        });
      }

      return NextResponse.json({
        success: true,
        message: 'Instant trial booking confirmed! Voucher generated.',
        voucherCode,
        lead: newLead,
        currentMember: existingMember,
        targetClass: liveCls,
      });
    }

    // 3. Purchase Plan / Payment Verification
    if (action === 'purchase_plan') {
      const { planType, memberId = currentMemberId } = body;
      const member = members.find((m) => m.id === memberId);
      if (!member) return NextResponse.json({ error: 'Member not found' }, { status: 404 });

      member.planType = planType;
      member.entitlementState = 'active';

      if (planType === 'pack25') {
        member.classCreditsRemaining = (member.classCreditsRemaining || 0) + 25;
        member.planExpiresAt = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString();
      } else if (planType === 'annual') {
        member.classCreditsRemaining = 999;
        member.planExpiresAt = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString();
      } else {
        member.classCreditsRemaining = 999;
        member.planExpiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
      }

      return NextResponse.json({
        success: true,
        message: `Plan ${planType.toUpperCase()} activated. Entitlement: ACTIVE.`,
        currentMember: member,
      });
    }

    // 4. Simulate Payment Failure (Past Due)
    if (action === 'simulate_payment_failure') {
      const { memberId = currentMemberId } = body;
      const member = members.find((m) => m.id === memberId);
      if (!member) return NextResponse.json({ error: 'Member not found' }, { status: 404 });

      member.entitlementState = 'past_due';
      return NextResponse.json({
        success: true,
        message: 'Payment failed. Entitlement status updated to PAST_DUE.',
        currentMember: member,
      });
    }

    // 5. Simulate Cancellation
    if (action === 'simulate_cancellation') {
      const { memberId = currentMemberId } = body;
      const member = members.find((m) => m.id === memberId);
      if (!member) return NextResponse.json({ error: 'Member not found' }, { status: 404 });

      member.entitlementState = 'expired';
      member.classCreditsRemaining = 0;
      return NextResponse.json({
        success: true,
        message: 'Membership marked EXPIRED.',
        currentMember: member,
      });
    }

    // 6. Book Class (Deducts Credit)
    if (action === 'book_class') {
      const { classId, memberId = currentMemberId } = body;
      const member = members.find((m) => m.id === memberId);
      const targetClass = classes.find((c) => c.id === classId);

      if (!member || !targetClass) {
        return NextResponse.json({ error: 'Invalid member or class' }, { status: 404 });
      }

      if (member.entitlementState !== 'active') {
        return NextResponse.json(
          {
            error: `Access Blocked: Your membership is ${member.entitlementState.toUpperCase()}. Please renew your plan.`,
            reason: member.entitlementState,
          },
          { status: 403 }
        );
      }

      if (member.planType === 'pack25' && member.classCreditsRemaining <= 0) {
        return NextResponse.json(
          {
            error: 'Access Blocked: You have 0 class credits remaining in your 25-Class Pack.',
            reason: 'insufficient_credits',
          },
          { status: 403 }
        );
      }

      if (member.bookedClassIds.includes(classId)) {
        return NextResponse.json({ error: 'You are already booked for this class.' }, { status: 400 });
      }

      if (targetClass.roster.length >= targetClass.capacity) {
        return NextResponse.json({ error: 'This class is currently at maximum capacity.' }, { status: 400 });
      }

      if (member.planType === 'pack25') {
        member.classCreditsRemaining -= 1;
      }
      member.bookedClassIds.push(classId);
      targetClass.roster.push({
        memberId: member.id,
        memberName: member.name,
        attended: false,
        bookedAt: 'Just now',
        creditDeducted: true,
      });

      return NextResponse.json({
        success: true,
        message: 'Seat booked! Credit deducted.',
        currentMember: member,
        updatedClass: targetClass,
      });
    }

    // 7. Cancel Booking (Restores Credit)
    if (action === 'cancel_booking') {
      const { classId, memberId = currentMemberId } = body;
      const member = members.find((m) => m.id === memberId);
      const targetClass = classes.find((c) => c.id === classId);

      if (!member || !targetClass) {
        return NextResponse.json({ error: 'Invalid member or class' }, { status: 404 });
      }

      member.bookedClassIds = member.bookedClassIds.filter((id) => id !== classId);
      targetClass.roster = targetClass.roster.filter((r) => r.memberId !== member.id);

      if (member.planType === 'pack25') {
        member.classCreditsRemaining += 1;
      }

      return NextResponse.json({
        success: true,
        message: 'Booking canceled. Class credit restored.',
        currentMember: member,
        updatedClass: targetClass,
      });
    }

    // 8. Admin: Create Class
    if (action === 'admin_create_class') {
      const { title, date, time, zoomMeetingNumber, zoomPasscode, capacity = 25, focusArea, type = 'online', locationInfo } = body;
      const newClass: ClassSession = {
        id: `cls-${Date.now().toString(36)}`,
        title,
        instructor: 'Shilpa Kanodia',
        date,
        time,
        scheduledAt: new Date().toISOString(),
        durationMinutes: 45,
        capacity: Number(capacity),
        zoomMeetingNumber: zoomMeetingNumber || '890 1234 5678',
        zoomPasscode: zoomPasscode || 'SHILPA2026',
        status: 'scheduled',
        recordingStatus: 'pending',
        recordingReleasedAt: null,
        recordingExpiresAt: null,
        videoUrl: null,
        focusArea: focusArea || 'General Facial Conditioning',
        type: type,
        locationInfo: locationInfo || (type === 'studio' ? 'Sai Commercial Arcade, Goregaon West' : 'Zoom Live Room (Web SDK)'),
        viewCount: 0,
        roster: [],
      };
      classes.unshift(newClass);
      return NextResponse.json({ success: true, newClass, classes });
    }

    // 9. Admin: Publish Recording (7-day clock)
    if (action === 'admin_release_recording') {
      const { classId, videoUrl } = body;
      const targetClass = classes.find((c) => c.id === classId);
      if (!targetClass) return NextResponse.json({ error: 'Class not found' }, { status: 404 });

      const now = new Date();
      targetClass.status = 'completed';
      targetClass.recordingStatus = 'ready';
      targetClass.recordingReleasedAt = now.toISOString();
      targetClass.recordingExpiresAt = calculateSevenDaysExpiry(now);
      targetClass.videoUrl = videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';

      return NextResponse.json({
        success: true,
        message: 'Recording published! Exact 7-day TTL countdown started.',
        updatedClass: targetClass,
      });
    }

    // 10. Admin: Extend Replay by 24h (Exception override)
    if (action === 'admin_extend_replay') {
      const { classId, additionalHours = 24 } = body;
      const targetClass = classes.find((c) => c.id === classId);
      if (!targetClass) return NextResponse.json({ error: 'Class not found' }, { status: 404 });

      const currentExpiry = targetClass.recordingExpiresAt ? new Date(targetClass.recordingExpiresAt).getTime() : Date.now();
      targetClass.recordingExpiresAt = new Date(currentExpiry + additionalHours * 60 * 60 * 1000).toISOString();
      targetClass.recordingStatus = 'ready';

      return NextResponse.json({
        success: true,
        message: `Replay window extended by ${additionalHours} hours for client exception.`,
        updatedClass: targetClass,
      });
    }

    // 11. Admin: Mark Attendance
    if (action === 'admin_mark_attendance') {
      const { classId, memberId, attended } = body;
      const targetClass = classes.find((c) => c.id === classId);
      if (!targetClass) return NextResponse.json({ error: 'Class not found' }, { status: 404 });

      const attendee = targetClass.roster.find((r) => r.memberId === memberId);
      if (attendee) {
        attendee.attended = attended;
      }
      return NextResponse.json({ success: true, updatedClass: targetClass });
    }

    // 12. Admin: Add Walk-in Attendee
    if (action === 'admin_add_walkin') {
      const { classId, attendeeName } = body;
      const targetClass = classes.find((c) => c.id === classId);
      if (!targetClass) return NextResponse.json({ error: 'Class not found' }, { status: 404 });

      targetClass.roster.push({
        memberId: `walkin-${Date.now().toString(36)}`,
        memberName: attendeeName,
        attended: true,
        bookedAt: 'Walk-in Studio Entry',
        creditDeducted: true,
      });
      return NextResponse.json({ success: true, updatedClass: targetClass });
    }

    // 13. Admin: Update Lead Status
    if (action === 'admin_update_lead_status') {
      const { leadId, newStatus, scheduledDate } = body;
      const lead = leads.find((l) => l.id === leadId);
      if (!lead) return NextResponse.json({ error: 'Lead not found' }, { status: 404 });

      lead.status = newStatus;
      if (scheduledDate) lead.scheduledDate = scheduledDate;

      return NextResponse.json({ success: true, updatedLead: lead });
    }

    // 14. Admin: Adjust Member Credits & Notes
    if (action === 'admin_update_member_crm') {
      const { memberId, deltaCredits, medicalNotes, entitlementState } = body;
      const member = members.find((m) => m.id === memberId);
      if (!member) return NextResponse.json({ error: 'Member not found' }, { status: 404 });

      if (typeof deltaCredits === 'number') {
        member.classCreditsRemaining = Math.max(0, member.classCreditsRemaining + deltaCredits);
      }
      if (medicalNotes !== undefined) {
        member.medicalNotes = medicalNotes;
      }
      if (entitlementState) {
        member.entitlementState = entitlementState;
      }

      return NextResponse.json({ success: true, updatedMember: member });
    }

    // 15. Admin: Post Announcement
    if (action === 'admin_create_announcement') {
      const { message, type = 'highlight' } = body;
      const newAnn: StudioAnnouncement = {
        id: `ann-${Date.now().toString(36)}`,
        message,
        isActive: true,
        type,
        createdAt: 'Just now',
      };
      announcements.unshift(newAnn);
      return NextResponse.json({ success: true, announcements });
    }

    // 16. Admin: Toggle Announcement Active State
    if (action === 'admin_toggle_announcement') {
      const { annId } = body;
      const ann = announcements.find((a) => a.id === annId);
      if (ann) {
        ann.isActive = !ann.isActive;
        return NextResponse.json({ success: true, announcements });
      }
      return NextResponse.json({ error: 'Announcement not found' }, { status: 404 });
    }

    // 17. Admin: Convert Lead to Active Member
    if (action === 'admin_convert_lead_to_member') {
      const { leadId, chosenPlan = 'monthly' } = body;
      const lead = leads.find((l) => l.id === leadId);
      if (!lead) return NextResponse.json({ error: 'Lead not found' }, { status: 404 });

      lead.status = 'converted';

      let member = members.find((m) => m.phone === lead.phone || m.name.toLowerCase() === lead.fullName.toLowerCase());
      if (!member) {
        member = {
          id: `mem-${Date.now().toString(36)}`,
          name: lead.fullName,
          email: lead.email || `${lead.fullName.toLowerCase().replace(/\s+/g, '.')}@client.in`,
          phone: lead.phone,
          planType: chosenPlan,
          entitlementState: 'active',
          classCreditsRemaining: chosenPlan === 'pack25' ? 25 : 999,
          planExpiresAt: new Date(Date.now() + (chosenPlan === 'pack25' ? 365 : 30) * 24 * 60 * 60 * 1000).toISOString(),
          bookedClassIds: [],
          medicalNotes: lead.notes || 'Converted from website trial lead.',
          joinedDate: 'Today',
          totalClassesAttended: 0,
        };
        members.unshift(member);
      } else {
        member.planType = chosenPlan;
        member.entitlementState = 'active';
        if (chosenPlan === 'pack25') {
          member.classCreditsRemaining = (member.classCreditsRemaining || 0) + 25;
        }
      }

      return NextResponse.json({
        success: true,
        message: `${lead.fullName} enrolled as active member under ${chosenPlan.toUpperCase()}!`,
        lead,
        member,
      });
    }

    // 18. Admin: Cancel / Delete Class
    if (action === 'admin_delete_class') {
      const { classId } = body;
      const targetClass = classes.find((c) => c.id === classId);
      if (!targetClass) return NextResponse.json({ error: 'Class not found' }, { status: 404 });

      targetClass.status = 'canceled';
      // Refund credits to all booked 25-pack members
      targetClass.roster.forEach((r) => {
        const mem = members.find((m) => m.id === r.memberId);
        if (mem && mem.planType === 'pack25') {
          mem.classCreditsRemaining += 1;
        }
        if (mem) {
          mem.bookedClassIds = mem.bookedClassIds.filter((id) => id !== classId);
        }
      });

      return NextResponse.json({ success: true, message: 'Class session canceled and credits refunded.', updatedClass: targetClass });
    }

    // 19. Admin: Refund Credit for Excused Absence
    if (action === 'admin_refund_attendance_credit') {
      const { classId, memberId } = body;
      const mem = members.find((m) => m.id === memberId);
      const targetClass = classes.find((c) => c.id === classId);
      if (!mem || !targetClass) return NextResponse.json({ error: 'Member or class not found' }, { status: 404 });

      const rosterEntry = targetClass.roster.find((r) => r.memberId === memberId);
      if (rosterEntry) {
        rosterEntry.attended = false;
        rosterEntry.creditDeducted = false;
      }
      if (mem.planType === 'pack25') {
        mem.classCreditsRemaining += 1;
      }

      return NextResponse.json({
        success: true,
        message: `1 Class credit refunded to ${mem.name} for excused absence.`,
        member: mem,
        updatedClass: targetClass,
      });
    }

    // 20. Admin: Update Class Status (e.g. mark Live or Completed)
    if (action === 'admin_update_class_status') {
      const { classId, newStatus } = body;
      const targetClass = classes.find((c) => c.id === classId);
      if (!targetClass) return NextResponse.json({ error: 'Class not found' }, { status: 404 });

      targetClass.status = newStatus;
      return NextResponse.json({ success: true, updatedClass: targetClass });
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  } catch (error) {
    console.error('Membership API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
