import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How do I create an account?",
    answer:
      "Create an account by clicking  Get Started and completing your company information. Once your email is verified, you can log in and start setting up your company profile.",
  },
  {
    question: "How do I post job vacancy?",
    answer:
      "Navigate to the Jobs section from your dashboard, click Create Job, complete the job details, and publish your vacancy. Your job will become visible to candidates once approved (if approval is required).",
  },
  {
    question: "Can I edit or close job after publishing it?",
    answer:
      "Yes. You can edit your job posting at any time or close it once the position has been filled or you have received enough applications.",
  },
  {
    question: "How can I review and manage applications?",
    answer:
      "All applications are available in your jobs dashboard under job details where you can review profiles, download CVs, shortlist candidates, reject applications, and track recruitment progress.",
  },
  {
    question: "How do I contact shortlisted candidates?",
    answer:
      "You can contact candidates through the platform (where available) or use the contact information provided in their application to arrange interviews.",
  },
  {
    question: "Can multiple recruiters use the same company account?",
    answer:
      "Yes. Depending on your subscription, you can invite team members and assign different roles and permissions for collaborative hiring.",
  },
  {
    question: "How do I update my company profile?",
    answer:
      "Go to Company Profile from your dashboard to update your company logo, business information, industry, contact details, and company description.",
  },
  {
    question: "How can I improve the quality of applicants?",
    answer:
      "Write answer clear job description, specify required qualifications and experience, include salary information where appropriate, and use screening questions.",
  },
  {
    question: "Is my company and recruitment data secure?",
    answer:
      "Yes. ekazi uses secure authentication and industry-standard security measures to protect employer accounts and recruitment data.",
  },
  {
    question: "Who can I contact if I need help?",
    answer:
      "If you need assistance, contact the eKazi support team through the Help Center, Contact Us page, or by emailing our support team.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="py-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center">
          <h2 className="text-5xl font-bold">Frequently Asked Questions</h2>
        </div>

        <Accordion
          type="single"
          collapsible
          defaultValue="faq-0"
          className="mt-14"
        >
          {faqs.map((faq, index) => (
            <AccordionItem key={faq.question} value={`faq-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
