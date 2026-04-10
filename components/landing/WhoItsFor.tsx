export default function WhoItsFor() {
  const personas = [
    {
      role: 'Chief Compliance Officer',
      need: 'Documented disparity analysis for examiner inquiries',
      value: 'Structured audit reports with DIR values, remediation checklists, and CFPB-compliant adverse action narratives.',
    },
    {
      role: 'Head of Model Risk',
      need: 'Proxy variable detection before production deployment',
      value: 'Automated correlation scoring surfaces which variables carry demographic signal — and flags reconstruction risk.',
    },
    {
      role: 'Fair Lending Counsel',
      need: 'Quantify exposure ahead of CFPB or DOJ examination',
      value: 'Approval rate disparity data and DIR time-series in a format your team can read and act on.',
    },
    {
      role: 'Head of Data Science',
      need: 'Measure fairness tradeoffs across model iterations',
      value: 'Less discriminatory alternatives identified with projected disparity reduction, sourced to peer-reviewed benchmarks.',
    },
  ];

  return (
    <section id="who-its-for" className="px-8 py-20 border-t border-[#1E2635] bg-[#0A0D12]">
      <div className="max-w-5xl mx-auto">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#6E788A] mb-4">Who it&apos;s for</p>
        <h2 className="font-serif text-[clamp(26px,3.5vw,40px)] leading-[1.15] text-[#F5F7FA] mb-12 max-w-xl">
          Built for the teams responsible for lending fairness.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#1E2635] border border-[#1E2635] rounded-xl overflow-hidden">
          {personas.map(({ role, need, value }) => (
            <div key={role} className="p-6 bg-[#0F131A] hover:bg-[#131926] transition-colors">
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#6EA8FE] mb-3">{role}</p>
              <p className="font-sans text-sm text-[#A7B0C0] mb-2">
                <span className="font-semibold text-[#F5F7FA]">Need: </span>{need}
              </p>
              <p className="font-sans text-sm text-[#A7B0C0] leading-relaxed">
                <span className="font-semibold text-[#F5F7FA]">Noema delivers: </span>{value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
