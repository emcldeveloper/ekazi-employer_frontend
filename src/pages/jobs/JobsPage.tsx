import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
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

const jobs = [
  {
    id: 1,
    company: "TechNova Ltd",
    title: "Frontend Developer",
    date: "2026-05-18",
    status: "Open",
    applications: 24,
  },
  {
    id: 2,
    company: "CloudSync Africa",
    title: "Backend Engineer",
    date: "2026-05-16",
    status: "Closed",
    applications: 58,
  },
  {
    id: 3,
    company: "eKazi Solutions",
    title: "UI/UX Designer",
    date: "2026-05-14",
    status: "Open",
    applications: 12,
  },
  {
    id: 4,
    company: "FinCore Systems",
    title: "Mobile App Developer",
    date: "2026-05-12",
    status: "Draft",
    applications: 7,
  },
  {
    id: 5,
    company: "NextWave Digital",
    title: "DevOps Engineer",
    date: "2026-05-10",
    status: "Open",
    applications: 31,
  },
  {
    id: 6,
    company: "BrightTech Hub",
    title: "Full Stack Developer",
    date: "2026-05-08",
    status: "Closed",
    applications: 42,
  },
  {
    id: 7,
    company: "Visionary Labs",
    title: "Data Analyst",
    date: "2026-05-07",
    status: "Open",
    applications: 18,
  },
  {
    id: 8,
    company: "SmartLink Systems",
    title: "QA Engineer",
    date: "2026-05-05",
    status: "Draft",
    applications: 5,
  },
  {
    id: 9,
    company: "PixelCraft Studio",
    title: "Graphic Designer",
    date: "2026-05-03",
    status: "Open",
    applications: 27,
  },
  {
    id: 10,
    company: "SecureNet Africa",
    title: "Cybersecurity Specialist",
    date: "2026-05-01",
    status: "Closed",
    applications: 64,
  },
];

const JobsPage = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [featuredFilter, setFeaturedFilter] = useState("All");

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        job.company.toLowerCase().includes(search.toLowerCase()) ||
        job.title.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || job.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const handleView = (id: number) => {
    navigate(`/jobs/${id}`);
  };

  const handlePostJob = () => {
    navigate("/jobs/create");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 lg:flex-row lg:justify-between mb-4">
        <h2 className="text-xl font-bold">All Jobs</h2>

        <Button onClick={handlePostJob}>Post Job</Button>
      </div>

      <Card>
        <CardContent>
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

              <Select
                value={featuredFilter}
                onValueChange={(value) => setFeaturedFilter(value)}
              >
                <SelectTrigger className="w-full max-w-48">
                  <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Featured</SelectLabel>
                    <SelectItem value="All">All Jobs</SelectItem>
                    <SelectItem value="Featured">Featured</SelectItem>
                    <SelectItem value="Not Featured">Not Featured</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Applications</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredJobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell>{job.company}</TableCell>
                  <TableCell>{job.title}</TableCell>
                  <TableCell>{job.date}</TableCell>
                  <TableCell>{job.status}</TableCell>
                  <TableCell>{job.applications}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="link" onClick={() => handleView(job.id)}>
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobsPage;
