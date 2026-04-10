import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import Sidebar from '@/components/dashboard/Sidebar';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Noema — Fairness Command Center',
  description: 'AI lending fairness audit dashboard',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${dmSans.variable} font-sans bg-[#080D1A] min-h-screen flex`}
      style={{ zoom: '0.8' }}
    >
      <Sidebar />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
