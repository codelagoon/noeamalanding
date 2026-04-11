import type { Metadata } from 'next';
import { DM_Sans, DM_Mono, Cormorant_Garamond } from 'next/font/google';
import Navbar from '@/components/landing/Navbar';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const dmMono = DM_Mono({
  weight: ['300', '400', '500'],
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'NOEMA — AI Fairness & Model Governance for Regulated Institutions',
  description: 'Surface model bias and governance gaps before regulators do. Enterprise fairness monitoring, audit documentation, and compliance infrastructure for banks and lenders.',
  openGraph: {
    title: 'NOEMA — AI Fairness & Model Governance',
    description: 'Surface model bias and governance gaps before regulators do.',
    type: 'website',
  },
};

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${cormorant.variable} ${dmSans.variable} ${dmMono.variable} font-sans bg-page-bg min-h-screen text-text-primary`}>
      <Navbar />
      {children}
    </div>
  );
}
