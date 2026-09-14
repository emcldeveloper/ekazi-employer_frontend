import { useFormContext } from "react-hook-form";
import {
  CheckCircle2,
  ChevronRight,
  CreditCard,
  Mail,
  Phone,
  User,
  Building2,
  BriefcaseBusiness,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
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
    <div className="mx-auto w-full max-w-3xl space-y-5">
      {/* Subscription */}
      <Card>
        <CardHeader className="border-b bg-muted/20">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <CreditCard size={20} className="text-primary" />
              </div>

              <div>
                <CardTitle className="text-base">Subscription</CardTitle>
                <CardDescription>
                  Your selected subscription plan
                </CardDescription>
              </div>
            </div>

            {onEditPlan && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={onEditPlan}
              >
                Edit
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            )}
          </div>
        </CardHeader>

        <CardContent>
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
        </CardContent>
      </Card>

      {/* Company */}
      <Card className="overflow-hidden">
        <CardHeader className="border-b bg-muted/20">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                <Building2 className="h-4 w-4 text-primary" />
              </div>

              <div>
                <CardTitle className="text-base">Company Information</CardTitle>

                <p className="text-xs text-muted-foreground">
                  Your company details
                </p>
              </div>
            </div>

            {onEditAccount && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={onEditAccount}
              >
                Edit
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            )}
          </div>
        </CardHeader>

        <CardContent className="pt-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <ReviewItem label="Company Name" value={values.companyName} />

            <ReviewItem label="Company Type" value={values.companyType} />

            <ReviewItem label="Account Type" value={values.accountType} />
          </div>
        </CardContent>
      </Card>

      {/* Administrator */}
      <Card className="overflow-hidden">
        <CardHeader className="border-b bg-muted/20">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                <User className="h-4 w-4 text-primary" />
              </div>

              <div>
                <CardTitle className="text-base">Administrator</CardTitle>

                <p className="text-xs text-muted-foreground">
                  Primary account administrator
                </p>
              </div>
            </div>

            {onEditAccount && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={onEditAccount}
              >
                Edit
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            )}
          </div>
        </CardHeader>

        <CardContent className="pt-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <ReviewItem label="First Name" value={values.firstName} />

            <ReviewItem label="Last Name" value={values.lastName} />

            <ReviewItem
              label="Phone Number"
              value={values.phone}
              icon={<Phone className="h-3.5 w-3.5" />}
            />

            <ReviewItem
              label="Email Address"
              value={values.email}
              icon={<Mail className="h-3.5 w-3.5" />}
            />
          </div>
        </CardContent>
      </Card>

      {/* Payment Summary */}
      <Card className="overflow-hidden">
        <CardHeader className="border-b bg-muted/20">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
              <BriefcaseBusiness className="h-4 w-4 text-primary" />
            </div>

            <div>
              <CardTitle className="text-base">Payment Summary</CardTitle>

              <p className="text-xs text-muted-foreground">
                Review your subscription charges
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-5">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
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

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">Total due today</p>

                <p className="text-xs text-muted-foreground">
                  Your subscription will renew monthly.
                </p>
              </div>

              <p className="text-xl font-bold">
                TZS {selectedPlan ? formatCurrency(selectedPlan.price) : "0"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security / confirmation notice */}
      <div className="rounded-xl border bg-muted/30 p-4">
        <div className="flex gap-3">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

          <div className="space-y-1">
            <p className="text-sm font-medium">Almost there</p>

            <p className="text-xs leading-relaxed text-muted-foreground">
              By continuing, your account will be created and you will proceed
              to the payment step. Make sure the information above is correct
              before continuing.
            </p>
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
      <p className="text-xs text-muted-foreground">{label}</p>

      <div className="flex items-center gap-2">
        {icon && <span className="text-muted-foreground">{icon}</span>}

        <p className="text-sm font-medium">{value || "Not provided"}</p>
      </div>
    </div>
  );
};

export default ReviewForm;
