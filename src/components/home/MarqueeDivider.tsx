import React from 'react';

export default function MarqueeDivider() {
  const words = [
    'POSTURE ALIGNMENT',
    'INTIMATE BATCHES OF 4–6',
    'SPRING REFORMER CARE',
    'SLIP DISC REHAB',
    'PRENATAL SAFETY',
    'NATURAL FACE YOGA',
    'ZERO INTIMIDATION',
  ];

  return (
    <div className="py-4 bg-stone border-y border-clay/30 overflow-hidden select-none">
      <div className="flex animate-ticker whitespace-nowrap">
        {[...words, ...words].map((word, i) => (
          <div key={i} className="flex items-center mx-4 text-xs sm:text-sm font-sans tracking-widest uppercase font-semibold text-ink-muted">
            <span>{word}</span>
            <span className="mx-4 text-plum font-serif">•</span>
          </div>
        ))}
      </div>
    </div>
  );
}
