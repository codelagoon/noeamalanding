import Hero from '@/components/landing/Hero';
import BentoFeatures from '@/components/landing/BentoFeatures';
import Problem from '@/components/landing/Problem';
import HowItWorks from '@/components/landing/HowItWorks';
import WhoItsFor from '@/components/landing/WhoItsFor';
import PrivacyMoat from '@/components/landing/PrivacyMoat';
import CTA from '@/components/landing/CTA';
import Footer from '@/components/landing/Footer';

export default function LandingPage() {
  return (
    <main>
      <Hero />
      <BentoFeatures />
      <Problem />
      <HowItWorks />
      <WhoItsFor />
      <PrivacyMoat />
      <CTA />
      <Footer />
    </main>
  );
}
