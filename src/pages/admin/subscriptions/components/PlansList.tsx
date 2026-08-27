import { useState } from "react";
import { Search } from "lucide-react";

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
import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { Badge } from "@/components/ui/badge";

import type { Plan } from "@/@types/subscriptions";
import { DataPagination } from "@/components/data-pagination";
import { useDebounce } from "@/hooks/useDebounce";
import { usePlans } from "@/hooks/subscription-plans";
import CreatePlan from "./CreatePlan";
import UpdatePlan from "./UpdatePlan";
import DeletePlan from "./DeletePlan";

const PlansList = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(25);

  const debouncedSearch = useDebounce(search, 500);

  const { data: plansData, isLoading } = usePlans(
    page,
    perPage,
    debouncedSearch,
  );

  const plans = plansData?.data ?? [];

  return (
    <div>
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

            <CreatePlan />
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Plan</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>For/Role</TableHead>

                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={2} className="h-32">
                    <div className="flex items-center justify-center">
                      <Spinner className="size-8" />
                    </div>
                  </TableCell>
                </TableRow>
              ) : plans.length > 0 ? (
                plans.map((plan: Plan) => (
                  <TableRow key={plan?.id}>
                    <TableCell>{plan?.name}</TableCell>
                    <TableCell>{plan?.price}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          plan?.role === "employer"
                            ? "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                            : "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"
                        }
                      >
                        {plan?.role === "employer" ? "Employer" : "Applicant"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <UpdatePlan plan={plan} />
                        <DeletePlan id={plan?.id} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center h-30">
                    No plans found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {/* pagination */}
          {plans.length > 0 && (
            <DataPagination
              page={plansData?.page}
              perPage={plansData?.limit}
              totalPages={plansData?.totalPages}
              onPageChange={setPage}
              onPerPageChange={setPerPage}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PlansList;
