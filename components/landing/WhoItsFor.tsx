export default function WhoItsFor() {
  const personas = [
    {
      role: 'Chief Compliance Officer',
      need: 'Documented evidence of fairness review for examiner inquiries',
      value: 'Structured reports with disparity scores and remediation checklists you can share directly.',
    },
    {
      role: 'Head of Credit / Model Risk',
      need: 'Detect proxy variable risk before model goes to production',
      value: 'Statistical correlation analysis surfaces which variables carry demographic signal.',
    },
    {
      role: 'Fair Lending Counsel',
      need: 'Understand exposure before a CFPB or DOJ examination',
      value: 'Approval rate disparity data and adverse action analysis in a format you can read.',
    },
    {
      role: 'Data Science Lead',
      need: 'Quantify fairness tradeoffs when iterating on model architecture',
      value: 'Specific less-discriminatory alternatives identified with projected disparity reduction.',
    },
  ];

  return (
    <section id="who-its-for" className="px-8 py-24 border-t border-[#1F2E48]">
      <div className="max-w-5xl mx-auto">
        <p className="font-mono text-[11px] tracking-[0.15em] uppercase text-[#7A90A8] mb-4">
          Who It&apos;s For
        </p>
        <h2 className="font-serif text-[clamp(32px,4vw,48px)] leading-[1.15] text-[#E8EDF5] mb-16 max-w-2xl">
          Built for the teams responsible for lending fairness
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {personas.map(({ role, need, value }) => (
            <div key={role} className="p-6 border border-[#1F2E48] rounded-lg bg-[#0C1220] hover:border-[#6366F1] transition-colors">
              <p className="font-mono text-[11px] tracking-[0.15em] uppercase text-indigo-400 mb-3">{role}</p>
              <p className="font-mono text-sm text-[#7A90A8] mb-3">
                <span className="text-[#E8EDF5] font-semibold">Need: </span>
                {need}
              </p>
              <p className="font-mono text-sm text-[#7A90A8]">
                <span className="text-[#E8EDF5] font-semibold">Noema gives you: </span>
                {value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
