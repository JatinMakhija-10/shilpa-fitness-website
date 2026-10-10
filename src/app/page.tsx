import React from 'react';
import Hero from '@/components/home/Hero';
import MarqueeDivider from '@/components/home/MarqueeDivider';
import RecognitionSection from '@/components/home/RecognitionSection';
import MeetShilpaPreview from '@/components/home/MeetShilpaPreview';
import HowItWorks from '@/components/home/HowItWorks';
import ServicesPreview from '@/components/home/ServicesPreview';
import ReviewsRail from '@/components/home/ReviewsRail';
import PricingPreview from '@/components/home/PricingPreview';
import LocationsPreview from '@/components/home/LocationsPreview';
import FaqSection from '@/components/home/FaqSection';
import FinalCtaBand from '@/components/home/FinalCtaBand';

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ExerciseGym',
    name: "Shilpa's Fitness Theory Pilates Studio",
    image: 'https://shilpakanodia.com/images/hero-coaching.jpg',
    telephone: '+919820000000',
    url: 'https://shilpakanodia.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Plot 42, 2nd Floor, Sai Commercial Arcade, Link Road',
      addressLocality: 'Goregaon West',
      addressRegion: 'Maharashtra',
      postalCode: '400104',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '19.1663',
      longitude: '72.8366',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '86',
    },
    priceRange: '₹₹',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '07:00',
        closes: '20:30',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div>
        <Hero />
        <MarqueeDivider />
        <RecognitionSection />
        <MeetShilpaPreview />
        <HowItWorks />
        <ServicesPreview />
        <ReviewsRail />
        <PricingPreview />
        <LocationsPreview />
        <FaqSection />
        <FinalCtaBand />
      </div>
    </>
  );
}
