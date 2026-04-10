'use client';

import { useState } from 'react';
import AnimatedGridPattern from '@/components/magicui/AnimatedGridPattern';
import ShimmerButton from '@/components/magicui/ShimmerButton';
import NumberTicker from '@/components/magicui/NumberTicker';
import Marquee from '@/components/magicui/Marquee';

const marqueeItems = [
  'Disparate Impact Ratio',
  'Four-Fifths Rule',
  'CFPB Circular 2022-03',
  'Adverse Action Specificity',
  'Proxy Variable Detection',
  'Fairness Drift Monitoring',
  'Less Discriminatory Alternatives',
  'ECOA / Reg B Compliance',
  'Reconstruction Risk Analysis',
  'Row-Level Security',
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
    <section className="relative min-h-screen flex flex-col items-center justify-center px-8 pt-28 pb-20 overflow-hidden">
      <AnimatedGridPattern numSquares={60} maxOpacity={0.06} duration={3} className="inset-0" />

      {/* gradient vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,#0A0A0A_70%,transparent_100%)]" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto">
        <div className="mb-5 flex items-center gap-2 px-3 py-1 rounded-full border border-[#2A2A2A] bg-[#141414]">
          <span className="h-2 w-2 rounded-full bg-[#4A7C6F] animate-pulse2" />
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#A0A0A0]">
            $2.01T AI lending market · sub-500ms audits
          </p>
        </div>

        <h1 className="font-serif text-[clamp(38px,6.5vw,76px)] leading-[1.08] text-[#F5F5F5] mb-5">
          End institutional lag.<br />
          <span className="text-[#E8D5A3]">Know your model&apos;s bias</span>{' '}
          before examiners do.
        </h1>

        <p className="font-mono text-[15px] text-[#A0A0A0] max-w-[600px] mb-10 leading-relaxed">
          Statistical analysis of AI underwriting outputs for Disparate Impact Ratio,
          proxy variable reconstruction risk, and CFPB Circular 2022-03 adverse action specificity.
          Structured evidence your compliance team can act on today.
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@institution.com"
              required
              className="flex-1 px-4 py-3 bg-[#141414] border border-[#2A2A2A] rounded-[4px] text-[#F5F5F5] font-mono text-sm placeholder:text-[#A0A0A0] focus:outline-none focus:border-[#4A7C6F]"
            />
            <ShimmerButton type="submit" disabled={loading} shimmerColor="#E8D5A3" background="#0A0A0A">
              {loading ? 'Joining…' : 'Join Waitlist'}
            </ShimmerButton>
          </form>
        ) : (
          <div className="px-6 py-3 mb-4 bg-[#141414] border border-[#4A7C6F] rounded-[4px] font-mono text-sm text-[#4A7C6F]">
            You&apos;re on the list. We&apos;ll be in touch.
          </div>
        )}
        {error && <p className="mb-4 font-mono text-sm text-red-400">{error}</p>}

        {/* live stat tickers */}
        <div className="grid grid-cols-3 gap-8 mt-8 mb-14">
          {[
            { value: 765, suffix: 'M', prefix: '$', label: 'annual minority borrower cost', decimals: 0 },
            { value: 500, suffix: 'ms', prefix: '<', label: 'real-time audit latency', decimals: 0 },
            { value: 21.3, suffix: '%', prefix: '', label: 'scorability gain from alt data', decimals: 1 },
          ].map(({ value, suffix, prefix, label, decimals }) => (
            <div key={label} className="text-center">
              <p className="font-mono font-bold text-[#E8D5A3] text-3xl mb-1">
                <NumberTicker value={value} prefix={prefix} suffix={suffix} decimalPlaces={decimals} delay={0.3} />
              </p>
              <p className="font-mono text-[10px] text-[#A0A0A0] uppercase tracking-wider leading-tight max-w-[120px] mx-auto">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* compliance term marquee */}
      <div className="relative z-10 w-full max-w-5xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <Marquee pauseOnHover duration={25} repeat={2}>
          {marqueeItems.map((item) => (
            <div
              key={item}
              className="mx-4 flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#2A2A2A] bg-[#141414]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#4A7C6F]" />
              <span className="font-mono text-xs text-[#A0A0A0] whitespace-nowrap">{item}</span>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
