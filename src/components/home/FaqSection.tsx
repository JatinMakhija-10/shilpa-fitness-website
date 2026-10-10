'use client';

import React, { useState } from 'react';
import { ChevronDown, MessageCircle } from 'lucide-react';
import { studioFaqs } from '@/data/faqs';

export default function FaqSection() {
  // First item open by default as specified in Rebuild Plan Section 7.12
  const [openId, setOpenId] = useState<string | null>(studioFaqs[0].id);

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-20 sm:py-28 bg-cream border-b border-clay/20" id="faq">
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Heading & Support (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <span className="text-xs uppercase tracking-widest font-semibold text-plum bg-blush/40 px-3 py-1 rounded-full">
              Common Questions
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-ink leading-tight">
              Everything you need to know before your first class.
            </h2>
            <p className="font-sans text-base text-ink-muted leading-relaxed">
              We know starting something new can feel daunting. If you have a specific injury,
              medical condition, or pregnancy concern not answered here, message Shilpa directly.
            </p>

            <div className="pt-4">
              <a
                href="https://wa.me/919820000000?text=Hi%20Shilpa,%20I%20have%20a%20question%20before%20booking%20my%20trial"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full border border-clay/40 bg-stone/40 hover:bg-stone text-ink text-xs sm:text-sm font-medium transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Ask Shilpa on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Column: Accessible Accordion (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {studioFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="rounded-sm border border-clay/40 bg-cream-light transition-all overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full text-left p-6 sm:p-7 flex items-center justify-between gap-4 focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="font-serif text-base sm:text-lg font-semibold text-ink leading-snug">
                      {faq.question}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-full bg-stone/50 flex items-center justify-center text-plum flex-shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 bg-plum text-cream' : ''
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 sm:px-7 sm:pb-7 font-sans text-xs sm:text-sm text-ink-muted leading-relaxed border-t border-clay/15 pt-4">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
