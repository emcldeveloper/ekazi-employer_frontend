import type { JobType } from "@/@types/universals";

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
import { useJobTypes } from "@/hooks/universals";
import { Search } from "lucide-react";
import { useState } from "react";
import CreateJobType from "./CreateJobType";
import { capitalizeText } from "@/utils/helpers";
import UpdateJobType from "./UpdateJobType";
import DeleteJobTypes from "./DeleteJobTypes";
import { useDebounce } from "@/hooks/useDebounce";
import { DataPagination } from "@/components/data-pagination";

const JobTypes = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(25);

  const debouncedSearch = useDebounce(search, 500);

  const { data: typesData, isLoading } = useJobTypes(
    debouncedSearch,
    page,
    perPage,
  );

  const types = typesData?.data ?? [];

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

        <CreateJobType />
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
                Loading types...
              </TableCell>
            </TableRow>
          ) : types.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="h-24 text-center">
                {search
                  ? "No types found matching your search."
                  : "No types available."}
              </TableCell>
            </TableRow>
          ) : (
            types.map((type: JobType, index: number) => (
              <TableRow key={type.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{capitalizeText(type?.type_name)}</TableCell>
                <TableCell className="text-right">
                  <div>
                    <UpdateJobType />
                    <DeleteJobTypes />
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {types.length > 0 && (
        <DataPagination
          page={typesData?.pagination?.page}
          perPage={typesData?.pagination?.limit}
          totalPages={typesData?.pagination?.totalPages}
          onPageChange={setPage}
          onPerPageChange={setPerPage}
        />
      )}
    </div>
  );
};

export default JobTypes;
