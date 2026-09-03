import { useState } from "react";
import {
  ArrowLeftRight,
  BriefcaseBusiness,
  CircleCheckBig,
  CircleX,
  Search,
} from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";

import { usePaymentBalance, usePayments } from "@/hooks/subscriptions";
import type { Payment } from "@/@types/payments";
import { formatDate, formatMoney } from "@/utils/helpers";
import ViewPayment from "./ViewPayment";
import PushPaymentUssd from "./PushPaymentUssd";
import { DataPagination } from "@/components/data-pagination";

const statusStyles = {
  completed: "bg-green-100 text-green-700 border-green-200",
  canceled: "bg-gray-100 text-gray-700 border-gray-200",
  failed: "bg-red-100 text-red-700 border-red-200",
  pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
} as const;

const PaymentsList = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(25);
  const [statusFilter, setStatusFilter] = useState("All");

  const { data: paymentsBalance } = usePaymentBalance();
  const balance = paymentsBalance?.data?.data?.balance.value;

  const offset = (page - 1) * perPage;

  const { data: paymentsData, isLoading } = usePayments(perPage, offset);
  const payments = paymentsData?.data?.payments?.items ?? [];
  const totalTransactions = paymentsData?.data?.total;
  const limit = paymentsData?.data?.limit;

  const totalPages = Math.ceil(totalTransactions / limit);
  const currentPage = Math.floor(offset / limit) + 1;

  return (
    <div className="space-y-4">
      {/* stats */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        <Card>
          <CardContent className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-muted-foreground">Balance</h3>
              <p className="mt-1 text-3xl font-bold">
                {formatMoney(balance)} <span className="text-xs">TZS</span>
              </p>
            </div>

            <div className="rounded-lg bg-blue-100 p-3 text-blue-600">
              <BriefcaseBusiness size={16} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-muted-foreground">Transactions</h3>
              <p className="mt-1 text-3xl font-bold">{totalTransactions}</p>
            </div>

            <div className="rounded-lg bg-orange-100 p-3 text-orange-600">
              <ArrowLeftRight size={16} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-muted-foreground">Completed</h3>
              <p className="mt-1 text-3xl font-bold">0</p>
            </div>

            <div className="rounded-lg bg-green-100 p-3 text-green-600">
              <CircleCheckBig size={16} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-muted-foreground">Failed</h3>
              <p className="mt-1 text-3xl font-bold">0</p>
            </div>

            <div className="rounded-lg bg-red-100 p-3 text-red-600">
              <CircleX size={16} />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="space-y-4">
          {/* Search & Filters */}

          <div className="mb-4 flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
            <InputGroup className="max-w-md">
              <InputGroupInput
                placeholder="Search recruiter..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <InputGroupAddon>
                <Search className="h-4 w-4" />
              </InputGroupAddon>
            </InputGroup>

            <div className="flex flex-col gap-2 sm:flex-row">
              {/* Status Filter */}
              <Select
                value={statusFilter}
                onValueChange={(value) => setStatusFilter(value)}
              >
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter status" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>

                    <SelectItem value="All">All Status</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Not Active">Not Active</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              {/* Featured Filter */}
              <PushPaymentUssd />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Reference</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className=" text-center h-30">
                    <div className="flex items-center justify-center">
                      <Spinner className="size-8" />
                    </div>
                  </TableCell>
                </TableRow>
              ) : payments.length > 0 ? (
                payments.map((payment: Payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">
                      {payment.reference}
                    </TableCell>

                    <TableCell>
                      <div>
                        <p className="text-sm">{`${payment.customer.first_name} ${payment.customer.last_name}`}</p>
                        <span className="text-xs text-muted-foreground">
                          {payment.customer.email}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell>{payment.amount.value}</TableCell>

                    <TableCell>
                      <Badge
                        className={
                          statusStyles[
                            payment.status as keyof typeof statusStyles
                          ] ?? "bg-gray-100 text-gray-700"
                        }
                      >
                        {payment.status}
                      </Badge>
                    </TableCell>

                    <TableCell>{formatDate(payment.completed_at)}</TableCell>

                    <TableCell className="text-right">
                      <ViewPayment payment={payment} />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center h-30">
                    No subscriptions found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {payments.length > 0 && (
            <DataPagination
              page={currentPage}
              perPage={limit}
              totalPages={totalPages}
              onPageChange={setPage}
              onPerPageChange={setPerPage}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentsList;
