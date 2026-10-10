'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { MessageCircle, Calendar } from 'lucide-react';

export default function StickyMobileBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Trigger after scrolling past 500px (approx hero height)
      setIsVisible(window.scrollY > 480);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-cream-light/95 backdrop-blur-md border-t border-clay/30 px-4 py-3 shadow-[0_-8px_20px_rgba(30,26,23,0.08)] pb-safe transition-all duration-300">
      <div className="flex items-center gap-2 max-w-md mx-auto">
        {/* WhatsApp Button (35% width) */}
        <a
          href="https://wa.me/919820000000?text=Hi%20Shilpa,%20I%20would%20like%20to%20book%20a%20Pilates%20trial%20class"
          target="_blank"
          rel="noopener noreferrer"
          className="w-[35%] flex items-center justify-center gap-1.5 py-3 px-3 rounded-full border border-emerald-600/40 text-emerald-800 bg-emerald-50/80 font-medium text-xs active:scale-95 transition-transform"
          aria-label="WhatsApp Shilpa"
        >
          <MessageCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span className="truncate">WhatsApp</span>
        </a>

        {/* Primary CTA (65% width) */}
        <Link
          href="/book-trial"
          className="w-[65%] flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-plum text-cream font-semibold text-xs shadow-plum active:scale-95 transition-transform"
        >
          <Calendar className="w-4 h-4 flex-shrink-0" />
          <span className="truncate">Book a Trial (₹800)</span>
        </Link>
      </div>
    </div>
  );
}
