import React from 'react';
import type { Metadata } from 'next';
import { ShieldCheck, Clock, MapPin, MessageCircle } from 'lucide-react';
import TrialBookingForm from '@/components/booking/TrialBookingForm';
import { studioLocationDetails } from '@/data/schedule';

export const metadata: Metadata = {
  title: 'Book a Trial Class | Shilpa Kanodia Pilates Studio Goregaon',
  description:
    'Schedule your introductory Pilates or Face Yoga trial session with Shilpa Kanodia in Goregaon West. 100% of trial fee credited toward your package.',
};

export default function BookTrialPage() {
  return (
    <div className="pt-28 pb-20 bg-cream">
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: What to expect & guarantees (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs uppercase tracking-widest font-semibold text-plum bg-blush/40 px-3 py-1 rounded-full">
                Introductory Session
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-ink mt-3 leading-tight">
                Experience your first class with Shilpa.
              </h1>
              <p className="font-sans text-sm sm:text-base text-ink-muted mt-3 leading-relaxed">
                Experience our studio Reformers, gentle posture assessment, and zero-intimidation
                coaching. No long-term commitments required upfront.
              </p>
            </div>

            {/* Trial Guarantees */}
            <div className="bg-cream-light p-6 rounded-sm border border-clay/40 shadow-soft space-y-4">
              <h3 className="font-serif font-bold text-ink text-base">
                Your Trial Includes:
              </h3>
              <div className="space-y-3 text-xs sm:text-sm text-ink-muted">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 text-plum flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>15-Minute Movement Assessment:</strong> Review of spinal curvature, core activation, and medical/injury history.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 text-plum flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>45-Minute Coached Session:</strong> Spring resistance and classical mat movements tailored to your level.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 text-plum flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>100% Fee Credit:</strong> The ₹800 trial fee is deducted directly from your first monthly or quarterly package.
                  </span>
                </div>
              </div>
            </div>

            {/* Studio Info */}
            <div className="space-y-2 text-xs text-ink-muted pt-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-plum flex-shrink-0 mt-0.5" />
                <span>{studioLocationDetails.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-plum flex-shrink-0" />
                <span>Mon–Sat: 7:00 AM – 8:30 PM (Batches open)</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="https://wa.me/919820000000?text=Hi%20Shilpa,%20I%20would%20like%20to%20book%20a%20trial%20class"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-emerald-800 hover:underline"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Or message directly on WhatsApp for instant slots →</span>
              </a>
            </div>
          </div>

          {/* Right Column: Form (7 cols) */}
          <div className="lg:col-span-7 bg-cream-light p-2 rounded-sm border border-clay/40 shadow-card">
            <TrialBookingForm theme="light" />
          </div>
        </div>
      </div>
    </div>
  );
}
