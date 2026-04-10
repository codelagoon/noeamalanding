export default function HowItWorks() {
  const steps = [
    {
      n: '01',
      title: 'Upload decision data',
      body: 'Export your model\'s decision log as a CSV. Map columns — applicant ID, outcome, protected-class indicator. Optional columns (income, credit score, DTI) enable proxy variable analysis.',
    },
    {
      n: '02',
      title: 'Statistical analysis',
      body: 'Noema computes the Disparate Impact Ratio for each demographic group, flags four-fifths rule violations, scores proxy variables for reconstruction risk, and checks adverse action notice specificity against CFPB Circular 2022-03.',
    },
    {
      n: '03',
      title: 'Structured audit report',
      body: 'A five-section report is generated: DIR analysis, proxy variable detection, adverse action review, less discriminatory alternatives, and a prioritised remediation checklist.',
    },
    {
      n: '04',
      title: 'Monitor drift over time',
      body: 'Re-run after every model change to detect fairness drift — the decay of equitable performance as economic conditions shift. Compare DIR across quarters to demonstrate improvement to regulators.',
    },
  ];

  return (
    <section id="how-it-works" className="px-8 py-20 border-t border-[#1E2635]">
      <div className="max-w-5xl mx-auto">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#6E788A] mb-4">How it works</p>
        <h2 className="font-serif text-[clamp(26px,3.5vw,40px)] leading-[1.15] text-[#F5F7FA] mb-14 max-w-xl">
          From decision data to audit report in under five minutes.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
          {steps.map(({ n, title, body }) => (
            <div key={n} className="flex gap-5">
              <span className="font-mono text-[13px] font-semibold text-[#6EA8FE] pt-0.5 shrink-0 w-8">{n}</span>
              <div>
                <h3 className="font-sans text-base font-semibold text-[#F5F7FA] mb-2">{title}</h3>
                <p className="font-sans text-sm text-[#A7B0C0] leading-relaxed">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
