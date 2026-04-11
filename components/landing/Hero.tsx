'use client';

import { Button } from '@/components/ui/button';
import AmbientDataMarkers from '@/components/landing/AmbientDataMarkers';
import { useEffect, useRef, useState } from 'react';

function AnimatedSection({ 
  children, 
  delay = 0, 
  className = '' 
}: { 
  children: React.ReactNode; 
  delay?: number; 
  className?: string;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-6'
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center relative pt-20 pb-12 lg:pt-24 lg:pb-16 overflow-hidden">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(36, 36, 36, 0.3) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(36, 36, 36, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      <AmbientDataMarkers />

      {/* Gradient fade at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-page-bg to-transparent pointer-events-none z-[1]" />

      <div className="max-w-content mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl">
          <AnimatedSection>
            <p className="font-mono text-eyebrow uppercase text-text-secondary tracking-widest mb-6">
              Model Governance Infrastructure
            </p>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <h1 className="font-serif text-display text-text-primary mb-8 text-balance">
              Surface model bias before{' '}
              <span className="italic">regulators</span> do.
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <p className="font-sans text-body-lg text-text-secondary max-w-prose mb-10 leading-relaxed">
              Avarent provides continuous fairness monitoring, disparity detection, and 
              audit-ready documentation for AI models in regulated lending. Identify 
              proxy discrimination, generate adverse action explanations, and maintain 
              examination readiness—without rebuilding your infrastructure.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={300}>
            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <Button asChild size="lg">
                <a href="#contact">Request Early Access</a>
              </Button>
              <Button variant="outline" asChild size="lg">
                <a href="#product">See Platform Overview</a>
              </Button>
            </div>
          </AnimatedSection>
        </div>

        {/* Product screenshot preview */}
        <AnimatedSection delay={400} className="mt-8 lg:mt-12">
          <div className="relative">
            {/* Glow effect behind screenshot */}
            <div className="absolute -inset-4 bg-gradient-to-b from-text-primary/[0.04] to-transparent rounded-lg blur-2xl" />
            
            <div className="relative bg-card-bg border border-divider rounded-lg overflow-hidden shadow-card">
              {/* Browser chrome */}
              <div className="h-10 bg-card-elevated border-b border-divider flex items-center px-4 gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-text-muted/30" />
                  <div className="w-2.5 h-2.5 rounded-full bg-text-muted/30" />
                  <div className="w-2.5 h-2.5 rounded-full bg-text-muted/30" />
                </div>
                <div className="ml-4 h-6 flex-1 max-w-md bg-section-bg rounded border border-border-subtle flex items-center px-3">
                  <span className="font-mono text-caption text-text-muted">app.avarent.app/dashboard</span>
                </div>
              </div>
              
              {/* Dashboard preview content */}
              <div className="p-6 lg:p-8 bg-section-bg">
                <DashboardPreview />
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Credibility strip */}
        <AnimatedSection delay={500}>
          <div className="mt-16 lg:mt-20 pt-12 border-t border-divider">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              <CredibilityStat
                value="$2.5M"
                label="Massachusetts AG settlement against AI student loan underwriter (2025)"
              />
              <CredibilityStat
                value="ECOA"
                label="Federal law requires specific denial reasons — no algorithm exceptions"
              />
              <CredibilityStat
                value="<30 min"
                label="Full disparity audit with documentation, no examiner required"
              />
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function CredibilityStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center md:text-left">
      <p className="font-serif text-stat text-text-primary mb-3">{value}</p>
      <p className="font-sans text-body-sm text-text-muted leading-relaxed max-w-xs mx-auto md:mx-0">
        {label}
      </p>
    </div>
  );
}

