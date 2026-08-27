import { useState } from "react";
import {
  BriefcaseBusiness,
  CircleCheck,
  CircleCheckBig,
  CircleX,
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
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Recruiter {
  id: string;
  company: string;
  activeJobs: number;
  status: string;
  featured: boolean;
}

const AdminFreelancersPage = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [featuredFilter, setFeaturedFilter] = useState("All");

  const recruiters: Recruiter[] = [];
  return (
    <div className="space-y-4">
      <div className="sm:w-2/3">
        <h2 className="text-2xl font-bold">Freelancers</h2>
      </div>

      {/* stats */}
      <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
        <Card>
          <CardContent className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-muted-foreground">All</h3>
              <p className="mt-1 text-3xl font-bold">0</p>
            </div>

            <div className="rounded-lg bg-blue-100 p-3 text-blue-600">
              <BriefcaseBusiness size={16} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-muted-foreground">Active</h3>
              <p className="mt-1 text-3xl font-bold">0</p>
            </div>

            <div className="rounded-lg bg-green-100 p-3 text-green-600">
              <CircleCheckBig size={16} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-muted-foreground">Verified</h3>
              <p className="mt-1 text-3xl font-bold">0</p>
            </div>

            <div className="rounded-lg bg-red-100 p-3 text-red-600">
              <CircleCheck size={16} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-muted-foreground">Non Verified</h3>
              <p className="mt-1 text-3xl font-bold">0</p>
            </div>

            <div className="rounded-lg bg-yellow-100 p-3 text-yellow-600">
              <CircleX size={16} />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="space-y-4">
          {/* Search & Filters */}
          <div className="mb-4 flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
            <InputGroup className="max-w-md">
              <InputGroupInput
                placeholder="Search recruiter..."
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
                <TableHead>Recruiter</TableHead>
                <TableHead>Active Jobs</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {recruiters.length > 0 ? (
                recruiters.map((employer) => (
                  <TableRow key={employer.id}>
                    <TableCell className="font-medium">
                      {employer.company}
                    </TableCell>

                    <TableCell>{employer.activeJobs}</TableCell>

                    <TableCell>{employer.status}</TableCell>

                    <TableCell>{employer.featured ? "Yes" : "No"}</TableCell>

                    <TableCell className="text-right">
                      <Button variant="link">View</Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center h-30">
                    No freelancers found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminFreelancersPage;
