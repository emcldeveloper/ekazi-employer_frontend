import { Search } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

import { Card, CardContent } from "@/components/ui/card";
import type { Job } from "@/@types/job";
import { capitalizeText, formatDate } from "@/utils/helpers";
import ViewAdminJob from "../../jobs/components/ViewAdminJob";
import { DataPagination } from "@/components/data-pagination";
import type { Dispatch, SetStateAction } from "react";
import { Spinner } from "@/components/ui/spinner";
import { Badge } from "@/components/ui/badge";

interface EmployerJobsProps {
  jobs: Job[];
  isLoading: boolean;

  search: string;
  setSearch: Dispatch<SetStateAction<string>>;

  page: number;
  setPage: Dispatch<SetStateAction<number>>;

  perPage: number;
  setPerPage: Dispatch<SetStateAction<number>>;

  jobsData: {
    page: number;
    limit: number;
    totalPages: number;
  };
}

const EmployerJobs = ({
  jobs,
  isLoading,
  search,
  setSearch,
  setPage,
  setPerPage,
  jobsData,
}: EmployerJobsProps) => {
  return (
    <Card>
      <CardContent>
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-between mb-4">
          {/* Search */}
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
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Deadline</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Applications</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="h-40">
                  <div className="flex items-center justify-center">
                    <Spinner className="size-6" />
                  </div>
                </TableCell>
              </TableRow>
            ) : jobs.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-40 text-center text-muted-foreground"
                >
                  No jobs found
                </TableCell>
              </TableRow>
            ) : (
              jobs.map((job: Job) => (
                <TableRow key={job.id}>
                  <TableCell>
                    {capitalizeText(job.position?.position_name)}
                  </TableCell>
                  <TableCell>{formatDate(job?.created_at)}</TableCell>
                  <TableCell>{formatDate(job?.dead_line)}</TableCell>
                  <TableCell>
                    {Number(job?.published) === 1 ? (
                      <Badge className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
                        Published
                      </Badge>
                    ) : (
                      <Badge className="bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                        Unpublished
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {job.total_applicants}
                  </TableCell>
                  <TableCell className="text-right">
                    <ViewAdminJob jobId={job.id} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        .
        {jobs.length > 0 && (
          <DataPagination
            page={jobsData?.page}
            perPage={jobsData?.limit}
            totalPages={jobsData?.totalPages}
            onPageChange={setPage}
            onPerPageChange={setPerPage}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default EmployerJobs;
