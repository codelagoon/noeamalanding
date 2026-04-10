'use client';

import { useState } from 'react';
import NumberTicker from '@/components/magicui/NumberTicker';
import PrimaryButton from '@/components/ui/PrimaryButton';

const stats = [
  { value: 765,  suffix: 'M', prefix: '$', label: 'annual cost of lending disparity to minority borrowers', source: 'Bartlett et al., 2022', decimals: 0, color: '#FF5C6C' },
  { value: 40,   suffix: '%', prefix: '',  label: 'decisioning gap closed by the Binary Medium threshold', source: 'Internal PoC benchmark', decimals: 0, color: '#6EA8FE' },
  { value: 21.3, suffix: '%', prefix: '+', label: 'scorability lift from alternative data integration', source: 'Urban Institute, 2021', decimals: 1, color: '#5FD1C4' },
];

export default function Hero() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to join waitlist');
      }
      setSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative pt-32 pb-24 px-8 overflow-hidden">
      {/* Subtle horizontal rule accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1E2635] to-transparent" />

      <div className="max-w-5xl mx-auto">
        {/* Eyebrow */}
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#6E788A] mb-6">
          Fair Lending Audit Infrastructure
        </p>

        {/* Headline — two-line editorial */}
        <h1 className="font-serif text-[clamp(38px,5.5vw,64px)] leading-[1.06] text-[#F5F7FA] max-w-3xl mb-6">
          The governance layer for AI-driven lending.
        </h1>

        {/* Sub-headline */}
        <p className="text-[17px] text-[#A7B0C0] leading-relaxed max-w-xl mb-4 font-sans">
          AI underwriting models outpace the compliance infrastructure around them.
          Noema closes that gap — automating Disparate Impact Ratio measurement,
          CFPB-compliant adverse action narratives, and fairness drift monitoring
          in a single audit run.
        </p>

        {/* CFPB behavioral specificity — the core product proof */}
        <div className="mb-10 max-w-2xl rounded-lg border border-[#1E2635] bg-[#0F131A] overflow-hidden">
          <div className="px-4 py-2 border-b border-[#1E2635] bg-[#131926]">
            <p className="font-mono text-[10px] text-[#6E788A] uppercase tracking-widest">
              CFPB Circular 2022-03 · Adverse action specificity requirement
            </p>
          </div>
          <div className="grid grid-cols-2 divide-x divide-[#1E2635]">
            <div className="p-4">
              <p className="font-mono text-[10px] text-[#FF5C6C] uppercase tracking-widest mb-2">Non-compliant</p>
              <p className="font-sans text-sm text-[#A7B0C0] italic">&ldquo;Credit history insufficient&rdquo;</p>
            </div>
            <div className="p-4">
              <p className="font-mono text-[10px] text-[#5FD1C4] uppercase tracking-widest mb-2">Compliant</p>
              <p className="font-sans text-sm text-[#F5F7FA]">&ldquo;Multiple cash advances exceeding 30% of income in the past 60 days&rdquo;</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex items-center gap-3 mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@institution.com"
              required
              className="w-72 px-4 py-2.5 bg-[#0F131A] border border-[#1E2635] rounded-[6px] text-[#F5F7FA] font-mono text-sm placeholder:text-[#6E788A] focus:outline-none focus:border-accent/50 transition-colors"
            />
            <PrimaryButton type="submit" disabled={loading} size="md">
              {loading ? 'Submitting…' : 'Request access'}
            </PrimaryButton>
            <PrimaryButton variant="ghost" size="md" type="button" onClick={() => window.location.href='#how-it-works'}>
              See how it works
            </PrimaryButton>
          </form>
        ) : (
          <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[6px] border border-[#1E2635] bg-[#0F131A] font-mono text-sm text-[#5FD1C4] mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#5FD1C4]" />
            You&apos;re on the list. We&apos;ll be in touch.
          </div>
        )}
        {error && <p className="font-mono text-sm text-[#FF5C6C] mb-3">{error}</p>}

        <p className="font-mono text-[11px] text-[#6E788A]">
          Used by compliance teams at Tier 1 and Tier 2 institutions.
          Statistical analysis only — not legal advice.
        </p>

        {/* Stat row — research-backed numbers */}
        <div className="mt-16 pt-8 border-t border-[#1E2635] grid grid-cols-1 sm:grid-cols-3 gap-8">
          {stats.map(({ value, suffix, prefix, label, source, decimals, color }) => (
            <div key={label}>
              <p className="font-mono font-bold text-[34px] leading-none mb-2" style={{ color }}>
                <NumberTicker value={value} prefix={prefix} suffix={suffix} decimalPlaces={decimals} delay={0.4} />
              </p>
              <p className="font-sans text-sm text-[#A7B0C0] leading-snug mb-1">{label}</p>
              <p className="font-mono text-[10px] text-[#6E788A]">{source}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
