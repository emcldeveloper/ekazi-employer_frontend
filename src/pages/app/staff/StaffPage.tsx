import { useState } from "react";
import { UserCheckIcon, Search, UsersIcon, UserXIcon } from "lucide-react";

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

import { DataPagination } from "@/components/data-pagination";
import { useDebounce } from "@/hooks/useDebounce";
import type { ClientStaff } from "@/@types/staff";
import { capitalizeText } from "@/utils/helpers";
import CreateStaff from "./components/CreateStaff";
import UpdateStaff from "./components/UpdateStaff";
import DeleteStaff from "./components/DeleteStaff";
import { useStaffs } from "@/hooks/staff";

const StaffPage = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(25);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 500);

  const { data: staffData, isLoading } = useStaffs(
    debouncedSearch,
    page,
    perPage,
  );

  const staffs = staffData?.data ?? [];
  const totalStaffs = staffData?.total;

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold">Manage Staff</h2>
        <p className="text-sm text-muted-foreground mt-1">
          View, manage, and monitor staff accounts across your platform.
        </p>
      </div>

      {/* stats */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        <Card size="sm" className="">
          <CardContent className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-muted-foreground">Total </h3>
              <p className="text-2xl font-bold">{totalStaffs}</p>
            </div>

            <div className="rounded-lg bg-blue-100 p-3 text-blue-600">
              <UsersIcon size={16} />
            </div>
          </CardContent>
        </Card>

        <Card size="sm">
          <CardContent className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-muted-foreground">Active</h3>
              <p className="text-2xl font-bold">0</p>
            </div>

            <div className="rounded-lg bg-green-100 p-3 text-green-600">
              <UserCheckIcon size={16} />
            </div>
          </CardContent>
        </Card>

        <Card size="sm">
          <CardContent className="flex items-center justify-between ">
            <div>
              <h3 className="text-sm text-muted-foreground">Inactive</h3>
              <p className="text-2xl font-bold">0</p>
            </div>

            <div className="rounded-lg bg-red-100 p-3 text-red-600">
              <UserXIcon size={16} />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent>
          <div className="space-y-6">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <InputGroup className="max-w-md">
                <InputGroupInput
                  placeholder="Search staff..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                />

                <InputGroupAddon>
                  <Search className="h-4 w-4" />
                </InputGroupAddon>
              </InputGroup>

              {/* Create staff button */}
              <CreateStaff />
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-40">
                      <div className="flex items-center justify-center">
                        <Spinner className="size-6" />
                      </div>
                    </TableCell>
                  </TableRow>
                ) : staffs.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="h-20 text-center text-muted-foreground"
                    >
                      No staffs found
                    </TableCell>
                  </TableRow>
                ) : (
                  staffs.map((staff: ClientStaff) => (
                    <TableRow key={staff?.id}>
                      <TableCell>
                        {capitalizeText(
                          `${staff?.first_name} ${staff.middle_name} ${staff.last_name}`,
                        )}
                      </TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>{staff?.phone_number}</TableCell>

                      <TableCell className="text-right">
                        <div>
                          <UpdateStaff staff={staff} />
                          <DeleteStaff staffId={staff.id} />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>

            {/* Pagination */}
            {staffs.length > 0 && (
              <DataPagination
                page={staffData?.page}
                perPage={staffData?.limit}
                totalPages={staffData?.totalPages}
                onPageChange={setPage}
                onPerPageChange={setPerPage}
              />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StaffPage;
