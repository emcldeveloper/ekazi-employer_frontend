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
import { useKnowledges } from "@/hooks/universals";
import { Search } from "lucide-react";
import { useState } from "react";
import CreateSkill from "./CreateSkill";
import UpdateSkill from "./UpdateSkill";
import DeleteSkill from "./DeleteSkill";
import { capitalizeText } from "@/utils/helpers";
import { DataPagination } from "@/components/data-pagination";
import { useDebounce } from "@/hooks/useDebounce";

const Skills = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(25);

  const debouncedSearch = useDebounce(search, 500);

  const { data: skillsData, isLoading } = useKnowledges(
    debouncedSearch,
    page,
    perPage,
  );

  const skills = skillsData?.data ?? [];

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

        <CreateSkill />
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
                Loading skills...
              </TableCell>
            </TableRow>
          ) : skills.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="h-24 text-center">
                {search
                  ? "No skills found matching your search."
                  : "No skills available."}
              </TableCell>
            </TableRow>
          ) : (
            skills.map((skill: SkillLevel, index: number) => (
              <TableRow key={skill.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="max-w-50 truncate">
                  {capitalizeText(skill.name)}
                </TableCell>
                <TableCell className="text-right">
                  <div>
                    <UpdateSkill />
                    <DeleteSkill />
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {skills.length > 0 && (
        <DataPagination
          page={skillsData?.current_page}
          perPage={skillsData?.per_page}
          totalPages={skillsData?.total_pages}
          onPageChange={setPage}
          onPerPageChange={setPerPage}
        />
      )}
    </div>
  );
};

export default Skills;
