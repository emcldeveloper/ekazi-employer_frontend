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
    title: "Frontend Developer",
    date: "2026-05-18",
    status: "Open",
    featured: true,
    applications: 24,
  },
  {
    id: 2,
    title: "Backend Engineer",
    date: "2026-05-16",
    status: "Closed",
    featured: false,
    applications: 58,
  },
  {
    id: 3,
    title: "UI/UX Designer",
    date: "2026-05-14",
    status: "Open",
    featured: true,
    applications: 12,
  },
  {
    id: 4,
    title: "Mobile App Developer",
    date: "2026-05-12",
    status: "Draft",
    featured: false,
    applications: 7,
  },
  {
    id: 5,
    title: "DevOps Engineer",
    date: "2026-05-10",
    status: "Open",
    featured: true,
    applications: 31,
  },
];

const EmployerJobs = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [featuredFilter, setFeaturedFilter] = useState("All");

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch = job.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || job.status === statusFilter;

      const matchesFeatured =
        featuredFilter === "All" ||
        (featuredFilter === "Featured" && job.featured) ||
        (featuredFilter === "Not Featured" && !job.featured);

      return matchesSearch && matchesStatus && matchesFeatured;
    });
  }, [search, statusFilter, featuredFilter]);

  const handleView = (id: number) => {
    navigate(`/jobs/${id}`);
  };

  return (
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
              <TableHead>Title</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead>Applications</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredJobs.map((job) => (
              <TableRow key={job.id}>
                <TableCell>{job.title}</TableCell>
                <TableCell>{job.date}</TableCell>
                <TableCell>{job.status}</TableCell>
                <TableCell>{job.featured ? "Yes" : "No"}</TableCell>
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
  );
};

export default EmployerJobs;
