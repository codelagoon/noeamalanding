'use client';

import { useEffect, useRef, useState } from 'react';
import { Shield, Lock, Server, Eye, Database, Key } from 'lucide-react';

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

export default function Trust() {
  return (
    <section className="py-section bg-page-bg relative">
      <div className="max-w-content mx-auto px-6 lg:px-8">
        <AnimatedSection>
          <div className="max-w-2xl mb-16">
            <p className="font-mono text-eyebrow uppercase text-accent-gold tracking-widest mb-4">
              Security and Privacy
            </p>
            <h2 className="font-serif text-headline text-text-primary mb-6">
              Built for{' '}
              <span className="italic">sensitive</span> data.
            </h2>
            <p className="font-sans text-body-lg text-text-secondary leading-relaxed">
              Lending data is among the most sensitive in financial services. NOEMA is 
              designed from the ground up for institutions with strict data governance 
              requirements.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <AnimatedSection delay={100}>
            <SecurityFeature icon={<Lock className="w-5 h-5" />} title="No PII Storage" description="NOEMA works with statistical aggregates. Raw applicant data never leaves your infrastructure—we analyze patterns, not individuals." />
          </AnimatedSection>

          <AnimatedSection delay={150}>
            <SecurityFeature icon={<Server className="w-5 h-5" />} title="Flexible Deployment" description="Deploy in your own cloud environment (VPC), on-premises, or use our hosted service. Your security team chooses the architecture." />
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <SecurityFeature icon={<Shield className="w-5 h-5" />} title="SOC 2 Type II" description="Our infrastructure and processes are independently audited. Security controls are verified, not just claimed." />
          </AnimatedSection>

          <AnimatedSection delay={250}>
            <SecurityFeature icon={<Key className="w-5 h-5" />} title="Encryption Everywhere" description="Data encrypted in transit (TLS 1.3) and at rest (AES-256). Customer-managed keys available for enterprise deployments." />
          </AnimatedSection>

          <AnimatedSection delay={300}>
            <SecurityFeature icon={<Eye className="w-5 h-5" />} title="Access Controls" description="Role-based permissions, SSO integration, and complete audit logging. Know exactly who accessed what and when." />
          </AnimatedSection>

          <AnimatedSection delay={350}>
            <SecurityFeature icon={<Database className="w-5 h-5" />} title="Data Residency" description="Choose where your data lives. US, EU, or single-tenant deployments available for institutions with geographic requirements." />
          </AnimatedSection>
        </div>

        <AnimatedSection delay={400}>
          <div className="bg-card-bg border border-divider rounded-lg overflow-hidden">
            <div className="p-6 lg:p-8 border-b border-divider">
              <h3 className="font-sans text-title font-medium text-text-primary mb-2">
                Deployment Options
              </h3>
              <p className="font-sans text-body text-text-secondary">
                Choose the deployment model that matches your security and compliance requirements.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-divider">
              <DeploymentOption name="Cloud Hosted" description="Fastest time to value. We manage infrastructure, you manage access." features={['Shared infrastructure', 'Automatic updates', 'Standard SLA']} recommended={false} />
              <DeploymentOption name="Private Cloud" description="Dedicated instance in your preferred cloud provider environment." features={['Single-tenant infrastructure', 'Your cloud account', 'Custom configuration']} recommended={true} />
              <DeploymentOption name="On-Premises" description="Deploy entirely within your own data center infrastructure." features={['Air-gapped option', 'Full data control', 'Custom integration']} recommended={false} />
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={500}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8">
            <ComplianceBadge label="SOC 2 Type II" />
            <ComplianceBadge label="GDPR Ready" />
            <ComplianceBadge label="CCPA Compliant" />
            <ComplianceBadge label="Bank-Grade Security" />
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function SecurityFeature({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-card-bg border border-divider rounded-lg p-6 group hover:border-text-muted/30 transition-all duration-300">
      <div className="p-2 rounded bg-card-elevated text-text-muted group-hover:text-accent-gold transition-colors duration-300 w-fit mb-4">
        {icon}
      </div>
      <h3 className="font-sans text-body font-medium text-text-primary mb-2">{title}</h3>
      <p className="font-sans text-body-sm text-text-muted leading-relaxed">{description}</p>
    </div>
  );
}

function DeploymentOption({ name, description, features, recommended }: { name: string; description: string; features: string[]; recommended: boolean }) {
  return (
    <div className={`p-6 lg:p-8 relative ${recommended ? 'bg-card-elevated/50' : ''}`}>
      {recommended && (
        <span className="absolute top-4 right-4 px-2 py-0.5 rounded bg-accent-gold/10 text-accent-gold text-caption">
          Popular
        </span>
      )}
      <h4 className="font-sans text-body font-medium text-text-primary mb-2">{name}</h4>
      <p className="font-sans text-body-sm text-text-secondary mb-4">{description}</p>
      <ul className="space-y-2">
        {features.map((feature, i) => (
          <li key={i} className="font-sans text-body-sm text-text-muted flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-accent-gold flex-shrink-0" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ComplianceBadge({ label }: { label: string }) {
  return (
    <div className="px-4 py-2 border border-divider rounded text-text-muted font-mono text-caption">
      {label}
    </div>
  );
}
