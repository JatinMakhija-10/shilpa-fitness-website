'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  PhoneOff,
  Share2,
  MessageSquare,
  Users,
  ShieldCheck,
  AlertTriangle,
  Sparkles,
  Lock,
  ArrowRight,
  Hand,
  Radio,
  Smile,
  Volume2,
} from 'lucide-react';
import { Member, ClassSession } from '@/lib/membershipStore';

interface ZoomLiveRoomProps {
  member: Member;
  classSession: ClassSession;
  isHost?: boolean;
  onLeave: () => void;
  onUpgradePlan: () => void;
}

export default function ZoomLiveRoom({
  member,
  classSession,
  isHost = false,
  onLeave,
  onUpgradePlan,
}: ZoomLiveRoomProps) {
  // Device state
  const [hasMediaPermissions, setHasMediaPermissions] = useState<boolean | null>(null);
  const [mediaError, setMediaError] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);

  // Live session interactivity
  const [isRecording, setIsRecording] = useState(true);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [activeReaction, setActiveReaction] = useState<string | null>(null);
  const [showReactionsMenu, setShowReactionsMenu] = useState(false);
  const [isRoomLocked, setIsRoomLocked] = useState(false);

  // Chat state
  const [chatMessages, setChatMessages] = useState<{ sender: string; text: string; time: string; isHost?: boolean }[]>([
    { sender: 'Shilpa Kanodia (Host)', text: 'Welcome everyone! Please position your mat or mirror so your collarbone and neck are clearly visible.', time: '8:25 PM', isHost: true },
    { sender: 'Dr. Ananya Mehta', text: 'All set! Neck feels very tight today from clinic rounds.', time: '8:28 PM' },
    { sender: 'Priyanka Sharma', text: 'Ready with facial oil!', time: '8:29 PM' },
  ]);
  const [inputMsg, setInputMsg] = useState('');

  // Video Refs
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // 1. STRICT ENTITLEMENT CHECK (Host bypasses)
  const isEligible = isHost || (
    member.entitlementState === 'active' &&
    (member.planType !== 'pack25' || member.classCreditsRemaining > 0)
  );

  // 2. Request and initialize real Camera and Microphone
  useEffect(() => {
    if (!isEligible) return;

    let isMounted = true;

    async function initMedia() {
      try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          throw new Error('Camera/Microphone API not supported on this device/browser.');
        }

        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: 'user' },
          audio: true,
        });

        if (!isMounted) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }

        streamRef.current = stream;
        setHasMediaPermissions(true);

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        // Web Audio analyser for microphone level indicator
        try {
          const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
          const audioCtx = new AudioContextClass();
          audioContextRef.current = audioCtx;
          const analyser = audioCtx.createAnalyser();
          const microphone = audioCtx.createMediaStreamSource(stream);
          microphone.connect(analyser);
          analyser.fftSize = 256;
          const dataArray = new Uint8Array(analyser.frequencyBinCount);

          const checkLevel = () => {
            if (!isMounted || !streamRef.current) return;
            analyser.getByteFrequencyData(dataArray);
            let sum = 0;
            for (let i = 0; i < dataArray.length; i++) sum += dataArray[i];
            const avg = sum / dataArray.length;
            setAudioLevel(Math.min(100, Math.round((avg / 128) * 100)));
            requestAnimationFrame(checkLevel);
          };
          checkLevel();
        } catch {
          // Analyser fallback
        }
      } catch (err: unknown) {
        if (!isMounted) return;
        const msg = err instanceof Error ? err.message : 'Camera permission not granted';
        setHasMediaPermissions(false);
        setMediaError(msg);
      }
    }

    initMedia();

    return () => {
      isMounted = false;
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, [isEligible]);

  // Ensure local video element gets stream attached whenever rendered
  useEffect(() => {
    if (localVideoRef.current && streamRef.current && !isVideoOff) {
      localVideoRef.current.srcObject = streamRef.current;
    }
  }, [hasMediaPermissions, isVideoOff, isHost]);

  const toggleMute = () => {
    if (streamRef.current) {
      streamRef.current.getAudioTracks().forEach((t) => (t.enabled = isMuted));
    }
    setIsMuted(!isMuted);
  };

  const toggleVideo = () => {
    if (streamRef.current) {
      streamRef.current.getVideoTracks().forEach((t) => (t.enabled = isVideoOff));
    }
    setIsVideoOff(!isVideoOff);
  };

  const sendReaction = (emoji: string) => {
    setActiveReaction(emoji);
    setShowReactionsMenu(false);
    setTimeout(() => setActiveReaction(null), 3000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;
    setChatMessages((prev) => [
      ...prev,
      {
        sender: isHost ? 'Shilpa Kanodia (Host)' : member.name,
        text: inputMsg.trim(),
        time: 'Just now',
        isHost,
      },
    ]);
    setInputMsg('');
  };

  const handleLeave = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
    }
    onLeave();
  };

  // -------------------------------------------------------------
  // RENDER: BLOCKED GATE FOR INELIGIBLE / EXPIRED MEMBERS
  // -------------------------------------------------------------
  if (!isEligible) {
    const isPastDue = member.entitlementState === 'past_due';
    const isExpired = member.entitlementState === 'expired' || member.planType === 'none';
    const isZeroCredits = member.planType === 'pack25' && member.classCreditsRemaining <= 0;

    return (
      <div className="fixed inset-0 z-50 bg-[#120F10] text-cream flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#1F171A] border border-red-500/40 p-8 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 bg-red-500/20 text-red-400 mx-auto flex items-center justify-center">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-[11px] uppercase tracking-widest font-bold text-red-400">
              Live Session Access Paused
            </span>
            <h2 className="font-serif text-2xl font-bold text-cream">
              {isPastDue && 'Renewal Payment Past Due'}
              {isExpired && 'Membership Expired or Inactive'}
              {isZeroCredits && '0 Class Credits Remaining'}
            </h2>
            <p className="text-xs sm:text-sm text-cream-light/70 font-sans leading-relaxed">
              {isPastDue && 'Your recurring membership renewal payment failed. Please update your payment method to enter this live coached session.'}
              {isExpired && 'An active studio or Face Yoga membership is required to attend live Zoom interactive sessions.'}
              {isZeroCredits && 'You have used all 25 credits in your class pack. Please top up your package to reserve your seat.'}
            </p>
          </div>

          <div className="p-4 bg-black/40 border border-white/10 text-xs text-left space-y-1 text-cream-light/80">
            <p>• <strong>Member:</strong> {member.name}</p>
            <p>• <strong>Account Status:</strong> <span className="text-red-400 uppercase font-semibold">{member.entitlementState}</span></p>
            <p>• <strong>Plan:</strong> {member.planType.toUpperCase()}</p>
          </div>

          <div className="pt-2 flex flex-col gap-2.5">
            <button
              onClick={onUpgradePlan}
              className="w-full py-3.5 px-6 font-bold text-xs sm:text-sm bg-plum hover:bg-plum-hover text-cream shadow-md transition-transform hover:scale-[1.01]"
            >
              Update / Top-Up Plan Now
            </button>
            <button
              onClick={handleLeave}
              className="text-xs text-cream-light/60 hover:text-cream underline py-1"
            >
              Back to Member Portal
            </button>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // RENDER: ACTIVE EMBEDDED ZOOM MEETING ROOM
  // -------------------------------------------------------------
  return (
    <div className="fixed inset-0 z-50 bg-[#0C0A0B] text-cream flex flex-col overflow-hidden select-none font-sans">
      {/* Top Bar */}
      <div className="h-14 bg-[#161214] border-b border-white/10 px-4 sm:px-6 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          {/* Pulsing Recording Indicator */}
          {isRecording ? (
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-red-500/20 text-red-300 border border-red-500/30 text-[11px] font-semibold">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span>REC 7-Day Cloud</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white/10 text-cream-light/60 text-[11px]">
              <span>Recording Paused</span>
            </div>
          )}

          <div className="flex flex-col">
            <span className="text-xs sm:text-sm font-serif font-bold text-cream truncate max-w-xs sm:max-w-md">
              {classSession.title}
            </span>
            <span className="text-[10px] text-cream-light/50">
              Meeting ID: {classSession.zoomMeetingNumber} • Mode: {isHost ? 'Coach Host (Shilpa)' : 'Verified Member'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isHost && (
            <span className="hidden sm:inline text-[11px] font-bold bg-plum text-cream px-2.5 py-1 border border-white/15">
              HOST CONTROLS ACTIVE
            </span>
          )}

          <button
            onClick={() => setShowParticipants(!showParticipants)}
            className={`p-2 text-xs flex items-center gap-1.5 transition-colors ${
              showParticipants ? 'bg-plum text-cream' : 'bg-white/10 text-cream-light hover:bg-white/15'
            }`}
          >
            <Users className="w-4 h-4" />
            <span className="hidden sm:inline">Roster ({classSession.roster.length + 1})</span>
          </button>

          <button
            onClick={() => setShowChat(!showChat)}
            className={`p-2 text-xs flex items-center gap-1.5 transition-colors ${
              showChat ? 'bg-plum text-cream' : 'bg-white/10 text-cream-light hover:bg-white/15'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span className="hidden sm:inline">Chat</span>
          </button>
        </div>
      </div>

      {/* Main Video Stage Area */}
      <div className="flex-1 relative flex overflow-hidden">
        {/* Left: Video Tiles */}
        <div className="flex-1 p-3 sm:p-5 grid grid-cols-1 md:grid-cols-2 gap-4 items-center justify-center overflow-y-auto">
          {/* ========================================================================= */}
          {/* TILE 1: HOST STAGE (Coach Shilpa Kanodia)                                 */}
          {/* ========================================================================= */}
          <div className="relative aspect-[4/3] sm:aspect-[16/10] bg-[#1A1416] border border-white/15 shadow-2xl flex flex-col justify-between p-4 group overflow-hidden">
            {isHost ? (
              /* When current user IS Host: Render host's live local camera stream */
              !isVideoOff && hasMediaPermissions !== false ? (
                <video
                  ref={localVideoRef}
                  autoPlay
                  playsInline
                  muted
                  className="absolute inset-0 w-full h-full object-cover scale-x-[-1]"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#100C0E] text-cream-light/60 space-y-2 p-6 text-center">
                  <div className="w-12 h-12 bg-white/10 flex items-center justify-center text-cream">
                    <VideoOff className="w-5 h-5 text-red-400" />
                  </div>
                  <span className="text-sm font-semibold text-cream">Coach Shilpa Kanodia (Host Camera Paused)</span>
                  <p className="text-xs max-w-xs text-cream-light/50">
                    {mediaError ? `Device Notice: ${mediaError}` : 'Your host camera feed is turned off'}
                  </p>
                </div>
              )
            ) : (
              /* When current user is NOT Host (Member view): Render host stream / demo video */
              <>
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/service-faceyoga.jpg')" }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/40" />
              </>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />

            {/* Top Bar */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="text-[11px] font-bold bg-plum text-cream px-2.5 py-1 border border-white/20">
                {isHost ? 'Coach Shilpa Kanodia (Host - You)' : 'Coach Shilpa Kanodia (Host)'}
              </span>
              <span className="text-[10px] bg-emerald-500/30 text-emerald-300 px-2 py-0.5 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {isHost ? 'Host Camera Live' : 'Live 1080p Stream'}
              </span>
            </div>

            {/* Active Floating Reaction */}
            {activeReaction && (
              <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none animate-bounce text-6xl">
                {activeReaction}
              </div>
            )}

            {/* Bottom Caption */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="text-xs text-cream/90 font-medium">
                Focus: {classSession.focusArea}
              </span>
              <div className="flex items-center gap-1.5 bg-black/70 px-2 py-1 text-[10px] text-cream">
                {isMuted && isHost ? (
                  <MicOff className="w-3 h-3 text-red-400" />
                ) : (
                  <Mic className="w-3 h-3 text-emerald-400" />
                )}
                <span>{isMuted && isHost ? 'Host Muted' : 'Coach Audio Active'}</span>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* TILE 2: SECONDARY STAGE (Member Camera when Student, or Student View when Host) */}
          {/* ========================================================================= */}
          <div className="relative aspect-[4/3] sm:aspect-[16/10] bg-[#140F11] border border-white/15 shadow-2xl flex flex-col justify-between p-4 overflow-hidden">
            {isHost ? (
              /* When Host is joined, show Student / Attendee Stage (e.g. Dr. Ananya Mehta) */
              <>
                <div className="absolute inset-0 bg-[#161214] flex flex-col items-center justify-center p-6 text-center space-y-3">
                  <div className="w-16 h-16 rounded-full bg-plum/40 border border-blush/30 flex items-center justify-center text-cream font-serif font-bold text-xl">
                    AM
                  </div>
                  <div>
                    <span className="text-sm font-bold text-cream block">Dr. Ananya Mehta</span>
                    <span className="text-[11px] text-emerald-400 font-medium block mt-0.5">Enrolled Member • Monthly Pass</span>
                    <p className="text-xs text-cream-light/50 max-w-xs mt-1">
                      Student Video Feed • Positioned at mat/mirror
                    </p>
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />

                {/* Top Bar for Student Tile in Host View */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-[11px] font-bold bg-black/80 text-cream px-2.5 py-1 border border-white/15">
                    Dr. Ananya Mehta (Student)
                  </span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5">
                    Roster Present
                  </span>
                </div>

                {/* Bottom Status */}
                <div className="relative z-10 flex items-center justify-between text-[11px] text-cream-light/80">
                  <span className="bg-black/70 px-2 py-0.5 text-[10px]">
                    Student Channel
                  </span>
                  <div className="flex items-center gap-1 text-[10px] text-cream-light/60">
                    <MicOff className="w-3 h-3 text-red-400" />
                    <span>Muted by Host</span>
                  </div>
                </div>
              </>
            ) : (
              /* When Member is joined, show Member's live WebRTC Camera */
              <>
                {!isVideoOff && hasMediaPermissions !== false ? (
                  <video
                    ref={localVideoRef}
                    autoPlay
                    playsInline
                    muted
                    className="absolute inset-0 w-full h-full object-cover scale-x-[-1]"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#100C0E] text-cream-light/60 space-y-2 p-6 text-center">
                    <div className="w-12 h-12 bg-white/10 flex items-center justify-center text-cream">
                      <VideoOff className="w-5 h-5 text-red-400" />
                    </div>
                    <span className="text-sm font-semibold text-cream">{member.name} (You)</span>
                    <p className="text-xs max-w-xs text-cream-light/50">
                      {mediaError ? `Device Notice: ${mediaError}` : 'Camera feed paused'}
                    </p>
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />

                {/* Top Bar */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold bg-black/80 text-cream px-2.5 py-1 border border-white/15">
                      {member.name} (You)
                    </span>
                    {isHandRaised && (
                      <span className="bg-amber-500 text-black text-[10px] font-bold px-2 py-0.5 flex items-center gap-1">
                        <Hand className="w-3 h-3" /> Hand Raised
                      </span>
                    )}
                  </div>

                  {/* Microphone Level */}
                  <div className="flex items-center gap-1.5 bg-black/80 px-2 py-1 text-[10px]">
                    {isMuted ? (
                      <MicOff className="w-3 h-3 text-red-400" />
                    ) : (
                      <>
                        <Mic className="w-3 h-3 text-emerald-400" />
                        <div className="w-8 h-1.5 bg-white/20 overflow-hidden">
                          <div
                            className="h-full bg-emerald-400 transition-all duration-75"
                            style={{ width: `${Math.max(10, audioLevel)}%` }}
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Bottom Status */}
                <div className="relative z-10 flex items-center justify-between text-[11px] text-cream-light/80">
                  <span className="bg-black/70 px-2 py-0.5 text-[10px]">
                    Plan: {member.planType.toUpperCase()}
                  </span>
                  <span className="text-[10px] text-emerald-400">
                    WebRTC Device Sync Active
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right Drawer: Participants */}
        {showParticipants && (
          <div className="w-72 bg-[#161214] border-l border-white/10 flex flex-col p-4 space-y-4 animate-in slide-in-from-right-2">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-serif font-bold text-sm text-cream">Enrolled Attendees</h3>
              <span className="text-xs text-blush">{classSession.roster.length + 1} present</span>
            </div>

            <div className="space-y-2 flex-1 overflow-y-auto text-xs">
              <div className="p-2.5 bg-plum/40 border border-plum-light/30 flex items-center justify-between">
                <div>
                  <strong className="block text-cream">Shilpa Kanodia</strong>
                  <span className="text-[10px] text-blush">Instructor & Host</span>
                </div>
                <Mic className="w-3.5 h-3.5 text-emerald-400" />
              </div>

              {!isHost && (
                <div className="p-2.5 bg-white/5 border border-white/10 flex items-center justify-between">
                  <div>
                    <strong className="block text-cream">{member.name}</strong>
                    <span className="text-[10px] text-cream-light/60">You ({member.planType})</span>
                  </div>
                  {isMuted ? <MicOff className="w-3.5 h-3.5 text-red-400" /> : <Mic className="w-3.5 h-3.5 text-emerald-400" />}
                </div>
              )}

              {classSession.roster.map((r, i) => (
                <div key={i} className="p-2.5 bg-white/[0.03] flex items-center justify-between text-cream-light/80">
                  <div>
                    <span className="block font-medium">{r.memberName}</span>
                    <span className="text-[10px] text-cream-light/40">Verified Member</span>
                  </div>
                  <MicOff className="w-3 h-3 text-cream-light/40" />
                </div>
              ))}
            </div>

            {/* Host actions */}
            {isHost && (
              <div className="pt-2 border-t border-white/10 space-y-2">
                <button
                  onClick={() => alert('Muted all participants')}
                  className="w-full py-2 bg-white/10 hover:bg-white/20 text-cream text-xs font-semibold"
                >
                  Mute All Participants
                </button>
                <button
                  onClick={() => setIsRoomLocked(!isRoomLocked)}
                  className="w-full py-2 border border-white/20 text-cream text-xs"
                >
                  {isRoomLocked ? 'Unlock Room' : 'Lock Room (Prevent Entry)'}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Right Drawer: Chat */}
        {showChat && (
          <div className="w-80 bg-[#161214] border-l border-white/10 flex flex-col animate-in slide-in-from-right-2">
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <h3 className="font-serif font-bold text-sm text-cream">Live Class Chat</h3>
              <span className="text-[11px] text-cream-light/60">Real-time</span>
            </div>

            <div className="flex-1 p-4 space-y-3 overflow-y-auto text-xs">
              {chatMessages.map((msg, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-cream-light/50">
                    <strong className={msg.isHost ? 'text-blush' : 'text-cream'}>{msg.sender}</strong>
                    <span>{msg.time}</span>
                  </div>
                  <p className="bg-white/5 p-2 text-cream-light/90 leading-relaxed border border-white/5">
                    {msg.text}
                  </p>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="p-3 border-t border-white/10 flex gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                className="flex-1 bg-white/10 text-xs px-3 py-2 text-cream placeholder-cream/40 focus:outline-none focus:ring-1 focus:ring-blush"
              />
              <button
                type="submit"
                className="bg-plum hover:bg-plum-hover text-cream text-xs px-3.5 py-2 font-bold"
              >
                Send
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Bottom Meeting Controls Bar */}
      <div className="h-20 bg-[#140F11] border-t border-white/10 px-4 sm:px-8 flex items-center justify-between flex-shrink-0">
        {/* Left: Device status & Host Recording toggle */}
        <div className="flex items-center gap-3">
          {isHost ? (
            <button
              onClick={() => setIsRecording(!isRecording)}
              className={`px-3 py-1.5 text-xs font-bold border transition-colors flex items-center gap-1.5 ${
                isRecording
                  ? 'bg-red-500/20 text-red-300 border-red-500/40'
                  : 'bg-white/10 text-cream-light border-white/15'
              }`}
            >
              <Radio className="w-3.5 h-3.5" />
              <span>{isRecording ? 'Cloud Recording (Active)' : 'Start Cloud Recording'}</span>
            </button>
          ) : (
            <div className="hidden md:flex items-center gap-2 text-xs text-cream-light/60">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Zoom WebRTC Stream: 720p HD</span>
            </div>
          )}
        </div>

        {/* Center: In-meeting Controls */}
        <div className="flex items-center gap-3 sm:gap-4 mx-auto relative">
          {/* Mute */}
          <button
            onClick={toggleMute}
            className={`w-11 h-11 flex items-center justify-center transition-colors ${
              isMuted ? 'bg-red-500/20 text-red-400 border border-red-500/40' : 'bg-white/10 hover:bg-white/20 text-cream'
            }`}
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          {/* Video */}
          <button
            onClick={toggleVideo}
            className={`w-11 h-11 flex items-center justify-center transition-colors ${
              isVideoOff ? 'bg-red-500/20 text-red-400 border border-red-500/40' : 'bg-white/10 hover:bg-white/20 text-cream'
            }`}
            title={isVideoOff ? 'Start Video' : 'Stop Video'}
          >
            {isVideoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
          </button>

          {/* Raise Hand (Student) */}
          {!isHost && (
            <button
              onClick={() => setIsHandRaised(!isHandRaised)}
              className={`w-11 h-11 flex items-center justify-center transition-colors ${
                isHandRaised ? 'bg-amber-500 text-black font-bold' : 'bg-white/10 hover:bg-white/20 text-cream'
              }`}
              title="Raise Hand"
            >
              <Hand className="w-5 h-5" />
            </button>
          )}

          {/* Reaction Emoji Menu */}
          <div className="relative">
            <button
              onClick={() => setShowReactionsMenu(!showReactionsMenu)}
              className="w-11 h-11 bg-white/10 hover:bg-white/20 text-cream flex items-center justify-center transition-colors"
              title="Reactions"
            >
              <Smile className="w-5 h-5" />
            </button>

            {showReactionsMenu && (
              <div className="absolute bottom-14 left-1/2 -translate-x-1/2 bg-[#201A1D] border border-white/20 p-2 flex gap-2 shadow-2xl z-30">
                {['👏', '❤️', '🧘‍♀️', '🔥', '👍'].map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => sendReaction(emoji)}
                    className="text-2xl p-1 hover:scale-125 transition-transform"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Leave / End Meeting */}
          <button
            onClick={handleLeave}
            className="flex items-center gap-1.5 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md transition-colors"
          >
            <PhoneOff className="w-4 h-4" />
            <span>{isHost ? 'End Meeting' : 'Leave Class'}</span>
          </button>
        </div>

        {/* Right Passcode */}
        <div className="hidden md:block text-right">
          <span className="text-[11px] text-cream-light/50 font-mono">Passcode: {classSession.zoomPasscode}</span>
        </div>
      </div>
    </div>
  );
}
