import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Award, Heart, Check, Users } from 'lucide-react';

export default function MeetShilpaPreview() {
  const highlights = [
    {
      title: 'Form Over Fatigue',
      desc: '10 mindful, perfectly aligned repetitions do more for your spine and core than 50 rushed reps with poor mechanics.',
    },
    {
      title: 'Individual Attention Always',
      desc: 'Batches never exceed 6 people. I know every client’s injuries, posture quirks, and daily fatigue levels before we start.',
    },
    {
      title: 'Compassion, Never Judgment',
      desc: 'Whether you haven’t worked out in 5 years or are healing post-surgery, this studio is a safe space with zero ego.',
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-stone border-b border-clay/30">
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Shilpa's Photo & Badge (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative aspect-[4/5] rounded-sm overflow-hidden shadow-card border border-clay/40 bg-cream">
                <Image
                  src="/images/hero-coaching.jpg"
                  alt="Coach Shilpa Kanodia in her Goregaon studio"
                  fill
                  className="object-cover object-top"
                />
              </div>

              {/* Overlapping Credential Badge */}
              <div className="absolute -bottom-5 -right-3 sm:-bottom-6 sm:right-4 bg-cream-light p-4 rounded-sm shadow-soft border border-clay/30 max-w-[260px]">
                <div className="flex items-center gap-2 text-plum font-serif font-bold text-sm">
                  <Award className="w-4 h-4 text-plum flex-shrink-0" />
                  <span>Certified Specialist</span>
                </div>
                <p className="text-[11px] text-ink-muted mt-1 leading-snug">
                  Mat & Reformer Pilates • Clinical Spinal Rehab • Certified Prenatal Coach • Face Yoga Practitioner
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Coaching Story & Core Principles (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest font-semibold text-plum bg-blush/40 px-3 py-1 rounded-full">
                Meet Your Coach
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-ink leading-tight">
                &ldquo;I started this studio so no woman ever feels invisible or intimidated when working out.&rdquo;
              </h2>
            </div>

            <div className="space-y-4 font-sans text-base text-ink-muted leading-relaxed">
              <p>
                Hi, I’m <strong>Shilpa Kanodia</strong>. After years in fitness and watching clients burn out in
                crowded commercial gyms with injuries and posture neglect, I founded Shilpa’s Fitness Theory in
                Goregaon West.
              </p>
              <p>
                My philosophy is simple: movement should heal your body, not wear down your joints. Whether
                you’re managing a herniated disc, carrying your child, or looking to tone and depuff your face,
                I personally observe your breath, spring tension, and alignment every step of the way.
              </p>
            </div>

            {/* Core Method Principles - Editorial Layout (No AI Slop Cards) */}
            <div className="border-t border-clay/30 pt-4 space-y-3.5">
              {highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-4 pb-3.5 border-b border-clay/20 last:border-b-0">
                  <span className="font-serif text-base font-bold text-plum/70 flex-shrink-0 mt-0.5">
                    0{i + 1}
                  </span>
                  <div>
                    <h4 className="font-serif font-bold text-ink text-sm sm:text-base">{h.title}</h4>
                    <p className="font-sans text-xs sm:text-sm text-ink-muted mt-0.5 leading-relaxed">{h.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 bg-plum hover:bg-plum-hover text-cream text-sm font-semibold px-6 py-3 rounded-full transition-transform hover:scale-105 active:scale-95 shadow-plum"
              >
                <span>Read Full Biography & Credentials</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/book-trial"
                className="inline-flex items-center gap-2 text-ink hover:text-plum font-semibold text-sm underline underline-offset-4"
              >
                Book a trial session with Shilpa →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
