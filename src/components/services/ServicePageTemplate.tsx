import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Users, ArrowRight, CheckCircle2, ChevronRight, HelpCircle } from 'lucide-react';
import { ServiceDetail } from '@/types';
import TrialBookingForm from '@/components/booking/TrialBookingForm';

interface ServicePageTemplateProps {
  service: ServiceDetail;
  heroImage: string;
}

export default function ServicePageTemplate({ service, heroImage }: ServicePageTemplateProps) {
  const isFaceYoga = service.id === 'face-yoga';

  return (
    <div className="pt-24 pb-20">
      {/* Breadcrumb */}
      <div className="bg-stone/30 py-3 border-b border-clay/20">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-xs text-ink-muted">
          <Link href="/" className="hover:text-plum transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-clay" />
          <span>Programs</span>
          <ChevronRight className="w-3.5 h-3.5 text-clay" />
          <span className="font-semibold text-ink">{service.name}</span>
        </div>
      </div>

      {/* Hero Header */}
      <section className="py-14 sm:py-20 bg-cream border-b border-clay/20">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs uppercase tracking-widest font-semibold text-plum bg-blush/40 px-3 py-1 rounded-full">
                Specialized Program
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl font-normal text-ink leading-tight">
                {service.name}
              </h1>
              <p className="font-sans text-base sm:text-lg text-ink-muted leading-relaxed">
                {service.tagline}
              </p>

              <div className="flex flex-wrap items-center gap-6 pt-2 text-xs sm:text-sm text-ink-light">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-plum" />
                  <span><strong>Duration:</strong> {service.sessionDuration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-plum" />
                  <span><strong>Batch:</strong> {service.batchSize}</span>
                </div>
              </div>

              <div className="pt-4 flex items-center gap-4">
                <a
                  href="#book"
                  className="bg-plum hover:bg-plum-hover text-cream font-semibold text-xs sm:text-sm px-6 py-3 rounded-full shadow-plum transition-transform hover:scale-105 active:scale-95"
                >
                  Book a Trial Session (₹800)
                </a>
                <Link
                  href="/schedule"
                  className="text-xs sm:text-sm font-semibold text-plum hover:underline underline-offset-4"
                >
                  View Weekly Schedule →
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] sm:aspect-[4/5] rounded-sm overflow-hidden shadow-card border border-clay/40 bg-stone">
                <Image
                  src={heroImage}
                  alt={service.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview & Who It Is For */}
      <section className="py-16 sm:py-24 bg-stone/30 border-b border-clay/20">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs uppercase tracking-widest font-semibold text-plum">
                Clinical Overview
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-ink">
                How this program works
              </h2>
              <p className="font-sans text-sm sm:text-base text-ink-muted leading-relaxed">
                {service.fullDescription}
              </p>

              <div className="pt-4 space-y-2">
                <h4 className="font-serif font-bold text-ink text-sm sm:text-base">
                  Equipment Used in Studio:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {service.equipmentUsed.map((eq, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-cream px-3 py-1.5 rounded-sm border border-clay/30 text-ink"
                    >
                      {eq}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs uppercase tracking-widest font-semibold text-plum">
                Targeted Profiles
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-ink">
                Who this program is designed for
              </h2>
              <div className="space-y-3 pt-2">
                {service.whoItIsFor.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 bg-cream p-4 rounded-sm border border-clay/30 text-xs sm:text-sm text-ink-light"
                  >
                    <CheckCircle2 className="w-4 h-4 text-plum flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Happens in Class & Preparation */}
      <section className="py-16 sm:py-24 bg-cream border-b border-clay/20">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Session Breakdown */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs uppercase tracking-widest font-semibold text-plum bg-blush/40 px-3 py-1 rounded-full">
                Session Structure
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-ink">
                What happens during your {service.sessionDuration} session
              </h2>

              <div className="space-y-4 pt-2">
                {service.whatHappensInClass.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-4 sm:p-5 rounded-sm bg-stone/40 border border-clay/30 text-xs sm:text-sm text-ink"
                  >
                    <p className="leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* What to Wear & Bring */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs uppercase tracking-widest font-semibold text-plum bg-stone px-3 py-1 rounded-full">
                Preparation Guide
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-ink">
                What to wear & bring
              </h2>

              <div className="bg-cream-light p-6 rounded-sm border border-clay/40 shadow-soft space-y-4">
                {service.whatToWearAndBring.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-ink-muted">
                    <CheckCircle2 className="w-4 h-4 text-plum flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service-Specific FAQs */}
      <section className="py-16 sm:py-24 bg-stone/30 border-b border-clay/20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center">
            <span className="text-xs uppercase tracking-widest font-semibold text-plum">
              Program FAQs
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-ink mt-2">
              Frequently asked questions about {service.name}
            </h2>
          </div>

          <div className="space-y-4">
            {service.faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-cream rounded-sm p-6 border border-clay/40 space-y-2 shadow-soft"
              >
                <h4 className="font-serif font-bold text-ink text-base">
                  {faq.question}
                </h4>
                <p className="font-sans text-xs sm:text-sm text-ink-muted leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Band */}
      <section className="py-16 sm:py-24 bg-plum text-cream-light" id="book">
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs uppercase tracking-widest text-blush font-semibold">
                Start Your Journey
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-cream font-normal">
                Book a trial for {service.name}
              </h2>
              <p className="text-xs sm:text-sm text-cream-light/80 leading-relaxed">
                Experience personalized coaching at our Goregaon studio. 100% of your ₹800 trial fee is
                credited toward your package when you enroll.
              </p>
            </div>
            <div className="lg:col-span-7">
              <TrialBookingForm defaultService={service.id} theme="plum" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
