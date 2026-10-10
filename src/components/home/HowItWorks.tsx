import React from 'react';
import Link from 'next/link';
import { MessageSquareText, FileCheck2, Sparkles, Compass, CheckCircle2 } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'Short Intake & Slot Selection',
      icon: MessageSquareText,
      clientAction: 'Fill our 60-second trial form or message Shilpa on WhatsApp.',
      shilpaAction: 'Shilpa reviews your goals, desk routine, and medical/injury background.',
      detail: 'Choose morning or evening timings that fit your schedule.',
    },
    {
      num: '02',
      title: '15-Min Postural & Movement Check',
      icon: FileCheck2,
      clientAction: 'Arrive 10 minutes before class at our Goregaon studio.',
      shilpaAction: 'Shilpa assesses your pelvic alignment, spinal curvature, and core engagement.',
      detail: 'If you have MRI reports or doctor notes for rehab, she reviews them personally.',
    },
    {
      num: '03',
      title: 'Coached Reformer Trial Class',
      icon: Sparkles,
      clientAction: 'Experience 45 minutes of spring resistance and mat articulation.',
      shilpaAction: 'Shilpa adjusts every spring and guides your breath on every repetition.',
      detail: 'Experience deep core engagement with zero joint strain or intimidation.',
    },
    {
      num: '04',
      title: 'Clear Recommendation & Enrollment',
      icon: Compass,
      clientAction: 'Choose whether you want group batches, semi-private, or rehab care.',
      shilpaAction: '100% of your ₹800 trial fee is credited directly into your chosen package.',
      detail: 'Zero awkward sales pressure. You decide in your own time.',
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-cream border-b border-clay/20">
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest font-semibold text-plum bg-blush/40 px-3 py-1 rounded-full">
            Your First Session
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-ink mt-3 leading-tight">
            What actually happens when you walk into our studio.
          </h2>
          <p className="font-sans text-base text-ink-muted mt-3">
            Walking into a new studio can feel intimidating. Here is exactly what to expect from your
            first message to finishing your trial.
          </p>
        </div>

        {/* 4 Steps Architectural Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="relative bg-cream-light rounded-sm p-6 sm:p-7 border border-clay/40 shadow-soft flex flex-col justify-between group hover:border-plum transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-serif font-bold text-2xl sm:text-3xl text-plum/30 group-hover:text-plum transition-colors">
                      {step.num}
                    </span>
                    <div className="w-9 h-9 rounded-sm bg-stone flex items-center justify-center text-plum border border-clay/30">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-ink mb-3 leading-snug">
                    {step.title}
                  </h3>

                  <div className="space-y-3 text-xs text-ink-muted">
                    <div>
                      <strong className="text-ink block mb-0.5">You do:</strong>
                      <p>{step.clientAction}</p>
                    </div>
                    <div>
                      <strong className="text-plum block mb-0.5">Shilpa does:</strong>
                      <p>{step.shilpaAction}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-clay/20 text-[11px] text-ink-subtle">
                  <span>{step.detail}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* What to wear and bring helper strip */}
        <div className="mt-12 bg-stone-light/70 rounded-sm p-6 sm:p-8 border border-clay/40 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-sm bg-cream flex items-center justify-center text-plum flex-shrink-0 mt-0.5 border border-clay/30">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-ink text-sm sm:text-base">
                What to wear & bring to your trial class
              </h4>
              <p className="text-xs sm:text-sm text-ink-muted mt-1 max-w-2xl leading-relaxed">
                Wear comfortable, form-fitting gym attire (leggings and a breathable t-shirt) so joint
                angles can be evaluated. Grip socks with traction soles are mandatory on Reformers (bring
                your own or purchase at studio for ₹250). Bring a water bottle.
              </p>
            </div>
          </div>

          <Link
            href="/book-trial"
            className="flex-shrink-0 bg-plum hover:bg-plum-hover text-cream text-xs sm:text-sm font-semibold px-6 py-3 rounded-full shadow-plum transition-transform hover:scale-105 active:scale-95"
          >
            Book Your Trial (₹800)
          </Link>
        </div>
      </div>
    </section>
  );
}
