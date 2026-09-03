import { useState } from "react";
import { SearchIcon } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";

import type { ClientPayment } from "@/@types/payments";
import { useClientPayments } from "@/hooks/subscriptions";
import { useDebounce } from "@/hooks/useDebounce";
import { DataPagination } from "@/components/data-pagination";
import ViewBilling from "./ViewBilling";
import { formatMoney } from "@/utils/helpers";
import { Badge } from "@/components/ui/badge";

const Billing = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(25);

  const debouncedSearch = useDebounce(search, 500);

  const { data: paymentsData, isLoading } = useClientPayments(
    debouncedSearch,
    page,
    perPage,
  );
  const payments = paymentsData?.data ?? [];

  return (
    <div className="space-y-6">
      {/* Billing History */}
      <Card>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <InputGroup className="max-w-md">
              <InputGroupInput
                placeholder="Search company or title..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
              />
              <InputGroupAddon>
                <SearchIcon />
              </InputGroupAddon>
            </InputGroup>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Reference</TableHead>
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
                      {payment.provider_transaction_id}
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
                      <ViewBilling payment={payment} />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          {/* pagination */}
          {payments.length > 0 && (
            <DataPagination
              page={paymentsData?.page}
              perPage={paymentsData?.limit}
              totalPages={paymentsData?.totalPages}
              onPageChange={setPage}
              onPerPageChange={setPerPage}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Billing;
