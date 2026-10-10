import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Navigation, Car, Clock, Phone, ArrowRight, ShieldCheck } from 'lucide-react';
import { studioLocationDetails } from '@/data/schedule';

export const metadata: Metadata = {
  title: 'Pilates Studio in Goregaon West, Mumbai | Shilpa Kanodia',
  description:
    'Location and directions to Shilpa Kanodia’s Pilates & Face Yoga Studio at Sai Commercial Arcade, Link Road, Goregaon West. Serving Malad and Kandivali.',
};

export default function GoregaonLocationPage() {
  return (
    <div className="pt-28 pb-20">
      {/* Header */}
      <section className="py-12 sm:py-16 bg-cream border-b border-clay/20 text-center">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs uppercase tracking-widest font-semibold text-plum bg-blush/40 px-3 py-1 rounded-full">
            Studio Location & Commute
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-ink mt-3 leading-tight">
            Pilates Studio in Goregaon West, Mumbai
          </h1>
          <p className="font-sans text-base text-ink-muted mt-2 max-w-2xl mx-auto">
            Conveniently situated on Link Road with dedicated visitor parking and direct access from
            Metro Line 2A.
          </p>
        </div>
      </section>

      {/* Details & Map Grid */}
      <section className="py-16 sm:py-24 bg-cream">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Directions & Landmark Info (7 cols) */}
            <div className="lg:col-span-7 space-y-8">
              <div className="bg-cream-light p-7 rounded-sm border border-clay/40 shadow-soft space-y-4">
                <div className="flex items-center gap-2 text-plum font-serif font-bold text-lg">
                  <MapPin className="w-5 h-5 text-plum" />
                  <span>Full Address & Landmark</span>
                </div>
                <p className="font-medium text-ink text-sm sm:text-base leading-relaxed">
                  {studioLocationDetails.address}
                </p>
                <p className="text-xs sm:text-sm text-ink-muted">
                  <strong>Landmark:</strong> {studioLocationDetails.landmark}
                </p>
                <div className="pt-2">
                  <a
                    href="https://maps.google.com/?q=Shilpa+Fitness+Theory+Goregaon+Mumbai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-plum hover:bg-plum-hover text-cream text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-full shadow-plum"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>Navigate via Google Maps</span>
                  </a>
                </div>
              </div>

              {/* Commute by Area */}
              <div className="space-y-4">
                <h3 className="font-serif text-xl font-bold text-ink">
                  Estimated Travel Times
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {studioLocationDetails.travelTimes.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-stone/40 p-4 rounded-sm border border-clay/30 text-xs sm:text-sm"
                    >
                      <strong className="text-ink block">{item.from}</strong>
                      <span className="text-plum font-semibold">{item.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Parking details */}
              <div className="bg-stone-light p-5 rounded-sm border border-clay/40 text-xs sm:text-sm text-ink flex items-start gap-3">
                <Car className="w-5 h-5 text-plum flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Visitor Parking:</strong>
                  <p className="text-ink-muted mt-0.5">{studioLocationDetails.parking}</p>
                </div>
              </div>
            </div>

            {/* Right Column: Studio Hours & Booking Callout (5 cols) */}
            <div className="lg:col-span-5 bg-plum text-cream-light p-8 rounded-sm shadow-card space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-blush font-semibold">
                  Visit Us
                </span>
                <h3 className="font-serif text-2xl font-bold text-cream mt-1">
                  Ready to visit the studio?
                </h3>
                <p className="text-xs sm:text-sm text-cream-light/80 mt-2 leading-relaxed">
                  To ensure personalized attention, visits are by prior appointment or trial booking.
                </p>
              </div>

              <div className="space-y-3 pt-2 text-xs text-cream-light/90 border-t border-white/15">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blush" />
                  <span>{studioLocationDetails.hours}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blush" />
                  <span>Small batches strictly capped at 4–6 clients</span>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/book-trial"
                  className="w-full text-center block bg-cream hover:bg-cream-light text-plum font-semibold py-3.5 rounded-full text-xs sm:text-sm shadow-md"
                >
                  Book a Trial Session (₹800)
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
