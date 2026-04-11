'use client';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 bg-page-bg border-t border-divider">
      <div className="max-w-content mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo and tagline */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <a 
              href="/" 
              className="font-serif text-xl tracking-wide text-text-primary hover:text-text-secondary transition-colors duration-200"
            >
              Avarent
            </a>
            <p className="font-sans text-body-sm text-text-muted">
              Fairness infrastructure for regulated institutions
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-8">
            <a 
              href="#product" 
              className="font-sans text-body-sm text-text-muted hover:text-text-primary transition-colors duration-200"
            >
              Product
            </a>
            <a 
              href="#governance" 
              className="font-sans text-body-sm text-text-muted hover:text-text-primary transition-colors duration-200"
            >
              Governance
            </a>
            <a 
              href="#how-it-works" 
              className="font-sans text-body-sm text-text-muted hover:text-text-primary transition-colors duration-200"
            >
              How It Works
            </a>
            <a 
              href="#contact" 
              className="font-sans text-body-sm text-text-muted hover:text-text-primary transition-colors duration-200"
            >
              Contact
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-divider flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-caption text-text-muted">
            © {currentYear} Avarent, Inc. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6">
            <a 
              href="/privacy" 
              className="font-sans text-caption text-text-muted hover:text-text-primary transition-colors duration-200"
            >
              Privacy Policy
            </a>
            <a 
              href="/terms" 
              className="font-sans text-caption text-text-muted hover:text-text-primary transition-colors duration-200"
            >
              Terms of Service
            </a>
            <a 
              href="/security" 
              className="font-sans text-caption text-text-muted hover:text-text-primary transition-colors duration-200"
            >
              Security
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
