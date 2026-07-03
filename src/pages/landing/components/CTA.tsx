import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="rounded-[20px] bg-linear-to-r from-Orange to-Orange px-10 py-20 text-center text-white">
          <h2 className="text-5xl font-bold">Ready to hire smarter?</h2>

          <p className="mx-auto mt-6 max-w-2xl text-xl text-green-100">
            Join hundreds of employers using eKazi to streamline recruitment and
            build stronger teams.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-5">
            <Button
              size="lg"
              className=" bg-white text-Orange hover:bg-white transition hover:scale-105"
            >
              Start Hiring <ArrowRight />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
