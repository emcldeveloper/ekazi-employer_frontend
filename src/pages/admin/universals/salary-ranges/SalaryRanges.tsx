import type { SalaryRange } from "@/@types/universals";

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
import { useSalaryRange } from "@/hooks/universals";
import { Search } from "lucide-react";
import { useState } from "react";
import CreateRange from "./CreateRange";
import UpdateRange from "./UpdateRange";
import DeleteRange from "./DeleteRange";
import { DataPagination } from "@/components/data-pagination";
import { useDebounce } from "@/hooks/useDebounce";
import { formatMoney } from "@/utils/helpers";

const SalaryRanges = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(25);

  const debouncedSearch = useDebounce(search, 500);

  const { data: rangesData, isLoading } = useSalaryRange(
    debouncedSearch,
    page,
    perPage,
  );

  const ranges = rangesData?.data ?? [];

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

        <CreateRange />
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
                Loading ranges...
              </TableCell>
            </TableRow>
          ) : ranges.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="h-24 text-center">
                {search
                  ? "No ranges found matching your search."
                  : "No ranges available."}
              </TableCell>
            </TableRow>
          ) : (
            ranges.map((range: SalaryRange, index: number) => (
              <TableRow key={range.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{formatMoney(range?.low)}</TableCell>
                <TableCell className="text-right">
                  <div>
                    <UpdateRange />
                    <DeleteRange />
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {ranges.length > 0 && (
        <DataPagination
          page={rangesData?.current_page}
          perPage={rangesData?.per_page}
          totalPages={rangesData?.total_pages}
          onPageChange={setPage}
          onPerPageChange={setPerPage}
        />
      )}
    </div>
  );
};

export default SalaryRanges;
