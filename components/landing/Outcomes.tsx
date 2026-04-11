'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Clock, FileCheck, ShieldCheck, TrendingDown } from 'lucide-react';

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

function AnimatedNumber({ 
  value, 
  suffix = '', 
  prefix = '' 
}: { 
  value: number; 
  suffix?: string; 
  prefix?: string;
}) {
  const [displayValue, setDisplayValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 1500;
    const steps = 60;
    const stepValue = value / steps;
    let current = 0;

    const interval = setInterval(() => {
      current += stepValue;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(interval);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, [isVisible, value]);

  return (
    <span ref={ref}>
      {prefix}{displayValue}{suffix}
    </span>
  );
}

export default function Outcomes() {
  return (
    <section className="py-section bg-page-bg relative">
      <div className="max-w-content mx-auto px-6 lg:px-8">
        <AnimatedSection>
          <div className="max-w-2xl mb-16">
            <p className="font-mono text-eyebrow uppercase text-accent-gold tracking-widest mb-4">
              Business Impact
            </p>
            <h2 className="font-serif text-headline text-text-primary mb-6">
              Fairness infrastructure that{' '}
              <span className="italic">compounds</span>.
            </h2>
            <p className="font-sans text-body-lg text-text-secondary leading-relaxed">
              The cost of reactive compliance compounds too. NOEMA shifts model governance 
              from examination response to continuous monitoring—reducing remediation costs, 
              accelerating approvals, and building examiner confidence over time.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          <AnimatedSection delay={100}>
            <ImpactCard
              icon={<Clock className="w-5 h-5" />}
              value={<AnimatedNumber value={85} suffix="%" />}
              label="Reduction in audit prep time"
              description="Pre-built documentation eliminates last-minute examination scrambles"
            />
          </AnimatedSection>

          <AnimatedSection delay={150}>
            <ImpactCard
              icon={<TrendingDown className="w-5 h-5" />}
              value={<AnimatedNumber value={60} suffix="%" />}
              label="Fewer remediation cycles"
              description="Catch issues before deployment, not during examination"
            />
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <ImpactCard
              icon={<FileCheck className="w-5 h-5" />}
              value={<AnimatedNumber value={3} suffix="x" />}
              label="Faster model approvals"
              description="Clear documentation and testing history accelerates review cycles"
            />
          </AnimatedSection>

          <AnimatedSection delay={250}>
            <ImpactCard
              icon={<ShieldCheck className="w-5 h-5" />}
              value="Continuous"
              label="Monitoring coverage"
              description="Not just at deployment—ongoing fairness verification through production"
            />
          </AnimatedSection>
        </div>

        <AnimatedSection delay={300}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-card-bg border border-divider rounded-lg p-8">
              <div className="flex items-center gap-2 mb-6">
                <span className="px-2 py-1 rounded bg-accent-red/10 text-accent-red text-caption font-medium">
                  Regulatory Pressure
                </span>
              </div>
              <h3 className="font-serif text-title text-text-primary mb-4">
                The compliance gap is widening.
              </h3>
              <p className="font-sans text-body text-text-secondary mb-6 leading-relaxed">
                AI lending models are deployed faster than compliance teams can evaluate them. 
                Traditional fair lending tools assume manual review cycles that do not match 
                modern deployment velocity.
              </p>
              <ul className="space-y-3">
                <EvidenceItem>
                  CFPB issued 2024 guidance explicitly addressing algorithmic discrimination
                </EvidenceItem>
                <EvidenceItem>
                  State AGs increasingly targeting AI-specific fair lending violations
                </EvidenceItem>
                <EvidenceItem>
                  Examiner expectations now include model monitoring documentation
                </EvidenceItem>
              </ul>
            </div>

            <div className="bg-card-bg border border-divider rounded-lg p-8">
              <div className="flex items-center gap-2 mb-6">
                <span className="px-2 py-1 rounded bg-accent-gold/10 text-accent-gold text-caption font-medium">
                  Industry Context
                </span>
              </div>
              <h3 className="font-serif text-title text-text-primary mb-4">
                Settlements are accelerating.
              </h3>
              <p className="font-sans text-body text-text-secondary mb-6 leading-relaxed">
                Recent enforcement actions demonstrate that we did not know is not an 
                acceptable defense for algorithmic discrimination in lending decisions.
              </p>
              <ul className="space-y-3">
                <EvidenceItem>
                  $2.5M Massachusetts AG settlement against AI student loan servicer (2025)
                </EvidenceItem>
                <EvidenceItem>
                  Multiple consent orders citing inadequate model monitoring
                </EvidenceItem>
                <EvidenceItem>
                  Reputational damage often exceeds direct settlement costs
                </EvidenceItem>
              </ul>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={400}>
          <div className="mt-16 pt-16 border-t border-divider">
            <div className="max-w-3xl mx-auto text-center">
              <p className="font-serif text-title text-text-primary mb-4">
                The question is not whether to invest in fairness infrastructure.
              </p>
              <p className="font-sans text-body-lg text-text-secondary leading-relaxed">
                It is whether you invest now, with tooling designed for your models—
                or later, under enforcement pressure, with consultants billing hourly.
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function ImpactCard({
  icon,
  value,
  label,
  description,
}: {
  icon: React.ReactNode;
  value: React.ReactNode;
  label: string;
  description: string;
}) {
  return (
    <div className="bg-card-bg border border-divider rounded-lg p-6">
      <div className="p-2 rounded bg-card-elevated text-text-muted w-fit mb-4">
        {icon}
      </div>
      <div className="font-serif text-stat text-accent-gold mb-2">{value}</div>
      <p className="font-sans text-body font-medium text-text-primary mb-2">{label}</p>
      <p className="font-sans text-body-sm text-text-muted leading-relaxed">{description}</p>
    </div>
  );
}

function EvidenceItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <ArrowUpRight className="w-4 h-4 text-text-muted mt-1 flex-shrink-0" />
      <span className="font-sans text-body-sm text-text-muted leading-relaxed">{children}</span>
    </li>
  );
}
