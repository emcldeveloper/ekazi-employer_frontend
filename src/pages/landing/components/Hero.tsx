import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import DashboardMockup from "./DashboardMockup";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="overflow-hidden pt-30 pb-24">
      <div className="relative mx-auto max-w-7xl px-6 flex flex-col items-center gap-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="mt-8 text-3xl text-gray-900 capitalize font-bold leading-tight  lg:text-5xl">
            Hire smarter.
            <br />
            Manage recruitment
            <span className="text-Orange"> effortlessly.</span>
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-8 text-gray-600">
            Everything employers need to publish jobs, manage applicants,
            collaborate with hiring teams and recruit exceptional talent from
            one powerful dashboard.
          </p>

          <div className="mt-10">
            <Button
              size="lg"
              onClick={() => navigate("/register")}
              className="bg-Blue hover:bg-blue-600"
            >
              Get Started
              <ArrowRight size={18} />
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <DashboardMockup />
        </motion.div>
      </div>
    </section>
  );
}
