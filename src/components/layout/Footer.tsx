import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, Instagram, MessageCircle, Clock, ShieldCheck } from 'lucide-react';
import { studioLocationDetails } from '@/data/schedule';

export default function Footer() {
  return (
    <footer className="bg-plum text-cream-light pt-16 pb-12 overflow-hidden relative">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-plum-light/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Pre-Footer Banner */}
        <div className="border-b border-white/10 pb-12 mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="text-blush text-xs uppercase tracking-widest font-semibold">
              Goregaon West • Malad • Kandivali
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-cream mt-1">
              Ready to feel stronger, lighter, and pain-free?
            </h3>
            <p className="text-cream-light/70 text-sm mt-1 max-w-xl">
              Experience personalized coaching in our small-group studio. 100% of trial fee credited upon enrollment.
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <Link
              href="/book-trial"
              className="bg-cream hover:bg-cream-light text-plum font-semibold px-6 py-3 rounded-full text-sm transition-transform hover:scale-105 active:scale-95 shadow-lg"
            >
              Book a Trial Class
            </Link>
            <a
              href="https://wa.me/919820000000?text=Hi%20Shilpa,%20I%20would%20like%20to%20enquire%20about%20a%20trial%20class"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 text-cream px-5 py-3 rounded-full text-sm font-medium transition-colors flex items-center gap-2 border border-white/15"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

        {/* 4-Column Directory */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Philosophy */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 bg-cream-light rounded-full p-1 flex-shrink-0">
                <Image
                  src="/images/logo.png"
                  alt="Shilpa's Fitness Theory"
                  fill
                  className="object-contain p-0.5"
                />
              </div>
              <div>
                <span className="font-serif text-lg font-bold text-cream">Shilpa Kanodia</span>
                <p className="text-[10px] tracking-widest uppercase text-blush">Fitness Theory Studio</p>
              </div>
            </div>
            <p className="text-xs text-cream-light/70 leading-relaxed">
              Boutique Pilates & Face Yoga studio in Goregaon West, Mumbai. Dedicated to small-group attention, pain-free spinal rehabilitation, and certified prenatal care.
            </p>
            <div className="flex items-center gap-2 text-xs text-blush pt-2">
              <ShieldCheck className="w-4 h-4 text-blush" />
              <span>Certified Classical Pilates & Rehab Specialist</span>
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-blush font-semibold mb-4">
              Programs & Services
            </h4>
            <ul className="space-y-2.5 text-xs text-cream-light/80">
              <li>
                <Link href="/pilates" className="hover:text-cream transition-colors">
                  Classical & Reformer Pilates (Batches of 4–6)
                </Link>
              </li>
              <li>
                <Link href="/rehab" className="hover:text-cream transition-colors">
                  Spine & Slip Disc Rehab Pilates
                </Link>
              </li>
              <li>
                <Link href="/prenatal" className="hover:text-cream transition-colors">
                  Prenatal & Postnatal Movement Care
                </Link>
              </li>
              <li>
                <Link href="/face-yoga" className="hover:text-cream transition-colors">
                  Face Yoga & Lymph Drainage (Studio & Live)
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-cream transition-colors">
                  Plans, Pricing & Trial Credits
                </Link>
              </li>
              <li>
                <Link href="/schedule" className="hover:text-cream transition-colors">
                  Batch Timetable & Available Slots
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Studio Location & Catchment */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-blush font-semibold mb-4">
              Studio Location
            </h4>
            <div className="space-y-3 text-xs text-cream-light/80">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blush flex-shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  {studioLocationDetails.address}
                </p>
              </div>
              <p className="text-[11px] text-cream-light/60 pl-6">
                <strong>Landmark:</strong> {studioLocationDetails.landmark}
              </p>
              <div className="flex items-center gap-2 pt-1">
                <Clock className="w-3.5 h-3.5 text-blush flex-shrink-0" />
                <span className="text-[11px]">Mon–Sat: 7:00 AM – 8:30 PM</span>
              </div>
              <div className="pt-2">
                <Link
                  href="/locations/goregaon"
                  className="text-xs text-blush hover:underline flex items-center gap-1"
                >
                  <span>Directions from Goregaon, Malad & Kandivali →</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Col 4: Contact & Social */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-blush font-semibold mb-4">
              Connect Directly
            </h4>
            <div className="space-y-3 text-xs text-cream-light/80">
              <a
                href="https://wa.me/919820000000"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 hover:text-cream transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp: +91 98200 XXXXX</span>
              </a>
              <a
                href="mailto:contact@shilpakanodia.com"
                className="flex items-center gap-2.5 hover:text-cream transition-colors"
              >
                <Mail className="w-4 h-4 text-blush" />
                <span>contact@shilpakanodia.com</span>
              </a>
              <a
                href="https://instagram.com/pilatescoachshilpa"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 hover:text-cream transition-colors"
              >
                <Instagram className="w-4 h-4 text-blush" />
                <span>@pilatescoachshilpa</span>
              </a>
            </div>

            <div className="mt-5 pt-4 border-t border-white/10">
              <span className="text-[11px] text-cream-light/60 block mb-2">Member Portal</span>
              <Link
                href="/my-classes"
                className="inline-block text-xs text-blush hover:text-cream underline"
              >
                Face Yoga Live & 7-Day Replay Login →
              </Link>
            </div>
          </div>
        </div>

        {/* PeakFit Inspired Giant Wordmark */}
        <div className="pt-10 pb-6 text-center select-none overflow-hidden opacity-20">
          <span className="font-serif font-black text-4xl sm:text-7xl md:text-9xl tracking-tighter text-stone block uppercase whitespace-nowrap">
            SHILPA&rsquo;S FITNESS
          </span>
        </div>

        {/* Legal & Copyright */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-cream-light/50 gap-4">
          <p>
            © {new Date().getFullYear()} Shilpa&rsquo;s Fitness Theory. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-cream transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-cream transition-colors">
              Terms of Service
            </Link>
            <Link href="/cancellation" className="hover:text-cream transition-colors">
              Cancellation & Rescheduling
            </Link>
            <Link href="/recording-notice" className="hover:text-cream transition-colors">
              Live Recording Notice
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
