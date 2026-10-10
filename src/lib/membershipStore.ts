export type PlanType = 'monthly' | 'annual' | 'pack25' | 'none';
export type EntitlementState = 'active' | 'past_due' | 'expired' | 'canceled';
export type ClassStatus = 'scheduled' | 'live' | 'completed' | 'canceled';
export type RecordingStatus = 'pending' | 'processing' | 'ready' | 'expired';
export type LeadStatus = 'new' | 'contacted' | 'scheduled' | 'attended' | 'converted';

export interface Member {
  id: string;
  name: string;
  email: string;
  phone?: string;
  planType: PlanType;
  entitlementState: EntitlementState;
  classCreditsRemaining: number;
  planExpiresAt: string;
  bookedClassIds: string[];
  medicalNotes?: string;
  joinedDate: string;
  totalClassesAttended: number;
}

export interface ClassSession {
  id: string;
  title: string;
  instructor: string;
  date: string;
  time: string;
  scheduledAt: string;
  durationMinutes: number;
  capacity: number;
  zoomMeetingNumber: string;
  zoomPasscode: string;
  status: ClassStatus;
  recordingStatus: RecordingStatus;
  recordingReleasedAt: string | null;
  recordingExpiresAt: string | null;
  videoUrl: string | null;
  focusArea: string;
  type: 'studio' | 'online';
  locationInfo?: string;
  viewCount?: number;
  roster: {
    memberId: string;
    memberName: string;
    attended: boolean;
    bookedAt: string;
    creditDeducted: boolean;
  }[];
}

export interface TrialLead {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  area: string;
  service: string;
  timePreference: string;
  notes?: string;
  status: LeadStatus;
  createdAt: string;
  voucherCode: string;
  scheduledDate?: string;
}

export interface StudioAnnouncement {
  id: string;
  message: string;
  isActive: boolean;
  type: 'info' | 'alert' | 'highlight';
  createdAt: string;
}

// Exact 7-day expiration calculator
export function calculateSevenDaysExpiry(releaseDate: Date = new Date()): string {
  const expiry = new Date(releaseDate.getTime() + 7 * 24 * 60 * 60 * 1000);
  return expiry.toISOString();
}

