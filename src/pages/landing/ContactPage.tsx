import { Phone, Mail, MapPin } from "lucide-react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

type ContactFormValues = {
  name: string;
  email: string;
  message: string;
};

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      console.log(data);

      // TODO: Call your API here
      // await sendContactMessage(data);

      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="min-h-screen font-sen bg-white overflow-x-hidden">
      <Navbar />

      <div className="pt-30 mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="text-4xl font-bold">Contact Us</h2>

          <p className="mt-5 text-muted-foreground">
            Get in touch with our team for support, partnership inquiries, or
            any questions about our recruitment platform.
          </p>
        </div>

        {/* CONTACT SECTION */}
        <section className="py-20">
          <div className="mx-auto px-6 grid lg:grid-cols-2 gap-10">
            {/* CONTACT INFO */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
              <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>

              {/* Phone */}
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-green-100 text-green-600 p-2 rounded-lg">
                  <Phone size={16} />
                </div>
                <div>
                  <p className="font-semibold">Hotline</p>
                  <p className="text-gray-600">+255 677 400 206</p>
                  <p className="text-gray-600">+255 677 400 205</p>
                  <p className="text-gray-600">+255 677 014 718</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
                  <Mail size={16} />
                </div>
                <div>
                  <p className="font-semibold">Email</p>
                  <p className="text-gray-600">info@ekazi.co.tz</p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="bg-orange-100 text-orange-600 p-2 rounded-lg">
                  <MapPin size={16} />
                </div>
                <div>
                  <p className="font-semibold">Address</p>
                  <p className="text-gray-600">
                    3rd Floor, The Arcade <br />
                    Mwai Kibaki Rd, Mikocheni <br />
                    P.O.Box 105061 <br />
                    Dar es Salaam, Tanzania
                  </p>
                </div>
              </div>
            </div>

            {/* CONTACT FORM */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Send Us a Message</CardTitle>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <FieldGroup>
                    <Field>
                      <FieldLabel>Name</FieldLabel>
                      <Input
                        type="text"
                        {...register("name", {
                          required: "Name is required",
                        })}
                      />
                      {errors.name && (
                        <FieldError>{errors.name.message}</FieldError>
                      )}
                    </Field>

                    <Field>
                      <FieldLabel>Email</FieldLabel>
                      <Input
                        type="email"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^\S+@\S+$/i,
                            message: "Please enter a valid email",
                          },
                        })}
                      />

                      {errors.email && (
                        <FieldError>{errors.email.message}</FieldError>
                      )}
                    </Field>

                    <Field>
                      <FieldLabel>Message</FieldLabel>
                      <Textarea
                        className="h-40"
                        {...register("message", {
                          required: "Message is required",
                          minLength: {
                            value: 10,
                            message: "Message must be at least 10 characters",
                          },
                        })}
                      />

                      {errors.message && (
                        <FieldError>{errors.message.message}</FieldError>
                      )}
                    </Field>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-Blue hover:bg-blue-600"
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </FieldGroup>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* MAP SECTION */}
        <section className="pb-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="rounded-2xl overflow-hidden shadow-md border border-gray-200">
              <iframe
                title="Ekazi Location"
                src="https://www.google.com/maps?q=The%20Arcade%20Building%20Mikocheni%20Dar%20es%20Salaam&output=embed"
                className="w-full h-100 border-0"
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
