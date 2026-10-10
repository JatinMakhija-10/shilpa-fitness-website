'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Clock, Users, MapPin, Calendar, CheckCircle2, ChevronRight, ArrowRight } from 'lucide-react';
import { weeklySchedule, studioLocationDetails } from '@/data/schedule';

export default function SchedulePage() {
  const [filterPeriod, setFilterPeriod] = useState<'All' | 'Morning' | 'Evening'>('All');

  const filtered = weeklySchedule.filter((item) => {
    if (filterPeriod === 'All') return true;
    return item.period === filterPeriod;
  });

  return (
    <div className="pt-28 pb-20">
      {/* Header */}
      <section className="py-12 sm:py-16 bg-cream border-b border-clay/20 text-center">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs uppercase tracking-widest font-semibold text-plum bg-blush/40 px-3 py-1 rounded-full">
            Batch Timetable
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-ink mt-4 leading-tight">
            Weekly Studio Schedule & Batch Availability
          </h1>
          <p className="font-sans text-base text-ink-muted mt-2 max-w-2xl mx-auto">
            Small batches capped at 4 to 6 clients. Morning and evening timings designed to fit before
            and after corporate office hours in Goregaon and Malad.
          </p>
        </div>
      </section>

      {/* Timetable Section */}
      <section className="py-12 sm:py-20 bg-cream">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Pills */}
          <div className="flex items-center justify-center gap-3 mb-10">
            <button
              onClick={() => setFilterPeriod('All')}
              className={`text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-full transition-all ${
                filterPeriod === 'All'
                  ? 'bg-plum text-cream shadow-plum'
                  : 'bg-stone/50 text-ink hover:bg-stone'
              }`}
            >
              All Batches ({weeklySchedule.length})
            </button>
            <button
              onClick={() => setFilterPeriod('Morning')}
              className={`text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-full transition-all ${
                filterPeriod === 'Morning'
                  ? 'bg-plum text-cream shadow-plum'
                  : 'bg-stone/50 text-ink hover:bg-stone'
              }`}
            >
              Morning Batches (7:00 AM – 11:35 AM)
            </button>
            <button
              onClick={() => setFilterPeriod('Evening')}
              className={`text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-full transition-all ${
                filterPeriod === 'Evening'
                  ? 'bg-plum text-cream shadow-plum'
                  : 'bg-stone/50 text-ink hover:bg-stone'
              }`}
            >
              Evening Batches (5:00 PM – 9:15 PM)
            </button>
          </div>

          {/* Schedule Table / Cards */}
          <div className="space-y-4">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="bg-cream-light rounded-sm p-5 sm:p-6 border border-clay/40 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-plum transition-colors"
              >
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-stone text-ink">
                      {item.days}
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blush/40 text-plum">
                      {item.level}
                    </span>
                    <span className="text-[11px] text-ink-muted">
                      Coach: {item.instructor}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg sm:text-xl font-bold text-ink">
                    {item.classType}
                  </h3>

                  <div className="flex items-center gap-4 text-xs text-ink-muted">
                    <span className="flex items-center gap-1.5 font-medium text-ink">
                      <Clock className="w-3.5 h-3.5 text-plum" />
                      {item.timeSlot}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-plum" />
                      Max {item.batchLimit} clients
                    </span>
                  </div>
                </div>

                {/* Right side: Slot status and action */}
                <div className="flex items-center justify-between md:justify-end gap-4 border-t md:border-t-0 pt-3 md:pt-0 border-clay/20">
                  <div className="text-left md:text-right">
                    <span
                      className={`text-xs font-semibold block ${
                        item.availableSlots <= 2 ? 'text-amber-700' : 'text-emerald-700'
                      }`}
                    >
                      {item.availableSlots} {item.availableSlots === 1 ? 'seat left' : 'seats left'}
                    </span>
                    <span className="text-[11px] text-ink-subtle">Capped small group</span>
                  </div>

                  <Link
                    href={`/book-trial?slot=${encodeURIComponent(item.timeSlot)}`}
                    className="bg-plum hover:bg-plum-hover text-cream text-xs font-semibold px-5 py-2.5 rounded-full shadow-plum transition-transform hover:scale-105 active:scale-95"
                  >
                    Request Trial
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Location note footer */}
          <div className="mt-12 bg-stone/40 p-6 sm:p-8 rounded-sm border border-clay/40 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-plum flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-serif font-bold text-ink text-sm sm:text-base">
                  Studio Location
                </h4>
                <p className="text-xs sm:text-sm text-ink-muted mt-0.5">
                  {studioLocationDetails.address} (Near Inorbit Mall junction / Opp. Pahadi Goregaon Metro)
                </p>
              </div>
            </div>

            <Link
              href="/locations/goregaon"
              className="text-xs sm:text-sm font-semibold text-plum hover:underline underline-offset-4 flex-shrink-0"
            >
              Directions & Parking Info →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
