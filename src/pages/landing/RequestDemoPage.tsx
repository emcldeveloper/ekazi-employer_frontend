import { useState } from "react";
import { CircleCheck, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";

interface DemoForm {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  jobTitle: string;
  phone: string;
  companyType: string;
  message: string;
}

const initialForm: DemoForm = {
  firstName: "",
  lastName: "",
  email: "",
  company: "",
  jobTitle: "",
  phone: "",
  companyType: "",
  message: "",
};

const RequestDemoPage = () => {
  const [form, setForm] = useState<DemoForm>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof DemoForm, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSubmitting(true);

    try {
      // Replace this with your API request
      //
      // await api.post("/demo-requests", form);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Demo request:", form);

      setForm(initialForm);
    } catch (error) {
      console.error("Failed to submit demo request:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen font-sen bg-white overflow-x-hidden">
      <Navbar />

      <div className="py-20 mx-auto max-w-7xl flex">
        {/* Left side */}
        <section className="flex-1 flex flex-col px-6 py-16 sm:px-10 lg:px-12 xl:px-16">
          <div className="max-w-135">
            <h1 className="font-serif text-3xl md:text-4xl font-semibold">
              See ekazi in your recruitment workflow.
            </h1>

            <p className="mt-10 text-base">
              Bring a real recruitment workflow question. We’ll show how Ekazi
              helps your team move from opportunity and candidate sourcing into
              collaboration, hiring, and reusable recruitment knowledge.
            </p>

            <div className="mt-10 space-y-5">
              <div className="flex items-center gap-2">
                <CircleCheck />
                Source-backed candidate and recruitment insights
              </div>

              <div className="flex items-center gap-2">
                <CircleCheck />
                Candidate evidence matched without invented claims
              </div>

              <div className="flex items-center gap-2">
                <CircleCheck />
                Reviewable AI recommendations and hiring history
              </div>
            </div>
          </div>
        </section>

        {/* Right side */}
        <section className="flex-1 flex items-center justify-center px-5 py-10 sm:px-8 lg:px-10">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-xl">
                Tell us about your company
              </CardTitle>
              <CardDescription>
                We’ll focus the conversation on the recruitment, hiring,
                candidate, and talent workflows relevant to your organization.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4 w-full">
                  <FieldGroup>
                    <Field>
                      <FieldLabel>Company Name</FieldLabel>
                      <Input
                        id="company"
                        value={form.company}
                        onChange={(e) =>
                          handleChange("company", e.target.value)
                        }
                        required
                        className="h-12"
                      />
                    </Field>

                    <Field>
                      <FieldLabel>Industry</FieldLabel>
                      <Input
                        id="company"
                        value={form.company}
                        onChange={(e) =>
                          handleChange("company", e.target.value)
                        }
                        required
                        className="h-12"
                      />
                    </Field>

                    {/* Email */}
                    <Field>
                      <FieldLabel>Email</FieldLabel>
                      <Input
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        required
                        className="h-12"
                      />
                    </Field>

                    <Field>
                      <FieldLabel>WhatsApp Number</FieldLabel>
                      <Input
                        id="phone"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        className="h-12 "
                      />
                    </Field>

                    {/* Submit */}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="mt-1 h-12 w-full text-base"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 size-4 animate-spin" />
                          Sending request...
                        </>
                      ) : (
                        "Request a Demo"
                      )}
                    </Button>
                  </FieldGroup>
                </form>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>

      <Footer />
    </main>
  );
};

export default RequestDemoPage;
