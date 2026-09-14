import { z } from "zod";

export const onboardingSchema = z
  .object({
    planId: z.string().min(1, "Please select a plan"),

    companyName: z
      .string()
      .min(2, "Company name must be at least 2 characters"),

    companyType: z.string().min(1, "Please select a company type"),

    accountType: z.string().min(1, "Please select an account type"),

    firstName: z.string().min(2, "First name must be at least 2 characters"),

    lastName: z.string().min(2, "Last name must be at least 2 characters"),

    phone: z.string().min(9, "Please enter a valid phone number"),

    email: z.string().email("Please enter a valid email address"),

    password: z.string().min(6, "Password must be at least 6 characters"),

    confirmPassword: z.string(),

    paymentPhone: z
      .string()
      .min(9, "Please enter a valid payment phone number"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type OnboardingFormData = z.infer<typeof onboardingSchema>;
