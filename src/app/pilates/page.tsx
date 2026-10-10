import React from 'react';
import type { Metadata } from 'next';
import ServicePageTemplate from '@/components/services/ServicePageTemplate';
import { servicesData } from '@/data/services';

export const metadata: Metadata = {
  title: 'Classical & Reformer Pilates | Shilpa Kanodia Goregaon West',
  description:
    'Small group Pilates batches of 4-6 on studio Reformers. Core strength, posture alignment, and zero intimidation in Goregaon West, Mumbai.',
};

export default function PilatesPage() {
  return (
    <ServicePageTemplate
      service={servicesData['pilates']}
      heroImage="/images/service-pilates.jpg"
    />
  );
}
