import type { EducationLevel } from "@/@types/universals";

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
import { useEducationLevels } from "@/hooks/universals";
import { Search } from "lucide-react";
import { useState } from "react";
import CreateEducationLevel from "./CreateEducationLevel";
import UpdateEducationLevel from "./UpdateEducationLevel";
import DeleteEducationLevel from "./DeleteEducationLevel";
import { useDebounce } from "@/hooks/useDebounce";
import { DataPagination } from "@/components/data-pagination";

const EducationLevels = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(25);

  const debouncedSearch = useDebounce(search, 500);

  const { data: levelsData, isLoading } = useEducationLevels(
    debouncedSearch,
    page,
    perPage,
  );

  const levels = levelsData?.data ?? [];

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

        <CreateEducationLevel />
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
          ) : levels.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="h-24 text-center">
                {search
                  ? "No levels found matching your search."
                  : "No levels available."}
              </TableCell>
            </TableRow>
          ) : (
            levels.map((level: EducationLevel, index: number) => (
              <TableRow key={level.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{level?.education_level}</TableCell>
                <TableCell className="text-right">
                  <div>
                    <UpdateEducationLevel />
                    <DeleteEducationLevel />
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {levels.length > 0 && (
        <DataPagination
          page={levelsData?.current_page}
          perPage={levelsData?.per_page}
          totalPages={levelsData?.total_pages}
          onPageChange={setPage}
          onPerPageChange={setPerPage}
        />
      )}
    </div>
  );
};

export default EducationLevels;
