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

const applications = [
  {
    id: 2,
    appliedTime: "2026-05-18 09:15 AM",
    applicantName: "John Michael",
    stage: "Applied",
    status: "Pending",
  },
  {
    id: 2,
    appliedTime: "2026-05-18 10:42 AM",
    applicantName: "Aisha Suleiman",
    stage: "Shortlisted",
    status: "Reviewed",
  },
  {
    id: 3,
    appliedTime: "2026-05-18 11:05 AM",
    applicantName: "Daniel Kimaro",
    stage: "Screening",
    status: "In Progress",
  },
  {
    id: 4,
    appliedTime: "2026-05-18 12:30 PM",
    applicantName: "Neema Joseph",
    stage: "Interview",
    status: "Rejected",
  },
  {
    id: 5,
    appliedTime: "2026-05-18 01:18 PM",
    applicantName: "Brian Charles",
    stage: "Selection",
    status: "Pending",
  },
  {
    id: 6,
    appliedTime: "2026-05-18 02:10 PM",
    applicantName: "Sophia Andrew",
    stage: "Background Check",
    status: "Approved",
  },
  {
    id: 7,
    appliedTime: "2026-05-18 03:22 PM",
    applicantName: "Kevin Mushi",
    stage: "Offer",
    status: "Accepted",
  },
  {
    id: 8,
    appliedTime: "2026-05-18 04:45 PM",
    applicantName: "Fatma Omary",
    stage: "Applied",
    status: "Pending",
  },
  {
    id: 9,
    appliedTime: "2026-05-18 05:12 PM",
    applicantName: "Peter Mwakyusa",
    stage: "Interview",
    status: "Reviewed",
  },
  {
    id: 10,
    appliedTime: "2026-05-18 06:00 PM",
    applicantName: "Grace Emmanuel",
    stage: "Offer",
    status: "Rejected",
  },
];

const JobApplications = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  return (
    <div className="flex gap-6">
      {/* left side */}
      <div className="flex-2 space-y-4">
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
            {applications.map((application) => (
              <TableRow key={application.id}>
                <TableCell>{application.appliedTime}</TableCell>
                <TableCell>{application.applicantName}</TableCell>
                <TableCell>{application.stage}</TableCell>
                <TableCell>{application.status}</TableCell>
                <TableCell className="text-right">
                  <ApplicantDetails />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* right side */}
      <div className="flex-2">
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
