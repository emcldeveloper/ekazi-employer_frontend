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
import { useLanguageRead } from "@/hooks/universals";
import { Search } from "lucide-react";
import { useState } from "react";
import CreateRead from "./CreateRead";
import UpdateRead from "./UpdateRead";
import DeleteRead from "./DeleteRead";
import { capitalizeText } from "@/utils/helpers";

const LanguageRead = () => {
  const [search, setSearch] = useState("");

  const { data: reads, isLoading } = useLanguageRead();

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

        <CreateRead />
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
                Loading reads...
              </TableCell>
            </TableRow>
          ) : reads.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="h-24 text-center">
                {search
                  ? "No reads found matching your search."
                  : "No reads available."}
              </TableCell>
            </TableRow>
          ) : (
            reads.map((read: SkillLevel, index: number) => (
              <TableRow key={read.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{capitalizeText(read.name)}</TableCell>
                <TableCell className="text-right">
                  <div>
                    <UpdateRead />
                    <DeleteRead />
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

export default LanguageRead;
