import Hero from '@/components/landing/Hero';
import BentoFeatures from '@/components/landing/BentoFeatures';
import Problem from '@/components/landing/Problem';
import DeploymentBlueprint from '@/components/landing/DeploymentBlueprint';
import BuildVsBuy from '@/components/landing/BuildVsBuy';
import RegulatoryMatrix from '@/components/landing/RegulatoryMatrix';
import InvisiblePrime from '@/components/landing/InvisiblePrime';
import EfficiencyGauge from '@/components/landing/EfficiencyGauge';
import ThresholdSlider from '@/components/landing/ThresholdSlider';
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
      <InvisiblePrime />
      <ThresholdSlider />
      <DeploymentBlueprint />
      <EfficiencyGauge />
      <BuildVsBuy />
      <RegulatoryMatrix />
      <HowItWorks />
      <WhoItsFor />
      <PrivacyMoat />
      <CTA />
      <Footer />
    </main>
  );
}
