import React from 'react';
import type { Metadata } from 'next';
import ServicePageTemplate from '@/components/services/ServicePageTemplate';
import { servicesData } from '@/data/services';

export const metadata: Metadata = {
  title: 'Spinal Rehab & Slip Disc Pilates | Shilpa Kanodia Goregaon West',
  description:
    'Clinical rehabilitation Pilates for slip discs, sciatica, neck compression, and chronic back pain in Goregaon West, Malad & Kandivali.',
};

export default function RehabPage() {
  return (
    <ServicePageTemplate
      service={servicesData['rehab']}
      heroImage="/images/service-rehab.jpg"
    />
  );
}
