export default function Differentiation() {
  const rows = [
    { d: 'Time to first audit',     noema: 'Under 5 minutes — upload a CSV',                traditional: '4–8 weeks of consulting scoping' },
    { d: 'Disparity measurement',   noema: 'DIR + four-fifths rule, automated',              traditional: 'Informal pp-gap review, inconsistently applied' },
    { d: 'Proxy detection',         noema: 'Correlation scores + reconstruction risk flag',  traditional: 'Manual variable committee review' },
    { d: 'Adverse action specificity', noema: 'CFPB 2022-03 behavioral narratives via SLM', traditional: 'Generic reason codes assumed sufficient' },
    { d: 'Regulatory frameworks',   noema: 'ECOA · Reg B · CFPB 2022-03 · EU AI Act',       traditional: 'Reviewed annually or pre-examination only' },
    { d: 'Data privacy',            noema: 'Aggregate results only — no PII stored',         traditional: 'Raw data shared with third-party reviewer' },
    { d: 'Iteration speed',         noema: 'Re-run after every model change',                traditional: 'Annual or ad hoc' },
  ];

  return (
    <section className="px-8 py-20 border-t border-[#1E2635] bg-[#0A0D12]">
      <div className="max-w-5xl mx-auto">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#6E788A] mb-4">Why Noema</p>
        <h2 className="font-serif text-[clamp(26px,3.5vw,40px)] leading-[1.15] text-[#F5F7FA] mb-10 max-w-xl">
          Infrastructure-grade auditing, not a consulting engagement.
        </h2>

        <div className="rounded-xl border border-[#1E2635] overflow-hidden">
          <div className="grid grid-cols-3 bg-[#131926] border-b border-[#1E2635] px-5 py-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#6E788A]" />
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#6EA8FE]">Noema</p>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#6E788A]">Traditional approach</p>
          </div>
          {rows.map((row, i) => (
            <div
              key={row.d}
              className={`grid grid-cols-3 px-5 py-4 gap-4 ${i < rows.length - 1 ? 'border-b border-[#1E2635]' : ''} hover:bg-[#131926]/50 transition-colors`}
            >
              <p className="font-sans text-sm text-[#A7B0C0] font-medium">{row.d}</p>
              <p className="font-sans text-sm text-[#F5F7FA]">{row.noema}</p>
              <p className="font-sans text-sm text-[#6E788A]">{row.traditional}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
