'use client';

import { useState } from 'react';
import PrimaryButton from '@/components/ui/PrimaryButton';

export default function CTA() {
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
    <section className="px-8 py-24 border-t border-[#1E2635]">
      <div className="max-w-5xl mx-auto">
        <div className="max-w-xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#6E788A] mb-4">Get started</p>
          <h2 className="font-serif text-[clamp(26px,3.5vw,40px)] leading-[1.15] text-[#F5F7FA] mb-4">
            Request early access.
          </h2>
          <p className="font-sans text-base text-[#A7B0C0] leading-relaxed mb-8">
            We onboard compliance teams and model risk functions at regulated lenders.
            Upload a CSV of model decisions and receive a full fairness audit report.
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex items-center gap-3">
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
            </form>
          ) : (
            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[6px] border border-[#1E2635] font-mono text-sm text-[#5FD1C4]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#5FD1C4]" />
              You&apos;re on the list.
            </div>
          )}

          {error && <p className="mt-3 font-mono text-sm text-[#FF5C6C]">{error}</p>}

          <p className="mt-4 font-mono text-[11px] text-[#6E788A]">
            Statistical analysis only. Not legal advice.
          </p>
        </div>
      </div>
    </section>
  );
}
