import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
const plans = [
  {
    title: "Basic Plan",
    type: "basic",
    popular: false,
    price: "100,000",
    subtitle: "Small Businesses and Startups",
    button: "Upgrade to Basic",
    features: [
      "Access to job seeker resumes",
      "Basic employer dashboard",
      "Job post analytics (views, applications)",
      "Post up to 10 job listings per month",
    ],
  },
  {
    title: "Standard Plan",
    type: "standard",
    popular: true,
    price: "150,000",
    subtitle: "Medium-sized businesses",
    button: "Upgrade to Standard",
    features: [
      "Post up to 50 job listings per month",
      "Advanced resume search & filters",
      "Applicant tracking system (ATS)",
      "Email alerts for applicants",
      "Job post analytics",
    ],
  },
  {
    title: "Premium Plan",
    type: "premium",
    popular: false,
    price: "300,000",
    subtitle: "Large corporations",
    button: "Upgrade to Premium",
    features: [
      "Top-tier resume database",
      "Advanced candidate matching",
      "Comprehensive analytics",
      "Custom recruitment tools",
      "Dedicated account manager",
      "Email alerts for applicants",
      "Premium job listing placement",
      "Unlimited job postings",
    ],
  },
  {
    title: "Enterprise Plan",
    type: "enterprise",
    popular: false,
    price: "500,000",
    subtitle: "Enterprise companies",
    button: "Upgrade to Enterprise",
    features: [
      "Advanced analytics & reporting",
      "API access & integrations",
      "Custom branding & white-label",
      "Dedicated support team",
      "Tailored recruitment solutions",
      "Full job portal feature access",
    ],
  },
];

// const plans = [
//   {
//     name: "Starter",
//     price: "Free",
//     popular: false,
//     features: [
//       "2 Active Jobs",
//       "Basic Applicant Tracking",
//       "1 Recruiter",
//       "Email Support",
//     ],
//   },
//   {
//     name: "Professional",
//     price: "$29",
//     popular: true,
//     features: [
//       "Unlimited Jobs",
//       "Unlimited Recruiters",
//       "Task Management",
//       "Interview Scheduling",
//       "Analytics",
//       "Priority Support",
//     ],
//   },
//   {
//     name: "Enterprise",
//     price: "Custom",
//     popular: false,
//     features: [
//       "Everything in Professional",
//       "Dedicated Account Manager",
//       "Custom Integrations",
//       "Advanced Reports",
//     ],
//   },
// ];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-gray-50">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="text-5xl font-bold">Simple pricing</h2>

          <p className="mt-4 text-gray-600">
            Choose a plan that grows with your business.
          </p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-4">
          {plans.map((plan) => (
            <div
              key={plan.title}
              className={`flex flex-col rounded-3xl border bg-white p-6 shadow-sm transition hover:-translate-y-2 hover:shadow-xl ${
                plan.popular ? "border-green-600 ring-2 ring-blue-500" : ""
              }`}
            >
              {plan.popular && <Badge>Most Popular</Badge>}

              <h3 className="mt-4 text-xl font-bold">{plan.title}</h3>
              <p className="mt-2 text-3xl font-bold text-Blue">{plan.price}</p>

              <div className="my-8 space-y-4">
                {plan.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3 text-sm"
                  >
                    <Check size={16} className="text-blue-500" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <Button
                variant={plan.popular ? "default" : "outline"}
                className="mt-auto w-full"
              >
                Get Started
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
