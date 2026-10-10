'use client';

import React, { useState, useEffect } from 'react';
import { Play, Pause, AlertCircle, Clock, ShieldAlert, ArrowLeft, Volume2, Maximize } from 'lucide-react';
import { ClassSession, Member, getReplayRemainingTime } from '@/lib/membershipStore';

interface ReplayPlayerProps {
  classSession: ClassSession;
  member: Member;
  onBack: () => void;
  onUpgradePlan: () => void;
}

export default function ReplayPlayer({
  classSession,
  member,
  onBack,
  onUpgradePlan,
}: ReplayPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState<{
    isExpired: boolean;
    text: string;
    days: number;
    hours: number;
    minutes: number;
  }>({ isExpired: false, text: '', days: 0, hours: 0, minutes: 0 });

  // Real-time ticking expiration countdown
  useEffect(() => {
    const updateCountdown = () => {
      const remaining = getReplayRemainingTime(classSession.recordingExpiresAt);
      setTimeLeft(remaining);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [classSession.recordingExpiresAt]);

  const isEligible = member.entitlementState === 'active';

  // 1. INELIGIBLE MEMBER GATE
  if (!isEligible) {
    return (
      <div className="bg-[#181416] border border-red-500/30 rounded-sm p-8 max-w-2xl mx-auto text-center space-y-6 my-12 text-cream">
        <div className="w-16 h-16 rounded-full bg-red-500/20 text-red-400 mx-auto flex items-center justify-center">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="font-serif text-2xl font-bold">
            Replay Access Denied
          </h2>
          <p className="text-xs sm:text-sm text-cream-light/70 max-w-md mx-auto leading-relaxed">
            Missed-class 7-day replays are reserved for active Face Yoga subscribers. Your account
            is currently marked <strong className="text-red-400 uppercase">{member.entitlementState}</strong>.
          </p>
        </div>
        <div className="flex justify-center gap-4">
          <button
            onClick={onUpgradePlan}
            className="bg-plum hover:bg-plum-hover text-cream text-xs font-bold px-6 py-3 rounded-full shadow-plum"
          >
            Renew Plan for Replay Access
          </button>
          <button
            onClick={onBack}
            className="border border-white/20 text-cream text-xs font-semibold px-5 py-3 rounded-full hover:bg-white/10"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // 2. EXPIRED 7-DAY REPLAY GATE
  if (timeLeft.isExpired || classSession.recordingStatus === 'expired') {
    return (
      <div className="bg-[#1A1618] border border-amber-500/30 rounded-sm p-8 max-w-2xl mx-auto text-center space-y-6 my-12 text-cream">
        <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-400 mx-auto flex items-center justify-center">
          <Clock className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
            7-Day Expiration Policy
          </span>
          <h2 className="font-serif text-2xl font-bold">
            This Replay Has Expired
          </h2>
          <p className="text-xs sm:text-sm text-cream-light/70 max-w-md mx-auto leading-relaxed">
            As per studio recording guidelines, missed-class video recordings remain available for
            <strong> exactly 7 days (168 hours)</strong> from release to protect client privacy and
            encourage active practice consistency.
          </p>
        </div>

        <div className="p-4 rounded-sm bg-white/5 border border-white/10 text-xs text-left max-w-sm mx-auto space-y-1">
          <p>• <strong>Session:</strong> {classSession.title}</p>
          <p>• <strong>Broadcast Date:</strong> {classSession.date}</p>
          <p>• <strong>Expiry Date:</strong> {new Date(classSession.recordingExpiresAt || '').toLocaleDateString()}</p>
          <p>• <strong>Status:</strong> <span className="text-amber-400 font-semibold">Archived & Deleted</span></p>
        </div>

        <button
          onClick={onBack}
          className="bg-plum hover:bg-plum-hover text-cream text-xs font-bold px-6 py-3 rounded-full shadow-plum"
        >
          Return to Replay Library
        </button>
      </div>
    );
  }

  // 3. ACTIVE ELIGIBLE REPLAY PLAYER
  return (
    <div className="max-w-4xl mx-auto my-8 space-y-4 text-cream">
      {/* Top Bar with Expiration Countdown */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#181315] p-4 rounded-sm border border-white/10">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs text-cream-light/70 hover:text-cream font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Classes</span>
        </button>

        {/* 7-Day Ticking Expiry Pill */}
        <div className="flex items-center gap-2 bg-amber-400/10 border border-amber-400/30 text-amber-300 px-3.5 py-1.5 rounded-full text-xs font-semibold">
          <Clock className="w-3.5 h-3.5 animate-spin" />
          <span>Expires in: {timeLeft.text}</span>
        </div>
      </div>

      {/* Main Video Frame */}
      <div className="relative aspect-video rounded-sm overflow-hidden bg-black border border-white/15 shadow-2xl group">
        <video
          src={classSession.videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'}
          controls
          autoPlay
          className="w-full h-full object-contain"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />

        {/* Anti-Piracy Dynamic Watermark */}
        <div className="absolute top-4 right-4 pointer-events-none opacity-40 text-[10px] text-cream font-mono select-none bg-black/60 px-2 py-0.5 rounded">
          {member.email} • ID: {member.id}
        </div>
      </div>

      {/* Session Details */}
      <div className="bg-[#181315] p-6 rounded-sm border border-white/10 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-cream">
            {classSession.title}
          </h2>
          <span className="text-xs bg-plum/60 text-blush px-3 py-1 rounded-full font-semibold">
            {classSession.focusArea}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-cream-light/80 leading-relaxed">
          Taught by <strong>{classSession.instructor}</strong>. This HD replay recording was automatically
          transferred from Zoom Cloud. You have full private streaming access for 7 days from broadcast.
        </p>

        <div className="pt-2 flex items-center gap-4 text-xs text-cream-light/60">
          <span>Duration: {classSession.durationMinutes} minutes</span>
          <span>•</span>
          <span>Released: {new Date(classSession.recordingReleasedAt || '').toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}
