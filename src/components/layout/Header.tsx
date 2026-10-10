'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, MessageCircle, ArrowRight, UserCheck, Shield } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Pilates', href: '/pilates' },
    { label: 'Rehab Care', href: '/rehab' },
    { label: 'Prenatal', href: '/prenatal' },
    { label: 'Face Yoga', href: '/face-yoga' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Schedule', href: '/schedule' },
    { label: 'About Shilpa', href: '/about' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-cream/95 backdrop-blur-md shadow-soft border-b border-clay/20 py-2.5'
          : 'bg-cream/70 backdrop-blur-sm py-4'
      }`}
    >
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Logo - Clean single image, no duplicate text */}
          <Link href="/" className="flex items-center flex-shrink-0 focus:outline-none group">
            <div className="relative h-10 sm:h-12 w-32 sm:w-44">
              <Image
                src="/images/logo.png"
                alt="Shilpa's Fitness Theory"
                fill
                className="object-contain object-left transition-transform group-hover:scale-[1.02]"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs sm:text-sm font-semibold text-ink-muted hover:text-plum transition-colors tracking-wide py-1"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Portal & CTA Actions */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/my-classes"
              className="text-xs font-semibold text-ink-muted hover:text-plum transition-colors px-3 py-1.5 rounded-full border border-clay/30 hover:border-plum/40 bg-cream-light/60 flex items-center gap-1.5"
            >
              <UserCheck className="w-3.5 h-3.5 text-plum" />
              <span>Member Portal</span>
            </Link>

            <Link
              href="/admin"
              className="text-xs font-medium text-ink-subtle hover:text-ink transition-colors px-2.5 py-1.5 rounded-full hover:bg-stone/40"
              title="Shilpa's Admin Management"
            >
              <Shield className="w-3.5 h-3.5 text-clay" />
            </Link>

            <a
              href="https://wa.me/919820000000?text=Hi%20Shilpa,%20I%20would%20like%20to%20enquire%20about%20a%20Pilates%20trial%20class"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full border border-clay/30 hover:border-emerald-600/50 bg-cream-light/60 text-emerald-700 hover:text-emerald-800 transition-colors"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
            </a>

            <Link
              href="/book-trial"
              className="inline-flex items-center gap-2 bg-plum hover:bg-plum-hover text-cream text-xs sm:text-sm font-bold px-5 py-2.5 rounded-full transition-all duration-200 shadow-plum hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Book a Trial</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 sm:hidden">
            <Link
              href="/my-classes"
              className="p-1.5 rounded-full border border-clay/30 text-plum"
              aria-label="Member Portal"
            >
              <UserCheck className="w-4 h-4" />
            </Link>
            <a
              href="https://wa.me/919820000000?text=Hi%20Shilpa,%20I%20would%20like%20to%20enquire%20about%20a%20Pilates%20trial%20class"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-emerald-700"
              aria-label="WhatsApp Shilpa"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-ink hover:text-plum transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-cream-light border-b border-clay/30 px-6 py-6 space-y-4 animate-in slide-in-from-top-2">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold text-ink hover:text-plum py-2 border-b border-clay/10 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/my-classes"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold text-plum hover:text-plum-hover py-2 border-b border-clay/10 transition-colors flex items-center justify-between"
            >
              <span>Member Portal & Live Zoom</span>
              <UserCheck className="w-4 h-4" />
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold text-ink-muted hover:text-ink py-2 border-b border-clay/10 transition-colors flex items-center justify-between"
            >
              <span>Admin & Class Manager (Shilpa)</span>
              <Shield className="w-4 h-4" />
            </Link>
          </div>

          <div className="pt-3 flex flex-col gap-2.5">
            <Link
              href="/book-trial"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center bg-plum hover:bg-plum-hover text-cream py-3 rounded-full font-bold text-xs sm:text-sm shadow-plum"
            >
              Book a Trial Class (₹800)
            </Link>
            <a
              href="https://wa.me/919820000000?text=Hi%20Shilpa,%20I%20would%20like%20to%20enquire%20about%20a%20Pilates%20trial%20class"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 border border-clay/40 py-2.5 rounded-full text-xs font-semibold text-ink hover:bg-stone/30"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp Shilpa Directly</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
