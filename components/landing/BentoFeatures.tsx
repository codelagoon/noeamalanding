'use client';

import { Shield, Zap, Search, TrendingDown, FileText, Lock } from 'lucide-react';
import NumberTicker from '@/components/magicui/NumberTicker';

interface BentoCardProps {
  className?: string;
  children: React.ReactNode;
}

function BentoCard({ className = '', children }: BentoCardProps) {
  return (
    <div className={`bento-card p-6 group hover:border-[#4A7C6F]/50 transition-colors duration-300 ${className}`}>
      {children}
    </div>
  );
}

/* Mini DIR gauge — pure SVG, no external deps */
function MiniDIRGauge({ value }: { value: number }) {
  const angle = -135 + value * 270;
  const rad = (angle * Math.PI) / 180;
  const cx = 60; const cy = 60; const r = 44;
  const x = cx + r * Math.cos(rad);
  const y = cy + r * Math.sin(rad);
  const passes = value >= 0.8;
  return (
    <svg viewBox="0 0 120 80" className="w-full max-w-[160px] mx-auto">
      {/* track */}
      <path d="M14,68 A46,46 0 0,1 106,68" fill="none" stroke="#2A2A2A" strokeWidth="8" strokeLinecap="round" />
      {/* danger zone */}
      <path d="M14,68 A46,46 0 0,1 42,26" fill="none" stroke="#ef4444" strokeWidth="8" strokeLinecap="round" strokeOpacity="0.35" />
      {/* fill */}
      <path
        d={`M14,68 A46,46 0 ${value > 0.5 ? 1 : 0},1 ${x.toFixed(1)},${y.toFixed(1)}`}
        fill="none"
        stroke={passes ? '#4A7C6F' : '#ef4444'}
        strokeWidth="8"
        strokeLinecap="round"
      />
      {/* needle */}
      <line
        x1={cx} y1={cy}
        x2={x.toFixed(1)} y2={y.toFixed(1)}
        stroke={passes ? '#E8D5A3' : '#ef4444'}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx={cx} cy={cy} r="4" fill={passes ? '#E8D5A3' : '#ef4444'} />
      {/* labels */}
      <text x="10" y="78" fill="#A0A0A0" fontSize="7" fontFamily="monospace">0.0</text>
      <text x="92" y="78" fill="#A0A0A0" fontSize="7" fontFamily="monospace">1.0</text>
      <text x="46" y="14" fill="#ef4444" fontSize="6" fontFamily="monospace">0.8 rule</text>
      <text x="32" y="58" fill={passes ? '#4A7C6F' : '#ef4444'} fontSize="11" fontFamily="monospace" fontWeight="bold">{value.toFixed(2)}</text>
    </svg>
  );
}

/* Mini fairness drift sparkline */
function DriftSparkline() {
  const points = [0.91, 0.89, 0.87, 0.85, 0.83, 0.81, 0.79, 0.77];
  const w = 200; const h = 60; const pad = 8;
  const minY = 0.72; const maxY = 0.95;
  const pts = points.map((v, i) => {
    const x = pad + (i / (points.length - 1)) * (w - 2 * pad);
    const y = h - pad - ((v - minY) / (maxY - minY)) * (h - 2 * pad);
    return `${x},${y}`;
  }).join(' ');
  const lastPt = pts.split(' ').pop()!;
  const [lx, ly] = lastPt.split(',').map(Number);

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
      {/* 0.8 threshold line */}
      <line
        x1={pad} y1={h - pad - ((0.8 - minY) / (maxY - minY)) * (h - 2 * pad)}
        x2={w - pad} y2={h - pad - ((0.8 - minY) / (maxY - minY)) * (h - 2 * pad)}
        stroke="#ef4444" strokeWidth="1" strokeDasharray="4,3" strokeOpacity="0.5"
      />
      <text x={w - pad - 2} y={h - pad - ((0.8 - minY) / (maxY - minY)) * (h - 2 * pad) - 3} fill="#ef4444" fontSize="7" fontFamily="monospace" textAnchor="end">0.80</text>
      <polyline points={pts} fill="none" stroke="#4A7C6F" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      {/* breach indicator */}
      <circle cx={lx} cy={ly} r="4" fill="#ef4444" />
      <circle cx={lx} cy={ly} r="7" fill="none" stroke="#ef4444" strokeWidth="1" strokeOpacity="0.5" className="animate-ping" style={{ transformOrigin: `${lx}px ${ly}px` }} />
    </svg>
  );
}

