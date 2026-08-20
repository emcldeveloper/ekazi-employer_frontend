import type { Position } from "@/@types/universals";

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
import { usePositions } from "@/hooks/universals";
import { Search } from "lucide-react";
import { useState } from "react";
import CreatePosition from "./CreatePosition";
import UpdatePosition from "./UpdatePosition";
import DeletePosition from "./DeletePosition";
import { capitalizeText } from "@/utils/helpers";
import { useDebounce } from "@/hooks/useDebounce";
import { DataPagination } from "@/components/data-pagination";

const Positions = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(25);

  const debouncedSearch = useDebounce(search, 500);

  const { data: positionsData, isLoading } = usePositions(
    debouncedSearch,
    page,
    perPage,
  );

  const positions = positionsData?.data ?? [];

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

        <CreatePosition />
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
                Loading positions...
              </TableCell>
            </TableRow>
          ) : positions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="h-24 text-center">
                {search
                  ? "No positions found matching your search."
                  : "No positions available."}
              </TableCell>
            </TableRow>
          ) : (
            positions.map((position: Position, index: number) => (
              <TableRow key={position.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="max-w-50 truncate">
                  {capitalizeText(position.name)}
                </TableCell>
                <TableCell className="text-right">
                  <div>
                    <UpdatePosition />
                    <DeletePosition />
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {positions.length > 0 && (
        <DataPagination
          page={positionsData?.current_page}
          perPage={positionsData?.per_page}
          totalPages={positionsData?.total_pages}
          onPageChange={setPage}
          onPerPageChange={setPerPage}
        />
      )}
    </div>
  );
};

export default Positions;
