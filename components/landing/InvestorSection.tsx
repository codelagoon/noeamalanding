'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, TrendingUp, Target, Shield } from 'lucide-react';

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

export default function InvestorSection() {
  return (
    <section className="py-section bg-page-bg relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-accent-gold/20 to-transparent" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent-gold/5 rounded-full blur-3xl" />

      <div className="max-w-content mx-auto px-6 lg:px-8 relative z-10">
        <AnimatedSection>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="font-mono text-eyebrow uppercase text-accent-gold tracking-widest mb-4">
              Investment Opportunity
            </p>
            <h2 className="font-serif text-headline text-text-primary mb-6">
              Join us in reshaping{' '}
              <span className="italic">AI governance</span> for financial services.
            </h2>
            <p className="font-sans text-body-lg text-text-secondary leading-relaxed">
              Avarent is at the intersection of regulatory urgency, AI adoption, and institutional risk. 
              Early investors gain exposure to a massive market opportunity in model governance—a category 
              that will define the next decade of financial technology.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <InvestorCard
              icon={<TrendingUp className="w-6 h-6" />}
              title="Massive TAM"
              description="$10B+ addressable market in AI risk management across regulated lending, insurance, and capital markets."
              stat="$2.5M"
              statLabel="Recent settlement (2025)"
            />
            <InvestorCard
              icon={<Target className="w-6 h-6" />}
              title="Regulatory Tailwinds"
              description="ECOA, FCRA, and emerging AI regulations create mandatory compliance requirements for every lender."
              stat="100%"
              statLabel="Addressable market affected"
            />
            <InvestorCard
              icon={<Shield className="w-6 h-6" />}
              title="Defensible Moat"
              description="First-mover advantage in fairness auditing. Deep regulatory expertise and institutional trust are hard to replicate."
              stat="Early"
              statLabel="Market position"
            />
          </div>
        </AnimatedSection>

        <AnimatedSection delay={300}>
          <div className="bg-card-bg border border-divider rounded-lg p-8 lg:p-12 mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h3 className="font-sans text-title text-text-primary mb-6">
                  Why Invest Now
                </h3>
                <ul className="space-y-4">
                  {[
                    'Regulatory pressure is accelerating—institutions need solutions immediately',
                    'Avarent is pre-revenue but with strong product-market fit signals',
                    'Founding team has deep fintech and AI governance experience',
                    'Capital enables rapid go-to-market and team expansion',
                    'Early investors gain strategic board seat and advisory opportunities',
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-accent-gold/20 border border-accent-gold flex items-center justify-center mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-accent-gold" />
                      </div>
                      <span className="font-sans text-body text-text-secondary">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-sans text-title text-text-primary mb-6">
                  Investment Details
                </h3>
                <div className="space-y-6">
                  <div>
                    <p className="font-mono text-caption text-text-muted uppercase tracking-wider mb-2">
                      Round
                    </p>
                    <p className="font-sans text-body text-text-primary">Seed Round (SAFE/Equity)</p>
                  </div>
                  <div>
                    <p className="font-mono text-caption text-text-muted uppercase tracking-wider mb-2">
                      Minimum Check
                    </p>
                    <p className="font-sans text-body text-text-primary">$50K - $500K</p>
                  </div>
                  <div>
                    <p className="font-mono text-caption text-text-muted uppercase tracking-wider mb-2">
                      Use of Capital
                    </p>
                    <p className="font-sans text-body text-text-secondary">
                      Product development, go-to-market, regulatory partnerships, and team expansion.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-divider">
                    <p className="font-mono text-caption text-text-muted uppercase tracking-wider mb-4">
                      Next Steps
                    </p>
                    <Button asChild size="lg" className="w-full group">
                      <a href="mailto:investors@avarent.app">
                        Schedule Investor Call
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={400}>
          <div className="text-center">
            <p className="font-sans text-body text-text-secondary mb-6">
              Interested in learning more about Avarent's vision and investment opportunity?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="group">
                <a href="mailto:investors@avarent.app">
                  Become an Early Investor
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </a>
              </Button>
              <Button variant="outline" asChild size="lg">
                <a href="mailto:investors@avarent.app">Download Deck</a>
              </Button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function InvestorCard({ 
  icon, 
  title, 
  description, 
  stat, 
  statLabel 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  stat: string;
  statLabel: string;
}) {
  return (
    <div className="bg-card-bg border border-divider rounded-lg p-6 flex flex-col">
      <div className="w-10 h-10 rounded-lg bg-accent-gold/10 flex items-center justify-center mb-4 text-accent-gold">
        {icon}
      </div>
      <h3 className="font-sans text-body font-medium text-text-primary mb-3">{title}</h3>
      <p className="font-sans text-body-sm text-text-muted mb-6 flex-grow leading-relaxed">
        {description}
      </p>
      <div className="pt-4 border-t border-divider">
        <p className="font-serif text-title text-accent-gold mb-1">{stat}</p>
        <p className="font-sans text-caption text-text-muted">{statLabel}</p>
      </div>
    </div>
  );
}
