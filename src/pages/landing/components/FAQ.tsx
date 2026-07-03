import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    q: "How do I post a job?",
    a: "Create your employer account, complete your company profile and publish your first job in minutes.",
  },
  {
    q: "Can I invite recruiters?",
    a: "Yes. Professional and Enterprise plans support multiple recruiters.",
  },
  {
    q: "Can I schedule interviews?",
    a: "Yes. eKazi allows interview scheduling and applicant tracking.",
  },
  {
    q: "Can I export reports?",
    a: "Analytics and reports can be exported on supported plans.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center">
          <h2 className="text-5xl font-bold">Frequently Asked Questions</h2>
        </div>

        <div className="mt-14 space-y-5">
          {faqs.map((faq, i) => (
            <div key={faq.q} className="rounded-2xl border">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between p-6"
              >
                <span className="font-semibold">{faq.q}</span>

                <ChevronDown
                  className={`transition ${open === i ? "rotate-180" : ""}`}
                />
              </button>

              {open === i && (
                <div className="px-6 pb-6 text-gray-600">{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
