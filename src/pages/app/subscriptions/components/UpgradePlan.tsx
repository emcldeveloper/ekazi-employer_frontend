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
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCreateSubscription } from "@/hooks/subscriptions";
import { getErrorMessage } from "@/utils/axios-helpers";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type PaymentForm = {
  phone: string;
};

const UpgradePlan = () => {
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
        getErrorMessage(error);
      },
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">Subscribe</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Basic Plan</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        <div className="-mx-4 scrollbar max-h-[70vh] overflow-y-auto px-4 space-y-4">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="font-semibold">Sub Total</TableCell>
                <TableCell className="text-right">82,000.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Tax</TableCell>
                <TableCell className="text-right">18,000.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold">Total</TableCell>
                <TableCell className="text-right">100,000.00</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <div className="text-base font-bold">Payment method</div>
          <Tabs defaultValue="mobile">
            <TabsList className="w-full">
              <TabsTrigger value="mobile">Mobile Money</TabsTrigger>
              <TabsTrigger value="card" disabled>
                Credit Card
              </TabsTrigger>
            </TabsList>
            <TabsContent value="mobile">
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
            </TabsContent>
            <TabsContent value="card">card</TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpgradePlan;
