'use client';

import { Shield, Lock, Eye, Database, Key, Users } from 'lucide-react';

interface PillarProps {
  icon: React.ReactNode;
  title: string;
  badge: string;
  description: string;
  detail: string;
}

function Pillar({ icon, title, badge, description, detail }: PillarProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-[#2A2A2A] bg-[#141414] p-6 hover:border-[#4A7C6F]/60 transition-colors duration-300">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_100%,#4A7C6F08,transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="p-2 rounded-lg bg-[#0A0A0A] border border-[#2A2A2A] text-[#4A7C6F]">{icon}</div>
          <span className="font-mono text-[9px] tracking-widest uppercase text-[#4A7C6F] border border-[#4A7C6F]/30 bg-[#4A7C6F]/10 px-2 py-0.5 rounded-full">{badge}</span>
        </div>
        <h3 className="font-mono text-sm font-semibold text-[#F5F5F5] mb-1">{title}</h3>
        <p className="font-mono text-xs text-[#A0A0A0] mb-3 leading-relaxed">{description}</p>
        <p className="font-mono text-[10px] text-[#A0A0A0]/70 leading-relaxed border-t border-[#2A2A2A] pt-3">{detail}</p>
      </div>
    </div>
  );
}

export default function PrivacyMoat() {
  const pillars: PillarProps[] = [
    {
      icon: <Database size={18} />,
      title: 'Aggregate Results Only',
      badge: 'Zero PII',
      description: 'Raw applicant records are never stored. Only statistical aggregates — approval rates by group, correlation scores, DIR values — persist beyond the audit session.',
      detail: 'Per-applicant data is processed in memory and discarded immediately. No protected-class PII is written to any database, log, or storage bucket at any point.',
    },
    {
      icon: <Shield size={18} />,
      title: 'Row-Level Security',
      badge: 'Supabase RLS',
      description: 'Every audit record, dataset reference, and report is gated by Supabase Row-Level Security policies. Users can only access rows they own — at the database layer, not application layer.',
      detail: 'RLS policies use auth.uid() matching. The service-role key never touches the client. Cross-institution data access is structurally impossible, not merely prohibited by application logic.',
    },
    {
      icon: <Lock size={18} />,
      title: 'Secure Multi-Party Computation',
      badge: 'SMPC-ready',
      description: 'Architecture designed for cross-lender benchmark audits where no institution sees another\'s raw decision data — only the aggregate fairness signal computed under SMPC.',
      detail: 'SMPC allows peer comparison against industry DIR benchmarks without exposing individual loan portfolios. Institutions learn their relative standing, not each other\'s data.',
    },
    {
      icon: <Eye size={18} />,
      title: 'Differential Privacy',
      badge: 'DP-ready',
      description: 'Aggregate statistics are designed to support calibrated noise injection before cross-institution sharing, satisfying formal differential privacy guarantees (ε-DP).',
      detail: 'Even in the event of a data breach, ε-DP ensures no individual applicant\'s protected class or decision outcome can be reconstructed from published fairness statistics.',
    },
    {
      icon: <Key size={18} />,
      title: 'Isolated API Surface',
      badge: 'MCP-secured',
      description: 'The Model Context Protocol endpoint exposes only aggregated runtime telemetry — route status, audit latency, disparity score summaries — never individual record data.',
      detail: 'MCP read access is scoped to non-PII telemetry. Auditing agents receive fairness signals they can reason about; they cannot retrieve underlying applicant records.',
    },
    {
      icon: <Users size={18} />,
      title: 'ECOA-Aligned Data Minimization',
      badge: 'Reg B',
      description: 'Only the columns necessary for disparity analysis are used. Protected-class indicators are processed for statistical comparison only — never used as model inputs.',
      detail: 'The column mapping step intentionally separates the protected-class column from model inputs. It is used solely to compute group-level statistics, consistent with ECOA data collection rules.',
    },
  ];

  return (
    <section className="px-8 py-24 border-t border-[#2A2A2A]">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px flex-1 bg-[#2A2A2A]" />
          <p className="font-mono text-[11px] tracking-[0.15em] uppercase text-[#4A7C6F]">Privacy Architecture</p>
          <div className="h-px flex-1 bg-[#2A2A2A]" />
        </div>

        <div className="text-center mb-12">
          <h2 className="font-serif text-[clamp(28px,4vw,44px)] leading-[1.15] text-[#F5F5F5] mb-4">
            The Privacy Moat
          </h2>
          <p className="font-mono text-sm text-[#A0A0A0] max-w-xl mx-auto leading-relaxed">
            Structural data isolation at every layer — from the database constraint to the cryptographic primitive. Not a compliance checkbox. An architectural commitment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pillars.map((p) => <Pillar key={p.title} {...p} />)}
        </div>

        <div className="mt-8 p-5 rounded-xl border border-[#2A2A2A] bg-[#141414] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-sm text-[#A0A0A0] leading-relaxed max-w-xl">
            <span className="text-[#F5F5F5] font-semibold">Statistical analysis only.</span>{' '}
            Noema does not provide legal advice, certify regulatory compliance, or guarantee outcomes in regulatory examinations. Results should be reviewed with qualified fair lending counsel.
          </p>
          <div className="flex gap-3 shrink-0">
            {['SOC 2 ready', 'ECOA-aligned', 'RLS-enforced'].map((tag) => (
              <span key={tag} className="px-3 py-1.5 font-mono text-[10px] text-[#4A7C6F] border border-[#4A7C6F]/30 bg-[#4A7C6F]/10 rounded-full whitespace-nowrap">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
