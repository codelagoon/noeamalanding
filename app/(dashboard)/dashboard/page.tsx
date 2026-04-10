'use client';

import { useState } from 'react';
import Link from 'next/link';
import DIRGauge from '@/components/dashboard/DIRGauge';
import FairnessDrift from '@/components/dashboard/FairnessDrift';
import MetricCard from '@/components/dashboard/MetricCard';
import { FileText, TrendingUp, AlertTriangle, Shield, Zap, ExternalLink } from 'lucide-react';

const mockDriftData = [
  { quarter: 'Q1', dir: 0.91 },
  { quarter: 'Q2', dir: 0.89 },
  { quarter: 'Q3', dir: 0.87 },
  { quarter: 'Q4', dir: 0.85 },
  { quarter: 'Q5', dir: 0.83 },
  { quarter: 'Q6', dir: 0.81 },
  { quarter: 'Q7', dir: 0.80 },
  { quarter: 'Q8', dir: 0.77 },
];

const mcpEndpoints = [
  { method: 'GET', path: '/api/mcp', description: 'Runtime telemetry snapshot', latency: '12ms' },
  { method: 'GET', path: '/api/mcp?scope=audits', description: 'Audit summary list', latency: '18ms' },
  { method: 'GET', path: '/api/mcp?scope=routes', description: 'App route registry', latency: '8ms' },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'mcp'>('overview');

  return (
    <div className="p-6 space-y-6 bg-[#FAFAFA] min-h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-sans">Fairness Command Center</h1>
          <p className="font-mono text-xs text-gray-500 mt-0.5">
            CXO view · DIR gauge and drift alerts prioritized for maximum visibility
          </p>
        </div>
        <div className="flex gap-2">
          {(['overview', 'mcp'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-mono text-xs rounded-lg transition-colors ${
                activeTab === tab
                  ? 'bg-[#4A7C6F] text-white'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {tab === 'mcp' ? 'MCP Interface' : 'Overview'}
            </button>
          ))}
          <Link
            href="/upload"
            className="flex items-center gap-2 px-4 py-2 bg-[#4A7C6F] text-white font-mono text-xs rounded-lg hover:bg-[#3d6b5f] transition-colors"
          >
            <Zap size={14} />
            New Audit
          </Link>
        </div>
      </div>

      {activeTab === 'overview' && (
        <>
          {/* TOP ROW: CXO primary signals */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

            {/* TOP-LEFT QUADRANT: DIR Gauge + Fairness Drift — CXO priority */}
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* DIR Gauge */}
              <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                  <p className="font-mono text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Disparate Impact Ratio
                  </p>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center">
                  <DIRGauge value={0.77} label="Most recent audit · Hispanic vs White" />
                </div>
                <p className="mt-3 font-mono text-[10px] text-gray-400 leading-relaxed text-center">
                  Four-fifths rule (EEOC Uniform Guidelines): DIR &lt; 0.80 requires investigation and documented business necessity justification.
                </p>
              </div>

              {/* Fairness Drift */}
              <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp size={14} className="text-amber-500" />
                  <p className="font-mono text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Fairness Drift Alert
                  </p>
                </div>
                <div className="flex-1">
                  <FairnessDrift data={mockDriftData} threshold={0.8} />
                </div>
              </div>
            </div>

            {/* TOP-RIGHT: Metric summary column */}
            <div className="space-y-4">
              <MetricCard
                label="Disparity Score"
                value={62}
                subtext="0–100 scale · audit #3 · Critical"
                status="critical"
                icon={<AlertTriangle size={18} />}
              />
              <MetricCard
                label="Active Audits"
                value={3}
                subtext="1 critical · 1 review required · 1 pass"
                icon={<FileText size={18} />}
              />
              <MetricCard
                label="Proxy Variables Flagged"
                value={2}
                subtext="credit_score + income · reconstruction risk"
                status="warning"
                icon={<Shield size={18} />}
              />
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <p className="font-mono text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Quick Actions</p>
                <div className="space-y-2">
                  <Link href="/upload" className="flex items-center justify-between p-2 rounded-lg border border-gray-100 hover:border-[#4A7C6F]/30 hover:bg-[#4A7C6F]/5 transition-colors group">
                    <span className="font-mono text-xs text-gray-700">Run new audit</span>
                    <ExternalLink size={12} className="text-gray-400 group-hover:text-[#4A7C6F]" />
                  </Link>
                  <Link href="/reports" className="flex items-center justify-between p-2 rounded-lg border border-gray-100 hover:border-[#4A7C6F]/30 hover:bg-[#4A7C6F]/5 transition-colors group">
                    <span className="font-mono text-xs text-gray-700">View all reports</span>
                    <ExternalLink size={12} className="text-gray-400 group-hover:text-[#4A7C6F]" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM ROW: Recent audits placeholder + compliance checklist */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h2 className="font-sans font-bold text-gray-900 mb-4">Recent Audits</h2>
              <div className="text-center py-10">
                <FileText size={36} className="text-gray-300 mx-auto mb-3" />
                <p className="font-mono text-sm text-gray-500 mb-4">Run your first real audit to populate this panel.</p>
                <Link href="/upload" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#4A7C6F] text-white font-mono text-sm rounded-lg hover:bg-[#3d6b5f] transition-colors">
                  <Zap size={14} />
                  Upload Decision Data
                </Link>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h2 className="font-sans font-bold text-gray-900 mb-4">Compliance Coverage</h2>
              <div className="space-y-3">
                {[
                  { label: 'Disparate Impact Ratio (DIR)', covered: true, citation: 'EEOC Uniform Guidelines' },
                  { label: 'Four-Fifths Rule Screening', covered: true, citation: 'EEOC Uniform Guidelines' },
                  { label: 'Proxy Variable Detection', covered: true, citation: 'Gillis & Spiess 2019' },
                  { label: 'Reconstruction Risk Analysis', covered: true, citation: 'Research-grounded' },
                  { label: 'Adverse Action Specificity', covered: true, citation: 'CFPB Circular 2022-03' },
                  { label: 'Less Discriminatory Alternatives', covered: true, citation: 'Fuster et al. 2022' },
                  { label: 'Fairness Drift Monitoring', covered: true, citation: 'Quarterly cadence' },
                  { label: 'Cross-lender SMPC Benchmarking', covered: false, citation: 'Roadmap' },
                ].map(({ label, covered, citation }) => (
                  <div key={label} className="flex items-center gap-3">
                    <span className={`shrink-0 font-mono text-xs font-bold ${covered ? 'text-[#4A7C6F]' : 'text-gray-300'}`}>
                      {covered ? '✓' : '○'}
                    </span>
                    <span className={`font-mono text-xs flex-1 ${covered ? 'text-gray-800' : 'text-gray-400'}`}>{label}</span>
                    <span className="font-mono text-[10px] text-gray-400">{citation}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === 'mcp' && (
        <div className="space-y-5">
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-1.5 bg-[#4A7C6F]/10 border border-[#4A7C6F]/20 rounded-lg">
                <Shield size={18} className="text-[#4A7C6F]" />
              </div>
              <div>
                <h2 className="font-sans font-bold text-gray-900">Model Context Protocol Interface</h2>
                <p className="font-mono text-xs text-gray-500">Read-only aggregated telemetry for AI auditing agents. No PII. No individual records.</p>
              </div>
            </div>

            <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="font-mono text-xs font-semibold text-amber-800 mb-1">Scope limitation</p>
              <p className="font-mono text-xs text-amber-700 leading-relaxed">
                MCP endpoints expose only aggregated runtime telemetry — route status, audit latency distributions, and disparity score summaries. Individual applicant records, protected-class data, and raw decision logs are structurally inaccessible via this interface.
              </p>
            </div>

            <div className="space-y-3">
              {mcpEndpoints.map(({ method, path, description, latency }) => (
                <div key={path} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg bg-[#FAFAFA] hover:border-[#4A7C6F]/30 transition-colors group">
                  <span className="font-mono text-xs font-bold text-[#4A7C6F] w-10 shrink-0">{method}</span>
                  <code className="font-mono text-sm text-gray-900 flex-1">{path}</code>
                  <span className="font-mono text-xs text-gray-500 flex-1">{description}</span>
                  <span className="font-mono text-xs text-[#4A7C6F] font-semibold w-16 text-right">{latency}</span>
                  <a
                    href={path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ExternalLink size={14} className="text-[#4A7C6F]" />
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="font-sans font-bold text-gray-900 mb-3">Example MCP Response</h3>
            <pre className="bg-[#0A0A0A] text-[#F5F5F5] p-4 rounded-lg text-xs font-mono overflow-x-auto leading-relaxed">
{`{
  "schema": "noema-mcp-v1",
  "generated_at": "2026-04-10T00:00:00Z",
  "scope": "aggregate_telemetry_only",
  "pii_present": false,
  "routes": {
    "total": 10,
    "dynamic": 3,
    "static": 7
  },
  "audits": {
    "total": 3,
    "critical": 1,
    "review_required": 1,
    "pass": 1,
    "latest_dir": 0.77,
    "four_fifths_failures": 1,
    "median_audit_latency_ms": 487
  },
  "fairness_drift": {
    "quarters_monitored": 8,
    "breach_detected": true,
    "breach_quarter": "Q8",
    "dir_at_breach": 0.77
  }
}`}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
