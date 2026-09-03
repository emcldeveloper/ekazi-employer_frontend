import type { Payment } from "@/@types/payments";
import { Badge } from "@/components/ui/badge";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { formatMoney } from "@/utils/helpers";

const statusStyles = {
  completed: "bg-green-100 text-green-700 border-green-200",
  canceled: "bg-gray-100 text-gray-700 border-gray-200",
  failed: "bg-red-100 text-red-700 border-red-200",
  pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
} as const;

interface ViewPaymentDetailsProps {
  payment: Payment;
}

const PaymentDetails = ({ payment }: ViewPaymentDetailsProps) => {
  return (
    <div className="space-y-8 py-4">
      <div>
        <h2 className="text-xl font-bold">Payment Details</h2>
        <p className="text-xs text-muted-foreground">{payment.reference}</p>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-bold">
          <span className="text-sm font-normal">TZS</span>{" "}
          {formatMoney(payment.amount.value)}/=
        </h2>
        <Badge
          className={
            statusStyles[payment.status as keyof typeof statusStyles] ??
            "bg-gray-100 text-gray-700"
          }
        >
          {payment.status}
        </Badge>
      </div>

      <div className="space-y-2">
        <h2 className="">Payment</h2>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="font-semibold">Provider</TableCell>
              <TableCell className="text-right">
                {payment.channel.provider}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold">Method</TableCell>
              <TableCell className="text-right">
                {payment.payment_type}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold">Reference</TableCell>
              <TableCell className="text-right">{payment.reference}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold">Order ID</TableCell>
              <TableCell className="text-right">
                {payment.metadata.order_id}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div className="space-y-2">
        <h2 className="">Customer</h2>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="font-semibold">Name</TableCell>
              <TableCell className="text-right">
                {payment.customer.first_name} {payment.customer.last_name}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold">Email</TableCell>
              <TableCell className="text-right">
                {payment.customer.email}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold">Phone</TableCell>
              <TableCell className="text-right">
                {payment.customer.phone}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div className="space-y-2">
        <h2 className="">Settlement</h2>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="font-semibold">Gross</TableCell>
              <TableCell className="text-right">
                {formatMoney(payment.settlement.gross.value)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold">Fees</TableCell>
              <TableCell className="text-right">
                {formatMoney(payment.settlement.fees.value)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold">Net</TableCell>
              <TableCell className="text-right">
                {formatMoney(payment.settlement.net.value)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PaymentDetails;