// Calculate remaining time
export function getReplayRemainingTime(expiresAtIso: string | null): {
  isExpired: boolean;
  text: string;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
} {
  if (!expiresAtIso) {
    return { isExpired: true, text: 'No recording available', days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const now = new Date().getTime();
  const expiry = new Date(expiresAtIso).getTime();
  const diff = expiry - now;

  if (diff <= 0) {
    return { isExpired: true, text: 'Replay access expired (7-day window ended)', days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  let text = '';
  if (days > 0) text += `${days}d `;
  text += `${hours}h ${minutes}m ${seconds}s`;

  return { isExpired: false, text, days, hours, minutes, seconds };
}

// Initial Mock Members
export const initialMembers: Member[] = [
  {
    id: 'mem-1',
    name: 'Priyanka Sharma',
    email: 'priyanka.s@mumbai.com',
    phone: '+91 98201 11223',
    planType: 'monthly',
    entitlementState: 'active',
    classCreditsRemaining: 999,
    planExpiresAt: new Date(Date.now() + 24 * 24 * 60 * 60 * 1000).toISOString(),
    bookedClassIds: ['cls-1', 'cls-2'],
    medicalNotes: 'L4-L5 mild lumbar disc stiffness. No sudden spine flexion. Spring support required.',
    joinedDate: '12 Nov 2025',
    totalClassesAttended: 28,
  },
  {
    id: 'mem-2',
    name: 'Dr. Ananya Mehta',
    email: 'ananya.mehta@clinic.in',
    phone: '+91 98334 55667',
    planType: 'pack25',
    entitlementState: 'active',
    classCreditsRemaining: 18,
    planExpiresAt: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString(),
    bookedClassIds: ['cls-1'],
    medicalNotes: 'Postpartum rehabilitation (8 months post-delivery). Pelvic floor safe.',
    joinedDate: '10 Jan 2026',
    totalClassesAttended: 7,
  },
  {
    id: 'mem-3',
    name: 'Neha Kothari',
    email: 'neha.kothari@oberoi.com',
    phone: '+91 98199 44332',
    planType: 'monthly',
    entitlementState: 'past_due',
    classCreditsRemaining: 0,
    planExpiresAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    bookedClassIds: [],
    medicalNotes: 'Desk worker rounded shoulders and neck tension.',
    joinedDate: '01 Feb 2026',
    totalClassesAttended: 12,
  },
  {
    id: 'mem-4',
    name: 'Simran Walia',
    email: 'simran.w@techcorp.in',
    phone: '+91 98212 99887',
    planType: 'none',
    entitlementState: 'expired',
    classCreditsRemaining: 0,
    planExpiresAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    bookedClassIds: [],
    medicalNotes: 'Night-time bruxism (jaw teeth clenching) and TMJ tightness.',
    joinedDate: '15 Dec 2025',
    totalClassesAttended: 8,
  },
];

// Initial Mock Classes
export const initialClasses: ClassSession[] = [
  {
    id: 'cls-1',
    title: 'Natural Face Yoga & TMJ Masseter Release',
    instructor: 'Shilpa Kanodia',
    date: 'Today / Live Now',
    time: '08:30 PM – 09:15 PM IST',
    scheduledAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    durationMinutes: 45,
    capacity: 25,
    zoomMeetingNumber: '849 2049 1920',
    zoomPasscode: 'SHILPA2026',
    status: 'live',
    recordingStatus: 'pending',
    recordingReleasedAt: null,
    recordingExpiresAt: null,
    videoUrl: null,
    focusArea: 'TMJ Release & Jawline Sculpt',
    type: 'online',
    locationInfo: 'Zoom Live Interactive Room (Web SDK)',
    viewCount: 14,
    roster: [
      { memberId: 'mem-1', memberName: 'Priyanka Sharma', attended: true, bookedAt: 'Yesterday', creditDeducted: true },
      { memberId: 'mem-2', memberName: 'Dr. Ananya Mehta', attended: false, bookedAt: '2 days ago', creditDeducted: true },
    ],
  },
  {
    id: 'cls-2',
    title: 'Classical Reformer & Deep Core Alignment',
    instructor: 'Shilpa Kanodia',
    date: 'Tomorrow, Saturday',
    time: '08:00 AM – 08:50 AM IST',
    scheduledAt: new Date(Date.now() + 18 * 60 * 60 * 1000).toISOString(),
    durationMinutes: 50,
    capacity: 6,
    zoomMeetingNumber: '852 3341 9081',
    zoomPasscode: 'SHILPA2026',
    status: 'scheduled',
    recordingStatus: 'pending',
    recordingReleasedAt: null,
    recordingExpiresAt: null,
    videoUrl: null,
    focusArea: 'Spinal Alignment & Transverse Abdominis',
    type: 'studio',
    locationInfo: 'Studio 1, Sai Commercial Arcade, Goregaon West',
    viewCount: 0,
    roster: [
      { memberId: 'mem-1', memberName: 'Priyanka Sharma', attended: false, bookedAt: 'Yesterday', creditDeducted: true },
    ],
  },
  {
    id: 'cls-3',
    title: 'Spinal Rehab & Sciatica Relief Flow',
    instructor: 'Shilpa Kanodia',
    date: 'Monday Morning',
    time: '09:30 AM – 10:20 AM IST',
    scheduledAt: new Date(Date.now() + 60 * 60 * 60 * 1000).toISOString(),
    durationMinutes: 50,
    capacity: 4,
    zoomMeetingNumber: '861 4455 0092',
    zoomPasscode: 'SHILPA2026',
    status: 'scheduled',
    recordingStatus: 'pending',
    recordingReleasedAt: null,
    recordingExpiresAt: null,
    videoUrl: null,
    focusArea: 'L4-L5 Decompression & Sacroiliac Stability',
    type: 'studio',
    locationInfo: 'Rehab Suite, Goregaon West Studio',
    viewCount: 0,
    roster: [],
  },
  {
    id: 'cls-4',
    title: 'Tech-Neck Decompression & Eye Ring Sculpt',
    instructor: 'Shilpa Kanodia',
    date: '3 Days Ago',
    time: '08:30 PM – 09:15 PM IST',
    scheduledAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    durationMinutes: 45,
    capacity: 25,
    zoomMeetingNumber: '831 9901 2234',
    zoomPasscode: 'SHILPA2026',
    status: 'completed',
    recordingStatus: 'ready',
    recordingReleasedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    recordingExpiresAt: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    focusArea: 'Tech Neck, Lymph Flush & Under-Eye Depuff',
    type: 'online',
    locationInfo: 'Zoom Cloud Recording Transfer',
    viewCount: 42,
    roster: [
      { memberId: 'mem-1', memberName: 'Priyanka Sharma', attended: true, bookedAt: '4 days ago', creditDeducted: true },
      { memberId: 'mem-2', memberName: 'Dr. Ananya Mehta', attended: true, bookedAt: '4 days ago', creditDeducted: true },
    ],
  },
  {
    id: 'cls-5',
    title: 'Glabella Forehead Smooth & Acupressure',
    instructor: 'Shilpa Kanodia',
    date: '8 Days Ago (Expired)',
    time: '08:30 PM – 09:15 PM IST',
    scheduledAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    durationMinutes: 45,
    capacity: 25,
    zoomMeetingNumber: '820 1192 8831',
    zoomPasscode: 'SHILPA2026',
    status: 'completed',
    recordingStatus: 'expired',
    recordingReleasedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    recordingExpiresAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    focusArea: 'Forehead Furrows & Scalp Tension',
    type: 'online',
    locationInfo: 'Archived Recording (Expired)',
    viewCount: 65,
    roster: [
      { memberId: 'mem-1', memberName: 'Priyanka Sharma', attended: true, bookedAt: '9 days ago', creditDeducted: true },
    ],
  },
];

// Initial Trial Leads
export const initialLeads: TrialLead[] = [
  {
    id: 'lead-1',
    fullName: 'Ritu Kapoor',
    phone: '+91 98200 44551',
    email: 'ritu.k@gmail.com',
    area: 'Goregaon West (Bangur Nagar)',
    service: 'Classical Reformer Pilates',
    timePreference: 'Morning (08:00 AM – 09:00 AM)',
    notes: 'Never touched a reformer. Sits 9 hours at desk, wants beginner friendly guidance.',
    status: 'new',
    createdAt: 'Today, 2:15 PM',
    voucherCode: 'SHILPA-TRL-9102',
  },
  {
    id: 'lead-2',
    fullName: 'Kavita Chawla',
    phone: '+91 98112 33445',
    email: 'kavita.c@yahoo.com',
    area: 'Malad West (Mindspace)',
    service: 'Spine Rehab & Back Pain Care',
    timePreference: 'Evening (05:00 PM – 06:00 PM)',
    notes: 'Mild L5-S1 disc protrusion. Orthopedist advised low-impact core strength.',
    status: 'scheduled',
    createdAt: 'Yesterday, 11:30 AM',
    voucherCode: 'SHILPA-TRL-8821',
    scheduledDate: 'Saturday, 10:00 AM',
  },
  {
    id: 'lead-3',
    fullName: 'Tanvi Shah',
    phone: '+91 98330 11992',
    email: 'tanvi.shah@gmail.com',
    area: 'Kandivali West (Mahavir Nagar)',
    service: 'Prenatal & Postnatal Movement',
    timePreference: 'Morning (10:45 AM – 11:35 AM)',
    notes: '16 weeks pregnant. Has OB-GYN clearance letter for gentle prenatal movement.',
    status: 'contacted',
    createdAt: '2 days ago',
    voucherCode: 'SHILPA-TRL-7629',
  },
];

// Initial Studio Announcements
export const initialAnnouncements: StudioAnnouncement[] = [
  {
    id: 'ann-1',
    message: '✨ New Saturday 10:00 AM Face Yoga & Gua Sha Sculpt workshop batch now open for enrollment!',
    isActive: true,
    type: 'highlight',
    createdAt: 'Yesterday',
  },
  {
    id: 'ann-2',
    message: '🚗 Note: Basement visitor parking at Sai Commercial Arcade is available for all morning & evening batches.',
    isActive: true,
    type: 'info',
    createdAt: '3 days ago',
  },
];
