export default function Problem() {
  return (
    <section className="px-8 py-24 border-t border-[#2A2A2A]">
      <div className="max-w-5xl mx-auto">
        <p className="font-mono text-[11px] tracking-[0.15em] uppercase text-[#A0A0A0] mb-4">
          The Problem
        </p>
        <h2 className="font-serif text-[clamp(32px,4vw,48px)] leading-[1.15] text-[#F5F5F5] mb-12 max-w-3xl">
          AI lenders ship faster than their fairness audits
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              stat: '61%',
              label: 'of AI systems in production are not regularly tested for fairness',
              detail:
                'Only 39% of production AI systems are regularly tested for demographic fairness, per the World Economic Forum\'s 2023 Global AI Governance Survey.',
            },
            {
              stat: '$765M',
              label: 'in additional annual costs to minority borrowers from algorithmic rate disparities',
              detail:
                'A landmark analysis of 3.6 million loans found that algorithmic lenders charge minority borrowers 7.9 basis points higher rates for identical credit profiles. (Bartlett et al., 2022)',
            },
            {
              stat: 'DIR < 0.8',
              label: 'is the four-fifths rule threshold that triggers mandatory investigation',
              detail:
                'When a group\'s approval rate is less than 80% of the highest group\'s rate, the Disparate Impact Ratio (DIR) signals potential adverse impact under EEOC Uniform Guidelines and fair lending doctrine.',
            },
          ].map(({ stat, label, detail }) => (
            <div key={stat} className="p-6 border border-[#2A2A2A] rounded-lg bg-[#141414]">
              <p className="font-mono text-[40px] leading-none text-[#E8D5A3] mb-3">{stat}</p>
              <p className="font-mono text-sm text-[#F5F5F5] font-semibold mb-3">{label}</p>
              <p className="font-mono text-sm text-[#A0A0A0] leading-relaxed">{detail}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 p-5 border border-[#2A2A2A] rounded-lg bg-[#141414]">
          <p className="font-mono text-sm text-[#A0A0A0] leading-relaxed">
            <span className="text-[#E8D5A3] font-semibold">Fairness drift is a compounding risk. </span>
            Equitable performance at model launch decays as the economic environment shifts — without ongoing monitoring, a model that initially passes a disparity audit can fail one silently months later.
          </p>
        </div>
      </div>
    </section>
  );
}
