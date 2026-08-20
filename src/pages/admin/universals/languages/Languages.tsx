import type { Language } from "@/@types/language";

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
import { useLanguage } from "@/hooks/universals";
import { Search } from "lucide-react";
import { useState } from "react";
import CreateLanguage from "./CreateLanguage";
import UpdateLanguage from "./UpdateLanguage";
import DeleteLanguage from "./DeleteLanguage";
import { capitalizeText } from "@/utils/helpers";
import { useDebounce } from "@/hooks/useDebounce";
import { DataPagination } from "@/components/data-pagination";

const Languages = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(25);

  const debouncedSearch = useDebounce(search, 500);

  const { data: languagesData, isLoading } = useLanguage(
    debouncedSearch,
    page,
    perPage,
  );

  const languages = languagesData?.data ?? [];

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

        <CreateLanguage />
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
          ) : languages.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="h-24 text-center">
                {search
                  ? "No languages found matching your search."
                  : "No languages available."}
              </TableCell>
            </TableRow>
          ) : (
            languages.map((language: Language, index: number) => (
              <TableRow key={language.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{capitalizeText(language.language_name)}</TableCell>
                <TableCell className="text-right">
                  <div>
                    <UpdateLanguage />
                    <DeleteLanguage />
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {languages.length > 0 && (
        <DataPagination
          page={languagesData?.current_page}
          perPage={languagesData?.per_page}
          totalPages={languagesData?.total_pages}
          onPageChange={setPage}
          onPerPageChange={setPerPage}
        />
      )}
    </div>
  );
};

export default Languages;
