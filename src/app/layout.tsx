import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import StickyMobileBar from '@/components/layout/StickyMobileBar';

export const metadata: Metadata = {
  title: "Shilpa Kanodia | Boutique Pilates & Face Yoga Studio Goregaon West, Mumbai",
  description:
    "Intimate Pilates batches (4-6 max) on classical Reformers. Clinical care for slip disc rehab, back pain, and certified prenatal movement in Goregaon West, Malad & Kandivali.",
  keywords: [
    "Pilates Goregaon West",
    "Reformer Pilates Mumbai",
    "Rehab Pilates slip disc",
    "Prenatal Pilates Mumbai",
    "Face Yoga Mumbai",
    "Shilpa Kanodia Pilates",
    "Pilates studio Malad",
    "Pilates classes Kandivali",
  ],
  openGraph: {
    title: "Shilpa Kanodia | Boutique Pilates & Face Yoga Studio",
    description:
      "A stronger back, better posture, and a coach who learns your name in the first class. Small batches of 4-6 on studio Reformers in Goregaon West.",
    url: "https://shilpakanodia.com",
    siteName: "Shilpa's Fitness Theory",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-cream text-ink antialiased">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <StickyMobileBar />
      </body>
    </html>
  );
}
