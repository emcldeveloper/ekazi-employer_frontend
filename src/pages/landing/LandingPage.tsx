import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import PowerfulFeatures from "./components/PowerfulFeatures";
import HowItWorks from "./components/HowItWorks";
import FAQ from "./components/FAQ";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

export default function LandingPage() {
  return (
    <main className="min-h-screen font-sen bg-white overflow-x-hidden">
      <Navbar />
      <Hero />

      <Features />
      {/* <DashboardShowcase /> */}
      <PowerfulFeatures />
      <HowItWorks />
      {/* <TrustedCompanies /> */}
      {/* <Pricing /> */}
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
