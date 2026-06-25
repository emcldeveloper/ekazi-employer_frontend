import { useState } from "react";
import { useParams } from "react-router-dom";
import { Search } from "lucide-react";

import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
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

import { formatDate } from "@/utils/helpers";
import { useApplications } from "@/hooks/jobs/useApplications";
import ApplicantDetails from "../applicants/ApplicantDetails";
import ApplicationStages from "./components/ApplicationStages";
import { useJob } from "@/hooks/jobs";
import type { Application } from "@/@types/applications";

const JobApplications = () => {
  const { id } = useParams();
  const jobId = Number(id);

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);

  // Job Details
  const { data: jobData } = useJob(jobId);
  const job = jobData?.data;
  const title = job?.job_position?.position_name;

  // List of applications
  const { data: applicationsData, isLoading } = useApplications(jobId);
  const applications = applicationsData?.data ?? [];
  console.log("Applications", applications);

  // stats
  const applied = applications.length;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* left side */}
        <div className="md:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
              <CardDescription>List of Job Applicantions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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
                    <TableHead>Applied Time</TableHead>
                    <TableHead>Applicant Name</TableHead>
                    <TableHead>Stage</TableHead>
                    <TableHead>Status</TableHead>
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
                        <TableCell>
                          {formatDate(application?.created_at)}
                        </TableCell>
                        <TableCell>
                          {application?.applicant?.first_name}{" "}
                          {application?.applicant?.middle_name}{" "}
                          {application?.applicant?.last_name}
                        </TableCell>
                        <TableCell>{application?.stage?.stage_name}</TableCell>
                        <TableCell>{application?.status}</TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="link"
                            onClick={() => {
                              setSelectedApplication(application);
                              setOpen(true);
                            }}
                          >
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* right side */}
        <div className="md:col-span-1">
          <div className="sticky top-4 space-y-4">
            <ApplicationStages applied={applied} />
          </div>
        </div>
      </div>

      <ApplicantDetails
        application={selectedApplication}
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
};

export default JobApplications;
