import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Loader2, Smartphone, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

import type { OnboardingFormData } from "@/schema/auth.schema";
import { useCreateSubscription } from "@/hooks/subscriptions";

type PaymentStatus = "idle" | "initiating" | "pending" | "success" | "failed";

interface PaymentFormProps {
  onPaymentSuccess?: () => void;
}

export default function PaymentForm({ onPaymentSuccess }: PaymentFormProps) {
  const {
    register,
    trigger,
    getValues,
    formState: { errors },
  } = useFormContext<OnboardingFormData>();

  const { mutateAsync: initiatePayment } = useCreateSubscription();

  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>("idle");

  const handleInitiatePayment = async () => {
    // Validate payment phone before calling the API
    const valid = await trigger("paymentPhone");

    if (!valid) {
      return;
    }

    const planId = getValues("planId");
    const paymentPhone = getValues("paymentPhone");

    if (!planId) {
      toast.error("Please select a subscription plan.");
      return;
    }

    try {
      setPaymentStatus("initiating");

      const response = await initiatePayment({
        plan_id: Number(planId),
        phone: paymentPhone,
      });

      console.log("Payment initiated:", response);

      // At this point the backend has accepted the
      // payment request and the USSD prompt should be sent.
      setPaymentStatus("pending");

      toast.success("Payment request sent. Please check your phone.");
    } catch (error) {
      console.error("Payment initiation failed:", error);

      setPaymentStatus("failed");

      toast.error("Unable to initiate payment. Please try again.");
    }
  };

  if (paymentStatus === "pending") {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
            <Smartphone className="h-8 w-8 text-blue-600" />
          </div>

          <h2 className="text-lg font-semibold">Waiting for payment</h2>

          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            A payment request has been sent to your phone. Please check your
            phone and complete the payment request.
          </p>

          <div className="mt-6 w-full max-w-sm rounded-xl border bg-muted/40 p-4">
            <p className="text-sm text-muted-foreground">Payment number</p>

            <p className="mt-1 font-medium">{getValues("paymentPhone")}</p>
          </div>

          <p className="mt-6 text-xs text-muted-foreground">
            Please do not close this page while we confirm your payment.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (paymentStatus === "success") {
    return (
      <Card className="border-0 shadow-none">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <CheckCircle2 className="h-12 w-12 text-green-600" />

          <h2 className="mt-4 text-lg font-semibold">Payment successful</h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Your subscription payment has been confirmed.
          </p>

          {onPaymentSuccess && (
            <Button className="mt-6 rounded-xl" onClick={onPaymentSuccess}>
              Continue
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold">Complete your payment</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Enter the mobile money number you want to use for this payment.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="paymentPhone">Mobile money phone number</Label>

          <Input
            id="paymentPhone"
            type="tel"
            placeholder="07XXXXXXXX"
            {...register("paymentPhone")}
          />

          {errors.paymentPhone && (
            <p className="text-sm text-destructive">
              {errors.paymentPhone.message}
            </p>
          )}
        </div>

        <Button
          type="button"
          onClick={handleInitiatePayment}
          disabled={paymentStatus === "initiating"}
          className="w-full rounded-xl bg-blue-600 hover:bg-blue-700"
        >
          {paymentStatus === "initiating" ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Initiating payment...
            </>
          ) : (
            "Pay Now"
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
