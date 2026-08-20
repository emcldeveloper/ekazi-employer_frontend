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
import { useLanguageSpeak } from "@/hooks/universals";
import { Search } from "lucide-react";
import { useState } from "react";
import CreateSpeak from "./CreateSpeak";
import UpdateSpeak from "./UpdateSpeak";
import DeleteSpeak from "./DeleteSpeak";
import { capitalizeText } from "@/utils/helpers";

const LanguageSpeak = () => {
  const [search, setSearch] = useState("");

  const { data: speaks, isLoading } = useLanguageSpeak();

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

        <CreateSpeak />
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
                Loading speaks...
              </TableCell>
            </TableRow>
          ) : speaks.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="h-24 text-center">
                {search
                  ? "No speaks found matching your search."
                  : "No speaks available."}
              </TableCell>
            </TableRow>
          ) : (
            speaks.map((speak: SkillLevel, index: number) => (
              <TableRow key={speak.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{capitalizeText(speak.name)}</TableCell>
                <TableCell className="text-right">
                  <div>
                    <UpdateSpeak />
                    <DeleteSpeak />
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

export default LanguageSpeak;
