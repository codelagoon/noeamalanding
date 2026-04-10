export default function Problem() {
  return (
    <section className="px-8 py-20 border-t border-[#1E2635] bg-[#0A0D12]">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

          {/* Left: thesis statement */}
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#6E788A] mb-4">The Problem</p>
            <h2 className="font-serif text-[clamp(26px,3.5vw,40px)] leading-[1.15] text-[#F5F7FA] mb-5">
              AI lenders scale faster than their compliance infrastructure.
            </h2>
            <p className="font-sans text-base text-[#A7B0C0] leading-relaxed mb-6">
              Algorithmic credit decisions create disparate outcomes across demographic groups. Without systematic measurement, these patterns go undetected until a regulatory examination — or a consent order.
            </p>
            <p className="font-sans text-base text-[#A7B0C0] leading-relaxed">
              Noema gives compliance teams the same statistical rigor that regulators apply, before an examiner sees the data.
            </p>
          </div>

          {/* Right: three data points, vertical stack */}
          <div className="space-y-0 divide-y divide-[#1E2635]">
            {[
              {
                stat: '$765M',
                label: 'Annual additional cost to minority borrowers',
                detail: 'From algorithmic rate disparities on equivalent credit profiles.',
                source: 'Bartlett et al., 2022 · 3.6M FinTech loans',
                color: '#FF5C6C',
              },
              {
                stat: '61%',
                label: 'Of AI systems not regularly tested for demographic fairness',
                detail: 'Production models drift. Without quarterly monitoring, a model that launches equitably can fail silently.',
                source: 'WEF Global AI Governance Survey, 2023',
                color: '#F2C14E',
              },
              {
                stat: 'DIR&thinsp;<&thinsp;0.80',
                label: 'Four-fifths rule threshold for mandatory investigation',
                detail: 'A Disparate Impact Ratio below 0.80 triggers EEOC Uniform Guidelines review requirements — and CFPB examination scrutiny.',
                source: 'EEOC Uniform Guidelines on Employee Selection Procedures',
                color: '#6EA8FE',
              },
            ].map(({ stat, label, detail, source, color }) => (
              <div key={stat} className="py-6">
                <p className="font-mono font-bold text-2xl mb-1" style={{ color }}
                   dangerouslySetInnerHTML={{ __html: stat }} />
                <p className="font-sans text-sm font-semibold text-[#F5F7FA] mb-1">{label}</p>
                <p className="font-sans text-sm text-[#A7B0C0] leading-relaxed mb-1">{detail}</p>
                <p className="font-mono text-[10px] text-[#6E788A]">{source}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
