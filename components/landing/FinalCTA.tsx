'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

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

export default function FinalCTA() {
  return (
    <section id="contact" className="py-section bg-section-bg relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-text-primary/[0.02] blur-3xl" />
      </div>

      <div className="max-w-content mx-auto px-6 lg:px-8 relative z-10">
        <AnimatedSection>
          <div className="max-w-3xl mx-auto text-center">
            <p className="font-mono text-eyebrow uppercase text-text-secondary tracking-widest mb-6">
              Get Started
            </p>
            
            <h2 className="font-serif text-headline text-text-primary mb-6">
              Start building fairness infrastructure{' '}
              <span className="italic">today</span>.
            </h2>
            
            <p className="font-sans text-body-lg text-text-secondary mb-10 leading-relaxed max-w-2xl mx-auto">
              Avarent is available to select institutions during our early access period. 
              Request a demo to see how continuous fairness monitoring can work for 
              your models.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button asChild size="lg" className="group">
                <a href="mailto:contact@avarent.app">
                  Request Demo
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </a>
              </Button>
              <Button variant="outline" asChild size="lg">
                <a href="mailto:contact@avarent.app">Talk to the Team</a>
              </Button>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <div className="max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12 border-t border-divider">
              <div className="text-center md:text-left">
                <h3 className="font-sans text-body font-medium text-text-primary mb-2">
                  For enterprise inquiries
                </h3>
                <p className="font-sans text-body-sm text-text-muted mb-3">
                  Discuss deployment options, custom integrations, and volume pricing.
                </p>
                <a 
                  href="mailto:enterprise@avarent.app" 
                  className="font-mono text-body-sm text-accent-blue hover:text-accent-blue/80 transition-colors duration-200"
                >
                  enterprise@avarent.app
                </a>
              </div>
              
              <div className="text-center md:text-left">
                <h3 className="font-sans text-body font-medium text-text-primary mb-2">
                  For partnership opportunities
                </h3>
                <p className="font-sans text-body-sm text-text-muted mb-3">
                  Explore integration partnerships and channel opportunities.
                </p>
                <a 
                  href="mailto:partners@avarent.app" 
                  className="font-mono text-body-sm text-accent-blue hover:text-accent-blue/80 transition-colors duration-200"
                >
                  partners@avarent.app
                </a>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