function DashboardPreview() {
  return (
    <div className="space-y-6">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-sans text-body text-text-primary font-medium">Fairness Analysis</h3>
          <p className="font-sans text-body-sm text-text-muted">Consumer Loan Model v2.3 · Updated 2h ago</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded bg-accent-red/10 text-accent-red text-caption font-medium">
            3 Alerts
          </span>
          <span className="px-3 py-1 rounded bg-card-elevated text-text-secondary text-caption">
            Export Report
          </span>
        </div>
      </div>

      {/* Metrics row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Demographic Parity" value="0.82" status="warning" />
        <MetricCard label="Equalized Odds" value="0.94" status="good" />
        <MetricCard label="Proxy Risk Score" value="Low" status="good" />
        <MetricCard label="Documentation" value="97%" status="good" />
      </div>

      {/* Chart area */}
      <div className="bg-card-bg border border-border-subtle rounded p-4">
        <div className="flex items-center justify-between mb-4">
          <span className="font-sans text-body-sm text-text-secondary">Approval Rate by Protected Class</span>
          <span className="font-mono text-caption text-text-muted">Last 90 days</span>
        </div>
        <ApprovalRateChart />
      </div>

      {/* Table preview */}
      <div className="bg-card-bg border border-border-subtle rounded overflow-hidden">
        <div className="px-4 py-3 border-b border-border-subtle">
          <span className="font-sans text-body-sm text-text-secondary">Flagged Variables</span>
        </div>
        <div className="divide-y divide-border-subtle">
          <TableRow variable="zip_code" risk="High" reason="Strong correlation with race (r=0.74)" />
          <TableRow variable="employer_industry" risk="Medium" reason="Potential age proxy (p<0.05)" />
          <TableRow variable="credit_length" risk="Low" reason="Minor correlation detected" />
        </div>
      </div>
    </div>
  );
}

function MetricCard({ 
  label, 
  value, 
  status 
}: { 
  label: string; 
  value: string; 
  status: 'good' | 'warning' | 'alert';
}) {
  const statusColors = {
    good: 'text-text-primary',
    warning: 'text-accent-blue',
    alert: 'text-accent-red',
  };

  return (
    <div className="bg-card-bg border border-border-subtle rounded p-4">
      <p className="font-sans text-caption text-text-muted mb-1">{label}</p>
      <p className={`font-mono text-title font-medium ${statusColors[status]}`}>{value}</p>
    </div>
  );
}

function TableRow({ 
  variable, 
  risk, 
  reason 
}: { 
  variable: string; 
  risk: string; 
  reason: string;
}) {
  const riskColors: Record<string, string> = {
    High: 'bg-accent-red/10 text-accent-red',
    Medium: 'bg-card-elevated text-text-secondary',
    Low: 'bg-text-muted/10 text-text-muted',
  };

  return (
    <div className="px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <code className="font-mono text-body-sm text-text-primary">{variable}</code>
        <span className={`px-2 py-0.5 rounded text-caption ${riskColors[risk]}`}>
          {risk}
        </span>
      </div>
      <span className="font-sans text-caption text-text-muted">{reason}</span>
    </div>
  );
}

function ApprovalRateChart() {
  const data = [
    { group: 'White', rate: 72 },
    { group: 'Black', rate: 58 },
    { group: 'Hispanic', rate: 61 },
    { group: 'Asian', rate: 69 },
    { group: 'Other', rate: 64 },
  ];

  const maxRate = 80;

  return (
    <div className="space-y-3">
      {data.map((item) => (
        <div key={item.group} className="flex items-center gap-4">
          <span className="font-sans text-caption text-text-muted w-16">{item.group}</span>
          <div className="flex-1 h-6 bg-card-elevated rounded overflow-hidden">
            <div
              className={`h-full rounded transition-all duration-1000 ease-out ${
                item.rate < 65 ? 'bg-text-secondary/70' : 'bg-accent-blue/60'
              }`}
              style={{ width: `${(item.rate / maxRate) * 100}%` }}
            />
          </div>
          <span className="font-mono text-caption text-text-secondary w-12 text-right">
            {item.rate}%
          </span>
        </div>
      ))}
      <div className="flex items-center justify-end gap-4 mt-4 pt-2 border-t border-border-subtle">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-accent-blue/60" />
          <span className="font-sans text-caption text-text-muted">Within threshold</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-text-secondary/70" />
          <span className="font-sans text-caption text-text-muted">Review recommended</span>
        </div>
      </div>
    </div>
  );
}
