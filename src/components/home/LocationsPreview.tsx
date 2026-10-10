'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MapPin, Navigation, Car, Clock, Phone, ExternalLink } from 'lucide-react';
import { studioLocationDetails } from '@/data/schedule';

export default function LocationsPreview() {
  const [selectedArea, setSelectedArea] = useState<'goregaon' | 'malad' | 'kandivali'>('goregaon');

  const areaDetails = {
    goregaon: {
      title: 'Studio Location in Goregaon West',
      commuteText: 'Directly on Link Road, opposite Pahadi Goregaon Metro Station (Line 2A). 6 minutes from Goregaon Railway Station (West).',
      tip: 'Perfect for residents of Bangur Nagar, Motilal Nagar, Oshiwara, and Oberoi Woods/Garden City.',
    },
    malad: {
      title: '5 Minutes from Malad (West & Mindspace)',
      commuteText: 'Just 1.5 km south of Inorbit Mall / Hypercity junction on Link Road. A quick 5-minute auto or drive from Mindspace.',
      tip: 'Convenient morning batches (7 AM & 8:15 AM) allow you to finish class before corporate work hours.',
    },
    kandivali: {
      title: '12-14 Minutes from Kandivali West',
      commuteText: 'Smooth south-bound commute down New Link Road via Charkop and Mahavir Nagar. Ample basement parking makes driving effortless.',
      tip: 'Dedicated weekend masterclasses also available for clients who prefer Saturday/Sunday batches.',
    },
  };

  return (
    <section className="py-20 sm:py-28 bg-stone border-b border-clay/30">
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Location Details & Area Tabs (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs uppercase tracking-widest font-semibold text-plum bg-cream px-3 py-1 rounded-full">
                Studio & Accessibility
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-ink mt-3 leading-tight">
                Centrally located in Goregaon West on Link Road.
              </h2>
              <p className="font-sans text-base text-ink-muted mt-2">
                Easy commute and basement parking for clients across Goregaon, Malad, and Kandivali.
              </p>
            </div>

            {/* Area Switcher Tabs */}
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setSelectedArea('goregaon')}
                className={`text-xs sm:text-sm font-semibold px-4 py-2 rounded-full transition-all ${
                  selectedArea === 'goregaon'
                    ? 'bg-plum text-cream shadow-sm'
                    : 'bg-cream text-ink hover:bg-cream-light'
                }`}
              >
                Goregaon (Studio)
              </button>
              <button
                onClick={() => setSelectedArea('malad')}
                className={`text-xs sm:text-sm font-semibold px-4 py-2 rounded-full transition-all ${
                  selectedArea === 'malad'
                    ? 'bg-plum text-cream shadow-sm'
                    : 'bg-cream text-ink hover:bg-cream-light'
                }`}
              >
                From Malad (5 mins)
              </button>
              <button
                onClick={() => setSelectedArea('kandivali')}
                className={`text-xs sm:text-sm font-semibold px-4 py-2 rounded-full transition-all ${
                  selectedArea === 'kandivali'
                    ? 'bg-plum text-cream shadow-sm'
                    : 'bg-cream text-ink hover:bg-cream-light'
                }`}
              >
                From Kandivali (12 mins)
              </button>
            </div>

            {/* Selected Area Content Box */}
            <div className="bg-cream rounded-sm p-6 sm:p-7 border border-clay/40 shadow-soft space-y-4">
              <h3 className="font-serif text-xl font-bold text-ink">
                {areaDetails[selectedArea].title}
              </h3>
              <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                {areaDetails[selectedArea].commuteText}
              </p>
              <div className="bg-stone/50 p-3 rounded-sm border border-clay/30 text-xs text-ink-light">
                <strong className="text-plum block mb-0.5">Commute Tip:</strong>
                {areaDetails[selectedArea].tip}
              </div>
            </div>

            {/* Travel Times Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs text-ink-muted">
              {studioLocationDetails.travelTimes.map((item, idx) => (
                <div key={idx} className="bg-cream/70 p-3 rounded-sm border border-clay/30">
                  <span className="font-medium text-ink block">{item.from}</span>
                  <span className="text-[11px] text-plum font-semibold">{item.time}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://maps.google.com/?q=Shilpa+Fitness+Theory+Goregaon+Mumbai"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-plum hover:bg-plum-hover text-cream text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-full shadow-plum transition-transform hover:scale-105 active:scale-95"
              >
                <Navigation className="w-4 h-4" />
                <span>Open in Google Maps</span>
              </a>

              <Link
                href="/schedule"
                className="text-xs sm:text-sm font-semibold text-plum hover:underline underline-offset-4"
              >
                View Batch Timetable →
              </Link>
            </div>
          </div>

          {/* Right Column: Visual Studio Location Card (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-cream rounded-sm p-7 border border-clay/40 shadow-card space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-clay/20">
                <div className="flex items-center gap-2 text-plum font-serif font-bold text-base">
                  <MapPin className="w-5 h-5 text-plum" />
                  <span>Studio Details</span>
                </div>
                <span className="text-[11px] font-sans font-medium text-emerald-800 bg-emerald-100/70 px-2.5 py-0.5 rounded-full">
                  Valet / Basement Parking
                </span>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-ink-light">
                <div>
                  <strong className="text-ink block text-xs uppercase tracking-wider text-ink-subtle mb-1">
                    Full Studio Address:
                  </strong>
                  <p className="font-medium leading-relaxed text-ink">
                    {studioLocationDetails.address}
                  </p>
                </div>

                <div>
                  <strong className="text-ink block text-xs uppercase tracking-wider text-ink-subtle mb-1">
                    Key Landmark:
                  </strong>
                  <p className="leading-relaxed">
                    {studioLocationDetails.landmark}
                  </p>
                </div>

                <div>
                  <strong className="text-ink block text-xs uppercase tracking-wider text-ink-subtle mb-1">
                    Operating Batch Hours:
                  </strong>
                  <p className="leading-relaxed">
                    {studioLocationDetails.hours}
                  </p>
                </div>

                <div>
                  <strong className="text-ink block text-xs uppercase tracking-wider text-ink-subtle mb-1">
                    Parking Facility:
                  </strong>
                  <p className="leading-relaxed">
                    {studioLocationDetails.parking}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-clay/20">
                <Link
                  href="/book-trial"
                  className="w-full block text-center bg-stone hover:bg-stone-dark text-ink font-semibold py-3 rounded-full text-xs transition-colors"
                >
                  Schedule Your Studio Visit
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
