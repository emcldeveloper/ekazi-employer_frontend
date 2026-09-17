import { useFormContext } from "react-hook-form";
import {
  CheckCircle2,
  ChevronRight,
  CreditCard,
  User,
  Building2,
  BriefcaseBusiness,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import type { OnboardingFormData } from "@/schema/auth.schema";

const plans = {
  basic: {
    name: "Basic",
    price: 100000,
    description: "Small businesses and startups.",
  },
  standard: {
    name: "Standard",
    price: 150000,
    description: "Medium-sized businesses.",
  },
  premium: {
    name: "Premium",
    price: 300000,
    description: "Large corporations.",
  },
  enterprise: {
    name: "Enterprise",
    price: 500000,
    description: "Enterprise companies.",
  },
};

type ReviewFormProps = {
  onEditPlan?: () => void;
  onEditAccount?: () => void;
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-TZ").format(amount);
};

const ReviewForm = ({ onEditPlan, onEditAccount }: ReviewFormProps) => {
  const { watch } = useFormContext<OnboardingFormData>();

  const values = watch();

  const selectedPlan = plans[values.planId as keyof typeof plans];

  return (
    <div className="mx-auto w-full max-w-3xl my-6 space-y-8">
      {/* Subscription */}
      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-lg text-primary bg-primary/10">
                <CreditCard />
              </div>

              <div>
                <p className="text-base font-bold">Subscription</p>
                <p className="text-sm text-muted-foreground">
                  Your selected subscription plan
                </p>
              </div>
            </div>

            {onEditPlan && (
              <Button
                type="button"
                variant="link"
                size="sm"
                onClick={onEditPlan}
              >
                Edit
                <ChevronRight />
              </Button>
            )}
          </div>
        </div>
        <Separator />
        <div>
          {selectedPlan ? (
            <Card>
              <CardContent>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">{selectedPlan.name}</p>

                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
                        Monthly
                      </span>
                    </div>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {selectedPlan.description}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-lg font-bold">
                      TZS {formatCurrency(selectedPlan.price)}
                    </p>

                    <p className="text-xs text-muted-foreground">per month</p>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>Full access to your selected features</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>Monthly subscription</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>Cancel anytime</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="rounded-lg border border-dashed p-4 text-center text-sm text-muted-foreground">
              No subscription plan selected.
            </div>
          )}
        </div>
      </div>

      {/* Company */}
      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-lg text-primary bg-primary/10">
                <Building2 />
              </div>

              <div>
                <CardTitle className="text-base">Company Information</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  Your company details
                </CardDescription>
              </div>
            </div>

            {onEditAccount && (
              <Button
                type="button"
                variant="link"
                size="sm"
                onClick={onEditAccount}
              >
                Edit
                <ChevronRight />
              </Button>
            )}
          </div>
        </div>
        <Separator />
        <div>
          <div className="grid gap-5 sm:grid-cols-2">
            <ReviewItem label="Company Name" value={values.companyName} />

            <ReviewItem label="Company Type" value={values.companyType} />

            <ReviewItem label="Account Type" value={values.accountType} />
          </div>
        </div>
      </div>

      {/* Administrator */}
      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-lg text-primary bg-primary/10">
                <User />
              </div>

              <div>
                <p className="text-base font-bold">Administrator</p>
                <p className="text-sm text-muted-foreground">
                  Primary account administrator
                </p>
              </div>
            </div>

            {onEditAccount && (
              <Button
                type="button"
                variant="link"
                size="sm"
                onClick={onEditAccount}
              >
                Edit
                <ChevronRight />
              </Button>
            )}
          </div>
        </div>
        <Separator />
        <div>
          <div className="grid gap-5 sm:grid-cols-2">
            <ReviewItem label="First Name" value={values.firstName} />

            <ReviewItem label="Last Name" value={values.lastName} />

            <ReviewItem label="Phone Number" value={values.phone} />

            <ReviewItem label="Email Address" value={values.email} />
          </div>
        </div>
      </div>

      {/* Payment Summary */}
      <div className="space-y-4">
        <div>
          <div className="flex items-center gap-4">
            <div className="p-2 rounded-lg text-primary bg-primary/10">
              <BriefcaseBusiness />
            </div>

            <div>
              <p className="text-base font-bold">Payment Summary</p>
              <p className="text-sm text-muted-foreground">
                Review your subscription charges
              </p>
            </div>
          </div>
        </div>
        <Separator />
        <div>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                {selectedPlan?.name ?? "Subscription"} Plan
              </span>

              <span className="font-medium">
                TZS {selectedPlan ? formatCurrency(selectedPlan.price) : "0"}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Billing cycle</span>

              <span className="font-medium">Monthly</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

type ReviewItemProps = {
  label: string;
  value?: string;
  icon?: React.ReactNode;
};

const ReviewItem = ({ label, value, icon }: ReviewItemProps) => {
  return (
    <div className="space-y-1">
      <p className="text-sm text-muted-foreground">{label}</p>

      <div className="flex items-center gap-2">
        {icon && <span className="text-muted-foreground">{icon}</span>}

        <p className="text-sm font-medium">{value || "Not provided"}</p>
      </div>
    </div>
  );
};

export default ReviewForm;
