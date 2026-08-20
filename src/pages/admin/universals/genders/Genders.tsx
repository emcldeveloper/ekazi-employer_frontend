import type { Gender } from "@/@types/universals";
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
import { useGenders } from "@/hooks/universals";
import {  Search } from "lucide-react";
import { useState } from "react";
import CreateGender from "./CreateGender";
import UpdateGender from "./UpdateGender";
import DeleteGender from "./DeleteGender";

const Genders = () => {
  const [search, setSearch] = useState("");

  const { data: genders, isLoading } = useGenders();

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

        <CreateGender />
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
                Loading genders...
              </TableCell>
            </TableRow>
          ) : genders.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="h-24 text-center">
                {search
                  ? "No genders found matching your search."
                  : "No genders available."}
              </TableCell>
            </TableRow>
          ) : (
            genders.map((gender: Gender, index: number) => (
              <TableRow key={gender.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{gender.name}</TableCell>
                <TableCell className="text-right">
                  <div>
                    <UpdateGender />
                    <DeleteGender />
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

export default Genders;
