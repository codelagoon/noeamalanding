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
    <section className="px-8 py-32 border-t border-[#1F2E48] text-center">
      <div className="max-w-2xl mx-auto">
        <p className="font-mono text-[11px] tracking-[0.15em] uppercase text-[#7A90A8] mb-4">
          Get Started
        </p>
        <h2 className="font-serif text-[clamp(32px,4vw,48px)] leading-[1.15] text-[#E8EDF5] mb-6">
          Run your first fairness audit today
        </h2>
        <p className="font-mono text-sm text-[#7A90A8] mb-10 leading-relaxed">
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
              className="flex-1 px-4 py-3 bg-[#0C1220] border border-[#1F2E48] rounded-[4px] text-[#E8EDF5] font-mono text-sm placeholder:text-[#7A90A8] focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-[#F59E0B] text-[#080D1A] font-mono text-sm font-semibold rounded-[4px] hover:bg-[#D97706] transition-colors disabled:opacity-60 whitespace-nowrap"
            >
              {loading ? 'Joining...' : 'Join Waitlist'}
            </button>
          </form>
        ) : (
          <div className="px-6 py-3 bg-[#0C1220] border border-indigo-500 rounded-[4px] font-mono text-sm text-indigo-400 inline-block">
            You&apos;re on the list. We&apos;ll be in touch.
          </div>
        )}

        {error && <p className="font-mono text-sm text-red-400 mt-4">{error}</p>}
      </div>
    </section>
  );
}
