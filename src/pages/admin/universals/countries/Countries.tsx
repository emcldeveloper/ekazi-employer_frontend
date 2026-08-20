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

import { useCountries } from "@/hooks/universals";
import type { Country } from "@/@types/universals";
import CreateCountry from "./CreateCountry";
import UpdateCountry from "./UpdateCountry";
import DeleteCountry from "./DeleteCountry";
import { DataPagination } from "@/components/data-pagination";
import { useDebounce } from "@/hooks/useDebounce";

const Countries = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(25);

  const debouncedSearch = useDebounce(search, 500);

  const { data: countriesData, isLoading } = useCountries(
    debouncedSearch,
    page,
    perPage,
  );

  const countries = countriesData?.data ?? [];

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

        <CreateCountry />
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
          ) : countries.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="h-24 text-center">
                {search
                  ? "No countries found matching your search."
                  : "No countries available."}
              </TableCell>
            </TableRow>
          ) : (
            countries.map((country: Country, index: number) => (
              <TableRow key={country.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{country.name}</TableCell>
                <TableCell className="text-right">
                  <div>
                    <UpdateCountry />
                    <DeleteCountry />
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {countries.length > 0 && (
        <DataPagination
          page={countriesData?.current_page}
          perPage={countriesData?.per_page}
          totalPages={countriesData?.total_pages}
          onPageChange={setPage}
          onPerPageChange={setPerPage}
        />
      )}
    </div>
  );
};

export default Countries;
