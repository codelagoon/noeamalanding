'use client';

import { useEffect, useRef, useState } from 'react';
import { FileText, History, Scale, CheckCircle2, AlertCircle, Folder } from 'lucide-react';

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
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default function Governance() {
  return (
    <section id="governance" className="py-section bg-page-bg relative">
      <div className="max-w-content mx-auto px-6 lg:px-8">
        <AnimatedSection>
          <div className="max-w-2xl mb-16">
            <p className="font-mono text-eyebrow uppercase text-text-secondary tracking-widest mb-4">
              Governance Infrastructure
            </p>
            <h2 className="font-serif text-headline text-text-primary mb-6">
              Documentation that{' '}
              <span className="italic">examiners</span> expect.
            </h2>
            <p className="font-sans text-body-lg text-text-secondary leading-relaxed">
              Fair lending examinations require evidence: testing methodology, results history, 
              remediation documentation, and ongoing monitoring. NOEMA generates this 
              documentation automatically, in formats regulators recognize.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <AnimatedSection delay={100}>
            <div className="bg-card-bg border border-divider rounded-lg p-8 h-full">
              <div className="p-3 rounded bg-card-elevated text-text-secondary w-fit mb-6">
                <History className="w-6 h-6" />
              </div>
              <h3 className="font-sans text-title font-medium text-text-primary mb-4">
                Complete Audit Trail
              </h3>
              <p className="font-sans text-body text-text-secondary mb-6 leading-relaxed">
                Every analysis, configuration change, and finding is timestamped and 
                preserved. Demonstrate continuous monitoring to examiners with 
                immutable records.
              </p>
              <AuditTrailPreview />
            </div>
          </AnimatedSection>

          <AnimatedSection delay={150}>
            <div className="bg-card-bg border border-divider rounded-lg p-8 h-full">
              <div className="p-3 rounded bg-card-elevated text-text-secondary w-fit mb-6">
                <Scale className="w-6 h-6" />
              </div>
              <h3 className="font-sans text-title font-medium text-text-primary mb-4">
                Adverse Action Mapping
              </h3>
              <p className="font-sans text-body text-text-secondary mb-6 leading-relaxed">
                ECOA requires specific reasons for denial. NOEMA maps model decision 
                factors to compliant adverse action codes, generating defensible 
                reason statements.
              </p>
              <AdverseActionPreview />
            </div>
          </AnimatedSection>
        </div>

        <AnimatedSection delay={200}>
          <div className="mb-16">
            <h3 className="font-sans text-body font-medium text-text-primary mb-6">
              Examination-Ready Exports
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <DocumentType icon={<FileText className="w-4 h-4" />} name="Fairness Testing Report" description="Comprehensive analysis with methodology, metrics, and findings" format="PDF / HTML" />
              <DocumentType icon={<Folder className="w-4 h-4" />} name="Model Inventory Entry" description="Standardized model card for internal governance systems" format="JSON / YAML" />
              <DocumentType icon={<History className="w-4 h-4" />} name="Monitoring History" description="Time series of fairness metrics with drift alerts" format="CSV / Excel" />
              <DocumentType icon={<Scale className="w-4 h-4" />} name="Adverse Action Log" description="Denial reasons mapped to model factors" format="CSV / API" />
              <DocumentType icon={<AlertCircle className="w-4 h-4" />} name="Finding Remediation" description="Issue tracking from detection through resolution" format="PDF" />
              <DocumentType icon={<CheckCircle2 className="w-4 h-4" />} name="Policy Compliance" description="Configuration vs. institutional policy alignment" format="PDF" />
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={300}>
          <div className="bg-card-bg border border-divider rounded-lg p-8">
            <h3 className="font-sans text-body font-medium text-text-primary mb-6">
              Aligned with Regulatory Guidance
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <RegulatoryItem label="ECOA / Reg B" description="Adverse action notice requirements" />
              <RegulatoryItem label="Fair Housing Act" description="Disparate impact analysis" />
              <RegulatoryItem label="SR 11-7" description="Model risk management expectations" />
              <RegulatoryItem label="CFPB Guidance" description="Algorithmic discrimination standards" />
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function AuditTrailPreview() {
  const events = [
    { time: '2h ago', action: 'Fairness analysis completed', status: 'success' },
    { time: '1d ago', action: 'Threshold updated: Demographic Parity to 0.80', status: 'change' },
    { time: '3d ago', action: 'Alert: Proxy variable detected (zip_code)', status: 'warning' },
    { time: '1w ago', action: 'Model v2.3 registered', status: 'success' },
  ];

  return (
    <div className="bg-section-bg border border-border-subtle rounded-lg overflow-hidden">
      <div className="px-4 py-2 border-b border-border-subtle">
        <span className="font-mono text-caption text-text-muted">Recent Activity</span>
      </div>
      <div className="divide-y divide-border-subtle">
        {events.map((event, i) => (
          <div key={i} className="px-4 py-3 flex items-start gap-3">
            <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${
              event.status === 'success' ? 'bg-text-muted' :
              event.status === 'warning' ? 'bg-text-secondary' : 'bg-accent-blue'
            }`} />
            <div className="flex-1 min-w-0">
              <p className="font-sans text-body-sm text-text-primary truncate">{event.action}</p>
              <p className="font-mono text-caption text-text-muted">{event.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdverseActionPreview() {
  const mappings = [
    { factor: 'payment_history_score', weight: 'Primary', code: 'A1', reason: 'Insufficient credit history' },
    { factor: 'debt_to_income', weight: 'Secondary', code: 'B2', reason: 'Debt-to-income ratio too high' },
    { factor: 'employment_length', weight: 'Contributing', code: 'C4', reason: 'Length of employment' },
  ];

  return (
    <div className="bg-section-bg border border-border-subtle rounded-lg overflow-hidden">
      <div className="px-4 py-2 border-b border-border-subtle flex items-center justify-between">
        <span className="font-mono text-caption text-text-muted">Factor to Reason Mapping</span>
        <span className="font-mono text-caption text-text-muted">ECOA Compliant</span>
      </div>
      <div className="divide-y divide-border-subtle">
        {mappings.map((mapping, i) => (
          <div key={i} className="px-4 py-3">
            <div className="flex items-center gap-3 mb-1">
              <code className="font-mono text-caption text-text-primary">{mapping.factor}</code>
              <span className="text-text-muted">-&gt;</span>
              <span className="px-2 py-0.5 rounded bg-card-elevated text-caption text-text-secondary">{mapping.code}</span>
            </div>
            <p className="font-sans text-body-sm text-text-muted">{mapping.reason}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function DocumentType({ icon, name, description, format }: { icon: React.ReactNode; name: string; description: string; format: string }) {
  return (
    <div className="bg-card-bg border border-divider rounded-lg p-4 group hover:border-text-muted/30 transition-all duration-300">
      <div className="flex items-start justify-between mb-3">
        <div className="p-2 rounded bg-card-elevated text-text-muted group-hover:text-text-secondary transition-colors duration-300">{icon}</div>
        <span className="font-mono text-caption text-text-muted">{format}</span>
      </div>
      <h4 className="font-sans text-body-sm font-medium text-text-primary mb-1">{name}</h4>
      <p className="font-sans text-caption text-text-muted leading-relaxed">{description}</p>
    </div>
  );
}

function RegulatoryItem({ label, description }: { label: string; description: string }) {
  return (
    <div>
      <p className="font-mono text-body-sm text-text-secondary mb-1">{label}</p>
      <p className="font-sans text-body-sm text-text-muted">{description}</p>
    </div>
  );
}
