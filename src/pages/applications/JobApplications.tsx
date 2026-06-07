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
import { useState } from "react";
import { Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import ApplicantDetails from "./components/ApplicantDetails";
import { useApplications } from "@/hooks/jobs/useApplications";
import { useParams } from "react-router-dom";
import { formatDate } from "@/utils/helpers";
import { Spinner } from "@/components/ui/spinner";

const JobApplications = () => {
  const { id } = useParams();
  const jobId = Number(id);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const { data: applicationsData, isLoading } = useApplications(jobId);
  const applications = applicationsData?.data ?? [];
  console.log(applications);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* left side */}
      <div className="md:col-span-2 space-y-4">
        <div className="flex flex-col gap-2 lg:flex-row mb-4">
          <InputGroup className="max-w-md">
            <InputGroupInput
              placeholder="Search company or title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
          </InputGroup>

          {/* filters */}
          <div className="flex gap-2">
            <Select
              value={statusFilter}
              onValueChange={(value) => setStatusFilter(value)}
            >
              <SelectTrigger className="w-full max-w-48">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>
                  <SelectItem value="All">All status</SelectItem>
                  <SelectItem value="Open">Open</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
                  <SelectItem value="Draft">Draft</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
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
              applications.map((application: any) => (
                <TableRow key={application?.id}>
                  <TableCell>{formatDate(application?.created_at)}</TableCell>
                  <TableCell>
                    {application?.applicant?.first_name}{" "}
                    {application?.applicant?.middle_name}{" "}
                    {application?.applicant?.last_name}
                  </TableCell>
                  <TableCell>{application?.stage?.stage_name}</TableCell>
                  <TableCell>{application?.status}</TableCell>
                  <TableCell className="text-right">
                    <ApplicantDetails />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* right side */}
      <div className="md:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Application Stages</CardTitle>
          </CardHeader>

          <CardContent>
            <ul>
              <li className="py-2 border-b border-gray-300">
                Indirect Applicant
              </li>
              <li className="py-2 border-b border-gray-300">Applied</li>
              <li className="py-2 border-b border-gray-300">Shortlisted</li>
              <li className="py-2 border-b border-gray-300">Screening</li>
              <li className="py-2 border-b border-gray-300">Interview</li>
              <li className="py-2 border-b border-gray-300">Selection</li>
              <li className="py-2 border-b border-gray-300">
                Background Check
              </li>
              <li className="py-2 border-b border-gray-300">Offer</li>
              <li className="py-2 ">Employed</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default JobApplications;
