import type { Software } from "@/@types/universals";

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
import { useSoftwares } from "@/hooks/universals";
import { Search } from "lucide-react";
import { useState } from "react";
import CreateSoftware from "./CreateSoftware";
import UpdateSoftware from "./UpdateSoftware";
import DeleteSoftware from "./DeleteSoftware";
import { capitalizeText } from "@/utils/helpers";
import { useDebounce } from "@/hooks/useDebounce";
import { DataPagination } from "@/components/data-pagination";

const Softwares = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(25);

  const debouncedSearch = useDebounce(search, 500);

  const { data: softwaresData, isLoading } = useSoftwares(
    debouncedSearch,
    page,
    perPage,
  );

  const softwares = softwaresData?.data ?? [];

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

        <CreateSoftware />
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
                Loading softwares...
              </TableCell>
            </TableRow>
          ) : softwares.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="h-24 text-center">
                {search
                  ? "No softwares found matching your search."
                  : "No softwares available."}
              </TableCell>
            </TableRow>
          ) : (
            softwares.map((software: Software, index: number) => (
              <TableRow key={software.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="max-w-50 truncate">
                  {capitalizeText(software.software_name)}
                </TableCell>
                <TableCell className="text-right">
                  <div>
                    <UpdateSoftware />
                    <DeleteSoftware />
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {softwares.length > 0 && (
        <DataPagination
          page={softwaresData?.current_page}
          perPage={softwaresData?.per_page}
          totalPages={softwaresData?.total_pages}
          onPageChange={setPage}
          onPerPageChange={setPerPage}
        />
      )}
    </div>
  );
};

export default Softwares;
