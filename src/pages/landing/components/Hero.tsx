import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import DashboardMockup from "./DashboardMockup";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className=" relative overflow-hidden pt-40 pb-24">
      <div className="absolute inset-0 bg-linear-to-b from-orange-50 to-white" />

      <div className="absolute -left-20 top-40 h-96 w-96 rounded-full bg-orange-200 blur-[120px]" />

      <div className="absolute right-0 top-20 h-96 w-96 rounded-full bg-orange-100 blur-[140px]" />

      <div className="relative mx-auto grid max-w-7xl gap-20 px-6 lg:grid-cols-2 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="mt-8 text-3xl font-bold leading-tight text-gray-900 lg:text-5xl">
            Hire smarter.
            <br />
            Manage recruitment
            <span className="text-Orange"> effortlessly.</span>
          </h1>

          {/* <p className="mt-8 max-w-xl text-lg leading-8 text-gray-600">
            Everything employers need to publish jobs, manage applicants,
            collaborate with hiring teams and recruit exceptional talent from
            one powerful dashboard.
          </p> */}

          <div className="mt-10 flex flex-wrap gap-4">
            <Button
              size="lg"
              onClick={() => navigate("/register")}
              className="bg-Orange hover:bg-orange-500"
            >
              Start Hiring
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
