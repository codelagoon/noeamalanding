'use client';

import { Shield, Globe, Calendar, AlertTriangle, CheckCircle } from 'lucide-react';

interface Jurisdiction {
  flag: string;
  region: string;
  authority: string;
  standard: string;
  requirement: string;
  deadline: string;
  riskLevel: 'immediate' | 'high' | 'medium';
  checks: string[];
  noemaSupport: string;
}

const jurisdictions: Jurisdiction[] = [
  {
    flag: '🇺🇸',
    region: 'United States',
    authority: 'CFPB Circular 2022-03',
    standard: 'Behavioral Specificity',
    requirement:
      'Every credit denial must include individualized, behaviorally specific adverse action reasons. Generic codes ("score too low") are explicitly non-compliant.',
    deadline: 'In effect now',
    riskLevel: 'immediate',
    checks: [
      'SHAP → plain-language narrative per denial',
      'DIR / four-fifths rule screening',
      'Proxy variable reconstruction risk audit',
      'Less Discriminatory Alternative documentation',
    ],
    noemaSupport: 'Fully automated — NarrativePanel generates CFPB-compliant reason codes per denial',
  },
  {
    flag: '🇪🇺',
    region: 'European Union',
    authority: 'EU AI Act — Article 10',
    standard: 'High-Risk AI System',
    requirement:
      'Credit scoring is classified as High-Risk. Operators must maintain technical documentation, conduct conformity assessments, and implement human oversight mechanisms.',
    deadline: 'August 2026',
    riskLevel: 'high',
    checks: [
      'Audit trail for every model decision',
      'Human-in-the-loop override mechanism',
      'Data governance documentation',
      'Bias testing across protected attributes',
    ],
    noemaSupport: 'Audit reports serve as conformity-assessment evidence. MCP endpoint provides machine-readable runtime telemetry for regulators.',
  },
  {
    flag: '🇬🇧',
    region: 'United Kingdom',
    authority: 'FCA Consumer Duty',
    standard: 'Good Outcomes',
    requirement:
      'Firms must demonstrate "Good Outcomes" across all consumer groups. Fairness monitoring is not optional — it is an operational requirement embedded in the Duty.',
    deadline: 'July 2023 (retail) · July 2024 (closed book)',
    riskLevel: 'immediate',
    checks: [
      'Group-level outcome measurement',
      'Vulnerable customer identification',
      'Ongoing monitoring and MI reporting',
      'Board-level attestation of fair outcomes',
    ],
    noemaSupport: 'Approval-rate disparity by demographic group, quarterly drift reports, and board-ready summary metrics.',
  },
];

const riskConfig = {
  immediate: { label: 'In Effect', bg: 'bg-red-900/30', border: 'border-red-800/50', text: 'text-red-400' },
  high:      { label: 'Deadline Approaching', bg: 'bg-amber-900/20', border: 'border-amber-800/40', text: 'text-amber-400' },
  medium:    { label: 'Monitor', bg: 'bg-blue-900/20', border: 'border-blue-800/40', text: 'text-blue-400' },
};

export default function RegulatoryMatrix() {
  return (
    <section className="px-8 py-24 border-t border-[#1F2E48]">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <Globe size={16} className="text-indigo-400" />
          <p className="font-mono text-[11px] tracking-[0.15em] uppercase text-[#7A90A8]">
            Regulatory Safe Harbor
          </p>
        </div>
        <h2 className="font-serif text-[clamp(28px,4vw,44px)] leading-[1.15] text-[#E8EDF5] mb-4 max-w-2xl">
          Global Regulatory Requirements Matrix
        </h2>
        <p className="font-mono text-sm text-[#7A90A8] mb-10 max-w-xl leading-relaxed">
          Three major jurisdictions now mandate algorithmic fairness documentation. Noema covers all of them from a single audit run.
        </p>

        <div className="space-y-4">
          {jurisdictions.map((j) => {
            const risk = riskConfig[j.riskLevel];
            return (
              <div
                key={j.region}
                className={`rounded-xl border ${risk.border} ${risk.bg} p-6 relative overflow-hidden`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left: jurisdiction identity */}
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">{j.flag}</span>
                      <div>
                        <p className="font-mono text-sm font-bold text-[#E8EDF5]">{j.region}</p>
                        <p className="font-mono text-[10px] text-[#7A90A8]">{j.authority}</p>
                      </div>
                    </div>
                    <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full border ${risk.border} mb-3`}>
                      <Calendar size={10} className={risk.text} />
                      <span className={`font-mono text-[10px] font-semibold ${risk.text}`}>{j.deadline}</span>
                    </div>
                    <p className="font-mono text-xs text-[#7A90A8] leading-relaxed">{j.requirement}</p>
                  </div>

                  {/* Middle: required checks */}
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-wider text-[#7A90A8] mb-3 flex items-center gap-1.5">
                      <AlertTriangle size={10} className={risk.text} />
                      Required evidence
                    </p>
                    <ul className="space-y-2">
                      {j.checks.map((c) => (
                        <li key={c} className="flex items-start gap-2">
                          <span className={`font-mono text-xs mt-0.5 shrink-0 ${risk.text}`}>→</span>
                          <span className="font-mono text-xs text-[#7A90A8] leading-relaxed">{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right: Noema coverage */}
                  <div className="lg:border-l lg:border-[#1F2E48] lg:pl-6">
                    <p className="font-mono text-[10px] uppercase tracking-wider text-indigo-400 mb-3 flex items-center gap-1.5">
                      <CheckCircle size={10} className="text-indigo-400" />
                      Noema coverage
                    </p>
                    <p className="font-mono text-xs text-[#7A90A8] leading-relaxed">{j.noemaSupport}</p>
                    <div className="mt-4 inline-flex items-center gap-1.5 px-2 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10">
                      <Shield size={10} className="text-indigo-400" />
                      <span className="font-mono text-[10px] font-semibold text-indigo-400">Automated audit trail</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-6 font-mono text-[10px] text-[#7A90A8] leading-relaxed max-w-3xl">
          Statistical analysis only. Noema does not provide legal advice or certify regulatory compliance. Outputs should be reviewed with qualified fair-lending counsel before use in examination submissions.
        </p>
      </div>
    </section>
  );
}
