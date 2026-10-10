import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function RecognitionSection() {
  const personas = [
    {
      id: 'desk-worker',
      badge: 'Desk Workers & Corporate Professionals',
      title: 'You sit for 8+ hours a day, and your lower back aches by 4 PM.',
      description:
        'Long screen hours cause anterior pelvic tilt, tight hip flexors, and chronic cervical neck compression. You do not need exhausting high-intensity cardio that aggravates inflammation—you need spring-loaded spinal decompression and deep core activation to stand tall and pain-free.',
      bullets: [
        'Gentle decompression of L4-L5/L5-S1 lumbar spine',
        'Scapular stabilization to correct rounded shoulders',
        'Morning & evening batches scheduled around corporate hours',
      ],
      linkText: 'Explore Rehab & Spinal Care Pilates',
      linkHref: '/rehab',
      imageSrc: '/images/service-rehab.jpg',
      imageAlt: 'Client performing gentle spinal decompression on reformer',
    },
    {
      id: 'prenatal',
      badge: 'Expectant & Postnatal Mothers',
      title: 'You want to stay active, but worry about doing the wrong movement.',
      description:
        'Pregnancy softens ligaments and alters your center of gravity. Traditional workouts carry risks of abdominal separation (diastasis recti) or pelvic instability. Shilpa provides certified, doctor-coordinated prenatal care tailored strictly to your trimester, preparing your breath and hips for labor.',
      bullets: [
        'Doctor-aligned protocols from week 13 onwards',
        'Pelvic floor endurance & diaphragmatic breathing',
        'Postnatal series for closing diastasis recti safely',
      ],
      linkText: 'Explore Prenatal & Postnatal Movement',
      linkHref: '/prenatal',
      imageSrc: '/images/service-prenatal.jpg',
      imageAlt: 'Gentle prenatal Pilates movement guided by coach',
    },
    {
      id: 'beginner',
      badge: 'Gym-Intimidated Beginners',
      title: 'You want to build real strength without the chaos of a regular gym.',
      description:
        'Commercial gyms can be overwhelming—loud music, crowded equipment, and trainers who hand you a generic chart. At Shilpa’s studio, you enter a calm, boutique space where maximum 4 to 6 clients train together. Every spring tension, strap angle, and breathing cadence is set personally for you.',
      bullets: [
        'Over 70% of our clients started with zero fitness background',
        'Direct hands-on posture guidance on every repetition',
        'Private and welcoming female-first studio atmosphere',
      ],
      linkText: 'Explore Classical Reformer Pilates',
      linkHref: '/pilates',
      imageSrc: '/images/service-pilates.jpg',
      imageAlt: 'Client learning beginner Reformer Pilates alignment',
    },
    {
      id: 'face-yoga',
      badge: 'Natural Facial Sculpt & TMJ Relief',
      title: 'You grind your teeth, clench your jaw, or notice morning puffiness.',
      description:
        'Stress concentrates in the 57 muscles of the face and neck, manifesting as jaw stiffness, tension headaches, and loss of facial definition. Our Face Yoga method combines resistance toning with targeted lymphatic drainage to sculpt cheeks, tone jawlines, and relieve deep tension naturally.',
      bullets: [
        'Relieves masseter tension from stress & teeth grinding',
        'Promotes natural collagen synthesis & lymphatic flush',
        'Available in-studio & via live Zoom batches with 7-day replays',
      ],
      linkText: 'Explore Face Yoga & Live Classes',
      linkHref: '/face-yoga',
      imageSrc: '/images/service-faceyoga.jpg',
      imageAlt: 'Natural face yoga lymphatic drainage massage',
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-cream border-b border-clay/20">
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <span className="text-xs uppercase tracking-widest font-semibold text-plum bg-blush/40 px-3 py-1 rounded-full">
            Is This You?
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-ink mt-3 leading-tight">
            Designed for real bodies with real routines.
          </h2>
          <p className="font-sans text-base sm:text-lg text-ink-muted mt-3">
            We don’t do one-size-fits-all routines. Shilpa tailors every session to your unique posture,
            injuries, and goals from day one.
          </p>
        </div>

        {/* Alternating Persona Rows */}
        <div className="space-y-20 sm:space-y-28">
          {personas.map((persona, index) => {
            const isEven = index % 2 === 1;
            return (
              <div
                key={persona.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center ${
                  isEven ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Image Side (5 cols) */}
                <div
                  className={`lg:col-span-5 ${
                    isEven ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="relative aspect-[4/5] rounded-sm overflow-hidden shadow-card border border-clay/40 bg-stone">
                    <Image
                      src={persona.imageSrc}
                      alt={persona.imageAlt}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
                    <span className="absolute bottom-4 left-4 text-xs font-medium text-cream bg-ink/80 backdrop-blur-sm px-3 py-1 rounded-sm">
                      {persona.badge}
                    </span>
                  </div>
                </div>

                {/* Content Side (7 cols) */}
                <div
                  className={`lg:col-span-7 space-y-5 ${
                    isEven ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <span className="text-xs font-semibold tracking-wider uppercase text-plum">
                    {persona.badge}
                  </span>

                  <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-ink leading-snug">
                    {persona.title}
                  </h3>

                  <p className="font-sans text-base text-ink-muted leading-relaxed">
                    {persona.description}
                  </p>

                  <ul className="space-y-2.5 pt-2">
                    {persona.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5 text-sm text-ink-light">
                        <CheckCircle2 className="w-4 h-4 text-plum flex-shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-4 flex items-center gap-4">
                    <Link
                      href={persona.linkHref}
                      className="inline-flex items-center gap-2 font-semibold text-sm text-plum hover:text-plum-hover underline underline-offset-4 group"
                    >
                      <span>{persona.linkText}</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>

                    <Link
                      href="/book-trial"
                      className="inline-flex items-center text-xs font-semibold px-4 py-2 rounded-full bg-stone hover:bg-stone-dark text-ink transition-colors"
                    >
                      Book Trial
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
