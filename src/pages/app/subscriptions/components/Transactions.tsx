import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";

import type { ClientPayment } from "@/@types/payments";
import { useClientPayments } from "@/hooks/subscriptions";
import { formatDate, formatMoney } from "@/utils/helpers";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { generatePaymentReceipt } from "@/utils/generateInvoice";

const Transactions = () => {
  const { data: paymentsData, isLoading } = useClientPayments();
  const payments = paymentsData?.data ?? [];

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Recent transactions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Order reference</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-32">
                    <div className="flex items-center justify-center">
                      <Spinner className="size-8" />
                    </div>
                  </TableCell>
                </TableRow>
              ) : payments.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="h-24 text-center text-muted-foreground"
                  >
                    No payments found.
                  </TableCell>
                </TableRow>
              ) : (
                payments.map((payment: ClientPayment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">
                      {formatDate(payment.created_at)}
                    </TableCell>

                    <TableCell className="font-medium">
                      {payment.transaction_id}
                    </TableCell>

                    <TableCell className="font-medium">
                      {payment.plan.name}
                    </TableCell>

                    <TableCell className="font-medium">
                      {formatMoney(payment.amount)}
                    </TableCell>

                    <TableCell>
                      <Badge
                        className={
                          payment.status === "success"
                            ? "bg-green-100 text-green-700 hover:bg-green-100"
                            : payment.status === "failed"
                              ? "bg-red-100 text-red-700 hover:bg-red-100"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-100"
                        }
                      >
                        {payment.status}
                      </Badge>
                    </TableCell>

                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => generatePaymentReceipt(payment)}
                      >
                        <Download />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Transactions;
