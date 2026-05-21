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

const employers = [
  {
    id: 1,
    company: "TechNova Solutions",
    activeJobs: 12,
    status: "Active",
    featured: true,
  },
  {
    id: 2,
    company: "Skyline Recruiters",
    activeJobs: 5,
    status: "Not Active",
    featured: false,
  },
  {
    id: 3,
    company: "Visionary Labs",
    activeJobs: 8,
    status: "Active",
    featured: true,
  },
  {
    id: 4,
    company: "Prime Talent Hub",
    activeJobs: 3,
    status: "Active",
    featured: false,
  },
  {
    id: 5,
    company: "NextGen Careers",
    activeJobs: 15,
    status: "Not Active",
    featured: false,
  },
  {
    id: 6,
    company: "Alpha Staffing",
    activeJobs: 9,
    status: "Active",
    featured: true,
  },
  {
    id: 7,
    company: "Global Workforce Ltd",
    activeJobs: 4,
    status: "Not Active",
    featured: false,
  },
  {
    id: 8,
    company: "BrightPath Agency",
    activeJobs: 6,
    status: "Active",
    featured: true,
  },
  {
    id: 9,
    company: "FutureLink HR",
    activeJobs: 11,
    status: "Active",
    featured: false,
  },
  {
    id: 10,
    company: "Elite Recruiters",
    activeJobs: 2,
    status: "Not Active",
    featured: true,
  },
];

const EmployersPage = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [featuredFilter, setFeaturedFilter] = useState("All");

  const filteredEmployers = useMemo(() => {
    return employers.filter((employer) => {
      const matchesSearch = employer.company
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || employer.status === statusFilter;

      const matchesFeatured =
        featuredFilter === "All" ||
        (featuredFilter === "Yes" && employer.featured) ||
        (featuredFilter === "No" && !employer.featured);

      return matchesSearch && matchesStatus && matchesFeatured;
    });
  }, [search, statusFilter, featuredFilter]);

  const handleView = (id: number) => {
    navigate(`/employers/${id}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold">Employers / Recruiters</h2>
        {/* <p className="text-muted-foreground text-sm">
          Manage all employers and recruiters accounts.
        </p> */}
      </div>

      <Card>
        <CardContent className="space-y-4">
          {/* Search & Filters */}
          <div className="mb-4 flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
            <InputGroup className="max-w-md">
              <InputGroupInput
                placeholder="Search employer/recruiter..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <InputGroupAddon>
                <Search className="h-4 w-4" />
              </InputGroupAddon>
            </InputGroup>

            <div className="flex flex-col gap-2 sm:flex-row">
              {/* Status Filter */}
              <Select
                value={statusFilter}
                onValueChange={(value) => setStatusFilter(value)}
              >
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter status" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>

                    <SelectItem value="All">All Status</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Not Active">Not Active</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              {/* Featured Filter */}
              <Select
                value={featuredFilter}
                onValueChange={(value) => setFeaturedFilter(value)}
              >
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Featured" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Featured</SelectLabel>

                    <SelectItem value="All">All</SelectItem>
                    <SelectItem value="Yes">Yes</SelectItem>
                    <SelectItem value="No">No</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employer/Recruiter</TableHead>
                <TableHead>Active Jobs</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredEmployers.length > 0 ? (
                filteredEmployers.map((employer) => (
                  <TableRow key={employer.id}>
                    <TableCell className="font-medium">
                      {employer.company}
                    </TableCell>

                    <TableCell>{employer.activeJobs}</TableCell>

                    <TableCell>{employer.status}</TableCell>

                    <TableCell>{employer.featured ? "Yes" : "No"}</TableCell>

                    <TableCell className="text-right">
                      <Button
                        variant="link"
                        onClick={() => handleView(employer.id)}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6">
                    No employers found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {/* Pagination */}
          <Pagination className="mt-6">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>

              <PaginationItem>
                <PaginationLink href="#" isActive>
                  1
                </PaginationLink>
              </PaginationItem>

              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
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

export default EmployersPage;
