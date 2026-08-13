import { useState } from "react";
import { useParams } from "react-router-dom";
import { Search } from "lucide-react";

import { Spinner } from "@/components/ui/spinner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

import { capitalizeText, formatDate } from "@/utils/helpers";
import ApplicationStages from "./components/ApplicationStages";
import { useApplicationsByStage, useJob } from "@/hooks/jobs";
import type { Application, StageStatistics } from "@/@types/applications";
import { Checkbox } from "@/components/ui/checkbox";
import { MoveStage } from "./components/MoveStage";
import { DataPagination } from "@/components/data-pagination";
import { useDebounce } from "@/hooks/useDebounce";
import ViewApplication from "./components/ViewApplication";

type ApplicationsByStageResponse = {
  data?: {
    data: Application[];
    statistics?: StageStatistics;
    pagination?: any;
  };
  isLoading: boolean;
};

const JobApplications = () => {
  const { id, stage } = useParams();
  const jobId = Number(id);
  const jobStage = String(stage);
  const isStageView = !!stage;

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(25);
  const [search, setSearch] = useState("");

  const [selectedApplications, setSelectedApplications] = useState<number[]>(
    [],
  );

  const debouncedSearch = useDebounce(search, 500);

  // Job Details
  const { data: job } = useJob(jobId);
  const title = job?.position?.name;

  // List of applications

  const { data: applicationsData, isLoading } = useApplicationsByStage({
    id: jobId,
    stage: jobStage,
    search: debouncedSearch,
    page,
    limit: perPage,
  }) as ApplicationsByStageResponse;

  const applications = applicationsData?.data ?? [];
  const statistics = applicationsData?.statistics;
  const paginationData = applicationsData?.pagination;

  // TOGGLE SELECT ALL AND SELECT APPLICATIONS
  const isAllSelected =
    applications.length > 0 &&
    selectedApplications.length === applications.length;

  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedApplications(
        applications.map((app: Application) => app.applicant_id),
      );
    } else {
      setSelectedApplications([]);
    }
  };

  const toggleSelectApplication = (id: number, checked: boolean) => {
    setSelectedApplications((prev) =>
      checked
        ? [...prev, id]
        : prev.filter((applicationId) => applicationId !== id),
    );
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* left side */}
        <div className="md:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">{title}</CardTitle>
              <CardDescription>List of Job Applicantions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedApplications.length > 0 && (
                <div className="flex items-center justify-between rounded-md border p-3">
                  <span className="text-sm">
                    {selectedApplications.length} selected
                  </span>

                  <MoveStage
                    jobId={jobId}
                    jobTitle={title}
                    jobStage={jobStage}
                    selectedApplications={selectedApplications}
                  />
                </div>
              )}

              <div>
                <InputGroup className="w-full">
                  <InputGroupInput
                    placeholder="Search company or title..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <InputGroupAddon>
                    <Search />
                  </InputGroupAddon>
                </InputGroup>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    {isStageView && stage !== "applied" && (
                      <TableHead className="w-10">
                        <Checkbox
                          checked={isAllSelected}
                          onCheckedChange={(checked) =>
                            toggleSelectAll(checked === true)
                          }
                        />
                      </TableHead>
                    )}
                    <TableHead>Applicant Name</TableHead>
                    <TableHead>Current Stage</TableHead>
                    {isStageView ? (
                      <TableHead>Moved Date</TableHead>
                    ) : (
                      <TableHead>Applied Date</TableHead>
                    )}
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
                  ) : applications.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="h-40 text-center text-muted-foreground"
                      >
                        No applications found
                      </TableCell>
                    </TableRow>
                  ) : (
                    applications.map((application: Application) => (
                      <TableRow key={application?.id}>
                        {isStageView && stage !== "applied" && (
                          <TableCell>
                            <Checkbox
                              checked={selectedApplications.includes(
                                application.applicant_id,
                              )}
                              onCheckedChange={(checked) =>
                                toggleSelectApplication(
                                  application.applicant_id,
                                  checked === true,
                                )
                              }
                            />
                          </TableCell>
                        )}
                        <TableCell>
                          {capitalizeText(
                            `${application.applicant?.first_name ?? ""} ${application.applicant?.middle_name ?? ""} ${application.applicant?.last_name ?? ""}`,
                          )}
                        </TableCell>
                        <TableCell>
                          {application?.current_stage?.name ||
                            application?.stage?.name}
                        </TableCell>

                        {isStageView ? (
                          <TableCell>
                            {formatDate(application?.moved_at)}
                          </TableCell>
                        ) : (
                          <TableCell>
                            {formatDate(application?.created_at)}
                          </TableCell>
                        )}

                        <TableCell className="text-right">
                          <ViewApplication application={application} />
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>

              {/* Pagination */}
              {!isLoading && (
                <DataPagination
                  page={paginationData?.page}
                  perPage={paginationData?.limit}
                  totalPages={paginationData?.totalPages}
                  onPageChange={setPage}
                  onPerPageChange={setPerPage}
                />
              )}
            </CardContent>
          </Card>
        </div>

        {/* right side */}
        <div className="md:col-span-1">
          <div className="sticky top-4 space-y-4">
            <ApplicationStages
              jobId={jobId}
              stageStatistics={statistics}
              currentStage={jobStage}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default JobApplications;
