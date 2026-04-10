'use client';

import { useState } from 'react';
import AnimatedGridPattern from '@/components/magicui/AnimatedGridPattern';
import ShimmerButton from '@/components/magicui/ShimmerButton';
import NumberTicker from '@/components/magicui/NumberTicker';
import Marquee from '@/components/magicui/Marquee';

const marqueeItems = [
  'Disparate Impact Ratio · Four-Fifths Rule',
  'CFPB Circular 2022-03 Behavioral Specificity',
  'SHAP → Adverse Action Narratives',
  'Reg B Counterfactual Explanations',
  'Proxy Variable Reconstruction Risk',
  'Fairness Drift Monitoring · Quarterly Cadence',
  'Rashomon Set · Pareto Frontier LDAs',
  'Binary Medium Threshold · 40% Gap Closure',
  'EU AI Act High-Risk Audit Trail',
  '26M Credit-Invisible Recovery · +21.3% Scorability',
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
      <AnimatedGridPattern numSquares={60} maxOpacity={0.05} duration={3} className="inset-0" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,#080D1A_70%,transparent_100%)]" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto">

        {/* Announcement chip */}
        <div className="mb-6 flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/8">
          <span className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse2" />
          <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-indigo-300">
            $2.01T AI lending market · compliance is the moat
          </p>
        </div>

        {/* Strategic Moat headline */}
        <h1 className="font-serif text-[clamp(38px,6.5vw,76px)] leading-[1.06] text-[#E8EDF5] mb-5">
          Turn compliance into a{' '}
          <span className="relative">
            <span className="text-indigo-400">strategic moat.</span>
            <span
              aria-hidden
              className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-indigo-500/0 via-indigo-400/60 to-indigo-500/0"
            />
          </span>
          <br />
          <span className="text-[#7A90A8] text-[0.75em] font-sans font-normal">
            Close the institutional lag before regulators arrive.
          </span>
        </h1>

        {/* Sub-headline: problem framing */}
        <p className="font-mono text-[15px] text-[#7A90A8] max-w-[620px] mb-4 leading-relaxed">
          AI underwriting models outpace the governance infrastructure around them.
          Noema closes that gap — automating Disparate Impact Ratio measurement,
          SHAP-to-narrative translation, and CFPB Circular 2022-03 adverse action specificity
          in a single audit run.
        </p>

        {/* Behavioral specificity callout — the core "translator" value prop */}
        <div className="mb-8 max-w-2xl w-full mx-auto p-4 rounded-xl border border-indigo-500/15 bg-indigo-500/5">
          <p className="font-mono text-[10px] uppercase tracking-widest text-indigo-400 mb-2">
            CFPB 2022-03 · Behavioral Specificity (not a generic reason code)
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
            <div className="p-3 rounded-lg bg-[#DC2626]/8 border border-[#DC2626]/15">
              <p className="font-mono text-[9px] text-[#DC2626]/70 uppercase tracking-wider mb-1">Non-compliant ✗</p>
              <p className="font-mono text-xs text-[#E8EDF5]">&ldquo;Credit history insufficient&rdquo;</p>
            </div>
            <div className="p-3 rounded-lg bg-emerald-500/8 border border-emerald-500/15">
              <p className="font-mono text-[9px] text-emerald-400/70 uppercase tracking-wider mb-1">Compliant ✓</p>
              <p className="font-mono text-xs text-[#E8EDF5]">&ldquo;Multiple cash advances exceeding 30% of income in the past 60 days&rdquo;</p>
            </div>
          </div>
        </div>

        {/* Waitlist form */}
        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@institution.com"
              required
              className="flex-1 px-4 py-3 bg-navy-850 border border-navy-700 rounded-[4px] text-[#E8EDF5] font-mono text-sm placeholder:text-[#3A5068] focus:outline-none focus:border-indigo-500"
            />
            <ShimmerButton type="submit" disabled={loading} shimmerColor="#818CF8" background="#080D1A">
              {loading ? 'Joining…' : 'Launch Private Beta'}
            </ShimmerButton>
          </form>
        ) : (
          <div className="px-6 py-3 mb-4 bg-indigo-500/10 border border-indigo-500/25 rounded-[4px] font-mono text-sm text-indigo-300">
            You&apos;re on the list. We&apos;ll be in touch.
          </div>
        )}
        {error && <p className="mb-4 font-mono text-sm text-[#DC2626]">{error}</p>}

        {/* Research-backed stat tickers */}
        <div className="grid grid-cols-3 gap-10 mt-8 mb-14">
          {[
            { value: 765, suffix: 'M', prefix: '$', label: 'annual minority borrower cost', source: 'Bartlett et al. 2022', decimals: 0, color: 'text-[#DC2626]' },
            { value: 40,  suffix: '%', prefix: '',  label: 'decisioning gap closed by binary medium threshold', source: 'PoC benchmark', decimals: 0, color: 'text-indigo-400' },
            { value: 21.3,suffix: '%', prefix: '+', label: 'scorability lift from alternative data', source: 'Urban Institute 2021', decimals: 1, color: 'text-emerald-400' },
          ].map(({ value, suffix, prefix, label, source, decimals, color }) => (
            <div key={label} className="text-center">
              <p className={`font-mono font-bold text-3xl mb-1 ${color}`}>
                <NumberTicker value={value} prefix={prefix} suffix={suffix} decimalPlaces={decimals} delay={0.3} />
              </p>
              <p className="font-mono text-[10px] text-[#7A90A8] uppercase tracking-wider leading-tight max-w-[120px] mx-auto">{label}</p>
              <p className="font-mono text-[9px] text-[#3A5068] mt-0.5">{source}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Compliance signal marquee */}
      <div className="relative z-10 w-full max-w-5xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <Marquee pauseOnHover duration={28} repeat={2}>
          {marqueeItems.map((item) => (
            <div
              key={item}
              className="mx-3 flex items-center gap-2 px-4 py-1.5 rounded-full border border-navy-700 bg-navy-850"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 shrink-0" />
              <span className="font-mono text-[10px] text-[#7A90A8] whitespace-nowrap">{item}</span>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
