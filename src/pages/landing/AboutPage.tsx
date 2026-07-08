import { ArrowRightIcon, CheckCircle } from "lucide-react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const features = [
  "Multi-user access for team collaboration",
  "One-click candidate suitability flagging",
  "Customizable filters to view shortlists",
  "Secure and compliant candidate data storage",
  "Comprehensive application and activity history",
  "Calendar-synced interview scheduling",
  "Email and SMS communication with candidates",
  "Bulk messaging to multiple candidates instantly",
  "Predefined email templates for faster outreach",
  "Upload internal documents, CVs, and forms",
  "Keyword-based candidate search",
  "Tagging system for easier future searches",
  "Quick access to previously applied candidates",
  "View candidates’ online social profiles",
  "Build and manage a talent pool from applications",
];

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen font-sen bg-white overflow-x-hidden">
      <Navbar />

      <div className="pt-30 pb-20 mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="text-4xl font-bold">About ekazi</h2>

          <p className="mt-5 text-muted-foreground mx-auto max-w-2/3">
            <span className="font-semibold">ekazi</span> is a modern online
            recruitment platform tailored for Small and Medium Enterprises
            (SMEs), where efficiency is critical to business growth. Our mission
            is to empower SMEs to achieve optimal results in their hiring
            process. The eKazi platform is accessible 24/7 from anywhere in the
            world on any device, allowing you to manage recruitment easily and
            conveniently.
          </p>
        </div>

        {/* FEATURES */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Key Features
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-5 rounded-xl border border-gray-200 bg-gray-50 hover:shadow-md transition"
                >
                  <CheckCircle className="text-green-500 mt-1" size={20} />

                  <p className="text-gray-700 text-sm">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gray-200 rounded-2xl">
          <div className="max-w-4xl mx-auto text-center px-6">
            <h2 className="text-3xl font-bold mb-4">
              Ready to simplify your recruitment?
            </h2>

            <p className="text-gray-600 mb-6">
              Join thousands of companies already hiring smarter with eKazi.
            </p>

            <Button
              size="lg"
              onClick={() => navigate("/register")}
              className=" bg-Blue hover:bg-blue-600"
            >
              Get Started <ArrowRightIcon />
            </Button>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
};

export default AboutPage;
