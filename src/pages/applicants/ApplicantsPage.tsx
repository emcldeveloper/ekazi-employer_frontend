import { useState } from "react";
import { SearchIcon } from "lucide-react";

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
import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";

import ViewApplicant from "./components/ViewApplicant";
import { useApplicants } from "@/hooks/applicants";
import type { Jobseeker, JobseekerFilters } from "@/@types/jobseekers";
import { useDebounce } from "@/hooks/useDebounce";
import { FilterJobseekers } from "../jobseekers/components/FilterJobseekers";
import { DataPagination } from "@/components/data-pagination";
import { Button } from "@/components/ui/button";

const ApplicantsPage = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(25);
  const [filters, setFilters] = useState<JobseekerFilters>({});

  const debouncedSearch = useDebounce(search, 500);

  const { data: applicantsData, isLoading } = useApplicants({
    page,
    limit: perPage,
    search: debouncedSearch,
    position: filters.position,
    position_level_id: filters.positionLevelId,
    industry_id: filters.industryId,
    education_level_id: filters.educationLevelId,
  });
  const applicants = applicantsData?.data ?? [];

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
    <div className="mt-4 space-y-4">
      <div>
        <h2 className="text-2xl font-bold">Applicants</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Browse and review applicant profiles and shortlist for your job
          openings.
        </p>
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
                <SearchIcon />
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
              ) : applicants.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="h-24 text-center text-muted-foreground"
                  >
                    No job seekers found.
                  </TableCell>
                </TableRow>
              ) : (
                applicants.map((applicant: Jobseeker) => (
                  <TableRow key={applicant.id}>
                    <TableCell className="font-medium">
                      {applicant.first_name} {applicant.last_name}
                    </TableCell>

                    <TableCell>{applicant.applicant_position ?? "-"}</TableCell>

                    <TableCell>
                      {applicant.profile_completion?.total_percentage ?? "-"}
                    </TableCell>

                    <TableCell className="text-right">
                      <ViewApplicant applicantId={applicant.id} />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          {/* pagination */}
          <DataPagination
            page={applicantsData?.page}
            perPage={applicantsData?.limit}
            totalPages={applicantsData?.totalPages}
            onPageChange={setPage}
            onPerPageChange={setPerPage}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ApplicantsPage;
