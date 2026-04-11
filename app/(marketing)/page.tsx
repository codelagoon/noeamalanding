import Hero from '@/components/landing/Hero';
import ProductProof from '@/components/landing/ProductProof';
import Outcomes from '@/components/landing/Outcomes';
import FairnessPerformance from '@/components/landing/FairnessPerformance';
import Governance from '@/components/landing/Governance';
import Workflow from '@/components/landing/Workflow';
import Trust from '@/components/landing/Trust';
import InvestorSection from '@/components/landing/InvestorSection';
import FinalCTA from '@/components/landing/FinalCTA';
import Footer from '@/components/landing/Footer';

export default function LandingPage() {
  return (
    <main>
      <Hero />
      <ProductProof />
      <Outcomes />
      <FairnessPerformance />
      <Governance />
      <Workflow />
      <Trust />
      <InvestorSection />
      <FinalCTA />
      <Footer />
    </main>
  );
}
