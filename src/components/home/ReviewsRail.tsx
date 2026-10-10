import React from 'react';
import Link from 'next/link';
import { Star, CheckCircle, Quote, ArrowRight } from 'lucide-react';
import { reviewsData, googleRatingSummary } from '@/data/reviews';

export default function ReviewsRail() {
  return (
    <section className="py-20 sm:py-28 bg-stone border-b border-clay/30">
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cream text-plum text-xs font-semibold mb-3">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>{googleRatingSummary.highlightQuote}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-ink leading-tight">
              Real experiences from local clients.
            </h2>
            <p className="font-sans text-base text-ink-muted mt-2 max-w-xl">
              No anonymous testimonials or generic quotes. Read about real pain recovery, postpartum
              healing, and strength journeys across Goregaon, Malad, and Kandivali.
            </p>
          </div>

          <Link
            href="/reviews"
            className="inline-flex items-center gap-2 text-sm font-semibold text-plum hover:text-plum-hover underline underline-offset-4 flex-shrink-0"
          >
            <span>Read all 86 Google reviews</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {reviewsData.slice(0, 3).map((review) => (
            <div
              key={review.id}
              className="bg-cream rounded-sm p-6 sm:p-7 border border-clay/40 shadow-soft flex flex-col justify-between"
            >
              <div>
                {/* Rating & Verified Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-800 bg-emerald-100/60 px-2 py-0.5 rounded-sm">
                    <CheckCircle className="w-3 h-3 text-emerald-600" />
                    Verified Client
                  </span>
                </div>

                {/* Specific Outcome Tag */}
                <div className="mb-4 bg-blush/30 text-plum px-3 py-1.5 rounded-sm text-xs font-medium border border-blush/50">
                  <strong>Outcome:</strong> {review.specificOutcome}
                </div>

                {/* Quote */}
                <p className="font-sans text-xs sm:text-sm text-ink-light leading-relaxed italic">
                  &ldquo;{review.quote}&rdquo;
                </p>
              </div>

              {/* Author footer */}
              <div className="mt-6 pt-4 border-t border-clay/20">
                <span className="font-serif font-bold text-ink text-sm block">
                  {review.author}
                </span>
                <span className="text-[11px] text-ink-muted block mt-0.5">
                  {review.location} • {review.service}
                </span>
                <span className="text-[10px] text-ink-subtle block mt-0.5">
                  {review.date}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Story Callout */}
        <div className="mt-12 bg-plum text-cream-light rounded-sm p-8 sm:p-10 border border-plum-light/30 shadow-card">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-3">
              <span className="text-xs uppercase tracking-widest text-blush font-semibold">
                Featured Recovery Story
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-cream font-normal">
                &ldquo;By week five, I could sit through a two-hour client presentation without my back locking up.&rdquo;
              </h3>
              <p className="text-xs sm:text-sm text-cream-light/80 leading-relaxed max-w-2xl">
                Read how structured Reformer core stability and pelvic alignment help corporate leaders
                and desk workers eliminate chronic painkillers and get back to pain-free daily living.
              </p>
            </div>
            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <Link
                href="/book-trial"
                className="bg-cream hover:bg-cream-light text-plum font-semibold text-xs sm:text-sm px-6 py-3 rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95"
              >
                Experience Your Trial Class
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
