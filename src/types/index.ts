export type ServiceCategory = 'pilates' | 'rehab' | 'prenatal' | 'face-yoga';

export interface ServiceDetail {
  id: ServiceCategory;
  slug: string;
  name: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  whoItIsFor: string[];
  whatHappensInClass: string[];
  sessionDuration: string;
  batchSize: string;
  equipmentUsed: string[];
  whatToWearAndBring: string[];
  faqs: { question: string; answer: string }[];
  accentColor: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  category: 'group' | 'semi-private' | 'personal' | 'face-yoga';
  priceINR: number;
  periodText: string;
  sessionsPerWeek: string;
  totalSessions: string;
  batchSize: string;
  validity: string;
  badge?: string;
  isPopular?: boolean;
  features: string[];
  trialNote: string;
}

export interface Testimonial {
  id: string;
  author: string;
  location: string;
  service: string;
  rating: number;
  date: string;
  verified: boolean;
  quote: string;
  specificOutcome: string;
}

export interface BatchScheduleItem {
  id: string;
  timeSlot: string;
  period: 'Morning' | 'Evening';
  days: string;
  classType: string;
  level: string;
  instructor: string;
  batchLimit: number;
  availableSlots: number;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}
