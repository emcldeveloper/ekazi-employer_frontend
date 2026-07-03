import { UserPlus, Building2, BriefcaseBusiness, Users } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Create Employer Account",
    text: "Sign up in less than two minutes.",
  },
  {
    icon: Building2,
    title: "Create Company",
    text: "Complete your company profile.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Post Jobs",
    text: "Publish vacancies instantly.",
  },
  {
    icon: Users,
    title: "Hire Talent",
    text: "Review applications and recruit.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="text-4xl font-bold">How it works</h2>

          <p className="mt-5 text-gray-600">
            Start hiring in four simple steps.
          </p>
        </div>

        <div className="mt-20 grid gap-8 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div key={step.title} className="relative rounded-3xl border p-8">
                <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100">
                  <Icon className="text-Orange" />
                </div>

                <div className="absolute right-6 top-6 text-5xl font-bold text-orange-100">
                  0{index + 1}
                </div>

                <h3 className="text-xl font-bold">{step.title}</h3>

                <p className="mt-4 text-gray-600">{step.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
