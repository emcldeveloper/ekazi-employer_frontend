import DashboardMockup from "./DashboardMockup";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="overflow-hidden pt-30 pb-24">
      <div className="relative mx-auto max-w-7xl px-6 flex flex-col items-center gap-10 text-center">
        <div>
          <h1 className="mt-8 text-3xl md:text-6xl text-gray-900 capitalize font-bold">
            Hire smarter
            <br />
            Manage recruitment
            <br />
            <span className="text-Orange"> effortlessly</span>
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-8 text-gray-600">
            Everything employers need to publish jobs, manage applicants,
            collaborate with hiring teams and recruit exceptional talent from
            one powerful dashboard.
          </p>

          <div className="flex items-center justify-center gap-4 mt-10">
            <Button
              onClick={() => navigate("/register")}
              className="px-10 py-6 text-base"
            >
              Get Started
            </Button>

            <Button
              variant="outline"
              onClick={() => navigate("/request-demo")}
              className="px-10 py-6 text-base"
            >
              Request Demo
            </Button>
          </div>
        </div>

        <DashboardMockup />
      </div>
    </section>
  );
}
