import React from 'react';
import type { Metadata } from 'next';
import ServicePageTemplate from '@/components/services/ServicePageTemplate';
import { servicesData } from '@/data/services';

export const metadata: Metadata = {
  title: 'Natural Face Yoga & Lymphatic Sculpt | Shilpa Kanodia Mumbai',
  description:
    'Targeted facial toning, TMJ jaw tension release, and lymphatic drainage. In-studio masterclasses and live online classes with 7-day replays.',
};

export default function FaceYogaPage() {
  return (
    <ServicePageTemplate
      service={servicesData['face-yoga']}
      heroImage="/images/service-faceyoga.jpg"
    />
  );
}
