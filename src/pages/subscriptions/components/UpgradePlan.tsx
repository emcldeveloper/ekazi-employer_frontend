import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const mobilePayments = [
  {
    id: 1,
    name: "Mix by yass",
    img: "/assets/mobile-payments/mixx-by-yass.png",
  },
  {
    id: 2,
    name: "Mpesa",
    img: "/assets/mobile-payments/M-PESA.png",
  },
  {
    id: 3,
    name: "Airtel",
    img: "/assets/mobile-payments/airtel.png",
  },
  {
    id: 4,
    name: "Halotel",
    img: "/assets/mobile-payments/halotel.png",
  },
];

const UpgradePlan = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">Upgrade</Button>
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
                <Card size="sm">
                  <CardContent>
                    <div className="flex items-center justify-between gap-2">
                      {mobilePayments.map((payment: any) => (
                        <div className="w-20 cursor-pointer">
                          <img src={payment?.img} alt="" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="card">card</TabsContent>
          </Tabs>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit">Confirm Payment</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpgradePlan;
