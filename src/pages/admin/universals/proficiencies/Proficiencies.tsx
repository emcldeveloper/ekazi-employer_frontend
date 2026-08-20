import type { Proficiency } from "@/@types/universals";

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
import { useProficiencies } from "@/hooks/universals";
import { Search } from "lucide-react";
import { useState } from "react";
import CreateProficiency from "./CreateProficiency";
import UpdateProficiency from "./UpdateProficiency";
import DeleteProficiency from "./DeleteProficiency";
import { capitalizeText } from "@/utils/helpers";
import { DataPagination } from "@/components/data-pagination";
import { useDebounce } from "@/hooks/useDebounce";

const Proficiencies = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(25);

  const debouncedSearch = useDebounce(search, 500);

  const { data: proficienciesData, isLoading } = useProficiencies(
    debouncedSearch,
    page,
    perPage,
  );

  const proficiencies = proficienciesData?.data ?? [];

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

        <CreateProficiency />
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
                Loading proficiencies...
              </TableCell>
            </TableRow>
          ) : proficiencies.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="h-24 text-center">
                {search
                  ? "No proficiencies found matching your search."
                  : "No proficiencies available."}
              </TableCell>
            </TableRow>
          ) : (
            proficiencies.map((profociency: Proficiency, index: number) => (
              <TableRow key={profociency.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="max-w-50 truncate">
                  {capitalizeText(profociency.name)}
                </TableCell>
                <TableCell className="text-right">
                  <div>
                    <UpdateProficiency />
                    <DeleteProficiency />
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {proficiencies.length > 0 && (
        <DataPagination
          page={proficienciesData?.current_page}
          perPage={proficienciesData?.per_page}
          totalPages={proficienciesData?.total_pages}
          onPageChange={setPage}
          onPerPageChange={setPerPage}
        />
      )}
    </div>
  );
};

export default Proficiencies;
