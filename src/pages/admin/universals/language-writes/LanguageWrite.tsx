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
import { useLanguageWrite } from "@/hooks/universals";
import {  Search } from "lucide-react";
import { useState } from "react";
import CreateWrite from "./CreateWrite";
import UpdateWrite from "./UpdateWrite";
import DeleteWrite from "./DeleteWrite";
import { capitalizeText } from "@/utils/helpers";

const LanguageWrite = () => {
  const [search, setSearch] = useState("");

  const { data: writes, isLoading } = useLanguageWrite();

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

        <CreateWrite />
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
                Loading writes...
              </TableCell>
            </TableRow>
          ) : writes.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="h-24 text-center">
                {search
                  ? "No writes found matching your search."
                  : "No writes available."}
              </TableCell>
            </TableRow>
          ) : (
            writes.map((write: SkillLevel, index: number) => (
              <TableRow key={write.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{capitalizeText(write.name)}</TableCell>
                <TableCell className="text-right">
                  <div>
                    <UpdateWrite />
                    <DeleteWrite />
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

export default LanguageWrite;
