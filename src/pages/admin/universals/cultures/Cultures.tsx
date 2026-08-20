import type { Culture } from "@/@types/universals";
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
import { useCultures } from "@/hooks/universals";
import { Search } from "lucide-react";
import { useState } from "react";
import CreateCulture from "./CreateCulture";
import UpdateCulture from "./UpdateCulture";
import DeleteCulture from "./DeleteCulture";
import { useDebounce } from "@/hooks/useDebounce";
import { DataPagination } from "@/components/data-pagination";

const Cultures = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(25);

  const debouncedSearch = useDebounce(search, 500);

  const { data: culturesData, isLoading } = useCultures(
    debouncedSearch,
    page,
    perPage,
  );

  const cultures = culturesData?.data ?? [];

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

        <CreateCulture />
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
                Loading cultures...
              </TableCell>
            </TableRow>
          ) : cultures.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="h-24 text-center">
                {search
                  ? "No cultures found matching your search."
                  : "No cultures available."}
              </TableCell>
            </TableRow>
          ) : (
            cultures.map((culture: Culture, index: number) => (
              <TableRow key={culture.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{culture?.culture_name}</TableCell>
                <TableCell className="text-right">
                  <div>
                    <UpdateCulture />
                    <DeleteCulture />
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {cultures.length > 0 && (
        <DataPagination
          page={culturesData?.current_page}
          perPage={culturesData?.per_page}
          totalPages={culturesData?.total_pages}
          onPageChange={setPage}
          onPerPageChange={setPerPage}
        />
      )}
    </div>
  );
};

export default Cultures;
