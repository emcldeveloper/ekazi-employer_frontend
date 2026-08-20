import type { Course } from "@/@types/universals";

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
import { useCourses } from "@/hooks/universals";
import { Search } from "lucide-react";
import { useState } from "react";
import CreateCourse from "./CreateCourse";
import UpdateCourse from "./UpdateCourse";
import DeleteCourse from "./DeleteCourse";
import { useDebounce } from "@/hooks/useDebounce";
import { DataPagination } from "@/components/data-pagination";
import { capitalizeText } from "@/utils/helpers";

const Courses = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(25);

  const debouncedSearch = useDebounce(search, 500);

  const { data: coursesData, isLoading } = useCourses(
    debouncedSearch,
    page,
    perPage,
  );

  const courses = coursesData?.data ?? [];

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

        <CreateCourse />
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
                Loading courses...
              </TableCell>
            </TableRow>
          ) : courses.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="h-24 text-center">
                {search
                  ? "No courses found matching your search."
                  : "No courses available."}
              </TableCell>
            </TableRow>
          ) : (
            courses.map((course: Course, index: number) => (
              <TableRow key={course.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="max-w-50 truncate">
                  {capitalizeText(course.name)}
                </TableCell>
                <TableCell className="text-right">
                  <div>
                    <UpdateCourse />
                    <DeleteCourse />
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {courses.length > 0 && (
        <DataPagination
          page={coursesData?.current_page}
          perPage={coursesData?.per_page}
          totalPages={coursesData?.total_pages}
          onPageChange={setPage}
          onPerPageChange={setPerPage}
        />
      )}
    </div>
  );
};

export default Courses;
