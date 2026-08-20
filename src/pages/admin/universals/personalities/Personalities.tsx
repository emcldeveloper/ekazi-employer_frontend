import type { Personality } from "@/@types/universals";

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
import { usePersonalities } from "@/hooks/universals";
import { Search } from "lucide-react";
import { useState } from "react";
import CreatePersonality from "./CreatePersonality";
import UpdatePersonality from "./UpdatePersonality";
import DeletePersonality from "./DeletePersonality";
import { capitalizeText } from "@/utils/helpers";
import { useDebounce } from "@/hooks/useDebounce";
import { DataPagination } from "@/components/data-pagination";

const Personalities = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(25);

  const debouncedSearch = useDebounce(search, 500);

  const { data: personalitiesData, isLoading } = usePersonalities(
    debouncedSearch,
    page,
    perPage,
  );

  const personalities = personalitiesData?.data ?? [];

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

        <CreatePersonality />
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
                Loading personalities...
              </TableCell>
            </TableRow>
          ) : personalities.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="h-24 text-center">
                {search
                  ? "No personalities found matching your search."
                  : "No personalities available."}
              </TableCell>
            </TableRow>
          ) : (
            personalities.map((personality: Personality, index: number) => (
              <TableRow key={personality.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{capitalizeText(personality.name)}</TableCell>
                <TableCell className="text-right">
                  <div>
                    <UpdatePersonality />
                    <DeletePersonality />
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {personalities.length > 0 && (
        <DataPagination
          page={personalitiesData?.current_page}
          perPage={personalitiesData?.per_page}
          totalPages={personalitiesData?.total_pages}
          onPageChange={setPage}
          onPerPageChange={setPerPage}
        />
      )}
    </div>
  );
};

export default Personalities;
