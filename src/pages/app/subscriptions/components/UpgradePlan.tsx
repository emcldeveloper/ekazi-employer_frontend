import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useCreateSubscription } from "@/hooks/subscriptions";
import { getErrorMessage } from "@/utils/axios-helpers";
import { formatMoney } from "@/utils/helpers";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type PaymentForm = {
  phone: string;
};

interface UpgradePlanProps {
  plan: any;
}

const UpgradePlan = ({ plan }: UpgradePlanProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PaymentForm>();

  const { mutate: createPayment, isPending } = useCreateSubscription();

  const onSubmit = async (data: PaymentForm) => {
    console.log(data);
    const payload = {
      plan_id: 3,
      phone: data.phone,
    };

    createPayment(payload, {
      onSuccess: (res) => {
        toast.success(res?.message || "Subscription payment was succesfully");
        reset();
      },

      onError: (error) => {
        toast.error(getErrorMessage(error));
      },
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">Subscribe</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <div className="-mx-4 scrollbar max-h-[70vh] overflow-y-auto px-4 space-y-4">
          <div>
            <h2 className="text-lg font-semibold">{plan?.title}</h2>
            <p>{plan?.subtitle}</p>
          </div>

          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="font-semibold">Total</TableCell>
                <TableCell className="text-right">
                  {formatMoney(plan?.price)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <div className="mb-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="phone">Phone number</FieldLabel>
                  <Input
                    id="phone"
                    placeholder="255712345678"
                    {...register("phone", {
                      required: "Phone number is required",
                    })}
                  />
                  {errors.phone && (
                    <FieldError>{errors.phone.message}</FieldError>
                  )}
                </Field>

                <Button type="submit" disabled={isPending}>
                  {isPending ? "Processing..." : "Confirm Payment"}
                </Button>
              </FieldGroup>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpgradePlan;
