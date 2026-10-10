'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Video,
  Mic,
  Volume2,
  ShieldCheck,
  Play,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  User,
  Radio,
  Lock,
} from 'lucide-react';
import { Member, ClassSession } from '@/lib/membershipStore';
import ZoomLiveRoom from '@/components/live/ZoomLiveRoom';

export default function ZoomTestPage() {
  const [member, setMember] = useState<Member | null>(null);
  const [allMembers, setAllMembers] = useState<Member[]>([]);
  const [classes, setClasses] = useState<ClassSession[]>([]);
  const [loading, setLoading] = useState(true);

  // Testing mode
  const [isHostMode, setIsHostMode] = useState(false);
  const [inMeeting, setInMeeting] = useState(false);

  // Pre-flight device test state
  const [cameraStatus, setCameraStatus] = useState<'testing' | 'ready' | 'error'>('testing');
  const [micStatus, setMicStatus] = useState<'testing' | 'ready' | 'error'>('testing');
  const [speakerTested, setSpeakerTested] = useState(false);
  const [micLevel, setMicLevel] = useState(0);

  const testVideoRef = useRef<HTMLVideoElement | null>(null);
  const testStreamRef = useRef<MediaStream | null>(null);

  // Load data
  const loadData = async () => {
    try {
      const res = await fetch('/api/membership');
      const data = await res.json();
      setMember(data.currentMember);
      setAllMembers(data.allMembers || []);
      setClasses(data.classes || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Pre-flight camera and mic check
  useEffect(() => {
    let active = true;

    async function checkDevices() {
      try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          setCameraStatus('error');
          setMicStatus('error');
          return;
        }

        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        if (!active) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }

        testStreamRef.current = stream;
        setCameraStatus('ready');
        setMicStatus('ready');

        if (testVideoRef.current) {
          testVideoRef.current.srcObject = stream;
        }

        // Microphone audio analyser
        try {
          const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
          const ctx = new AudioContextClass();
          const analyser = ctx.createAnalyser();
          const mic = ctx.createMediaStreamSource(stream);
          mic.connect(analyser);
          analyser.fftSize = 128;
          const data = new Uint8Array(analyser.frequencyBinCount);

          const updateMeter = () => {
            if (!active) return;
            analyser.getByteFrequencyData(data);
            let sum = 0;
            for (let i = 0; i < data.length; i++) sum += data[i];
            const avg = sum / data.length;
            setMicLevel(Math.min(100, Math.round((avg / 128) * 100)));
            requestAnimationFrame(updateMeter);
          };
          updateMeter();
        } catch {
          // Meter optional
        }
      } catch {
        if (active) {
          setCameraStatus('error');
          setMicStatus('error');
        }
      }
    }

    checkDevices();

    return () => {
      active = false;
      if (testStreamRef.current) {
        testStreamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  const playSpeakerTestChime = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioContextClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3); // A5
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.8);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.8);
      setSpeakerTested(true);
    } catch {
      setSpeakerTested(true);
    }
  };

  const handleSwitchMember = async (id: string) => {
    await fetch('/api/membership', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'switch_member', memberId: id }),
    });
    await loadData();
  };

  if (loading || !member) {
    return (
      <div className="pt-32 pb-20 min-h-screen bg-[#110E10] text-cream flex items-center justify-center">
        <RefreshCw className="w-5 h-5 animate-spin text-blush" />
      </div>
    );
  }

  const liveClass = classes.find((c) => c.status === 'live') || classes[0];

  // If currently inside the meeting room
  if (inMeeting && liveClass) {
    return (
      <ZoomLiveRoom
        member={member}
        classSession={liveClass}
        isHost={isHostMode}
        onLeave={() => {
          setInMeeting(false);
          // Restart device check stream
          window.location.reload();
        }}
        onUpgradePlan={() => {
          setInMeeting(false);
        }}
      />
    );
  }

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#110E10] text-cream">
      {/* Top Banner */}
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 py-6 border-b border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest text-blush font-semibold">
                Zoom Web SDK Pre-Flight Lab
              </span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 font-bold border border-emerald-500/30">
                Ready for Live QA Testing
              </span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-cream mt-1">
              Live Zoom Session & Hardware Verification
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="text-xs text-cream-light/70 hover:text-cream px-3 py-1.5 border border-white/20"
            >
              Admin Dashboard →
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Step 1: Persona Switcher & Role Selector */}
        <div className="bg-[#181315] border border-white/15 p-6 sm:p-7 space-y-5">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-cream">
              1. Choose Meeting Role & Member Entitlement
            </h2>
            <span className="text-xs text-cream-light/60">Test both Student and Host behavior</span>
          </div>

          {/* Role selector */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              onClick={() => setIsHostMode(false)}
              className={`p-4 border cursor-pointer transition-all ${
                !isHostMode
                  ? 'border-blush bg-plum/40 ring-1 ring-blush'
                  : 'border-white/10 bg-white/5 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center justify-between">
                <strong className="font-serif text-sm text-cream">Join as Student / Member</strong>
                <span className="text-xs text-blush">Subject to Entitlement Check</span>
              </div>
              <p className="text-xs text-cream-light/60 mt-1">
                Tests camera/mic joining, chat, raising hand, and automatic blocking if expired or past due.
              </p>
            </div>

            <div
              onClick={() => setIsHostMode(true)}
              className={`p-4 border cursor-pointer transition-all ${
                isHostMode
                  ? 'border-blush bg-plum/40 ring-1 ring-blush'
                  : 'border-white/10 bg-white/5 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center justify-between">
                <strong className="font-serif text-sm text-cream">Join as Coach Host (Shilpa)</strong>
                <span className="text-xs text-emerald-400 font-bold">Host Privileges</span>
              </div>
              <p className="text-xs text-cream-light/60 mt-1">
                Full host permissions: start/stop cloud recording, mute all, broadcast video, and lock room.
              </p>
            </div>
          </div>

          {/* Member Persona switch if student */}
          {!isHostMode && (
            <div className="pt-2">
              <span className="text-xs text-cream-light/70 block mb-2 font-semibold">
                Select Member Account to Test Gating:
              </span>
              <div className="flex flex-wrap gap-2">
                {allMembers.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => handleSwitchMember(m.id)}
                    className={`px-3 py-1.5 text-xs font-semibold border transition-all ${
                      member.id === m.id
                        ? 'bg-cream text-plum border-white font-bold'
                        : 'bg-white/5 border-white/10 text-cream-light hover:bg-white/10'
                    }`}
                  >
                    {m.name} ({m.planType.toUpperCase()} • <span className={m.entitlementState === 'active' ? 'text-emerald-400' : 'text-red-400'}>{m.entitlementState}</span>)
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Step 2: Pre-Flight Camera & Audio Diagnostics */}
        <div className="bg-[#181315] border border-white/15 p-6 sm:p-7 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h2 className="font-serif text-lg sm:text-xl font-bold text-cream">
              2. Pre-Flight Device & Hardware Diagnostics
            </h2>
            <span className="text-xs text-cream-light/60">Desktop & Mobile WebRTC</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Live Camera Video Feed */}
            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] bg-black border border-white/20 shadow-xl overflow-hidden flex items-center justify-center">
                <video
                  ref={testVideoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover scale-x-[-1]"
                />
                <div className="absolute top-3 left-3 bg-black/80 px-2.5 py-1 text-[11px] font-semibold text-cream border border-white/15">
                  Live Video Preview
                </div>
                {cameraStatus === 'error' && (
                  <div className="absolute inset-0 bg-[#161012] flex flex-col items-center justify-center p-4 text-center space-y-2">
                    <AlertTriangle className="w-8 h-8 text-amber-400" />
                    <span className="text-xs text-cream-light/80">Camera Permission Pending or In Use</span>
                  </div>
                )}
              </div>
            </div>

            {/* Diagnostics checklist */}
            <div className="lg:col-span-6 space-y-5">
              <div className="space-y-3">
                {/* Camera Test */}
                <div className="p-3.5 bg-white/5 border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Video className="w-4 h-4 text-plum" />
                    <span className="text-xs font-semibold text-cream">Camera Video Stream</span>
                  </div>
                  <span className={`text-xs font-bold ${cameraStatus === 'ready' ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {cameraStatus === 'ready' ? '✓ Connected' : 'Notice Pending'}
                  </span>
                </div>

                {/* Microphone Test */}
                <div className="p-3.5 bg-white/5 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Mic className="w-4 h-4 text-plum" />
                      <span className="text-xs font-semibold text-cream">Microphone Level</span>
                    </div>
                    <span className={`text-xs font-bold ${micStatus === 'ready' ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {micStatus === 'ready' ? '✓ Audio Active' : 'Checking'}
                    </span>
                  </div>
                  {/* VU Meter */}
                  <div className="w-full h-2 bg-black/60 overflow-hidden">
                    <div
                      className="h-full bg-emerald-400 transition-all duration-75"
                      style={{ width: `${Math.max(5, micLevel)}%` }}
                    />
                  </div>
                </div>

                {/* Speaker Test */}
                <div className="p-3.5 bg-white/5 border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Volume2 className="w-4 h-4 text-plum" />
                    <span className="text-xs font-semibold text-cream">Audio Output / Speaker</span>
                  </div>
                  <button
                    onClick={playSpeakerTestChime}
                    className="px-3 py-1 bg-white/10 hover:bg-white/20 text-cream text-xs font-semibold border border-white/15"
                  >
                    {speakerTested ? '✓ Chime Played' : 'Play Test Chime'}
                  </button>
                </div>
              </div>

              {/* Launch Meeting Button */}
              <div className="pt-2">
                <button
                  onClick={() => setInMeeting(true)}
                  className="w-full py-4 px-6 font-bold text-xs sm:text-sm bg-plum hover:bg-plum-hover text-cream shadow-xl flex items-center justify-center gap-2 transition-transform hover:scale-[1.01]"
                >
                  <Play className="w-4 h-4" />
                  <span>
                    Launch Live Session ({isHostMode ? 'As Host Shilpa' : `As Member: ${member.name}`})
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-[11px] text-cream-light/50 text-center mt-2">
                  Target: {liveClass?.title} • Zoom ID: {liveClass?.zoomMeetingNumber}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
