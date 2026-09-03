import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { usePaymentUssd } from "@/hooks/subscriptions";
import { getErrorMessage } from "@/utils/axios-helpers";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type UssdPayload = {
  reference: string;
};

const PushPaymentUssd = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UssdPayload>();

  const { mutate: pushPaymentUssd, isPending } = usePaymentUssd();

  const onSubmit = (data: UssdPayload) => {
    const reference = data.reference;

    pushPaymentUssd(reference, {
      onSuccess: (res) => {
        toast.success(res?.message || "Ussd pushed to user successfully");
        reset();
      },
      onError: (error) => {
        getErrorMessage(error || "Failed to push ussd");
      },
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Push USSD</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Resend Payment USSD</DialogTitle>
          <DialogDescription>
            Use this option to resend the payment USSD prompt to a user who did
            not receive it while subscribing. Enter the payment reference number
            and push the USSD request again so the user can complete their
            subscription payment.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="reference">Reference Number</FieldLabel>
              <Input
                {...register("reference", {
                  required: "Payment reference is required",
                })}
              />
              {errors.reference && (
                <FieldError>{errors.reference.message}</FieldError>
              )}
            </Field>

            <Button type="submit" disabled={isPending}>
              {isPending ? "Pushing..." : "Push USSD"}
            </Button>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PushPaymentUssd;
