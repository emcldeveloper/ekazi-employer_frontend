import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "Free",
    popular: false,
    features: [
      "2 Active Jobs",
      "Basic Applicant Tracking",
      "1 Recruiter",
      "Email Support",
    ],
  },
  {
    name: "Professional",
    price: "$29",
    popular: true,
    features: [
      "Unlimited Jobs",
      "Unlimited Recruiters",
      "Task Management",
      "Interview Scheduling",
      "Analytics",
      "Priority Support",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    popular: false,
    features: [
      "Everything in Professional",
      "Dedicated Account Manager",
      "Custom Integrations",
      "Advanced Reports",
    ],
  },
];

export default function Pricing() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="text-5xl font-bold">Simple pricing</h2>

          <p className="mt-4 text-gray-600">
            Choose a plan that grows with your business.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-3xl border bg-white p-10 shadow-sm transition hover:-translate-y-2 hover:shadow-xl ${
                plan.popular ? "border-green-600 ring-2 ring-blue-600" : ""
              }`}
            >
              {plan.popular && (
                <span className="rounded-full bg-Blue px-4 py-1 text-sm text-white">
                  Most Popular
                </span>
              )}

              <h3 className="mt-6 text-3xl font-bold">{plan.name}</h3>

              <p className="mt-3 text-5xl font-bold text-Blue">{plan.price}</p>

              <div className="mt-8 space-y-4">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <Check size={18} className="text-blue-600" />

                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <button
                className={`mt-10 w-full rounded-xl py-4 font-semibold transition ${
                  plan.popular
                    ? "bg-Blue text-white hover:bg-blue-500"
                    : "border hover:bg-gray-100"
                }`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
