import { useState } from "react";

import {
  ArrowDownLeft,
  ArrowUpRight,
  BriefcaseBusinessIcon,
  CircleCheckBigIcon,
  Clock3Icon,
  Search,
} from "lucide-react";

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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { Badge } from "@/components/ui/badge";

import { capitalizeText, formatDate } from "@/utils/helpers";
import { useDebounce } from "@/hooks/useDebounce";
import type { Job } from "@/@types/job";
import { DataPagination } from "@/components/data-pagination";
import { useAdminJobs } from "@/hooks/admin";
import ViewAdminJob from "./components/ViewAdminJob";

const AdminJobsPage = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(25);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const debouncedSearch = useDebounce(search, 500);

  const { data: jobsData, isLoading } = useAdminJobs(
    debouncedSearch,
    page,
    perPage,
  );

  const jobs = jobsData?.data ?? [];
  const totalJobs = jobsData?.total;
  const activeJobs = jobsData?.stats?.active_jobs;
  const expiredJobs = jobsData?.stats?.expired_jobs;
  const publishedJobs = jobsData?.stats?.published_jobs;
  const unpublishedJobs = jobsData?.stats?.unpublished_jobs;

  return (
    <div className="space-y-4">
      <div className="sm:w-2/3">
        <h2 className="text-2xl font-bold">Jobs</h2>
      </div>

      {/* stats */}
      <div className="grid gap-2 grid-cols-2 md:grid-cols-5">
        <Card>
          <CardContent className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-muted-foreground">All Jobs</h3>
              <p className="mt-1 text-2xl font-bold">{totalJobs}</p>
            </div>

            <div className="rounded-lg bg-blue-100 p-3 text-blue-600">
              <BriefcaseBusinessIcon size={16} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-muted-foreground">Active</h3>
              <p className="mt-1 text-2xl font-bold">{activeJobs}</p>
            </div>

            <div className="rounded-lg bg-green-100 p-3 text-green-600">
              <CircleCheckBigIcon size={16} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-muted-foreground">Expired</h3>
              <p className="mt-1 text-2xl font-bold">{expiredJobs}</p>
            </div>

            <div className="rounded-lg bg-red-100 p-3 text-red-600">
              <Clock3Icon size={16} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-muted-foreground">Published</h3>
              <p className="mt-1 text-2xl font-bold">{publishedJobs}</p>
            </div>

            <div className="rounded-lg bg-yellow-100 p-3 text-yellow-600">
              <ArrowUpRight size={16} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-muted-foreground">Unpublished</h3>
              <p className="mt-1 text-2xl font-bold">{unpublishedJobs}</p>
            </div>

            <div className="rounded-lg bg-orange-100 p-3 text-orange-600">
              <ArrowDownLeft size={16} />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="space-y-4">
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

            {/* filters */}
            <div className="flex gap-4">
              <Select
                value={statusFilter}
                onValueChange={(value) => {
                  setStatusFilter(value === "All" ? "" : value);
                  setPage(1);
                }}
              >
                <SelectTrigger className="w-full max-w-48">
                  <SelectValue placeholder="Filters" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Filters</SelectLabel>
                    <SelectItem value="all">All Jobs</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                    <SelectItem value="today">Expires Today</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              {/* create job */}
              <div>create job</div>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Applications</TableHead>
                <TableHead>Created At</TableHead>
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
                    <TableCell className="max-w-50 truncate">
                      {capitalizeText(job.position?.position_name)}
                    </TableCell>
                    <TableCell>{job?.client.client_name}</TableCell>

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

                    <TableCell>{formatDate(job?.created_at)}</TableCell>

                    <TableCell className="text-right">
                      {/* <Button variant="link" onClick={() => handleView(job.id)}>
                        View
                      </Button> */}
                      <ViewAdminJob jobId={job.id} />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          {/* Pagination */}
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
    </div>
  );
};

export default AdminJobsPage;
