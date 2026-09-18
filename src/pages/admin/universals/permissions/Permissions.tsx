import { useState } from "react";
import { Search } from "lucide-react";

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

import { useDebounce } from "@/hooks/useDebounce";
import { DataPagination } from "@/components/data-pagination";
import { usePermissions } from "@/hooks/universals/permissions";
import CreatePermission from "./CreatePermission";
import UpdatePermission from "./UpdatePermission";
import DeletePermission from "./DeletePermission";
import type { Permission } from "@/@types/universals/permissions";

const Permissions = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(25);

  const debouncedSearch = useDebounce(search, 500);

  const { data: permissionsData, isLoading } = usePermissions(
    debouncedSearch,
    page,
    perPage,
  );

  const permissions = permissionsData?.data ?? [];

  return (
    <div className="space-y-4">
      <div className="mb-4 flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
        <InputGroup className="max-w-md">
          <InputGroupInput
            placeholder="Search ..."
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

        <CreatePermission />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No.</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={3} className="h-24 text-center">
                Loading permissions...
              </TableCell>
            </TableRow>
          ) : permissions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="h-24 text-center">
                {search
                  ? "No permissions found matching your search."
                  : "No permissions available."}
              </TableCell>
            </TableRow>
          ) : (
            permissions.map((permission: Permission, index: number) => (
              <TableRow key={permission.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{permission.name}</TableCell>
                <TableCell className="text-right">
                  <div>
                    <UpdatePermission permission={permission} />
                    <DeletePermission id={permission.id} />
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {permissions.length > 0 && (
        <DataPagination
          page={permissionsData?.page}
          perPage={permissionsData?.limit}
          totalPages={permissionsData?.totalPages}
          onPageChange={setPage}
          onPerPageChange={setPerPage}
        />
      )}
    </div>
  );
};

export default Permissions;
