export default function Differentiation() {
  const comparisons = [
    {
      dimension: 'Setup time',
      noema: 'Minutes — upload a CSV',
      alternative: 'Weeks of consultant engagement',
    },
    {
      dimension: 'Disparity measurement',
      noema: 'Disparate Impact Ratio (DIR) + four-fifths rule',
      alternative: 'Informal pp gap review, inconsistently applied',
    },
    {
      dimension: 'Proxy detection',
      noema: 'Correlation scores + reconstruction risk flag',
      alternative: 'Manual variable review by committee',
    },
    {
      dimension: 'Adverse action',
      noema: 'Checked against CFPB Circular 2022-03 specificity standard',
      alternative: 'Generic reason codes assumed sufficient',
    },
    {
      dimension: 'Iteration speed',
      noema: 'Re-run after every model change to track fairness drift',
      alternative: 'Annual or pre-exam only',
    },
    {
      dimension: 'Data privacy',
      noema: 'Aggregate results only — no PII stored',
      alternative: 'Raw data shared with third party',
    },
  ];

  return (
    <section className="px-8 py-24 border-t border-[#1F2E48]">
      <div className="max-w-5xl mx-auto">
        <p className="font-mono text-[11px] tracking-[0.15em] uppercase text-[#7A90A8] mb-4">
          Why Noema
        </p>
        <h2 className="font-serif text-[clamp(32px,4vw,48px)] leading-[1.15] text-[#E8EDF5] mb-12 max-w-2xl">
          Infrastructure-grade fairness auditing, not a consulting project
        </h2>

        <div className="border border-[#1F2E48] rounded-lg overflow-hidden">
          <div className="grid grid-cols-3 bg-[#0C1220] border-b border-[#1F2E48] px-6 py-3">
            <p className="font-mono text-[11px] tracking-[0.15em] uppercase text-[#7A90A8]"></p>
            <p className="font-mono text-[11px] tracking-[0.15em] uppercase text-indigo-400">Noema</p>
            <p className="font-mono text-[11px] tracking-[0.15em] uppercase text-[#7A90A8]">Traditional</p>
          </div>
          {comparisons.map(({ dimension, noema, alternative }, i) => (
            <div
              key={dimension}
              className={`grid grid-cols-3 px-6 py-4 ${i < comparisons.length - 1 ? 'border-b border-[#1F2E48]' : ''}`}
            >
              <p className="font-mono text-sm text-[#7A90A8]">{dimension}</p>
              <p className="font-mono text-sm text-[#E8EDF5] font-semibold">{noema}</p>
              <p className="font-mono text-sm text-[#7A90A8]">{alternative}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
