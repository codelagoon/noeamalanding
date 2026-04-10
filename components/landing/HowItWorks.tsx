export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Upload decision data',
      description:
        "Export your model's decision log as a CSV. Map columns to required fields: applicant ID, outcome, and protected-class indicator. Optional columns (income, credit score, DTI) enable proxy variable detection.",
    },
    {
      number: '02',
      title: 'Statistical analysis runs',
      description:
        'Noema computes the Disparate Impact Ratio (DIR) across demographic groups, flags violations of the four-fifths rule (DIR < 0.8), detects proxy variables and their reconstruction risk, and checks adverse action notice specificity.',
    },
    {
      number: '03',
      title: 'Structured report delivered',
      description:
        'A five-section audit report is generated: approval rate analysis with DIR values, proxy variable detection with correlation scores, adverse action review against CFPB Circular 2022-03, less discriminatory alternatives, and a prioritized remediation checklist.',
    },
    {
      number: '04',
      title: 'Track improvement over time',
      description:
        'Re-run after every model change to monitor fairness drift — the decay of equitable performance as the economic environment evolves. Compare DIR across audit runs to demonstrate improvement to regulators.',
    },
  ];

  return (
    <section id="how-it-works" className="px-8 py-24 border-t border-[#2A2A2A]">
      <div className="max-w-5xl mx-auto">
        <p className="font-mono text-[11px] tracking-[0.15em] uppercase text-[#A0A0A0] mb-4">
          How It Works
        </p>
        <h2 className="font-serif text-[clamp(32px,4vw,48px)] leading-[1.15] text-[#F5F5F5] mb-16 max-w-2xl">
          From CSV to audit report in minutes
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {steps.map(({ number, title, description }) => (
            <div key={number} className="flex gap-5">
              <span className="font-mono text-[#E8D5A3] text-lg font-semibold shrink-0 w-8">{number}</span>
              <div>
                <h3 className="font-mono text-base font-semibold text-[#F5F5F5] mb-2">{title}</h3>
                <p className="font-mono text-sm text-[#A0A0A0] leading-relaxed">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
