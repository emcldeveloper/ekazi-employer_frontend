import type { Country } from "@/@types/universals";

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
import { useExperienceLevels } from "@/hooks/universals";
import { Search } from "lucide-react";
import { useState } from "react";
import CreateExperienceLevel from "./CreateExperienceLevel";
import UpdateExperienceLevel from "./UpdateExperienceLevel";
import DeleteExperienceLevel from "./DeleteExperienceLevel";

const ExperienceLevels = () => {
  const [search, setSearch] = useState("");

  const { data: countriesData, isLoading } = useExperienceLevels();

  const countries = countriesData?.data ?? [];

  return (
    <div className="space-y-4">
      <div className="mb-4 flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
        <InputGroup className="max-w-md">
          <InputGroupInput
            placeholder="Search ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <InputGroupAddon>
            <Search className="h-4 w-4" />
          </InputGroupAddon>
        </InputGroup>

        <CreateExperienceLevel />
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
                Loading countries...
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
                    <UpdateExperienceLevel />
                    <DeleteExperienceLevel />
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ExperienceLevels;
