'use client';

import { useEffect, useRef, useState } from 'react';
import { Upload, Search, AlertTriangle, FileText, CheckCircle } from 'lucide-react';

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

export default function Workflow() {
  const steps = [
    {
      number: '01',
      icon: <Upload className="w-6 h-6" />,
      title: 'Connect Your Data',
      description: 'Upload model outputs, decision data, or connect directly to your data warehouse. No model access required—Avarent works with outcomes.',
      details: ['CSV upload or API integration', 'Works with any model architecture', 'No retraining required'],
    },
    {
      number: '02',
      icon: <Search className="w-6 h-6" />,
      title: 'Run Fairness Analysis',
      description: 'Avarent computes multiple fairness metrics across protected classes, identifies proxy variables, and flags statistical anomalies.',
      details: ['Demographic parity, equalized odds, calibration', 'Proxy variable correlation analysis', 'Statistical significance testing'],
    },
    {
      number: '03',
      icon: <AlertTriangle className="w-6 h-6" />,
      title: 'Review Findings',
      description: 'Understand exactly where disparities exist, which features drive them, and what the regulatory risk level is.',
      details: ['Prioritized finding list', 'Root cause attribution', 'Risk severity classification'],
    },
    {
      number: '04',
      icon: <FileText className="w-6 h-6" />,
      title: 'Generate Documentation',
      description: 'Export examination-ready reports, adverse action reason mappings, and remediation documentation automatically.',
      details: ['PDF/HTML reports', 'Model inventory cards', 'Adverse action code mapping'],
    },
    {
      number: '05',
      icon: <CheckCircle className="w-6 h-6" />,
      title: 'Monitor Continuously',
      description: 'Track fairness metrics over time. Get alerts when drift occurs or thresholds are breached. Maintain examination readiness.',
      details: ['Automated monitoring schedules', 'Drift detection alerts', 'Threshold breach notifications'],
    },
  ];

  return (
    <section id="how-it-works" className="py-section bg-section-bg relative">
      <div className="max-w-content mx-auto px-6 lg:px-8">
        <AnimatedSection>
          <div className="max-w-2xl mb-16">
            <p className="font-mono text-eyebrow uppercase text-accent-blue tracking-widest mb-4">
              How It Works
            </p>
            <h2 className="font-serif text-headline text-text-primary mb-6">
              From data to documentation in{' '}
              <span className="italic">minutes</span>.
            </h2>
            <p className="font-sans text-body-lg text-text-secondary leading-relaxed">
              Avarent integrates into your existing workflow without requiring model access 
              or retraining. Upload decision data, run analysis, and generate the 
              documentation regulators expect.
            </p>
          </div>
        </AnimatedSection>

        <div className="relative">
          <div className="hidden lg:block absolute left-[calc(50%-1px)] top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-divider to-transparent" />

          <div className="space-y-12 lg:space-y-0">
            {steps.map((step, index) => (
              <AnimatedSection key={step.number} delay={index * 100}>
                <div className={`relative lg:grid lg:grid-cols-2 lg:gap-16 ${index % 2 === 0 ? '' : 'lg:direction-rtl'}`}>
                  <div className={`${index % 2 === 0 ? 'lg:text-right lg:pr-16' : 'lg:col-start-2 lg:pl-16'}`}>
                    <div className="bg-card-bg border border-divider rounded-lg p-6 lg:p-8">
                      <div className={`flex items-start gap-4 mb-4 ${index % 2 === 0 ? 'lg:flex-row-reverse lg:text-right' : ''}`}>
                        <div className="p-3 rounded-lg bg-card-elevated text-text-secondary">{step.icon}</div>
                        <div className={index % 2 === 0 ? 'lg:text-right' : ''}>
                          <span className="font-mono text-caption text-text-secondary block mb-1">Step {step.number}</span>
                          <h3 className="font-sans text-title font-medium text-text-primary">{step.title}</h3>
                        </div>
                      </div>
                      
                      <p className={`font-sans text-body text-text-secondary mb-4 leading-relaxed ${index % 2 === 0 ? 'lg:text-right' : ''}`}>
                        {step.description}
                      </p>

                      <ul className={`space-y-2 ${index % 2 === 0 ? 'lg:text-right' : ''}`}>
                        {step.details.map((detail, i) => (
                          <li key={i} className={`font-sans text-body-sm text-text-muted flex items-center gap-2 ${index % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}>
                            <span className="w-1 h-1 rounded-full bg-text-muted flex-shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="hidden lg:flex absolute left-1/2 top-8 -translate-x-1/2 items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-card-bg border-2 border-text-secondary/50" />
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>

        <AnimatedSection delay={500}>
          <div className="mt-20 bg-card-bg border border-divider rounded-lg p-8 text-center">
            <h3 className="font-sans text-title font-medium text-text-primary mb-4">
              Integrates with your existing stack
            </h3>
            <p className="font-sans text-body text-text-secondary mb-8 max-w-2xl mx-auto">
              Connect via API, upload files directly, or integrate with your data warehouse. 
              Avarent works with the infrastructure you already have.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8">
              <IntegrationBadge name="REST API" />
              <IntegrationBadge name="Snowflake" />
              <IntegrationBadge name="BigQuery" />
              <IntegrationBadge name="Databricks" />
              <IntegrationBadge name="S3" />
              <IntegrationBadge name="CSV / Excel" />
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function IntegrationBadge({ name }: { name: string }) {
  return (
    <div className="px-4 py-2 bg-card-elevated border border-border-subtle rounded text-text-secondary font-mono text-body-sm">
      {name}
    </div>
  );
}
