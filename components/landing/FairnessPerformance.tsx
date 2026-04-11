'use client';

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

export default function FairnessPerformance() {
  return (
    <section className="py-section bg-section-bg relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-text-primary/20 to-transparent" />

      <div className="max-w-content mx-auto px-6 lg:px-8">
        <AnimatedSection>
          <div className="max-w-2xl mx-auto text-center mb-16">
            <p className="font-mono text-eyebrow uppercase text-accent-blue tracking-widest mb-4">
              The Trade-off Myth
            </p>
            <h2 className="font-serif text-headline text-text-primary mb-6">
              Fairness and performance are{' '}
              <span className="italic">not</span> mutually exclusive.
            </h2>
            <p className="font-sans text-body-lg text-text-secondary leading-relaxed">
              Research consistently shows that well-designed fairness constraints often improve 
              model robustness. NOEMA helps you find the interventions that satisfy regulatory 
              requirements with minimal impact on predictive accuracy.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <div className="bg-card-bg border border-divider rounded-lg p-6 lg:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div>
                <h3 className="font-sans text-body font-medium text-text-primary mb-6">
                  Fairness-Performance Frontier
                </h3>
                <ParetoChart />
                <p className="font-sans text-body-sm text-text-muted mt-4 leading-relaxed">
                  Each point represents a model configuration. NOEMA identifies options along 
                  the efficient frontier—maximizing fairness for a given performance level.
                </p>
              </div>

              <div>
                <h3 className="font-sans text-body font-medium text-text-primary mb-6">
                  Intervention Impact Analysis
                </h3>
                <InterventionTable />
                <p className="font-sans text-body-sm text-text-muted mt-4 leading-relaxed">
                  Compare specific remediation strategies and their effect on both 
                  fairness metrics and model performance.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={300}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <InsightCard
              number="01"
              title="Identify low-cost wins"
              description="Many fairness improvements have negligible performance impact. NOEMA surfaces these opportunities first."
            />
            <InsightCard
              number="02"
              title="Quantify trade-offs"
              description="When trade-offs exist, understand them precisely. Know exactly what you are gaining and giving up."
            />
            <InsightCard
              number="03"
              title="Document decisions"
              description="Whatever you choose, maintain audit-ready documentation of your analysis and rationale."
            />
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function ParetoChart() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  // Frontier points (optimal trade-off curve)
  const frontierPoints = [
    { x: 15, y: 92 },
    { x: 28, y: 91 },
    { x: 40, y: 90 },
    { x: 52, y: 89 },
    { x: 64, y: 87 },
    { x: 74, y: 84 },
    { x: 82, y: 80 },
    { x: 88, y: 75 },
  ];

  // All data points
  const allPoints = [
    // Frontier points
    ...frontierPoints.map((p) => ({ ...p, frontier: true, label: '' })),
    // Suboptimal points (below frontier)
    { x: 25, y: 85, frontier: false, label: '' },
    { x: 35, y: 83, frontier: false, label: '' },
    { x: 45, y: 82, frontier: false, label: '' },
    { x: 55, y: 80, frontier: false, label: '' },
    { x: 65, y: 78, frontier: false, label: '' },
    { x: 70, y: 75, frontier: false, label: '' },
    { x: 30, y: 88, frontier: false, label: '' },
    { x: 50, y: 86, frontier: false, label: '' },
    { x: 75, y: 79, frontier: false, label: '' },
  ];

  // Generate smooth curve path
  const generateCurvePath = () => {
    if (frontierPoints.length < 2) return '';
    
    let path = `M ${frontierPoints[0].x} ${100 - frontierPoints[0].y}`;
    
    for (let i = 0; i < frontierPoints.length - 1; i++) {
      const current = frontierPoints[i];
      const next = frontierPoints[i + 1];
      const controlX = (current.x + next.x) / 2;
      const controlY = (100 - current.y + 100 - next.y) / 2;
      
      path += ` Q ${controlX} ${controlY} ${next.x} ${100 - next.y}`;
    }
    
    return path;
  };

  return (
    <div ref={ref} className="relative">
      <div className="aspect-square bg-section-bg border border-border-subtle rounded-lg p-6 relative overflow-hidden">
        {/* Grid lines */}
        <div className="absolute inset-6">
          {[0, 25, 50, 75, 100].map((v) => (
            <div
              key={`h-${v}`}
              className="absolute left-0 right-0 border-t border-border-subtle/40"
              style={{ top: `${100 - v}%` }}
            />
          ))}
          {[0, 25, 50, 75, 100].map((v) => (
            <div
              key={`v-${v}`}
              className="absolute top-0 bottom-0 border-l border-border-subtle/40"
              style={{ left: `${v}%` }}
            />
          ))}
        </div>

        {/* Y-axis label */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 -rotate-90 origin-center">
          <span className="font-mono text-caption text-text-muted whitespace-nowrap">
            Model Performance (AUC)
          </span>
        </div>

        {/* X-axis label */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-7">
          <span className="font-mono text-caption text-text-muted">
            Fairness Score
          </span>
        </div>

        {/* Chart SVG */}
        <svg className="absolute inset-6 overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Frontier curve */}
          <path
            d={generateCurvePath()}
            fill="none"
            stroke="#D6B25E"
            strokeWidth="2"
            strokeDasharray={isVisible ? "0" : "500"}
            strokeDashoffset={isVisible ? "0" : "500"}
            className="transition-all duration-1200 ease-out"
            style={{ transitionDelay: '200ms' }}
            vectorEffect="non-scaling-stroke"
          />

          {/* Data points */}
          {allPoints.map((point, i) => (
            <g key={i}>
              {/* Point circle */}
              <circle
                cx={point.x}
                cy={100 - point.y}
                r={point.frontier ? 2.5 : 1.8}
                fill={point.frontier ? '#D6B25E' : '#7A7A73'}
                opacity={isVisible ? 1 : 0}
                className="transition-opacity duration-500"
                style={{ transitionDelay: `${200 + i * 40}ms` }}
                vectorEffect="non-scaling-stroke"
              />
              
              {/* Glow effect for frontier points */}
              {point.frontier && (
                <circle
                  cx={point.x}
                  cy={100 - point.y}
                  r={4}
                  fill="none"
                  stroke="#D6B25E"
                  strokeWidth="0.5"
                  opacity={isVisible ? 0.3 : 0}
                  className="transition-opacity duration-500"
                  style={{ transitionDelay: `${200 + i * 40}ms` }}
                  vectorEffect="non-scaling-stroke"
                />
              )}
            </g>
          ))}
        </svg>

        {/* Axis labels */}
        <div className="absolute right-4 top-6 font-mono text-caption text-text-muted">95%</div>
        <div className="absolute right-4 bottom-6 font-mono text-caption text-text-muted">70%</div>
        <div className="absolute left-6 bottom-1 font-mono text-caption text-text-muted">0</div>
        <div className="absolute right-4 bottom-1 font-mono text-caption text-text-muted">100</div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-8 mt-6">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-accent-gold" />
          <span className="font-sans text-caption text-text-muted">Efficient frontier</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-text-muted" />
          <span className="font-sans text-caption text-text-muted">Suboptimal</span>
        </div>
      </div>
    </div>
  );
}

function InterventionTable() {
  const interventions = [
    { name: 'Baseline Model', fairness: 0.65, performance: 0.94, status: 'baseline' },
    { name: 'Remove zip code feature', fairness: 0.78, performance: 0.93, status: 'recommended' },
    { name: 'Threshold adjustment', fairness: 0.82, performance: 0.92, status: 'recommended' },
    { name: 'Reweighting + threshold', fairness: 0.88, performance: 0.90, status: 'optimal' },
    { name: 'Full feature removal', fairness: 0.91, performance: 0.85, status: 'aggressive' },
  ];

  const statusLabels: Record<string, { label: string; style: string }> = {
    baseline: { label: 'Current', style: 'bg-text-muted/10 text-text-muted' },
    recommended: { label: 'Recommended', style: 'bg-accent-blue/10 text-accent-blue' },
    optimal: { label: 'Optimal', style: 'bg-text-primary/10 text-text-primary' },
    aggressive: { label: 'Aggressive', style: 'bg-accent-red/10 text-accent-red' },
  };

  return (
    <div className="bg-section-bg border border-border-subtle rounded-lg overflow-hidden">
      <div className="grid grid-cols-12 gap-4 px-4 py-3 border-b border-border-subtle">
        <div className="col-span-5 font-mono text-caption text-text-muted uppercase tracking-wider">
          Intervention
        </div>
        <div className="col-span-2 font-mono text-caption text-text-muted uppercase tracking-wider text-right">
          Fairness
        </div>
        <div className="col-span-2 font-mono text-caption text-text-muted uppercase tracking-wider text-right">
          AUC
        </div>
        <div className="col-span-3 font-mono text-caption text-text-muted uppercase tracking-wider text-right">
          Status
        </div>
      </div>
      <div className="divide-y divide-border-subtle">
        {interventions.map((item, i) => {
          const status = statusLabels[item.status];
          return (
            <div key={i} className="grid grid-cols-12 gap-4 px-4 py-3 items-center">
              <div className="col-span-5 font-sans text-body-sm text-text-primary">
                {item.name}
              </div>
              <div className="col-span-2 font-mono text-body-sm text-text-secondary text-right">
                {(item.fairness * 100).toFixed(0)}%
              </div>
              <div className="col-span-2 font-mono text-body-sm text-text-secondary text-right">
                {(item.performance * 100).toFixed(0)}%
              </div>
              <div className="col-span-3 text-right">
                <span className={`px-2 py-0.5 rounded text-caption ${status.style}`}>
                  {status.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function InsightCard({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="bg-card-bg border border-divider rounded-lg p-6">
      <span className="font-mono text-caption text-text-secondary mb-3 block">{number}</span>
      <h3 className="font-sans text-body font-medium text-text-primary mb-2">{title}</h3>
      <p className="font-sans text-body-sm text-text-muted leading-relaxed">{description}</p>
    </div>
  );
}
