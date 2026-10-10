import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock, Users, Shield, Sparkles } from 'lucide-react';
import { servicesData } from '@/data/services';

export default function ServicesPreview() {
  const serviceList = [
    {
      data: servicesData['pilates'],
      image: '/images/service-pilates.jpg',
      bgClass: 'bg-cream',
    },
    {
      data: servicesData['rehab'],
      image: '/images/service-rehab.jpg',
      bgClass: 'bg-stone/40',
    },
    {
      data: servicesData['prenatal'],
      image: '/images/service-prenatal.jpg',
      bgClass: 'bg-cream',
    },
    {
      data: servicesData['face-yoga'],
      image: '/images/service-faceyoga.jpg',
      bgClass: 'bg-blush/30', // Face Yoga uses blush background as specified!
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-cream border-b border-clay/20">
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <span className="text-xs uppercase tracking-widest font-semibold text-plum bg-blush/40 px-3 py-1 rounded-full">
            Our Programs
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-ink mt-3 leading-tight">
            Specialized movement taught with clinical precision.
          </h2>
          <p className="font-sans text-base text-ink-muted mt-3">
            Every program has its own methodology, equipment calibration, and safety protocols.
            Click any service to see the full movement curriculum.
          </p>
        </div>

        {/* 4 Full-Width Editorial Service Rows */}
        <div className="space-y-12">
          {serviceList.map(({ data, image, bgClass }, index) => {
            const isReversed = index % 2 === 1;
            return (
              <div
                key={data.id}
                className={`${bgClass} rounded-sm p-6 sm:p-10 lg:p-12 border border-clay/40 transition-all hover:border-clay/70`}
              >
                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                    isReversed ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Photo Column (5 cols) */}
                  <div
                    className={`lg:col-span-5 ${
                      isReversed ? 'lg:order-2' : 'lg:order-1'
                    }`}
                  >
                    <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-sm overflow-hidden shadow-soft border border-clay/30">
                      <Image
                        src={image}
                        alt={`${data.name} session at Shilpa's Fitness Theory Goregaon`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {/* Content Column (7 cols) */}
                  <div
                    className={`lg:col-span-7 space-y-4 ${
                      isReversed ? 'lg:order-1' : 'lg:order-2'
                    }`}
                  >
                    {/* Meta specs */}
                    <div className="flex flex-wrap items-center gap-4 text-xs text-ink-muted">
                      <span className="flex items-center gap-1.5 font-medium">
                        <Clock className="w-3.5 h-3.5 text-plum" />
                        {data.sessionDuration}
                      </span>
                      <span className="text-clay">•</span>
                      <span className="flex items-center gap-1.5 font-medium">
                        <Users className="w-3.5 h-3.5 text-plum" />
                        {data.batchSize}
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl sm:text-3xl font-normal text-ink">
                      {data.name}
                    </h3>

                    <p className="font-sans text-sm sm:text-base text-ink-muted leading-relaxed">
                      {data.shortDescription}
                    </p>

                    {/* Key takeaway bullet */}
                    <div className="bg-cream-light/80 p-3.5 rounded-sm border border-clay/30 text-xs text-ink-light">
                      <strong className="text-plum block mb-0.5">Who this is for:</strong>
                      <span>{data.whoItIsFor[0]}</span>
                    </div>

                    {/* Link actions */}
                    <div className="pt-3 flex flex-wrap items-center gap-4">
                      <Link
                        href={`/${data.slug}`}
                        className="inline-flex items-center gap-2 font-semibold text-sm text-plum hover:text-plum-hover underline underline-offset-4 group"
                      >
                        <span>View complete service breakdown & FAQs</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Link>

                      <Link
                        href="/book-trial"
                        className="inline-flex items-center text-xs font-semibold px-4 py-2 rounded-full bg-plum hover:bg-plum-hover text-cream shadow-sm transition-colors"
                      >
                        Book Trial Class
                      </Link>
                    </div>
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
