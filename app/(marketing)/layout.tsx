import type { Metadata } from 'next';
import { Playfair_Display, DM_Mono, DM_Sans } from 'next/font/google';
import Navbar from '@/components/landing/Navbar';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const dmMono = DM_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Noema — Fair Lending Audit Infrastructure',
  description: 'Statistical analysis of AI underwriting outputs for Disparate Impact Ratio, proxy variable detection, and CFPB Circular 2022-03 adverse action specificity.',
};

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${playfair.variable} ${dmMono.variable} ${dmSans.variable} bg-page min-h-screen text-primary`}>
      <Navbar />
      {children}
    </div>
  );
}
