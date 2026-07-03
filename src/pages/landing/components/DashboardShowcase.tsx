import { CheckCircle2, ArrowRight } from "lucide-react";

const items = [
  "Manage jobs",
  "Track applications",
  "Assign recruitment tasks",
  "Manage recruiters",
  "Interview scheduling",
  "Analytics & reports",
];

export default function DashboardShowcase() {
  return (
    <section className="py-24">
      <div className="mx-auto grid max-w-7xl gap-14 rounded-[36px] bg-slate-950 px-8 py-10 text-white lg:grid-cols-2 lg:px-14">
        <div>
          <img
            src="/landing/dashboard.png"
            alt="dashboard"
            className="rounded-3xl shadow-2xl"
          />
        </div>

        <div className="flex flex-col justify-center">
          <span className="text-green-400 font-semibold">
            Employer Dashboard
          </span>

          <h2 className="mt-4 text-5xl font-black">Everything in one place.</h2>

          <p className="mt-6 text-slate-300 leading-8">
            From posting vacancies to hiring your next employee, eKazi keeps
            your entire recruitment workflow organized.
          </p>

          <div className="mt-10 space-y-5">
            {items.map((item) => (
              <div key={item} className="flex items-center gap-4">
                <CheckCircle2 className="text-green-400" />

                <span>{item}</span>
              </div>
            ))}
          </div>

          <button className="mt-10 flex w-fit items-center gap-2 rounded-xl bg-green-600 px-6 py-4 font-semibold hover:bg-green-700">
            Explore Dashboard
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
