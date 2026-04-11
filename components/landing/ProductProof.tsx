'use client';

import { useEffect, useRef, useState } from 'react';
import { 
  BarChart3, 
  AlertTriangle, 
  FileText, 
  Shield, 
  TrendingUp,
  Eye
} from 'lucide-react';

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

export default function ProductProof() {
  return (
    <section id="product" className="py-section bg-section-bg relative">
      <div className="max-w-content mx-auto px-6 lg:px-8">
        <AnimatedSection>
          <div className="max-w-2xl mb-16">
            <p className="font-mono text-eyebrow uppercase text-accent-blue tracking-widest mb-4">
              Platform Capabilities
            </p>
            <h2 className="font-serif text-headline text-text-primary mb-6">
              Fairness monitoring built for{' '}
              <span className="italic">regulated</span> environments.
            </h2>
            <p className="font-sans text-body-lg text-text-secondary leading-relaxed">
              NOEMA analyzes model outputs against multiple fairness definitions, 
              detects proxy variables, and generates the documentation regulators expect—
              continuously, not just at deployment.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          <AnimatedSection delay={100}>
            <CapabilityCard
              icon={<BarChart3 className="w-5 h-5" />}
              title="Disparity Detection"
              description="Monitor approval rates, pricing, and terms across protected classes using statistical tests aligned with regulatory guidance."
              metric="6+ fairness metrics"
            />
          </AnimatedSection>

          <AnimatedSection delay={150}>
            <CapabilityCard
              icon={<Eye className="w-5 h-5" />}
              title="Proxy Variable Analysis"
              description="Identify features that correlate with protected attributes. Flag zip codes, employer data, and other potential proxies before examiners do."
              metric="Correlation mapping"
            />
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <CapabilityCard
              icon={<TrendingUp className="w-5 h-5" />}
              title="Drift Monitoring"
              description="Track fairness metrics over time. Detect when model behavior shifts and impacts protected groups differently than at deployment."
              metric="Continuous monitoring"
            />
          </AnimatedSection>

          <AnimatedSection delay={250}>
            <CapabilityCard
              icon={<AlertTriangle className="w-5 h-5" />}
              title="Adverse Action Support"
              description="Generate specific, accurate reasons for denials as required under ECOA. Map model factors to compliant adverse action codes."
              metric="ECOA-aligned"
            />
          </AnimatedSection>

          <AnimatedSection delay={300}>
            <CapabilityCard
              icon={<FileText className="w-5 h-5" />}
              title="Audit Documentation"
              description="Export examination-ready reports. Document fairness testing methodology, results, and remediation steps in formats examiners recognize."
              metric="Exam-ready exports"
            />
          </AnimatedSection>

          <AnimatedSection delay={350}>
            <CapabilityCard
              icon={<Shield className="w-5 h-5" />}
              title="Policy Alignment"
              description="Configure fairness thresholds to match your institution's risk appetite and regulatory requirements. Track policy adherence over time."
              metric="Configurable rules"
            />
          </AnimatedSection>
        </div>

        <AnimatedSection delay={400}>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-b from-accent-blue/5 to-transparent rounded-xl blur-2xl" />
            
            <div className="relative bg-card-bg border border-divider rounded-lg overflow-hidden">
              <div className="p-6 lg:p-8">
                <DetailedDashboard />
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function CapabilityCard({
  icon,
  title,
  description,
  metric,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  metric: string;
}) {
  return (
    <div className="group bg-card-bg border border-divider rounded-lg p-6 hover:border-text-muted/30 transition-all duration-300 hover:shadow-card-hover">
      <div className="flex items-start justify-between mb-4">
        <div className="p-2 rounded bg-card-elevated text-text-secondary group-hover:text-accent-blue transition-colors duration-300">
          {icon}
        </div>
        <span className="font-mono text-caption text-text-muted">{metric}</span>
      </div>
      <h3 className="font-sans text-body font-medium text-text-primary mb-2">{title}</h3>
      <p className="font-sans text-body-sm text-text-muted leading-relaxed">{description}</p>
    </div>
  );
}

function DetailedDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-divider">
        <div>
          <h3 className="font-sans text-title font-medium text-text-primary mb-1">
            Model Fairness Report
          </h3>
          <p className="font-sans text-body-sm text-text-muted">
            Auto Loan Decisioning Model · Analysis Period: Q1 2026
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-3 py-1.5 rounded bg-accent-red/10 text-accent-red text-caption font-medium">
            2 Critical Findings
          </span>
          <span className="px-3 py-1.5 rounded bg-text-primary/10 text-text-secondary text-caption font-medium">
            5 Warnings
          </span>
          <span className="px-3 py-1.5 rounded bg-text-muted/10 text-text-muted text-caption">
            12 Passed
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <h4 className="font-sans text-body-sm font-medium text-text-secondary">
            Fairness Metrics Summary
          </h4>
          
          <FairnessMetricRow
            name="Demographic Parity"
            plainLabel="Equal approval rates"
            value={0.78}
            threshold={0.80}
            status="fail"
          />
          <FairnessMetricRow
            name="Equalized Odds"
            plainLabel="Equal accuracy across groups"
            value={0.91}
            threshold={0.85}
            status="pass"
          />
          <FairnessMetricRow
            name="Predictive Parity"
            plainLabel="Equal precision across groups"
            value={0.87}
            threshold={0.85}
            status="pass"
          />
          <FairnessMetricRow
            name="Calibration"
            plainLabel="Scores mean the same thing"
            value={0.82}
            threshold={0.80}
            status="pass"
          />
          <FairnessMetricRow
            name="Treatment Equality"
            plainLabel="Equal error ratios"
            value={0.76}
            threshold={0.80}
            status="fail"
          />
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-section-bg border border-border-subtle rounded-lg p-5">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-sans text-body-sm font-medium text-text-secondary">
                Approval Rate Distribution
              </h4>
              <div className="flex items-center gap-4">
                <span className="text-caption text-text-muted">By Race/Ethnicity</span>
              </div>
            </div>
            <DetailedBarChart />
          </div>

          <div className="bg-section-bg border border-border-subtle rounded-lg p-5">
            <h4 className="font-sans text-body-sm font-medium text-text-secondary mb-4">
              Proxy Variable Findings
            </h4>
            <div className="space-y-3">
              <ProxyFinding
                variable="zip_code_first_3"
                correlation={0.74}
                protectedAttr="Race"
                recommendation="Consider geographic smoothing or removal"
              />
              <ProxyFinding
                variable="employer_type"
                correlation={0.52}
                protectedAttr="Age"
                recommendation="Review feature for business necessity"
              />
              <ProxyFinding
                variable="account_age_months"
                correlation={0.48}
                protectedAttr="Age"
                recommendation="Document business justification"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FairnessMetricRow({
  name,
  plainLabel,
  value,
  threshold,
  status,
}: {
  name: string;
  plainLabel: string;
  value: number;
  threshold: number;
  status: 'pass' | 'fail' | 'warning';
}) {
  const statusStyles = {
    pass: 'bg-text-muted/10 text-text-secondary',
    fail: 'bg-accent-red/10 text-accent-red',
    warning: 'bg-text-primary/10 text-text-secondary',
  };

  return (
    <div className="bg-section-bg border border-border-subtle rounded p-3">
      <div className="flex items-start justify-between mb-1">
        <div>
          <span className="font-sans text-body-sm text-text-primary">{name}</span>
          <p className="font-sans text-caption text-text-muted">{plainLabel}</p>
        </div>
        <span className={`px-2 py-0.5 rounded text-caption ${statusStyles[status]}`}>
          {status === 'pass' ? '✓' : status === 'fail' ? '✗' : '!'}
        </span>
      </div>
      <div className="flex items-center gap-3 mt-2">
        <div className="flex-1 h-1.5 bg-card-elevated rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full ${
              status === 'pass' ? 'bg-text-muted' : status === 'fail' ? 'bg-accent-red' : 'bg-text-secondary'
            }`}
            style={{ width: `${value * 100}%` }}
          />
        </div>
        <span className="font-mono text-caption text-text-secondary w-12">
          {(value * 100).toFixed(0)}%
        </span>
      </div>
      <p className="font-mono text-caption text-text-muted mt-1">
        Threshold: {(threshold * 100).toFixed(0)}%
      </p>
    </div>
  );
}

function DetailedBarChart() {
  const data = [
    { group: 'White', approved: 71, denied: 29 },
    { group: 'Black', approved: 54, denied: 46 },
    { group: 'Hispanic', approved: 58, denied: 42 },
    { group: 'Asian', approved: 68, denied: 32 },
    { group: 'Other', approved: 62, denied: 38 },
  ];

  return (
    <div className="space-y-4">
      {data.map((item) => (
        <div key={item.group} className="flex items-center gap-4">
          <span className="font-sans text-body-sm text-text-muted w-20">{item.group}</span>
          <div className="flex-1 flex h-8 rounded overflow-hidden bg-card-elevated">
            <div
              className={`h-full ${item.approved < 60 ? 'bg-text-secondary' : 'bg-accent-blue/60'}`}
              style={{ width: `${item.approved}%` }}
            />
            <div
              className="h-full bg-accent-red/30"
              style={{ width: `${item.denied}%` }}
            />
          </div>
          <div className="flex items-center gap-4 w-32">
            <span className="font-mono text-caption text-text-secondary">
              {item.approved}%
            </span>
            <span className="font-mono text-caption text-text-muted">
              / {item.denied}%
            </span>
          </div>
        </div>
      ))}
      <div className="flex items-center gap-6 pt-3 border-t border-border-subtle">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-accent-blue/60" />
          <span className="text-caption text-text-muted">Approved (threshold met)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-text-secondary" />
          <span className="text-caption text-text-muted">Approved (below threshold)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-accent-red/30" />
          <span className="text-caption text-text-muted">Denied</span>
        </div>
      </div>
    </div>
  );
}

function ProxyFinding({
  variable,
  correlation,
  protectedAttr,
  recommendation,
}: {
  variable: string;
  correlation: number;
  protectedAttr: string;
  recommendation: string;
}) {
  const severity = correlation > 0.7 ? 'high' : correlation > 0.5 ? 'medium' : 'low';
  const severityStyles = {
    high: 'bg-accent-red/10 text-accent-red',
    medium: 'bg-text-primary/10 text-text-secondary',
    low: 'bg-text-muted/10 text-text-muted',
  };

  return (
    <div className="flex items-start justify-between p-3 bg-card-bg border border-border-subtle rounded">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-1">
          <code className="font-mono text-body-sm text-text-primary">{variable}</code>
          <span className={`px-2 py-0.5 rounded text-caption ${severityStyles[severity]}`}>
            r = {correlation.toFixed(2)} with {protectedAttr}
          </span>
        </div>
        <p className="font-sans text-caption text-text-muted">{recommendation}</p>
      </div>
    </div>
  );
}
