import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MessageCircle, Star, ShieldCheck, MapPin } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-28 overflow-hidden bg-cream">
      {/* Subtle organic background accent */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-stone/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Conversion Copy (7 cols on desktop) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left">
            {/* Location & Studio Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-light border border-clay/30 text-ink text-xs font-medium tracking-wide">
              <MapPin className="w-3.5 h-3.5 text-plum" />
              <span>Goregaon West • Serving Malad & Kandivali</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
              <span className="text-ink-muted text-[11px]">Batches Open</span>
            </div>

            {/* Main Editorial Headline */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-ink leading-[1.12]">
              A stronger back, better posture, and a coach who learns your name in the{' '}
              <span className="italic font-normal text-plum">first</span> class.
            </h1>

            {/* Support Paragraph - Human, Grounded, Zero AI Slop */}
            <p className="font-sans text-base sm:text-lg text-ink-muted max-w-xl leading-relaxed">
              No crowded gym mirrors or confusing machines. Intimate batches of 4 to 6 on studio
              Reformers, personally guided by Shilpa. Clinical care for desk-worker back pain,
              spinal disc rehabilitation, and certified prenatal movement.
            </p>

            {/* Primary & Secondary Action Group */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/book-trial"
                className="inline-flex items-center justify-center gap-3 bg-plum hover:bg-plum-hover text-cream font-semibold px-8 py-4 rounded-full text-base transition-all duration-200 shadow-plum hover:scale-[1.02] active:scale-[0.98] text-center"
              >
                <span>Book a Trial Class</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="https://wa.me/919820000000?text=Hi%20Shilpa,%20I%20would%20like%20to%20ask%20about%20a%20Pilates%20trial%20class"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-full border border-clay/40 text-ink hover:text-emerald-800 hover:border-emerald-600/40 bg-cream-light/80 text-sm font-medium transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp Shilpa</span>
              </a>
            </div>

            {/* Trial Transparency Note */}
            <div className="flex items-center gap-3 text-xs text-ink-subtle pt-1">
              <span className="w-2 h-2 rounded-full bg-clay" />
              <span>
                Trial fee: <strong>₹800</strong> — 100% credited toward your package when you enroll.
              </span>
            </div>

            {/* Verified Trust Strip */}
            <div className="pt-6 border-t border-clay/20 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <div className="flex items-center gap-1 text-amber-600 font-bold text-base">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <span>4.9★</span>
                </div>
                <span className="text-[11px] text-ink-subtle">86+ Google Reviews</span>
              </div>

              <div>
                <span className="font-serif font-bold text-ink text-base">4 to 6</span>
                <span className="text-[11px] text-ink-subtle block">Max Clients / Batch</span>
              </div>

              <div>
                <span className="font-serif font-bold text-ink text-base">8+ Years</span>
                <span className="text-[11px] text-ink-subtle block">Dedicated Coaching</span>
              </div>

              <div>
                <div className="flex items-center gap-1 text-plum font-bold text-base">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Certified</span>
                </div>
                <span className="text-[11px] text-ink-subtle">Rehab & Prenatal</span>
              </div>
            </div>
          </div>

          {/* Right Column: Tall Coaching Photography (5 cols on desktop) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer architectural decorative frame */}
              <div className="absolute -inset-2 rounded-sm bg-gradient-to-tr from-stone via-clay/20 to-cream border border-clay/30 -rotate-1 pointer-events-none" />

              {/* Main Photo Container */}
              <div className="relative aspect-[3/4] w-full rounded-sm overflow-hidden shadow-card border border-clay/30 bg-stone">
                <Image
                  src="/images/hero-coaching.jpg"
                  alt="Shilpa Kanodia guiding hands-on Pilates reformer alignment in her Goregaon studio"
                  fill
                  priority
                  className="object-cover object-center"
                />

                {/* Floating Micro-Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-cream/95 backdrop-blur-md p-3.5 rounded-sm border border-clay/30 shadow-soft">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-serif font-bold text-ink">Personalized Attention</span>
                    <span className="text-[11px] font-sans font-medium text-plum bg-blush/40 px-2 py-0.5 rounded-full">
                      Zero Intimidation
                    </span>
                  </div>
                  <p className="text-[11px] text-ink-muted mt-1">
                    Hands-on form correction and spring calibration on every repetition.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
