import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, ChevronRight, Check, Loader2 } from "lucide-react";

import { StepIndicator } from "./components/step-indicator";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { PlansForm } from "./forms/PlansForm";
import AccountForm from "./forms/AccountForm";
import ReviewForm from "./forms/ReviewForm";
import PaymentForm from "./forms/PaymentForm";
import { VerifyAccountForm } from "./forms/VerifyAccountForm";

import {
  onboardingSchema,
  type OnboardingFormData,
} from "@/schema/auth.schema";

import { useRegister } from "@/hooks/auth";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/axios-helpers";

const steps = [
  {
    title: "Plan",
    heading: "Choose your plan",
  },
  {
    title: "Account",
    heading: "Set up your company account",
  },
  {
    title: "Review",
    heading: "Review your information",
  },
  {
    title: "Payment",
    heading: "Complete your subscription payment",
  },
  {
    title: "Verify",
    heading: "Verify your email address",
  },
];

type RegistrationResponse = {
  userId?: string;
  tenantId?: string;
  subscriptionId?: string;
  email?: string;
  message?: string;
  data?: {
    userId?: string;
    tenantId?: string;
    subscriptionId?: string;
    email?: string;
  };
};

const STEP_FIELDS: Record<number, (keyof OnboardingFormData)[]> = {
  0: ["planId"],

  1: [
    "companyName",
    "companyType",
    "accountType",
    "firstName",
    "lastName",
    "phone",
    "email",
    "password",
    "confirmPassword",
  ],

  2: [],

  3: ["paymentPhone"],

  4: [],
};

export function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);

  const [registration, setRegistration] = useState<RegistrationResponse | null>(
    null,
  );

  const [isRegistering, setIsRegistering] = useState(false);

  const form = useForm<OnboardingFormData>({
    resolver: zodResolver(onboardingSchema),

    defaultValues: {
      planId: "",

      companyName: "",
      companyType: "",
      accountType: "",

      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",

      paymentPhone: "",
    },

    mode: "onTouched",
  });

  const { trigger, getValues } = form;

  const { mutateAsync: registerEmployer } = useRegister();

  /**
   * -----------------------------------------
   * REGISTER USER
   * -----------------------------------------
   *
   * This happens when the user clicks
   * "Continue to Payment" on the Review step.
   *
   * IMPORTANT:
   * We do NOT initiate payment here.
   */
  const registerAccount = async () => {
    const data = getValues();

    setIsRegistering(true);

    try {
      const response = await registerEmployer(
        {
          name: data.companyName,
          email: data.email,
          phone: data.phone,
          password: data.password,
          type: Number(data.companyType),
          client_type: data.accountType,

          // Include these if your backend accepts them
          first_name: data.firstName,
          last_name: data.lastName,
        },
        {
          onSuccess: (res) => {
            const paymentToken = res.data?.payment_token;

            if (paymentToken) {
              localStorage.setItem("token", paymentToken);
            }
          },
        },
      );

      setRegistration(response as RegistrationResponse);

      toast.success(response?.message || "Account registration successful");

      /**
       * Registration is complete.
       *
       * Now move to PAYMENT.
       *
       * Payment is NOT initiated yet.
       */
      setCurrentStep(3);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsRegistering(false);
    }
  };

  /**
   * -----------------------------------------
   * NEXT STEP
   * -----------------------------------------
   */
  const nextStep = async () => {
    /**
     * REVIEW STEP
     *
     * Special behavior:
     *
     * Review
     *   ↓
     * Registration API
     *   ↓
     * Payment screen
     */
    if (currentStep === 2) {
      await registerAccount();
      return;
    }

    const fields = STEP_FIELDS[currentStep];

    if (fields.length > 0) {
      const isValid = await trigger(fields);

      if (!isValid) {
        return;
      }
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep((previous) => previous + 1);
    }
  };

  /**
   * -----------------------------------------
   * PREVIOUS STEP
   * -----------------------------------------
   */
  const previousStep = () => {
    if (currentStep > 0 && !isRegistering) {
      /**
       * Don't allow going back after
       * registration has already happened.
       *
       * Payment is now a separate stage.
       */
      if (registration && currentStep >= 3) {
        return;
      }

      setCurrentStep((previous) => previous - 1);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return <PlansForm />;

      case 1:
        return <AccountForm />;

      case 2:
        return (
          <ReviewForm
            onEditPlan={() => setCurrentStep(0)}
            onEditAccount={() => setCurrentStep(1)}
          />
        );

      case 3:
        return <PaymentForm />;

      case 4:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Verify Your Account</CardTitle>

              <CardDescription>
                Your registration and subscription payment were successful.
                Please verify your email address to complete your setup.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <VerifyAccountForm />
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  const isLastStep = currentStep === steps.length - 1;

  const isReviewStep = currentStep === 2;

  const isPaymentStep = currentStep === 3;

  /**
   * Don't render the generic navigation
   * button on Payment.
   *
   * PaymentForm owns "Pay Now".
   */
  const showNavigation = !isPaymentStep;

  return (
    <FormProvider {...form}>
      <div className="min-h-screen px-4 py-8">
        <div className="mx-auto w-full max-w-190 space-y-4">
          {/* Progress */}
          <StepIndicator
            currentStep={currentStep}
            totalSteps={steps.length}
            onPrevious={previousStep}
            onNext={nextStep}
          />

          <div className="flex flex-col sm:flex-row gap-4 items-center sm:justify-between">
            {/* Step label */}
            <div className="text-center">
              <p className="text-xs text-muted-foreground">
                Step {currentStep + 1} of {steps.length}:{" "}
                {steps[currentStep].title}
              </p>
            </div>

            {/* Heading */}
            <div className="text-center">
              <h1 className="text-base font-semibold tracking-tight">
                {steps[currentStep].heading}
              </h1>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={(event) => event.preventDefault()}>
            {renderCurrentStep()}

            {showNavigation && (
              <div className="mt-6 flex items-center justify-between">
                {/* Back */}
                <Button
                  type="button"
                  variant="outline"
                  onClick={previousStep}
                  disabled={currentStep === 0 || isRegistering}
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>

                {/* Continue */}
                {isLastStep ? (
                  <Button type="button" className=" bg-Blue hover:bg-blue-600">
                    Complete
                    <Check className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={nextStep}
                    disabled={isRegistering}
                    className=" bg-Blue hover:bg-blue-600"
                  >
                    {isRegistering ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating account...
                      </>
                    ) : isReviewStep ? (
                      <>
                        Continue to Payment
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </>
                    ) : (
                      <>
                        Continue
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            )}
          </form>
        </div>
      </div>
    </FormProvider>
  );
}
