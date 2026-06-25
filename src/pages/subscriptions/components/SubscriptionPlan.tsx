import { CheckIcon } from "lucide-react";

const SubscriptionPlan = () => {
  const plans = [
    {
      title: "Basic Plan",
      type: "basic",
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

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {plans.map((plan, i) => (
        <div
          key={i}
          className="bg-white border border-gray-200 rounded-2xl p-4 flex flex-col
            hover:shadow-xl transition duration-300"
        >
          {/* Title */}
          <div className="flex gap-2 justify-start items-center">
            {/* <SubscriptionBadge type={plan.type} /> */}
            <h3 className="text-xl mb-0 font-semibold text-Orange">
              {plan.title}
            </h3>
            <div></div>
          </div>

          {/* Price */}
          <div className="mt-3 mb-2">
            <span className="text-3xl font-bold text-gray-900">
              {plan.price}
            </span>
            {plan.price !== "Free" && (
              <span className="text-gray-500 text-sm"> /mo</span>
            )}
          </div>

          {/* Subtitle */}
          <p className="text-gray-500 text-sm mb-6">{plan.subtitle}</p>

          {/* Features */}
          <ul className="space-y-3 flex-1">
            {plan.features.map((feature, index) => (
              <li
                key={index}
                className="flex items-start text-sm text-gray-600"
              >
                <CheckIcon className="w-4 h-4 text-blue-600 mt-1 mr-2" />
                {feature}
              </li>
            ))}
          </ul>

          {/* Button */}
          <button
            className={`mt-8 w-full py-3 rounded-lg text-sm font-medium transition
              ${
                plan.price === "Free"
                  ? "border border-gray-300 text-gray-700 hover:bg-gray-100"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
          >
            {plan.button}
          </button>
        </div>
      ))}
    </div>
  );
};

export default SubscriptionPlan;
