import { companies } from "../data/companies";

export default function TrustedCompanies() {
  return (
    <section className="border-y bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-center text-sm font-semibold uppercase tracking-[0.3em] text-gray-500">
          Trusted by growing businesses
        </p>

        <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
          {companies.map((company) => (
            <div
              key={company}
              className="flex h-20 items-center justify-center rounded-2xl border bg-white text-lg font-bold text-gray-400 transition hover:-translate-y-1 hover:shadow-lg hover:text-green-600"
            >
              {company}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
