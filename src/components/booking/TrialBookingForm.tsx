'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CheckCircle2, Video, ArrowRight, ShieldCheck, Calendar, Sparkles, MessageCircle } from 'lucide-react';

interface TrialBookingFormProps {
  defaultService?: string;
  theme?: 'light' | 'plum';
}

export default function TrialBookingForm({
  defaultService = 'Classical Reformer Pilates',
  theme = 'light',
}: TrialBookingFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    area: 'Goregaon West (Near Studio)',
    service: defaultService,
    timePreference: 'Morning (08:00 AM – 09:00 AM)',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [voucherCode, setVoucherCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/membership', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'direct_sample_booking',
          ...formData,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setVoucherCode(data.voucherCode || `SHILPA-BOK-${Math.floor(1000 + Math.random() * 9000)}`);
        setSubmitted(true);
      } else {
        setVoucherCode(`SHILPA-BOK-${Math.floor(1000 + Math.random() * 9000)}`);
        setSubmitted(true);
      }
    } catch {
      setVoucherCode(`SHILPA-BOK-${Math.floor(1000 + Math.random() * 9000)}`);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const isPlum = theme === 'plum';

  if (submitted) {
    return (
      <div
        className={`p-6 sm:p-8 border ${
          isPlum
            ? 'bg-[#2A0F15] text-cream border-white/20'
            : 'bg-cream-light text-ink border-clay/40'
        } shadow-lg space-y-6 text-left animate-in fade-in duration-200`}
      >
        {/* Top Confirmation Badge */}
        <div className="flex items-center justify-between border-b border-white/15 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-widest font-bold text-emerald-400 block">
                Booking Confirmed Instantly
              </span>
              <h3 className={`font-serif text-xl sm:text-2xl font-bold ${isPlum ? '!text-white' : '!text-ink'}`}>
                Session Reserved for {formData.fullName}
              </h3>
            </div>
          </div>
          <span className="text-xs font-mono font-bold bg-white/10 px-3 py-1 text-blush border border-white/15">
            {voucherCode}
          </span>
        </div>

        {/* Booking Summary Box */}
        <div className={`p-4 sm:p-5 border ${isPlum ? 'bg-white/5 border-white/10 text-cream-light' : 'bg-stone/30 border-clay/30 text-ink'} space-y-2 text-xs sm:text-sm`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <span className="text-cream-light/60 text-[11px] block">Selected Program:</span>
              <strong className="text-cream font-serif text-sm">{formData.service}</strong>
            </div>
            <div>
              <span className="text-cream-light/60 text-[11px] block">Batch Timing:</span>
              <strong className="text-cream">{formData.timePreference}</strong>
            </div>
            <div>
              <span className="text-cream-light/60 text-[11px] block">Contact Number:</span>
              <span className="text-cream">{formData.phone}</span>
            </div>
            <div>
              <span className="text-cream-light/60 text-[11px] block">Studio Location:</span>
              <span className="text-cream">Sai Commercial Arcade, Link Rd, Goregaon W</span>
            </div>
          </div>

          <div className="pt-2 border-t border-white/10 text-[11px] text-cream-light/75 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blush flex-shrink-0" />
            <span>
              <strong>Introductory Trial Policy:</strong> ₹800 fee credited 100% upon enrolling into any package.
            </span>
          </div>
        </div>

        {/* Immediate Test Actions - No WhatsApp / Razorpay Gate Required */}
        <div className="space-y-3 pt-1">
          <Link
            href="/my-classes"
            className="w-full py-3.5 px-6 font-bold text-xs sm:text-sm bg-cream text-plum hover:bg-cream-light shadow-md flex items-center justify-center gap-2 transition-transform hover:scale-[1.01] active:scale-[0.99] text-center"
          >
            <Video className="w-4 h-4 text-plum" />
            <span>Launch & Test Live Zoom Class Room Now</span>
            <ArrowRight className="w-4 h-4 text-plum" />
          </Link>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Link
              href="/admin"
              className="w-full sm:w-1/2 py-2.5 px-4 text-xs font-semibold text-center border border-white/20 text-cream hover:bg-white/10 transition-colors"
            >
              View in Admin Leads Pipeline →
            </Link>
            <button
              onClick={() => setSubmitted(false)}
              className="w-full sm:w-1/2 py-2.5 px-4 text-xs font-semibold text-center text-cream-light/60 hover:text-cream transition-colors"
            >
              Book Another Sample Slot
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`p-6 sm:p-8 border ${
        isPlum
          ? 'bg-[#2A0F15] text-cream border-white/20'
          : 'bg-cream-light text-ink border-clay/40'
      } shadow-lg space-y-5 text-left`}
    >
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className={`text-[11px] uppercase tracking-widest font-bold ${isPlum ? 'text-blush' : 'text-plum'}`}>
            Direct Trial Reservation
          </span>
          <span className={`text-[10px] px-2 py-0.5 font-semibold ${isPlum ? 'bg-white/10 text-cream border border-white/15' : 'bg-stone text-ink'}`}>
            Instant Confirmation
          </span>
        </div>
        <h3 className={`font-serif text-2xl sm:text-3xl font-bold tracking-tight ${isPlum ? '!text-white' : '!text-ink'}`}>
          Book Your Introductory Session
        </h3>
        <p className={`text-xs ${isPlum ? 'text-cream-light/80' : 'text-ink-muted'} font-sans`}>
          Instant booking simulation. Confirms your seat and generates your access pass immediately.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Full Name */}
        <div>
          <label className={`block text-xs font-semibold mb-1 ${isPlum ? 'text-cream' : 'text-ink'}`}>
            Your Full Name *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Priya Sharma"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className={`w-full text-xs sm:text-sm px-3.5 py-2.5 border focus:outline-none ${
              isPlum
                ? 'bg-[#1C090E] border-white/25 text-white placeholder-cream/40 focus:border-blush'
                : 'bg-white border-clay/50 text-ink placeholder-ink-subtle/50 focus:border-plum'
            }`}
          />
        </div>

        {/* Phone */}
        <div>
          <label className={`block text-xs font-semibold mb-1 ${isPlum ? 'text-cream' : 'text-ink'}`}>
            Mobile Phone Number *
          </label>
          <input
            type="tel"
            required
            placeholder="e.g. 98200 12345"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className={`w-full text-xs sm:text-sm px-3.5 py-2.5 border focus:outline-none ${
              isPlum
                ? 'bg-[#1C090E] border-white/25 text-white placeholder-cream/40 focus:border-blush'
                : 'bg-white border-clay/50 text-ink placeholder-ink-subtle/50 focus:border-plum'
            }`}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Program */}
        <div>
          <label className={`block text-xs font-semibold mb-1 ${isPlum ? 'text-cream' : 'text-ink'}`}>
            Program Focus *
          </label>
          <select
            value={formData.service}
            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
            className={`w-full text-xs sm:text-sm px-3.5 py-2.5 border focus:outline-none ${
              isPlum
                ? 'bg-[#1C090E] border-white/25 text-white focus:border-blush'
                : 'bg-white border-clay/50 text-ink focus:border-plum'
            }`}
          >
            <option value="Classical Reformer Pilates" className="bg-[#1C090E] text-white">Classical Reformer Pilates</option>
            <option value="Spine Rehab & Back Pain Care" className="bg-[#1C090E] text-white">Spine Rehab & Back Pain Care</option>
            <option value="Prenatal & Postnatal Movement" className="bg-[#1C090E] text-white">Prenatal & Postnatal Movement</option>
            <option value="Natural Face Yoga Live Class" className="bg-[#1C090E] text-white">Natural Face Yoga (Live Online)</option>
          </select>
        </div>

        {/* Catchment Area */}
        <div>
          <label className={`block text-xs font-semibold mb-1 ${isPlum ? 'text-cream' : 'text-ink'}`}>
            Your Area *
          </label>
          <select
            value={formData.area}
            onChange={(e) => setFormData({ ...formData, area: e.target.value })}
            className={`w-full text-xs sm:text-sm px-3.5 py-2.5 border focus:outline-none ${
              isPlum
                ? 'bg-[#1C090E] border-white/25 text-white focus:border-blush'
                : 'bg-white border-clay/50 text-ink focus:border-plum'
            }`}
          >
            <option value="Goregaon West (Near Studio)" className="bg-[#1C090E] text-white">Goregaon West (Near Studio)</option>
            <option value="Goregaon East (Oberoi Woods)" className="bg-[#1C090E] text-white">Goregaon East / Oberoi Woods</option>
            <option value="Malad West (Mindspace)" className="bg-[#1C090E] text-white">Malad West (Mindspace)</option>
            <option value="Kandivali West (Mahavir Nagar)" className="bg-[#1C090E] text-white">Kandivali West (Mahavir Nagar)</option>
            <option value="Online Zoom Session" className="bg-[#1C090E] text-white">Online Zoom Session</option>
          </select>
        </div>
      </div>

      {/* Batch Timing */}
      <div>
        <label className={`block text-xs font-semibold mb-1 ${isPlum ? 'text-cream' : 'text-ink'}`}>
          Preferred Batch Time Slot *
        </label>
        <select
          value={formData.timePreference}
          onChange={(e) => setFormData({ ...formData, timePreference: e.target.value })}
          className={`w-full text-xs sm:text-sm px-3.5 py-2.5 border focus:outline-none ${
            isPlum
              ? 'bg-[#1C090E] border-white/25 text-white focus:border-blush'
              : 'bg-white border-clay/50 text-ink focus:border-plum'
          }`}
        >
          <option value="Morning (08:00 AM – 09:00 AM)" className="bg-[#1C090E] text-white">Morning: 08:00 AM – 09:00 AM</option>
          <option value="Morning (09:30 AM – 10:30 AM)" className="bg-[#1C090E] text-white">Morning: 09:30 AM – 10:30 AM (Rehab Focus)</option>
          <option value="Evening (05:00 PM – 06:00 PM)" className="bg-[#1C090E] text-white">Evening: 05:00 PM – 06:00 PM (Desk Worker Posture)</option>
          <option value="Evening (08:30 PM – 09:15 PM)" className="bg-[#1C090E] text-white">Live Zoom: 08:30 PM – 09:15 PM (Face Yoga)</option>
          <option value="Weekend (Saturday / Sunday)" className="bg-[#1C090E] text-white">Weekend Masterclass: Saturday 10:00 AM</option>
        </select>
      </div>

      {/* Medical / Goal Notes */}
      <div>
        <label className={`block text-xs font-semibold mb-1 ${isPlum ? 'text-cream' : 'text-ink'}`}>
          Injuries, Pregnancy Stage, or Specific Posture Goals (Optional)
        </label>
        <textarea
          rows={2}
          placeholder="e.g. L4-L5 disc stiffness, 18 weeks pregnant, or complete beginner to Pilates"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          className={`w-full text-xs sm:text-sm px-3.5 py-2 border focus:outline-none ${
            isPlum
              ? 'bg-[#1C090E] border-white/25 text-white placeholder-cream/40 focus:border-blush'
              : 'bg-white border-clay/50 text-ink placeholder-ink-subtle/50 focus:border-plum'
          }`}
        />
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3.5 px-6 font-bold text-xs sm:text-sm shadow-md transition-transform hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 ${
            isPlum
              ? 'bg-cream text-plum hover:bg-cream-light'
              : 'bg-plum text-cream hover:bg-plum-hover'
          }`}
        >
          {loading ? (
            <span>Confirming Booking...</span>
          ) : (
            <>
              <Calendar className="w-4 h-4" />
              <span>Confirm Instant Booking (No Payment Required Now)</span>
            </>
          )}
        </button>

        <p className={`text-[11px] text-center mt-2.5 ${isPlum ? 'text-cream-light/70' : 'text-ink-subtle'}`}>
          Direct reservation confirmation • Instant voucher generated • No external redirect
        </p>
      </div>
    </form>
  );
}
