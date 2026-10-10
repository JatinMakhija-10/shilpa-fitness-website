import React from 'react';
import { ShieldCheck, MessageCircle } from 'lucide-react';
import TrialBookingForm from '@/components/booking/TrialBookingForm';

export default function FinalCtaBand() {
  return (
    <section className="py-20 sm:py-28 bg-plum text-cream-light relative overflow-hidden" id="book-trial">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-plum-light/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Reassurance & Guarantee (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs uppercase tracking-widest font-semibold text-blush bg-white/10 px-3 py-1 rounded-full">
              Start Your First Class
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-cream leading-tight">
              Take the first step toward a pain-free, stronger body.
            </h2>

            <p className="font-sans text-sm sm:text-base text-cream-light/80 leading-relaxed">
              Whether you are healing a sensitive back, expecting a baby, or simply tired of
              chaotic gyms, our boutique studio in Goregaon West is designed for your comfort and safety.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 text-xs sm:text-sm text-cream-light/90">
                <ShieldCheck className="w-5 h-5 text-blush flex-shrink-0 mt-0.5" />
                <span>
                  <strong>100% Fee Credit:</strong> Your ₹800 trial fee is deducted directly from your first monthly package.
                </span>
              </div>
              <div className="flex items-start gap-3 text-xs sm:text-sm text-cream-light/90">
                <ShieldCheck className="w-5 h-5 text-blush flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Small Batches Only:</strong> Strictly capped at 4 to 6 people. No overcrowding.
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-white/15">
              <p className="text-xs text-cream-light/70 mb-2">Prefer instant booking without forms?</p>
              <a
                href="https://wa.me/919820000000?text=Hi%20Shilpa,%20I%20would%20like%20to%20book%20a%20trial%20class"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-blush hover:text-cream underline underline-offset-4"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Message Shilpa on WhatsApp directly →</span>
              </a>
            </div>
          </div>

          {/* Right Column: Embedded Trial Booking Form (7 cols) */}
          <div className="lg:col-span-7">
            <TrialBookingForm theme="plum" />
          </div>
        </div>
      </div>
    </section>
  );
}
