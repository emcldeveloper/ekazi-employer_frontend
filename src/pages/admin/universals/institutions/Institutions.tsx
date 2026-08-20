import type { College } from "@/@types/universals";

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
import { useColleges } from "@/hooks/universals";
import { Search } from "lucide-react";
import { useState } from "react";
import CreateInstitution from "./CreateInstitution";
import UpdateInstituion from "./UpdateInstitution";
import DeleteInstitution from "./DeleteInstitution";
import { capitalizeText } from "@/utils/helpers";
import { useDebounce } from "@/hooks/useDebounce";
import { DataPagination } from "@/components/data-pagination";

const Institutions = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(25);

  const debouncedSearch = useDebounce(search, 500);

  const { data: collegesData, isLoading } = useColleges(
    debouncedSearch,
    page,
    perPage,
  );

  const colleges = collegesData?.data ?? [];

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

        <CreateInstitution />
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
                Loading...
              </TableCell>
            </TableRow>
          ) : colleges.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="h-24 text-center">
                {search
                  ? "No colleges found matching your search."
                  : "No colleges available."}
              </TableCell>
            </TableRow>
          ) : (
            colleges.map((college: College, index: number) => (
              <TableRow key={college.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{capitalizeText(college.college_name)}</TableCell>
                <TableCell className="text-right">
                  <div>
                    <UpdateInstituion />
                    <DeleteInstitution />
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {colleges.length > 0 && (
        <DataPagination
          page={collegesData?.current_page}
          perPage={collegesData?.per_page}
          totalPages={collegesData?.total_pages}
          onPageChange={setPage}
          onPerPageChange={setPerPage}
        />
      )}
    </div>
  );
};

export default Institutions;
