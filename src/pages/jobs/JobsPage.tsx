import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  BriefcaseBusinessIcon,
  CircleCheckBigIcon,
  Clock3Icon,
  Search,
  SendIcon,
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
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
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
import { useJobs } from "@/hooks/jobs";
import { formatDate } from "@/utils/helpers";
import { Badge } from "@/components/ui/badge";
import { useDebounce } from "@/hooks/useDebounce";
import { Field, FieldLabel } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";

const JobsPage = () => {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(25);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const debouncedSearch = useDebounce(search, 500);

  const { data: jobsData, isLoading } = useJobs({
    page,
    limit: perPage,
    search: debouncedSearch,
    status: statusFilter,
  });

  const jobs = jobsData?.data ?? [];
  const totalJobs = jobsData?.total;
  const activeJobs = jobsData?.stats?.active_jobs;
  const expiredJobs = jobsData?.stats?.expired_jobs;
  const publishedJobs = jobsData?.stats?.published_jobs;

  const visiblePages = useMemo(() => {
    const totalPages = jobsData?.total_pages ?? 0;

    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    let start = Math.max(page - 2, 1);
    const end = Math.min(start + 4, totalPages);

    if (end === totalPages) {
      start = Math.max(totalPages - 4, 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [page, jobsData?.total_pages]);

  // Handlers
  const handleView = (id: number) => {
    navigate(`/jobs/${id}`);
  };

  const handlePostJob = () => {
    navigate("/jobs/create");
  };

  return (
    <div className="mt-4 space-y-4">
      <div className="sm:w-2/3">
        <h2 className="text-2xl font-bold">Job Management</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Create, manage, and monitor job postings, track applications, and
          oversee the hiring process across your organization.
        </p>
      </div>

      {/* stats */}

      <div className="grid gap-4 md:grid-cols-4">
        <Card size="sm">
          <CardContent className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-muted-foreground">All Jobs</h3>
              <p className="mt-1 text-3xl font-bold">{totalJobs}</p>
            </div>

            <div className="rounded-lg bg-blue-100 p-3 text-blue-600">
              <BriefcaseBusinessIcon size={16} />
            </div>
          </CardContent>
        </Card>

        <Card size="sm">
          <CardContent className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-muted-foreground">Active</h3>
              <p className="mt-1 text-3xl font-bold">{activeJobs}</p>
            </div>

            <div className="rounded-lg bg-green-100 p-3 text-green-600">
              <CircleCheckBigIcon size={16} />
            </div>
          </CardContent>
        </Card>

        <Card size="sm">
          <CardContent className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-muted-foreground">Expired</h3>
              <p className="mt-1 text-3xl font-bold">{expiredJobs}</p>
            </div>

            <div className="rounded-lg bg-red-100 p-3 text-red-600">
              <Clock3Icon size={16} />
            </div>
          </CardContent>
        </Card>

        <Card size="sm">
          <CardContent className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-muted-foreground">Published</h3>
              <p className="mt-1 text-3xl font-bold">{publishedJobs}</p>
            </div>

            <div className="rounded-lg bg-indigo-100 p-3 text-indigo-600">
              <SendIcon size={16} />
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
            <div className="flex gap-2">
              <Select
                value={statusFilter}
                onValueChange={(value) => {
                  setStatusFilter(value === "All" ? "" : value);
                  setPage(1);
                }}
              >
                <SelectTrigger className="w-full max-w-48">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    <SelectItem value="all">All Jobs</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                    <SelectItem value="today">Expires Today</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              {/* <Select
                value={deadlineFilter}
                onValueChange={(value) => {
                  setDeadlineFilter(value);
                  setPage(1);
                }}
              >
                <SelectTrigger className="w-full max-w-48">
                  <SelectValue placeholder="Deadline" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Deadline</SelectLabel>
                    <SelectItem value="All">All Jobs</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                    <SelectItem value="expire_today">Expires Today</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select> */}
            </div>

            {/* create job */}
            <Button onClick={handlePostJob}>Create Job</Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                {/* <TableHead>Company</TableHead> */}
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
                jobs.map((job: any) => (
                  <TableRow key={job.id}>
                    <TableCell>{job.position?.position_name}</TableCell>
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
                      <Button variant="link" onClick={() => handleView(job.id)}>
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          <div className="flex items-center">
            {/* Data per page */}
            <Field orientation="horizontal" className="w-fit">
              <FieldLabel htmlFor="select-rows-per-page">
                Rows per page
              </FieldLabel>
              <Select
                value={String(perPage)}
                onValueChange={(value) => {
                  setPerPage(Number(value));
                  setPage(1); // Reset to first page
                }}
              >
                <SelectTrigger className="w-20" id="select-rows-per-page">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent align="start">
                  <SelectGroup>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>

            {/* Pagination */}
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => page > 1 && setPage(page - 1)}
                  />
                </PaginationItem>

                {visiblePages.map((pageNumber) => (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      isActive={page === pageNumber}
                      onClick={() => setPage(pageNumber)}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      page < (jobsData?.total_pages ?? 1) && setPage(page + 1)
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobsPage;
