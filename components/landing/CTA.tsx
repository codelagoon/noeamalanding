'use client';

import { useState } from 'react';

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
    <section className="px-8 py-32 border-t border-[#2A2A2A] text-center">
      <div className="max-w-2xl mx-auto">
        <p className="font-mono text-[11px] tracking-[0.15em] uppercase text-[#A0A0A0] mb-4">
          Get Started
        </p>
        <h2 className="font-serif text-[clamp(32px,4vw,48px)] leading-[1.15] text-[#F5F5F5] mb-6">
          Run your first fairness audit today
        </h2>
        <p className="font-mono text-sm text-[#A0A0A0] mb-10 leading-relaxed">
          Upload a CSV of model decisions. Get a full disparity report in minutes.
          No consultant required.
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
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
          <div className="px-6 py-3 bg-[#141414] border border-[#4A7C6F] rounded-[4px] font-mono text-sm text-[#4A7C6F] inline-block">
            You&apos;re on the list. We&apos;ll be in touch.
          </div>
        )}

        {error && <p className="font-mono text-sm text-red-400 mt-4">{error}</p>}
      </div>
    </section>
  );
}
