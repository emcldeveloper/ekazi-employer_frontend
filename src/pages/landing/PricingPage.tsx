import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Pricing from "./components/Pricing";

const PricingPage = () => {
  return (
    <main className="min-h-screen font-sen bg-white overflow-x-hidden">
      <Navbar />

      <Pricing />

      <Footer />
    </main>
  );
};

export default PricingPage;
