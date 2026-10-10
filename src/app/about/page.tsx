import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Award, CheckCircle2, ShieldCheck, Heart, ArrowRight, Star } from 'lucide-react';
import TrialBookingForm from '@/components/booking/TrialBookingForm';

export const metadata: Metadata = {
  title: 'About Coach Shilpa Kanodia | Certified Pilates & Face Yoga Specialist',
  description:
    'Meet Shilpa Kanodia, founder of Shilpa’s Fitness Theory in Goregaon West, Mumbai. Certified Classical Pilates, spinal rehab, prenatal care, and Face Yoga practitioner.',
};

export default function AboutPage() {
  const credentials = [
    {
      title: 'Classical & Reformer Pilates Specialist',
      institution: 'Certified Pilates Academy',
      details: 'Comprehensive training across Studio Reformer, Cadillac Trapeze Table, Wunda Chair, and Spine Corrector repertoire.',
    },
    {
      title: 'Clinical Spinal & Orthopedic Rehabilitation',
      institution: 'Postural Rehabilitation & Biomechanics',
      details: 'Specialized protocols for lumbar disc herniation (L4-S1), cervical spine spondylosis, sciatica, and sacroiliac joint stability.',
    },
    {
      title: 'Certified Prenatal & Postpartum Coach',
      institution: 'Maternal Exercise Specialists',
      details: 'Evidence-based trimester movement protocols, pelvic floor conditioning, and diastasis recti rehabilitation.',
    },
    {
      title: 'Face Yoga & Lymphatic Sculpt Practitioner',
      institution: 'Natural Facial Rejuvenation Methods',
      details: 'Non-invasive facial resistance training, TMJ jaw release, and therapeutic lymphatic drainage massage.',
    },
  ];

  return (
    <div className="pt-28 pb-20">
      {/* Hero Header */}
      <section className="py-14 sm:py-20 bg-cream border-b border-clay/20">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs uppercase tracking-widest font-semibold text-plum bg-blush/40 px-3 py-1 rounded-full">
                Founder & Head Coach
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-ink leading-tight">
                Hi, I’m Shilpa Kanodia.
              </h1>
              <p className="font-sans text-lg sm:text-xl text-plum font-serif italic">
                &ldquo;Movement should heal your spine, restore your vitality, and feel completely personal.&rdquo;
              </p>
              <p className="font-sans text-base text-ink-muted leading-relaxed">
                After watching too many clients get injured or ignored in crowded commercial gyms, I founded
                Shilpa&rsquo;s Fitness Theory in Goregaon West. I wanted to build an intimate space where you are
                never just a number in the back row.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href="#book"
                  className="bg-plum hover:bg-plum-hover text-cream text-xs sm:text-sm font-semibold px-6 py-3 rounded-full shadow-plum transition-transform hover:scale-105 active:scale-95"
                >
                  Book a Trial Session (₹800)
                </a>
                <Link
                  href="/schedule"
                  className="text-xs sm:text-sm font-semibold text-ink hover:text-plum underline underline-offset-4 flex items-center gap-1"
                >
                  <span>View My Studio Batches →</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-[3/4] rounded-sm overflow-hidden shadow-card border border-clay/40 bg-stone">
                <Image
                  src="/images/hero-coaching.jpg"
                  alt="Coach Shilpa Kanodia"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story & Philosophy */}
      <section className="py-16 sm:py-24 bg-stone/30 border-b border-clay/20">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            <span className="text-xs uppercase tracking-widest font-semibold text-plum">
              My Teaching Philosophy
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-normal text-ink leading-tight">
              Why small batches and precise form matter more than intensity.
            </h2>
            <div className="space-y-4 font-sans text-base text-ink-muted leading-relaxed">
              <p>
                When you do 50 crunches with poor alignment, your neck flexors strain, your hip flexors take
                over, and your lower back arches into pain. When you do 10 slow, spring-assisted Reformer
                repetitions with your pelvis locked in neutral and transverse abdominis engaged, your entire
                postural chain transforms.
              </p>
              <p>
                That is why every batch in my studio is strictly capped at 4 to 6 people. I stand beside you,
                adjusting spring resistances, correcting shoulder elevation, and ensuring every movement is
                safe and pain-free.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Verified Credentials */}
      <section className="py-16 sm:py-24 bg-cream border-b border-clay/20">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest font-semibold text-plum bg-blush/40 px-3 py-1 rounded-full">
              Qualifications & Certifications
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-ink mt-3 leading-tight">
              Evidence-based coaching you can trust.
            </h2>
            <p className="font-sans text-base text-ink-muted mt-2">
              All certifications verified. We coordinate directly with orthopedic doctors and OB-GYNs
              for rehab and prenatal care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {credentials.map((c, i) => (
              <div
                key={i}
                className="bg-cream-light rounded-sm p-7 border border-clay/40 shadow-soft space-y-3"
              >
                <div className="flex items-center gap-2 text-plum font-bold text-sm">
                  <ShieldCheck className="w-5 h-5 text-plum flex-shrink-0" />
                  <span>{c.institution}</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-ink">
                  {c.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-ink-muted leading-relaxed">
                  {c.details}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trial Booking */}
      <section className="py-16 sm:py-24 bg-plum text-cream-light" id="book">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs uppercase tracking-widest text-blush font-semibold">
                Start Here
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-cream font-normal">
                Book a coached trial session with Shilpa
              </h2>
              <p className="text-xs sm:text-sm text-cream-light/80 leading-relaxed">
                Take your first class in our Goregaon West studio. 100% of your ₹800 trial fee is credited
                directly toward your package when you enroll.
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
