import React from 'react';
import type { Metadata } from 'next';
import ServicePageTemplate from '@/components/services/ServicePageTemplate';
import { servicesData } from '@/data/services';

export const metadata: Metadata = {
  title: 'Certified Prenatal & Postnatal Pilates | Shilpa Kanodia Mumbai',
  description:
    'Doctor-aligned prenatal exercise from week 13+. Pelvic floor endurance, diastasis recti care, and labor preparation in Goregaon West.',
};

export default function PrenatalPage() {
  return (
    <ServicePageTemplate
      service={servicesData['prenatal']}
      heroImage="/images/service-prenatal.jpg"
    />
  );
}
