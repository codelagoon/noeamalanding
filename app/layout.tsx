import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Noema - Fairness Auditing for AI Lending',
  description: 'Audit AI underwriting decisions for demographic disparity, proxy variables, and ECOA compliance.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
