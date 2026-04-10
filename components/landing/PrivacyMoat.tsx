import { Shield, Lock, Eye, Database, Key, Users } from 'lucide-react';

const pillars = [
  {
    icon: Database,
    title: 'Aggregate results only',
    badge: 'Zero PII',
    body: 'Raw applicant records are never stored. Only statistical aggregates — approval rates by group, correlation scores, DIR values — persist beyond the audit session.',
  },
  {
    icon: Shield,
    title: 'Row-Level Security',
    badge: 'Supabase RLS',
    body: 'Every audit record is gated by Supabase RLS policies using auth.uid() matching. Cross-institution data access is structurally impossible.',
  },
  {
    icon: Lock,
    title: 'Secure Multi-Party Computation',
    badge: 'SMPC-ready',
    body: 'Architecture supports cross-lender benchmark audits where no institution sees another\'s raw portfolio — only the aggregate fairness signal.',
  },
  {
    icon: Eye,
    title: 'Differential Privacy',
    badge: 'DP-ready',
    body: 'Aggregate statistics support calibrated noise injection before cross-institution sharing, satisfying formal ε-DP guarantees.',
  },
  {
    icon: Key,
    title: 'Isolated API surface',
    badge: 'MCP-scoped',
    body: 'The MCP endpoint exposes only aggregated telemetry. Auditing agents receive fairness signals — never individual applicant records.',
  },
  {
    icon: Users,
    title: 'ECOA data minimisation',
    badge: 'Reg B',
    body: 'Protected-class columns are used solely to compute group-level statistics, consistent with ECOA data collection rules. Never used as model inputs.',
  },
];

export default function PrivacyMoat() {
  return (
    <section className="px-8 py-20 border-t border-[#1E2635]">
      <div className="max-w-5xl mx-auto">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#6E788A] mb-4">Privacy architecture</p>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <h2 className="font-serif text-[clamp(26px,3.5vw,40px)] leading-[1.15] text-[#F5F7FA] max-w-xl">
            Structural data isolation at every layer.
          </h2>
          <p className="font-sans text-sm text-[#A7B0C0] max-w-xs leading-relaxed">
            Not a compliance checkbox. An architectural commitment — from the database constraint to the cryptographic primitive.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#1E2635] border border-[#1E2635] rounded-xl overflow-hidden">
          {pillars.map(({ icon: Icon, title, badge, body }) => (
            <div key={title} className="p-5 bg-[#0F131A] hover:bg-[#131926] transition-colors">
              <div className="flex items-center justify-between mb-3">
                <Icon size={16} className="text-[#6E788A]" />
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#6EA8FE] border border-[#6EA8FE]/20 bg-[#6EA8FE]/8 px-2 py-0.5 rounded-full">{badge}</span>
              </div>
              <h3 className="font-sans text-sm font-semibold text-[#F5F7FA] mb-2">{title}</h3>
              <p className="font-sans text-sm text-[#6E788A] leading-relaxed">{body}</p>
            </div>
          ))}
        </div>

        <p className="mt-6 font-mono text-[11px] text-[#6E788A] max-w-3xl leading-relaxed">
          Statistical analysis only. Noema does not provide legal advice or certify regulatory compliance. Results should be reviewed with qualified fair-lending counsel before use in examination submissions.
        </p>
      </div>
    </section>
  );
}