export default function BentoFeatures() {
  return (
    <section className="px-8 py-24 border-t border-[#2A2A2A]">
      <div className="max-w-6xl mx-auto">
        <p className="font-mono text-[11px] tracking-[0.15em] uppercase text-[#A0A0A0] mb-4">Platform Capabilities</p>
        <h2 className="font-serif text-[clamp(28px,4vw,44px)] leading-[1.15] text-[#F5F5F5] mb-12 max-w-2xl">
          Every fairness signal your compliance team needs, automated.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-auto">

          {/* Card 1 — DIR Gauge (tall, spans 2 rows) */}
          <BentoCard className="md:row-span-2 flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <Zap size={16} className="text-[#4A7C6F]" />
              <p className="font-mono text-xs font-semibold text-[#A0A0A0] uppercase tracking-wider">Real-time DIR Gauge</p>
            </div>
            <p className="font-mono text-sm text-[#F5F5F5] font-semibold mb-2">Disparate Impact Ratio</p>
            <p className="font-mono text-xs text-[#A0A0A0] mb-6 leading-relaxed">
              Computed sub-500ms on upload. DIR below 0.80 triggers the four-fifths rule alert instantly — before your examiner sees it.
            </p>
            <div className="flex-1 flex flex-col items-center justify-center">
              <MiniDIRGauge value={0.77} />
              <div className="mt-4 w-full px-2 py-2 bg-red-900/20 border border-red-800/40 rounded-lg">
                <p className="font-mono text-xs text-red-400 text-center font-semibold">⚠ Four-fifths rule failure · DIR 0.77</p>
              </div>
            </div>
            <p className="mt-5 font-mono text-[10px] text-[#A0A0A0] leading-relaxed">
              Plain-language label alongside technical metric — required for CFPB examination narratives.
            </p>
          </BentoCard>

          {/* Card 2 — Fairness Drift */}
          <BentoCard className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <TrendingDown size={16} className="text-[#E8D5A3]" />
              <p className="font-mono text-xs font-semibold text-[#A0A0A0] uppercase tracking-wider">Fairness Drift Detection</p>
            </div>
            <p className="font-mono text-sm text-[#F5F5F5] font-semibold mb-1">DIR trending toward threshold breach</p>
            <p className="font-mono text-xs text-[#A0A0A0] mb-4 leading-relaxed">
              Quarterly cadence monitoring. Equitable performance at launch decays — Noema surfaces drift before it becomes a consent order.
            </p>
            <DriftSparkline />
            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#4A7C6F]" />
                <span className="font-mono text-[10px] text-[#A0A0A0]">DIR over 8 quarters</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-4 bg-red-500 opacity-50" style={{ display: 'inline-block' }} />
                <span className="font-mono text-[10px] text-[#A0A0A0]">0.80 four-fifths threshold</span>
              </div>
              <div className="flex items-center gap-1.5 ml-auto">
                <span className="h-2 w-2 rounded-full bg-red-400 animate-pulse" />
                <span className="font-mono text-[10px] text-red-400 font-semibold">Breach detected Q8</span>
              </div>
            </div>
          </BentoCard>

          {/* Card 3 — Proxy Reconstruction Risk */}
          <BentoCard>
            <div className="flex items-center gap-2 mb-3">
              <Search size={16} className="text-[#4A7C6F]" />
              <p className="font-mono text-xs font-semibold text-[#A0A0A0] uppercase tracking-wider">Proxy Detection</p>
            </div>
            <p className="font-mono text-sm text-[#F5F5F5] font-semibold mb-2">Reconstruction Risk Flagging</p>
            <div className="space-y-2 mt-3">
              {[
                { name: 'credit_score', level: 'High', risk: true, score: 0.81 },
                { name: 'income', level: 'High', risk: true, score: 0.63 },
                { name: 'dti', level: 'Medium', risk: false, score: 0.29 },
              ].map(({ name, level, risk, score }) => (
                <div key={name} className="flex items-center justify-between p-2 rounded-lg bg-[#0A0A0A] border border-[#2A2A2A]">
                  <div>
                    <span className="font-mono text-xs font-semibold text-[#F5F5F5]">{name}</span>
                    {risk && <span className="ml-2 font-mono text-[9px] text-amber-400">⚠ reconstruction risk</span>}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1 w-16 bg-[#2A2A2A] rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${level === 'High' ? 'bg-red-400' : 'bg-amber-400'}`} style={{ width: `${score * 100}%` }} />
                    </div>
                    <span className="font-mono text-[10px] text-[#A0A0A0]">{score.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-3 font-mono text-[10px] text-[#A0A0A0] leading-relaxed">
              Gillis &amp; Spiess (2019): models reconstruct dropped proxies from remaining features. Removal requires post-retrain disparity testing.
            </p>
          </BentoCard>

          {/* Card 4 — LDA */}
          <BentoCard>
            <div className="flex items-center gap-2 mb-3">
              <FileText size={16} className="text-[#E8D5A3]" />
              <p className="font-mono text-xs font-semibold text-[#A0A0A0] uppercase tracking-wider">LDA Generator</p>
            </div>
            <p className="font-mono text-sm text-[#F5F5F5] font-semibold mb-2">Less Discriminatory Alternatives</p>
            <div className="space-y-2">
              {[
                { name: 'Cash-flow + Rental History', reduction: 4.1, source: 'Urban Institute 2021' },
                { name: 'Threshold Recalibration', reduction: 3.3, source: 'Chouldechova 2017' },
              ].map(({ name, reduction, source }) => (
                <div key={name} className="p-3 rounded-lg border border-[#2A2A2A] bg-[#0A0A0A]">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-[#F5F5F5] font-semibold">{name}</span>
                    <span className="font-mono text-xs text-[#4A7C6F] font-bold">-{reduction}pp</span>
                  </div>
                  <p className="font-mono text-[9px] text-[#A0A0A0] mt-0.5">{source}</p>
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-2">
              <span className="font-mono text-[10px] text-[#A0A0A0]">Avg approval increase with alt data:</span>
              <span className="font-mono text-xs text-[#4A7C6F] font-bold">
                <NumberTicker value={21} suffix="%" delay={0.5} />
              </span>
            </div>
          </BentoCard>

          {/* Card 5 — Sub-500ms badge */}
          <BentoCard className="md:col-span-2 flex flex-col justify-between">
            <div className="flex items-center gap-2 mb-3">
              <Shield size={16} className="text-[#4A7C6F]" />
              <p className="font-mono text-xs font-semibold text-[#A0A0A0] uppercase tracking-wider">Audit Performance</p>
            </div>
            <div className="flex items-end gap-8">
              <div>
                <p className="font-mono font-bold text-[#E8D5A3] text-5xl mb-1">
                  <NumberTicker value={487} suffix="ms" delay={0.2} />
                </p>
                <p className="font-mono text-xs text-[#A0A0A0]">median end-to-end audit latency</p>
              </div>
              <div className="flex-1 h-px bg-[#2A2A2A]" />
              <div className="text-right">
                <p className="font-mono text-[#F5F5F5] font-bold text-2xl mb-1">5 sections</p>
                <p className="font-mono text-xs text-[#A0A0A0]">DIR · Proxy · Adverse Action · LDA · Remediation</p>
              </div>
            </div>
            <div className="mt-4 flex gap-2 flex-wrap">
              {['ECOA', 'Reg B', 'CFPB 2022-03', 'EEOC Four-Fifths', 'Fair Housing Act'].map((tag) => (
                <span key={tag} className="px-2 py-1 rounded-[4px] border border-[#2A2A2A] bg-[#0A0A0A] font-mono text-[10px] text-[#A0A0A0]">{tag}</span>
              ))}
            </div>
          </BentoCard>

          {/* Card 6 — RLS Privacy */}
          <BentoCard>
            <div className="flex items-center gap-2 mb-3">
              <Lock size={16} className="text-[#4A7C6F]" />
              <p className="font-mono text-xs font-semibold text-[#A0A0A0] uppercase tracking-wider">Privacy Moat</p>
            </div>
            <p className="font-mono text-sm text-[#F5F5F5] font-semibold mb-2">Aggregate-only. No PII stored.</p>
            <div className="space-y-2">
              {['Supabase Row-Level Security', 'Aggregate results only', 'No protected-class PII retained'].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <span className="text-[#4A7C6F] text-xs">✓</span>
                  <span className="font-mono text-xs text-[#A0A0A0]">{item}</span>
                </div>
              ))}
            </div>
          </BentoCard>

        </div>
      </div>
    </section>
  );
}
