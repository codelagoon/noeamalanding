'use client';

import { useState } from 'react';

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
    <section className="min-h-screen flex flex-col items-center justify-center px-8 pt-24 pb-16 text-center">
      <p className="font-mono text-[11px] tracking-[0.15em] uppercase text-[#A0A0A0] mb-6">
        Fair Lending Audit Infrastructure
      </p>

      <h1 className="font-serif text-[clamp(36px,6vw,68px)] leading-[1.1] text-[#F5F5F5] max-w-4xl mb-6">
        Know if your model is{' '}
        <span className="text-[#E8D5A3]">discriminating</span>{' '}
        before regulators do
      </h1>

      <p className="font-mono text-base text-[#A0A0A0] max-w-[640px] mb-12 leading-relaxed">
        Statistical analysis of AI underwriting outputs for demographic disparity,
        proxy variables, and adverse action patterns. Structured reports your compliance
        team can act on.
      </p>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@institution.com"
            required
            className="flex-1 px-4 py-3 bg-[#141414] border border-[#2A2A2A] rounded-[4px] text-[#F5F5F5] font-mono text-sm placeholder:text-[#A0A0A0] focus:outline-none focus:border-[#4A7C6F]"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-[#E8D5A3] text-[#0A0A0A] font-mono text-sm font-semibold rounded-[4px] hover:bg-[#d4c08f] transition-colors disabled:opacity-60 whitespace-nowrap"
          >
            {loading ? 'Joining...' : 'Join Waitlist'}
          </button>
        </form>
      ) : (
        <div className="px-6 py-3 bg-[#141414] border border-[#4A7C6F] rounded-[4px] font-mono text-sm text-[#4A7C6F]">
          You&apos;re on the list. We&apos;ll be in touch.
        </div>
      )}

      {error && (
        <p className="mt-3 font-mono text-sm text-red-400">{error}</p>
      )}

      <div className="mt-20 flex items-center gap-6 text-[#A0A0A0]">
        {[
          { label: 'Disparity Score', value: 'Per audit' },
          { label: 'Protected Classes', value: 'ECOA-aligned' },
          { label: 'Proxy Detection', value: 'Statistical' },
        ].map(({ label, value }) => (
          <div key={label} className="text-center">
            <p className="font-mono text-[11px] tracking-[0.15em] uppercase mb-1">{label}</p>
            <p className="font-mono text-sm text-[#F5F5F5]">{value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
