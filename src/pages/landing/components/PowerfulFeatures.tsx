import {
  BriefcaseBusiness,
  UsersRound,
  CalendarDays,
  ChartColumn,
  Bell,
  FolderKanban,
} from "lucide-react";

const cards = [
  {
    icon: BriefcaseBusiness,
    title: "Job Posting",
    text: "Publish vacancies within minutes.",
  },
  {
    icon: UsersRound,
    title: "Candidate Pipeline",
    text: "Track every applicant effortlessly.",
  },
  {
    icon: CalendarDays,
    title: "Interview Scheduling",
    text: "Plan interviews with ease.",
  },
  {
    icon: ChartColumn,
    title: "Hiring Analytics",
    text: "Measure recruitment performance.",
  },
  {
    icon: Bell,
    title: "Notifications",
    text: "Stay updated with hiring activity.",
  },
  {
    icon: FolderKanban,
    title: "Task Management",
    text: "Collaborate across HR teams.",
  },
];

export default function PowerfulFeatures() {
  return (
    <section id="features" className="bg-Blue py-24 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="text-4xl font-bold">
            Powerful features in one platform
          </h2>

          <p className="mt-5 text-green-100">
            Everything employers need to simplify hiring.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.title}
                className="rounded-3xl bg-white/10 p-8 backdrop-blur-sm transition hover:bg-white/20"
              >
                <Icon className="mb-6" size={36} />

                <h3 className="text-xl font-bold">{card.title}</h3>

                <p className="mt-3 text-green-100">{card.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
