import type { Region } from "@/@types/universals";

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
import { useRegions } from "@/hooks/universals";
import { Search } from "lucide-react";
import { useState } from "react";
import CreateRegion from "./CreateRegion";
import UpdateRegion from "./UpdateRegion";
import DeleteRegion from "./DeleteRegion";
import { capitalizeText } from "@/utils/helpers";
import { useDebounce } from "@/hooks/useDebounce";
import { DataPagination } from "@/components/data-pagination";

const Regions = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(25);

  const debouncedSearch = useDebounce(search, 500);

  const { data: regionsData, isLoading } = useRegions(
    debouncedSearch,
    page,
    perPage,
  );

  const regions = regionsData?.data ?? [];

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

        <CreateRegion />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No.</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Country</TableHead>
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
          ) : regions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="h-24 text-center">
                {search
                  ? "No regions found matching your search."
                  : "No regions available."}
              </TableCell>
            </TableRow>
          ) : (
            regions.map((region: Region, index: number) => (
              <TableRow key={region.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{region?.name}</TableCell>
                <TableCell>{capitalizeText(region?.country?.name)}</TableCell>
                <TableCell className="text-right">
                  <div>
                    <UpdateRegion />
                    <DeleteRegion />
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {regions.length > 0 && (
        <DataPagination
          page={regionsData?.current_page}
          perPage={regionsData?.per_page}
          totalPages={regionsData?.total_pages}
          onPageChange={setPage}
          onPerPageChange={setPerPage}
        />
      )}
    </div>
  );
};

export default Regions;
