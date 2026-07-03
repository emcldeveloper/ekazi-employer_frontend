import { BriefcaseBusiness, Users, ClipboardList } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: BriefcaseBusiness,
    title: "Job Management",
    description:
      "Create, publish and manage all job openings from one intuitive dashboard.",
  },
  {
    icon: Users,
    title: "Applications Management",
    description:
      "Review applicants, shortlist candidates and move them through every hiring stage.",
  },
  {
    icon: ClipboardList,
    title: "Staff & Tasks",
    description:
      "Assign recruitment tasks, collaborate with HR teams and monitor progress.",
  },
];

export default function Features() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mt-6 text-4xl font-bold text-gray-900">
            Built for modern recruitment teams
          </h2>

          <p className="mt-4 text-lg text-gray-600">
            Everything you need to hire efficiently, collaborate with your team
            and make better hiring decisions.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                viewport={{ once: true }}
                className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">
                  <Icon className="text-Blue" />
                </div>

                <h3 className="mt-6 text-2xl font-bold">{feature.title}</h3>

                <p className="mt-4 leading-7 text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
