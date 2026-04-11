'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-page-bg/95 backdrop-blur-sm border-b border-divider' 
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-content mx-auto px-6 lg:px-8">
        <div className="h-16 lg:h-20 flex items-center justify-between">
          <a 
            href="/" 
            className="font-serif text-xl lg:text-2xl tracking-wide text-text-primary hover:text-text-secondary transition-colors duration-200"
          >
            Avarent
          </a>

          <div className="flex items-center gap-6 lg:gap-10">
            <div className="hidden md:flex items-center gap-8">
              <a
                href="#product"
                className="font-sans text-body-sm text-text-secondary hover:text-text-primary transition-colors duration-200"
              >
                Product
              </a>
              <a
                href="#governance"
                className="font-sans text-body-sm text-text-secondary hover:text-text-primary transition-colors duration-200"
              >
                Governance
              </a>
              <a
                href="#how-it-works"
                className="font-sans text-body-sm text-text-secondary hover:text-text-primary transition-colors duration-200"
              >
                How It Works
              </a>
            </div>

            <Button variant="outline" size="sm" asChild>
              <a href="#contact">Request Access</a>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
