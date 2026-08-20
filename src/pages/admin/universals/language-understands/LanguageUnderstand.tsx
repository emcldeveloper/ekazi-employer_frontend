import type { SkillLevel } from "@/@types/universals";

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
import { useLanguageUnderstand } from "@/hooks/universals";
import { Search } from "lucide-react";
import { useState } from "react";
import CreateUnderstand from "./CreateUnderstand";
import UpdateUnderstand from "./UpdateUnderstand";
import DeleteUnderstand from "./DeleteUnderstand";
import { capitalizeText } from "@/utils/helpers";

const LanguageUnderstand = () => {
  const [search, setSearch] = useState("");

  const { data: understands, isLoading } = useLanguageUnderstand();

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

        <CreateUnderstand />
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
                Loading understands...
              </TableCell>
            </TableRow>
          ) : understands.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="h-24 text-center">
                {search
                  ? "No understands found matching your search."
                  : "No understands available."}
              </TableCell>
            </TableRow>
          ) : (
            understands.map((understand: SkillLevel, index: number) => (
              <TableRow key={understand.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{capitalizeText(understand.name)}</TableCell>
                <TableCell className="text-right">
                  <div>
                    <UpdateUnderstand />
                    <DeleteUnderstand />
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

export default LanguageUnderstand;
