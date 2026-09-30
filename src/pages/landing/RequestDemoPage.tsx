import { toast } from "sonner";
import { Controller, useForm } from "react-hook-form";
import { CircleCheck, Loader2 } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import type { DemoForm } from "@/@types/request-demo";
import { useRequestDemo } from "@/hooks/demo";
import { getErrorMessage } from "@/utils/axios-helpers";

const sessions = [
  { label: "Morning", value: "morning" },
  { label: "Afternoon", value: "afternoon" },
  { label: "Evening", value: "evening" },
];

const RequestDemoPage = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<DemoForm>();

  const { mutate: requestDemo, isPending } = useRequestDemo();

  const onSubmit = (data: DemoForm) => {
    requestDemo(data, {
      onSuccess: (res) => {
        toast.success(res?.message || "Request sent successfully");
        reset();
      },
      onError: (err) => {
        toast.error(getErrorMessage(err));
      },
    });
  };

  return (
    <div className="min-h-screen font-sen bg-white overflow-x-hidden">
      <Navbar />

      <div className="mt-30 mb-10 mx-auto max-w-7xl flex flex-col gap-8 md:flex-row">
        {/* Left side */}
        <section className="flex-1 flex flex-col px-6 sm:px-10 lg:px-12 xl:px-16">
          <div className="max-w-135">
            <h1 className="font-serif text-3xl md:text-4xl font-semibold">
              Request a Demo.
            </h1>

            <p className="mt-8 text-sm">
              See how Ekazi can simplify the way your team recruits. From
              publishing opportunities and managing applications to evaluating
              candidates and collaborating on hiring decisions, Ekazi brings
              your recruitment workflow together in one platform.
            </p>

            <div className="mt-8 space-y-5">
              <div className="flex items-center gap-2 text-sm">
                <div>
                  <CircleCheck size={16} />
                </div>
                <div>
                  Manage jobs, applications, and candidates from one place
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <div>
                  <CircleCheck size={16} />
                </div>
                <div>Streamline candidate screening and evaluation</div>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <div>
                  <CircleCheck size={16} />
                </div>
                <div>
                  Collaborate with your hiring team with greater clarity
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <div>
                  <CircleCheck size={16} />
                </div>
                <div>
                  Make informed hiring decisions with organized candidate
                  information
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Right side */}
        <section className="flex-1 flex items-center justify-center px-5 sm:px-8 lg:px-10">
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
                <form onSubmit={handleSubmit(onSubmit)}>
                  <FieldGroup>
                    <Field>
                      <FieldLabel>Company name</FieldLabel>
                      <Input
                        id="company"
                        {...register("company", {
                          required: "Company name is required",
                        })}
                      />
                      {errors.company && (
                        <FieldError>{errors.company.message}</FieldError>
                      )}
                    </Field>

                    <Field>
                      <FieldLabel>Full name</FieldLabel>
                      <Input
                        id="fullName"
                        {...register("fullName", {
                          required: "Name is required",
                        })}
                      />
                      {errors.fullName && (
                        <FieldError>{errors.fullName.message}</FieldError>
                      )}
                    </Field>

                    <Field>
                      <FieldLabel>Email</FieldLabel>
                      <Input
                        type="email"
                        {...register("email", {
                          required: "Email is required",
                        })}
                      />
                      {errors.email && (
                        <FieldError>{errors.email.message}</FieldError>
                      )}
                    </Field>

                    <Field>
                      <FieldLabel>Phone number</FieldLabel>
                      <Input
                        id="phone"
                        type="tel"
                        {...register("phone", {
                          required: "Phone number is required",
                        })}
                      />
                      {errors.phone && (
                        <FieldError>{errors.phone.message}</FieldError>
                      )}
                    </Field>

                    <Field>
                      <FieldLabel>When are you available?</FieldLabel>
                      <Controller
                        name="session"
                        control={control}
                        rules={{
                          required: "Select a session",
                        }}
                        render={({ field }) => (
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Session" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {sessions.map((item) => (
                                  <SelectItem
                                    key={item.value}
                                    value={item.value}
                                  >
                                    {item.label}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.session && (
                        <FieldError>{errors.session.message}</FieldError>
                      )}
                    </Field>

                    <div className="flex items-center gap-4">
                      <Field>
                        <FieldLabel>Available from</FieldLabel>
                        <Input
                          id="startDate"
                          type="date"
                          {...register("startDate", {
                            required: "Date is required",
                          })}
                        />
                        {errors.startDate && (
                          <FieldError>{errors.startDate.message}</FieldError>
                        )}
                      </Field>

                      <Field>
                        <FieldLabel>Available until</FieldLabel>
                        <Input
                          id="endDate"
                          type="date"
                          {...register("endDate", {
                            required: "Date is required",
                          })}
                        />
                        {errors.endDate && (
                          <FieldError>{errors.endDate.message}</FieldError>
                        )}
                      </Field>
                    </div>

                    <Field>
                      <FieldLabel>Message(optional)</FieldLabel>
                      <Textarea id="message" {...register("message")} />
                    </Field>

                    {/* Submit */}
                    <Button type="submit" disabled={isPending}>
                      {isPending ? (
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
    </div>
  );
};

export default RequestDemoPage;
