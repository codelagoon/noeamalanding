'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import DIRGauge from '@/components/dashboard/DIRGauge';
import FairnessDrift from '@/components/dashboard/FairnessDrift';
import MetricCard from '@/components/dashboard/MetricCard';
import StatusBadge from '@/components/dashboard/StatusBadge';
import AlertBanner from '@/components/dashboard/AlertBanner';
import { FileText, Shield, Zap, ExternalLink, RefreshCw, Filter, ChevronDown } from 'lucide-react';

// ─── Design tokens ──────────────────────────────────────────────────────────
const CARD = 'rounded-2xl border border-[#1F2E48] bg-[#0C1220]';
const CARD_PAD = 'p-6';

// ─── Animation variants ─────────────────────────────────────────────────────
const stagger = { animate: { transition: { staggerChildren: 0.08 } } };

// ─── Sub-components ──────────────────────────────────────────────────────────

function FilterChip({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#1F2E48] bg-[#0C1220] font-mono text-[10px] text-[#4A5A6A] hover:text-[#A0B0BF] hover:border-[#2A3540] transition-colors"
      >
        <Filter size={10} />
        <span className="text-[#7A8A9A]">{label}:</span>
        <span className="text-[#C0D0DF]">{value}</span>
        <ChevronDown size={9} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full mt-1 left-0 z-20 rounded-xl border border-[#1F2E48] bg-[#0C1220] shadow-xl shadow-black/50 py-1 min-w-[120px]"
        >
          {options.map((o) => (
            <button
              key={o}
              onClick={() => { onChange(o); setOpen(false); }}
              className={`w-full text-left px-3 py-1.5 font-mono text-[10px] transition-colors ${o === value ? 'text-[#6366F1]' : 'text-[#4A5A6A] hover:text-[#A0B0BF] hover:bg-[#101828]'}`}
            >
              {o}
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
}

function SectionCard({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{ boxShadow: '0 0 0 1px rgba(74,124,111,0.2), 0 8px 32px rgba(0,0,0,0.4)' }}
      className={`${CARD} ${CARD_PAD} ${className}`}
    >
      {children}
    </motion.div>
  );
}

function CardLabel({ children }: { children: React.ReactNode }) {
  return <p className="font-mono text-[10px] font-semibold text-[#4A5A6A] uppercase tracking-widest mb-1">{children}</p>;
}

function ComplianceRow({ label, covered, citation }: { label: string; covered: boolean; citation: string }) {
  return (
    <div className="flex items-center gap-3 py-2 border-b border-[#101828] last:border-0">
      <span className={`font-mono text-xs font-bold shrink-0 w-4 ${covered ? 'text-[#6366F1]' : 'text-[#2A3540]'}`}>
        {covered ? '✓' : '○'}
      </span>
      <span className={`font-mono text-xs flex-1 ${covered ? 'text-[#8A9AAA]' : 'text-[#2A3540]'}`}>{label}</span>
      <span className="font-mono text-[9px] text-[#2A3540] shrink-0">{citation}</span>
    </div>
  );
}

// ─── Mock data ────────────────────────────────────────────────────────────────
const mcpEndpoints = [
  { method: 'GET', path: '/api/mcp', description: 'Runtime telemetry snapshot', latency: '12ms' },
  { method: 'GET', path: '/api/mcp?scope=audits', description: 'Audit summary list', latency: '18ms' },
  { method: 'GET', path: '/api/mcp?scope=routes', description: 'App route registry', latency: '8ms' },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'mcp'>('overview');
  const [timeframe, setTimeframe] = useState('Last 8 Quarters');
  const [segment, setSegment] = useState('All Groups');
  const [model, setModel] = useState('v2.3.1');

  return (
    <div className="min-h-full bg-[#080D1A] text-white px-6 py-6 space-y-5">

      {/* ── Top header row ── */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="flex items-start justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="font-sans text-xl font-bold text-white tracking-tight">Fairness Command Center</h1>
            <StatusBadge status="critical" label="DIR 0.77 — Breach" pulse />
          </div>
          <div className="flex items-center gap-4 font-mono text-[10px] text-[#3A4A5A]">
            <span>Last audit: <span className="text-[#5A6A7A]">Apr 10, 2026 · 14:32 UTC</span></span>
            <span>Model: <span className="text-[#5A6A7A]">v2.3.1</span></span>
            <span>Dataset: <span className="text-[#5A6A7A]">Q4 ′25 · 48,231 records</span></span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#1F2E48] bg-[#0C1220] font-mono text-[10px] text-[#4A5A6A] hover:text-[#A0B0BF] hover:border-[#2A3540] transition-colors">
            <RefreshCw size={10} />
            Refresh
          </button>

          {(['overview', 'mcp'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-4 py-1.5 font-mono text-[10px] rounded-xl transition-colors ${
                activeTab === tab
                  ? 'text-[#6366F1] bg-[#6366F1]/10 border border-[#6366F1]/25'
                  : 'text-[#4A5A6A] border border-[#1F2E48] bg-[#0C1220] hover:text-[#A0B0BF]'
              }`}
            >
              {tab === 'mcp' ? 'MCP Interface' : 'Overview'}
            </button>
          ))}

          <Link
            href="/upload"
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-[#6366F1] text-white font-mono text-[10px] font-semibold hover:bg-[#4338CA] transition-colors"
          >
            <Zap size={10} />
            New Audit
          </Link>
        </div>
      </motion.div>

      {/* ── Filter chips ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="flex items-center gap-2"
      >
        <FilterChip label="Timeframe" options={['Last 8 Quarters', 'Last 4 Quarters', 'YTD 2026', 'All Time']} value={timeframe} onChange={setTimeframe} />
        <FilterChip label="Segment" options={['All Groups', 'Race/Ethnicity', 'Gender', 'National Origin']} value={segment} onChange={setSegment} />
        <FilterChip label="Model" options={['v2.3.1', 'v2.2.0', 'v2.1.3', 'v1.9.x']} value={model} onChange={setModel} />
      </motion.div>

      {/* ── Alert banner ── */}
      <AlertBanner dir={0.77} group="Hispanic vs. White" />

      {/* ══════════════════════════════════════════════════════════════════ */}
      {activeTab === 'overview' && (
        <motion.div initial={{ opacity: 1 }} animate={{ opacity: 1 }} className="space-y-5">

          {/* Top row: DIR (tall) + Drift + metrics column */}
          <div className="grid grid-cols-12 gap-5">

            {/* DIR Gauge — top-left, 3 cols, spans 2 rows virtually */}
            <SectionCard className="col-span-12 md:col-span-3 flex flex-col gap-5" delay={0}>
              <div>
                <CardLabel>Disparate Impact Ratio</CardLabel>
                <p className="font-sans text-sm font-semibold text-white">Real-time DIR Gauge</p>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center py-2">
                <DIRGauge value={0.77} label="Hispanic vs. White · Q4 ′25" />
              </div>
              <div className="space-y-2 pt-3 border-t border-[#1F2E48]">
                {[
                  { l: 'Reference group', v: '68.4%', c: 'text-[#6366F1]' },
                  { l: 'Comparison group', v: '52.7%', c: 'text-red-400' },
                  { l: 'Absolute gap', v: '15.7pp', c: 'text-red-400' },
                ].map(({ l, v, c }) => (
                  <div key={l} className="flex justify-between items-center">
                    <span className="font-mono text-[10px] text-[#3A4A5A]">{l}</span>
                    <span className={`font-mono text-xs font-bold ${c}`}>{v}</span>
                  </div>
                ))}
              </div>
              <p className="font-mono text-[9px] text-[#2A3540] leading-relaxed">
                Bartlett et al. (2022) · 3.6M FinTech loans · plain-language label required for CFPB examinations
              </p>
            </SectionCard>

            {/* Right 9 cols: Drift + 4 metric cards */}
            <div className="col-span-12 md:col-span-9 flex flex-col gap-5">

              {/* Fairness Drift chart */}
              <SectionCard delay={0.08}>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <CardLabel>Fairness Drift Detection</CardLabel>
                    <p className="font-sans text-sm font-semibold text-white">DIR Trend — 8 Quarters</p>
                  </div>
                  <StatusBadge status="critical" label="Breach Q4 ′25" pulse />
                </div>
                <FairnessDrift />
              </SectionCard>

              {/* 4 metric cards in 2×2 */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <MetricCard label="Disparity Score" value={62} subtext="0–100 · higher = more disparity" status="critical" icon={<Shield size={16} />} animate delay={0.16} />
                <MetricCard label="Lowest DIR" value="0.77" subtext="Four-fifths rule: < 0.80" status="critical" animate={false} delay={0.2} />
                <MetricCard label="Approval Gap" value="15.7pp" subtext="Max gap across all groups" status="critical" animate={false} delay={0.24} />
                <MetricCard label="Proxy Variables" value={2} subtext="High correlation · recon. risk" status="warning" icon={<FileText size={16} />} animate delay={0.28} />
              </div>
            </div>
          </div>

          {/* Bottom row: recent audits + compliance coverage */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* Recent audits */}
            <SectionCard delay={0.32}>
              <div className="flex items-center justify-between mb-5">
                <div>
                  <CardLabel>Recent Audits</CardLabel>
                  <p className="font-sans text-sm font-semibold text-white">Audit History</p>
                </div>
                <Link href="/reports" className="flex items-center gap-1 font-mono text-[10px] text-[#6366F1] hover:text-[#818CF8] transition-colors">
                  View all <ExternalLink size={10} />
                </Link>
              </div>
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="p-4 rounded-2xl bg-[#101828] border border-[#1F2E48] mb-4">
                  <FileText size={24} className="text-[#2A3540]" />
                </div>
                <p className="font-mono text-xs text-[#3A4A5A] mb-4">Upload decision data to populate audit history</p>
                <Link
                  href="/upload"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#6366F1]/15 border border-[#6366F1]/25 text-[#6366F1] font-mono text-xs hover:bg-[#6366F1]/25 transition-colors"
                >
                  <Zap size={12} />
                  Upload Decision Data
                </Link>
              </div>
            </SectionCard>

            {/* Compliance coverage */}
            <SectionCard delay={0.36}>
              <div className="mb-4">
                <CardLabel>Compliance Coverage</CardLabel>
                <p className="font-sans text-sm font-semibold text-white">Framework Checklist</p>
              </div>
              <div>
                {[
                  { label: 'Disparate Impact Ratio (DIR)',    covered: true,  citation: 'EEOC Uniform Guidelines' },
                  { label: 'Four-Fifths Rule Screening',      covered: true,  citation: 'EEOC UG' },
                  { label: 'Proxy Variable Detection',        covered: true,  citation: 'Gillis & Spiess 2019' },
                  { label: 'Reconstruction Risk Analysis',    covered: true,  citation: 'Research-grounded' },
                  { label: 'Adverse Action Specificity',      covered: true,  citation: 'CFPB Circular 2022-03' },
                  { label: 'Less Discriminatory Alternatives',covered: true,  citation: 'Fuster et al. 2022' },
                  { label: 'Fairness Drift Monitoring',       covered: true,  citation: 'Quarterly cadence' },
                  { label: 'Cross-lender SMPC Benchmarking',  covered: false, citation: 'Roadmap' },
                ].map((r) => <ComplianceRow key={r.label} {...r} />)}
              </div>
            </SectionCard>
          </div>
        </motion.div>
      )}

      {/* ══════════════════════════════════════════════════════════════════ */}
      {activeTab === 'mcp' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="space-y-5"
        >
          <SectionCard>
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2 rounded-xl bg-[#6366F1]/10 border border-[#6366F1]/20">
                <Shield size={16} className="text-[#6366F1]" />
              </div>
              <div>
                <p className="font-sans text-sm font-semibold text-white">Model Context Protocol Interface</p>
                <p className="font-mono text-[10px] text-[#3A4A5A]">Read-only aggregated telemetry · no PII · no individual records</p>
              </div>
            </div>

            <div className="mb-5 p-4 rounded-xl border border-amber-500/15 bg-amber-500/5">
              <p className="font-mono text-[10px] font-semibold text-amber-400 mb-1">Scope limitation</p>
              <p className="font-mono text-[10px] text-amber-400/70 leading-relaxed">
                MCP endpoints expose only aggregated runtime telemetry — route status, audit latency distributions, and disparity score summaries. Individual applicant records, protected-class data, and raw decision logs are structurally inaccessible via this interface.
              </p>
            </div>

            <div className="space-y-2">
              {mcpEndpoints.map(({ method, path, description, latency }) => (
                <motion.div
                  key={path}
                  whileHover={{ x: 2 }}
                  className="flex items-center gap-4 p-3.5 rounded-xl border border-[#1F2E48] bg-[#101828] hover:border-[#6366F1]/20 transition-colors group cursor-default"
                >
                  <span className="font-mono text-[10px] font-bold text-[#6366F1] w-10 shrink-0">{method}</span>
                  <code className="font-mono text-xs text-white flex-1">{path}</code>
                  <span className="font-mono text-[10px] text-[#3A4A5A] flex-1">{description}</span>
                  <span className="font-mono text-[10px] text-[#6366F1] font-semibold w-12 text-right">{latency}</span>
                  <a href={path} target="_blank" rel="noopener noreferrer" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <ExternalLink size={12} className="text-[#6366F1]" />
                  </a>
                </motion.div>
              ))}
            </div>
          </SectionCard>

          <SectionCard>
            <p className="font-mono text-[10px] font-semibold text-[#4A5A6A] uppercase tracking-widest mb-4">Example Response</p>
            <pre className="rounded-xl bg-[#080D1A] border border-[#1F2E48] p-4 text-[10px] font-mono text-[#6A9A8A] overflow-x-auto leading-relaxed">
{`{
  "schema": "noema-mcp-v1",
  "generated_at": "2026-04-10T14:32:00Z",
  "scope": "aggregate_telemetry_only",
  "pii_present": false,
  "audits": {
    "latest_dir": 0.77,
    "four_fifths_failures": 1,
    "median_audit_latency_ms": 487
  },
  "fairness_drift": {
    "breach_detected": true,
    "breach_quarter": "Q4 '25",
    "dir_at_breach": 0.77
  }
}`}
            </pre>
          </SectionCard>
        </motion.div>
      )}
    </div>
  );
}
