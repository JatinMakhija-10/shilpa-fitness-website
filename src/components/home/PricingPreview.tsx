import React from 'react';
import Link from 'next/link';
import { Check, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { pricingPlans, trialClassPolicy } from '@/data/pricing';

export default function PricingPreview() {
  const displayPlans = pricingPlans.slice(0, 3); // 3 core tiers

  return (
    <section className="py-20 sm:py-28 bg-cream border-b border-clay/20">
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest font-semibold text-plum bg-blush/40 px-3 py-1 rounded-full">
            Transparent Pricing
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-ink mt-3 leading-tight">
            Clear plans. No hidden costs or surprise renewals.
          </h2>
          <p className="font-sans text-base text-ink-muted mt-3">
            Every plan includes direct coach guidance, max 4 to 6 batch size, and Reformer access.
            Start with an introductory trial class.
          </p>
        </div>

        {/* 3-Tier Grid (PeakFit Pattern: Middle Plan Highlighted) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-12">
          {displayPlans.map((plan) => {
            const isHighlight = plan.isPopular;
            return (
              <div
                key={plan.id}
                className={`relative rounded-sm p-7 sm:p-8 flex flex-col justify-between transition-all duration-200 ${
                  isHighlight
                    ? 'bg-cream-light border-2 border-plum shadow-card ring-1 ring-plum/20 lg:-translate-y-2'
                    : 'bg-stone/30 border border-clay/40 shadow-soft'
                }`}
              >
                {/* Badge if present */}
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span
                      className={`text-xs font-semibold px-4 py-1 rounded-full uppercase tracking-wider ${
                        isHighlight
                          ? 'bg-plum text-cream shadow-sm'
                          : 'bg-clay text-ink'
                      }`}
                    >
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div>
                  <div className="mb-6 pt-2">
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-ink">
                      {plan.name}
                    </h3>
                    <p className="text-xs text-ink-muted mt-1 font-sans">
                      {plan.batchSize} • {plan.sessionsPerWeek}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="mb-6 pb-6 border-b border-clay/20">
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm font-sans font-semibold text-ink">₹</span>
                      <span className="font-serif text-4xl sm:text-5xl font-bold text-ink tracking-tight">
                        {plan.priceINR.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <span className="text-xs text-ink-muted font-sans block mt-1">
                      {plan.periodText} ({plan.totalSessions})
                    </span>
                    <span className="text-[11px] text-plum font-medium block mt-0.5">
                      {plan.validity}
                    </span>
                  </div>

                  {/* Inclusions */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-ink-light">
                        <Check className="w-4 h-4 text-plum flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <Link
                    href="/book-trial"
                    className={`w-full py-3.5 px-6 rounded-full font-semibold text-xs sm:text-sm text-center block transition-all shadow-sm ${
                      isHighlight
                        ? 'bg-plum hover:bg-plum-hover text-cream shadow-plum hover:scale-[1.02] active:scale-[0.98]'
                        : 'bg-cream hover:bg-cream-light text-ink border border-clay/40 hover:border-plum'
                    }`}
                  >
                    Book a Trial First
                  </Link>
                  <p className="text-[11px] text-ink-subtle text-center mt-2">
                    {plan.trialNote}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* 1-on-1 Private & Face Yoga Summary Strip */}
        <div className="bg-stone-light/80 rounded-sm p-6 sm:p-8 border border-clay/40 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-plum bg-blush/40 px-2.5 py-0.5 rounded-full">
                1-on-1 Private & Clinical Rehab
              </span>
              <span className="text-xs text-ink-muted">Available by appointment</span>
            </div>
            <h4 className="font-serif text-lg font-bold text-ink">
              Looking for dedicated 1-on-1 private rehab or live online Face Yoga?
            </h4>
            <p className="text-xs text-ink-muted max-w-xl">
              Private 1-on-1 sessions start from ₹15,000 / month (12 sessions). Live online Face Yoga passes
              start from ₹1,999 / month with 7-day replay recordings.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <Link
              href="/pricing"
              className="text-xs sm:text-sm font-semibold text-plum hover:text-plum-hover underline underline-offset-4"
            >
              View Full Pricing Page →
            </Link>
          </div>
        </div>

        {/* Trial Policy Callout */}
        <div className="mt-8 text-center text-xs text-ink-muted max-w-xl mx-auto flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-plum flex-shrink-0" />
          <span>
            <strong>Our Trial Policy:</strong> {trialClassPolicy.creditGuarantee}
          </span>
        </div>
      </div>
    </section>
  );
}
