import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, ShieldCheck, HelpCircle, ArrowRight } from 'lucide-react';
import { pricingPlans, faceYogaOnlinePlans, trialClassPolicy } from '@/data/pricing';
import TrialBookingForm from '@/components/booking/TrialBookingForm';

export const metadata: Metadata = {
  title: 'Plans & Transparent Pricing | Shilpa Kanodia Pilates Goregaon',
  description:
    'Clear, upfront Pilates studio pricing. Small groups of 4-6, semi-private, and 1-on-1 private rehab plans. ₹800 trial fee credited toward your package.',
};

export default function PricingPage() {
  return (
    <div className="pt-28 pb-20">
      {/* Header */}
      <section className="py-12 sm:py-16 bg-cream border-b border-clay/20 text-center">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs uppercase tracking-widest font-semibold text-plum bg-blush/40 px-3 py-1 rounded-full">
            Transparent Investment
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-ink mt-4 leading-tight">
            Transparent plans. Zero surprise fees.
          </h1>
          <p className="font-sans text-base sm:text-lg text-ink-muted mt-3 max-w-2xl mx-auto">
            Choose the coaching structure that suits your goals. Every studio package includes full
            Reformer access, small batch caps (4–6 max), and direct form corrections.
          </p>

          {/* Trial Guarantee Highlight */}
          <div className="mt-8 max-w-xl mx-auto bg-stone-light p-4 rounded-sm border border-clay/40 flex items-center justify-center gap-3 text-xs sm:text-sm text-ink font-medium">
            <ShieldCheck className="w-5 h-5 text-plum flex-shrink-0" />
            <span>
              <strong>Introductory Trial Fee: ₹800</strong> — 100% credited toward your package when you enroll.
            </span>
          </div>
        </div>
      </section>

      {/* Main Studio Packages Grid */}
      <section className="py-16 sm:py-24 bg-cream border-b border-clay/20">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-2xl sm:text-3xl text-ink font-bold">
              Studio Reformer & Group Packages
            </h2>
            <p className="text-xs sm:text-sm text-ink-muted mt-1">
              Held in-studio at Sai Commercial Arcade, Link Road, Goregaon West.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {pricingPlans.map((plan) => {
              const isHighlight = plan.isPopular;
              return (
                <div
                  key={plan.id}
                  className={`relative rounded-sm p-6 sm:p-7 flex flex-col justify-between transition-all ${
                    isHighlight
                      ? 'bg-cream-light border-2 border-plum shadow-card ring-1 ring-plum/20'
                      : 'bg-stone/30 border border-clay/40 shadow-soft'
                  }`}
                >
                  {plan.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span
                        className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                          isHighlight ? 'bg-plum text-cream' : 'bg-clay text-ink'
                        }`}
                      >
                        {plan.badge}
                      </span>
                    </div>
                  )}

                  <div>
                    <div className="mb-4 pt-1">
                      <h3 className="font-serif text-lg font-bold text-ink">
                        {plan.name}
                      </h3>
                      <p className="text-xs text-ink-muted mt-0.5 font-sans">
                        {plan.batchSize}
                      </p>
                    </div>

                    <div className="mb-5 pb-5 border-b border-clay/20">
                      <div className="flex items-baseline gap-1">
                        <span className="text-sm font-semibold text-ink">₹</span>
                        <span className="font-serif text-3xl sm:text-4xl font-bold text-ink tracking-tight">
                          {plan.priceINR.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <span className="text-xs text-ink-muted block mt-0.5">
                        {plan.periodText}
                      </span>
                      <span className="text-[11px] text-plum font-semibold block mt-1">
                        {plan.validity}
                      </span>
                    </div>

                    <ul className="space-y-2.5 mb-6 text-xs text-ink-light">
                      {plan.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-plum flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <Link
                      href="/book-trial"
                      className={`w-full py-3 px-4 rounded-full font-semibold text-xs text-center block transition-all ${
                        isHighlight
                          ? 'bg-plum hover:bg-plum-hover text-cream shadow-plum'
                          : 'bg-cream hover:bg-cream-light text-ink border border-clay/40'
                      }`}
                    >
                      Book a Trial First (₹800)
                    </Link>
                    <p className="text-[10px] text-ink-subtle text-center mt-2">
                      {plan.trialNote}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Online Face Yoga Plans */}
      <section className="py-16 sm:py-24 bg-stone/40 border-b border-clay/20">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest font-semibold text-plum bg-blush/40 px-3 py-1 rounded-full">
              Live & On-Demand Replay
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-ink font-bold mt-2">
              Face Yoga Online Memberships
            </h2>
            <p className="text-xs sm:text-sm text-ink-muted mt-1">
              Attend live interactive Zoom sessions from anywhere, with 7-day replay recordings
              inside your member portal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {faceYogaOnlinePlans.map((fyPlan) => (
              <div
                key={fyPlan.id}
                className="bg-cream rounded-sm p-7 border border-clay/40 shadow-soft flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-serif text-xl font-bold text-ink">
                    {fyPlan.name}
                  </h3>
                  <div className="mt-4 mb-4 pb-4 border-b border-clay/20">
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm font-semibold text-ink">₹</span>
                      <span className="font-serif text-3xl font-bold text-ink">
                        {fyPlan.priceINR.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <span className="text-xs text-ink-muted block mt-0.5">
                      {fyPlan.periodText}
                    </span>
                    <span className="text-xs text-plum font-medium block mt-1">
                      {fyPlan.frequency}
                    </span>
                  </div>

                  <ul className="space-y-2.5 mb-6 text-xs text-ink-light">
                    {fyPlan.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-plum flex-shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href="/book-trial"
                  className="w-full text-center bg-plum hover:bg-plum-hover text-cream text-xs font-semibold py-3 rounded-full shadow-plum"
                >
                  Join Face Yoga Batch
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trial Booking Section */}
      <section className="py-16 sm:py-24 bg-plum text-cream-light">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs uppercase tracking-widest text-blush font-semibold">
                Get Started
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-cream font-normal">
                Book your introductory trial class
              </h2>
              <p className="text-xs sm:text-sm text-cream-light/80 leading-relaxed">
                Test the Reformers, meet Shilpa, and discuss your posture and goals. 100% of your ₹800
                fee is credited toward your first package.
              </p>
            </div>
            <div className="lg:col-span-7">
              <TrialBookingForm theme="plum" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
