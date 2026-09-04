import { useState } from "react";
import {
  BriefcaseBusiness,
  CircleCheck,
  CircleCheckBig,
  CircleX,
  Search,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import type { Jobseeker, JobseekerFilters } from "@/@types/jobseekers";
import { useDebounce } from "@/hooks/useDebounce";
import { useJobseekers } from "@/hooks/jobseekers";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import { FilterJobseekers } from "@/pages/app/jobseekers/components/FilterJobseekers";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Spinner } from "@/components/ui/spinner";
import { capitalizeText } from "@/utils/helpers";
import { DataPagination } from "@/components/data-pagination";
import AdminViewJobseeker from "./components/AdminViewJobseeker";

const AdminJobseekersPage = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(25);
  const [filters, setFilters] = useState<JobseekerFilters>({});

  const debouncedSearch = useDebounce(search, 500);

  const { data: jobseekersData, isLoading } = useJobseekers({
    page,
    limit: perPage,
    search: debouncedSearch,
    position: filters.position,
    position_level_id: filters.positionLevelId,
    industry_id: filters.industryId,
    education_level_id: filters.educationLevelId,
  });

  //
  const jobseekers = jobseekersData?.data ?? [];

  const hasFilters =
    !!filters.position ||
    !!filters.positionLevelId ||
    !!filters.industryId ||
    !!filters.educationLevelId;

  const clearFilters = () => {
    setFilters({});
    setPage(1);
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold">Job Seekers</h2>
      </div>

      {/* stats */}
      <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
        <Card>
          <CardContent className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-muted-foreground">All</h3>
              <p className="mt-1 text-3xl font-bold">0</p>
            </div>

            <div className="rounded-lg bg-blue-100 p-3 text-blue-600">
              <BriefcaseBusiness size={16} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-muted-foreground">Featured</h3>
              <p className="mt-1 text-3xl font-bold">0</p>
            </div>

            <div className="rounded-lg bg-orange-100 p-3 text-orange-600">
              <CircleCheckBig size={16} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-muted-foreground">Verified</h3>
              <p className="mt-1 text-3xl font-bold">0</p>
            </div>

            <div className="rounded-lg bg-green-100 p-3 text-green-600">
              <CircleCheck size={16} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-muted-foreground">Non Verified</h3>
              <p className="mt-1 text-3xl font-bold">0</p>
            </div>

            <div className="rounded-lg bg-red-100 p-3 text-red-600">
              <CircleX size={16} />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <InputGroup className="max-w-md">
              <InputGroupInput
                placeholder="Search company or title..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
              />
              <InputGroupAddon>
                <Search />
              </InputGroupAddon>
            </InputGroup>

            {/* Advanced Search */}
            <div className="flex gap-2">
              {hasFilters && (
                <Button variant="ghost" onClick={clearFilters}>
                  Clear filters
                </Button>
              )}

              <FilterJobseekers
                value={filters}
                onApply={(values) => {
                  setFilters(values);
                  setPage(1);
                }}
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Full Name</TableHead>
                <TableHead>Latest Position</TableHead>
                <TableHead>Profile (%)</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-32">
                    <div className="flex items-center justify-center">
                      <Spinner className="size-8" />
                    </div>
                  </TableCell>
                </TableRow>
              ) : jobseekers.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="h-24 text-center text-muted-foreground"
                  >
                    No job seekers found.
                  </TableCell>
                </TableRow>
              ) : (
                jobseekers.map((candidate: Jobseeker) => (
                  <TableRow key={candidate.id}>
                    <TableCell className="font-medium">
                      {capitalizeText(
                        `${candidate.first_name} ${candidate.last_name}`,
                      )}
                    </TableCell>

                    <TableCell>
                      {capitalizeText(candidate.applicant_position) ||
                        "No Experience"}
                    </TableCell>

                    <TableCell>
                      {candidate.profile_completion?.total_percentage ?? "-"}
                    </TableCell>

                    <TableCell className="text-right">
                      <AdminViewJobseeker jobseekerId={candidate.id} />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          {/* pagination */}
          {jobseekers.length > 0 && (
            <DataPagination
              page={jobseekersData?.page}
              perPage={jobseekersData?.limit}
              totalPages={jobseekersData?.totalPages}
              onPageChange={setPage}
              onPerPageChange={setPerPage}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminJobseekersPage;
