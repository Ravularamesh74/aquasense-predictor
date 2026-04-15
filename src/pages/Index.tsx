import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import LiveMonitor from "@/components/LiveMonitor";
import PredictionChart from "@/components/PredictionChart";
import ModelComparison from "@/components/ModelComparison";
import FeatureAnalysis from "@/components/FeatureAnalysis";
import ArchitectureSection from "@/components/ArchitectureSection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <HeroSection />
    <LiveMonitor />
    <PredictionChart />
    <ModelComparison />
    <FeatureAnalysis />
    <ArchitectureSection />
    <Footer />
  </div>
);

export default Index;
