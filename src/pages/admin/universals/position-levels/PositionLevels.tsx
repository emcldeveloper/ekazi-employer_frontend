import type { PositionLevel } from "@/@types/universals";

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
import { usePositionLevels } from "@/hooks/universals";

import { Search } from "lucide-react";
import { useState } from "react";
import CreatePositionLevel from "./CreatePositionLevel";
import UpdatePositionLevel from "./UpdatePositionLevel";
import DeletePositionLevel from "./DeletePositionLevel";
import { capitalizeText } from "@/utils/helpers";

const PositionLevels = () => {
  const [search, setSearch] = useState("");

  const { data: levels, isLoading } = usePositionLevels();

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

        <CreatePositionLevel />
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
                Loading levels...
              </TableCell>
            </TableRow>
          ) : levels.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="h-24 text-center">
                {search
                  ? "No levels found matching your search."
                  : "No levels available."}
              </TableCell>
            </TableRow>
          ) : (
            levels.map((level: PositionLevel, index: number) => (
              <TableRow key={level.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{capitalizeText(level.name)}</TableCell>
                <TableCell className="text-right">
                  <div>
                    <UpdatePositionLevel />
                    <DeletePositionLevel />
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

export default PositionLevels;
