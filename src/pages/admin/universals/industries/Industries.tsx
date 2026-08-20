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
import type { Industry } from "@/@types/universals";
import { useIndustries } from "@/hooks/universals";
import { useDebounce } from "@/hooks/useDebounce";
import { DataPagination } from "@/components/data-pagination";
import { capitalizeText } from "@/utils/helpers";
import CreateIndustry from "./CreateIndustry";
import UpdateIndustry from "./UpdateIndustry";
import DeleteIndustry from "./DeleteIndustry";

const Industries = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(25);

  const debouncedSearch = useDebounce(search, 500);

  const { data: industriesData, isLoading } = useIndustries(
    debouncedSearch,
    page,
    perPage,
  );

  const industries = industriesData?.data ?? [];

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

        <CreateIndustry />
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
                Loading industries...
              </TableCell>
            </TableRow>
          ) : industries.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="h-24 text-center">
                {search
                  ? "No industries found matching your search."
                  : "No industries available."}
              </TableCell>
            </TableRow>
          ) : (
            industries.map((industry: Industry, index: number) => (
              <TableRow key={industry.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{capitalizeText(industry.name)}</TableCell>
                <TableCell className="text-right">
                  <div>
                    <UpdateIndustry />
                    <DeleteIndustry />
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {industries.length > 0 && (
        <DataPagination
          page={industriesData?.current_page}
          perPage={industriesData?.per_page}
          totalPages={industriesData?.total_pages}
          onPageChange={setPage}
          onPerPageChange={setPerPage}
        />
      )}
    </div>
  );
};

export default Industries;
