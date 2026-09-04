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

import { Button } from "@/components/ui/button";

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
import { useState } from "react";
import { useEmployers } from "@/hooks/employers/useEmployers";
import type { Employer } from "@/@types/employers";
import { Spinner } from "@/components/ui/spinner";
import { DataPagination } from "@/components/data-pagination";
import { useDebounce } from "@/hooks/useDebounce";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const AdminRecruitersPage = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(25);
  const [featuredFilter, setFeaturedFilter] = useState("");

  const debouncedSearch = useDebounce(search, 500);

  const { data: employersData, isLoading } = useEmployers(
    debouncedSearch,
    page,
    perPage,
    featuredFilter,
  );

  const employers = employersData?.data ?? [];
  const statistics = employersData?.statistics;

  return (
    <div className="space-y-4">
      <div className="sm:w-2/3">
        <h2 className="text-2xl font-bold">Recruiters</h2>
      </div>

      {/* stats */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        <Card>
          <CardContent className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-muted-foreground">All</h3>
              <p className="mt-1 text-2xl font-bold">
                {statistics?.total_clients}
              </p>
            </div>

            <div className="rounded-lg bg-blue-100 p-3 text-blue-600">
              <BriefcaseBusiness size={16} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-muted-foreground">Featured</h3>
              <p className="mt-1 text-2xl font-bold">{0}</p>
            </div>

            <div className="rounded-lg bg-yellow-100 p-3 text-yellow-600">
              <CircleCheckBig size={16} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-muted-foreground">Verified</h3>
              <p className="mt-1 text-2xl font-bold">
                {statistics?.verified_clients}
              </p>
            </div>

            <div className="rounded-lg bg-green-100 p-3 text-green-600">
              <CircleCheck size={16} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-muted-foreground">Non Verified</h3>
              <p className="mt-1 text-2xl font-bold">
                {statistics?.unverified_clients}
              </p>
            </div>

            <div className="rounded-lg bg-red-100 p-3 text-red-600">
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
                placeholder="Search employer..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
              />

              <InputGroupAddon>
                <Search className="h-4 w-4" />
              </InputGroupAddon>
            </InputGroup>

            <div className="flex flex-col gap-2 sm:flex-row">
              {/* Featured Filter */}
              <Select
                value={featuredFilter}
                onValueChange={(value) => {
                  setFeaturedFilter(value === "all" ? "" : value);
                  setPage(1);
                }}
              >
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Featured" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Featured</SelectLabel>

                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="true">Yes</SelectItem>
                    <SelectItem value="false">No</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Business</TableHead>
                <TableHead>Verified</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead>No. of jobs</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center h-30">
                    <Spinner className="size-8" />
                  </TableCell>
                </TableRow>
              ) : employers.length > 0 ? (
                employers.map((employer: Employer) => (
                  <TableRow key={employer.id}>
                    <TableCell className="max-w-50 truncate">
                      {employer.name}
                    </TableCell>

                    <TableCell className="max-w-50 truncate">
                      {employer.business}
                    </TableCell>

                    <TableCell>
                      {employer.is_verified ? (
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                          Verified
                        </Badge>
                      ) : (
                        <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
                          Not Verified
                        </Badge>
                      )}
                    </TableCell>

                    <TableCell>
                      {employer.featured ? (
                        <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                          Featured
                        </Badge>
                      ) : (
                        <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">
                          Not Featured
                        </Badge>
                      )}
                    </TableCell>

                    <TableCell>{employer.total_jobs}</TableCell>

                    <TableCell className="text-right">
                      <Button
                        variant="link"
                        onClick={() =>
                          navigate(`/admin/recruiters/${employer.id}`)
                        }
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center h-30">
                    No employers found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {/* pagination */}
          {employers.length > 0 && (
            <DataPagination
              page={employersData?.page}
              perPage={employersData?.limit}
              totalPages={employersData?.totalPages}
              onPageChange={setPage}
              onPerPageChange={setPerPage}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminRecruitersPage;
