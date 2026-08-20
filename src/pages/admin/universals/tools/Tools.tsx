import type { Tool } from "@/@types/universals";

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
import { useTools } from "@/hooks/universals";
import { Search } from "lucide-react";
import { useState } from "react";
import CreateTool from "./CreateTool";
import UpdateTool from "./UpdateTool";
import DeleteTool from "./DeleteTool";
import { capitalizeText } from "@/utils/helpers";
import { useDebounce } from "@/hooks/useDebounce";
import { DataPagination } from "@/components/data-pagination";

const Tools = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(25);

  const debouncedSearch = useDebounce(search, 500);

  const { data: toolsData, isLoading } = useTools(
    debouncedSearch,
    page,
    perPage,
  );

  const tools = toolsData?.data ?? [];

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

        <CreateTool />
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
                Loading tools...
              </TableCell>
            </TableRow>
          ) : tools.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="h-24 text-center">
                {search
                  ? "No tools found matching your search."
                  : "No tools available."}
              </TableCell>
            </TableRow>
          ) : (
            tools.map((tool: Tool, index: number) => (
              <TableRow key={tool.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="max-w-50 truncate">
                  {capitalizeText(tool.tool_name)}
                </TableCell>
                <TableCell className="text-right">
                  <div>
                    <UpdateTool />
                    <DeleteTool />
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {tools.length > 0 && (
        <DataPagination
          page={toolsData?.current_page}
          perPage={toolsData?.per_page}
          totalPages={toolsData?.total_pages}
          onPageChange={setPage}
          onPerPageChange={setPerPage}
        />
      )}
    </div>
  );
};

export default Tools;
