import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Star, CheckCircle, ExternalLink, ArrowRight } from 'lucide-react';
import { reviewsData, googleRatingSummary } from '@/data/reviews';

export const metadata: Metadata = {
  title: 'Client Reviews & Google Ratings | Shilpa Kanodia Pilates Mumbai',
  description:
    'Read verified client testimonials and Google reviews for Shilpa Kanodia’s Pilates & Face Yoga Studio in Goregaon West, Malad, and Kandivali.',
};

export default function ReviewsPage() {
  return (
    <div className="pt-28 pb-20">
      {/* Header */}
      <section className="py-12 sm:py-16 bg-cream border-b border-clay/20 text-center">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone text-plum text-xs font-semibold mb-3">
            <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
            <span>4.9★ Average Rating • 86+ Verified Reviews</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-ink mt-2 leading-tight">
            Client Experiences & Recovery Stories
          </h1>
          <p className="font-sans text-base text-ink-muted mt-2 max-w-2xl mx-auto">
            Honest feedback from working professionals, mothers, and rehabilitation clients across
            Goregaon, Malad, and Kandivali.
          </p>

          <div className="pt-6">
            <a
              href="https://maps.google.com/?q=Shilpa+Fitness+Theory+Goregaon+Mumbai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-plum hover:underline underline-offset-4"
            >
              <span>View Verified Google Business Profile</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="py-16 sm:py-24 bg-cream">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reviewsData.map((review) => (
              <div
                key={review.id}
                className="bg-cream-light rounded-sm p-7 sm:p-8 border border-clay/40 shadow-soft flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-800 bg-emerald-100/70 px-2.5 py-0.5 rounded-sm">
                      <CheckCircle className="w-3 h-3 text-emerald-600" />
                      Verified Review
                    </span>
                  </div>

                  <div className="mb-4 bg-blush/30 text-plum px-3 py-1.5 rounded-sm text-xs font-medium border border-blush/50">
                    <strong>Specific Result:</strong> {review.specificOutcome}
                  </div>

                  <p className="font-sans text-xs sm:text-sm text-ink-light leading-relaxed italic">
                    &ldquo;{review.quote}&rdquo;
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-clay/20 flex items-center justify-between">
                  <div>
                    <span className="font-serif font-bold text-ink text-sm block">
                      {review.author}
                    </span>
                    <span className="text-[11px] text-ink-muted block">
                      {review.location} • {review.service}
                    </span>
                  </div>
                  <span className="text-[10px] text-ink-subtle">
                    {review.date}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/book-trial"
              className="inline-flex items-center gap-2 bg-plum hover:bg-plum-hover text-cream text-sm font-semibold px-8 py-4 rounded-full shadow-plum transition-transform hover:scale-105 active:scale-95"
            >
              <span>Experience It Yourself — Book a Trial Class</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
