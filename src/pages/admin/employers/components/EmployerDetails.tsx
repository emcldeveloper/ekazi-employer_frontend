import { BriefcaseBusiness, Calendar, MapPin, UsersIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ApplicationsPipeline } from "./ApplicationsPipeline";
import Profile from "./Profile";
import EmployerJobs from "./EmployerJobs";
import Users from "./Users";
import { useParams } from "react-router-dom";
import { useEmployer } from "@/hooks/employers/useEmployer";
import { capitalizeText, formatDate } from "@/utils/helpers";
import { BASE_URL } from "@/config/config";
import { useEmployerJobs } from "@/hooks/employers/useEmployerJobs";
import { useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";

const EmployerDetails = () => {
  const { id } = useParams();
  const employerId = Number(id);

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(25);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 500);

  const { data: employer, isLoading } = useEmployer(employerId);

  const { data: employerJobsData, isLoading: isLoadingJobs } = useEmployerJobs(
    employerId,
    debouncedSearch,
    page,
    perPage,
  );
  const jobs = employerJobsData?.data ?? [];
  const statistics = employerJobsData?.stats;

  if (isLoading) {
    return <div className="flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:gap-10">
            <div className="w-30">
              <img
                src={
                  employer?.logo
                    ? `${BASE_URL}/${employer.logo}`
                    : "/images/default-img.jpeg"
                }
                alt={employer?.name || "Company Logo"}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl font-bold">{employer?.name}</h1>

              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">
                  <UsersIcon size={16} />
                  {employer?.company_size?.name}
                </Badge>

                <Badge variant="secondary">
                  <Calendar size={16} />
                  Founded {formatDate(employer?.founded_year)}
                </Badge>

                <Badge variant="secondary">
                  <BriefcaseBusiness size={16} />
                  {capitalizeText(employer?.business)}
                </Badge>

                <Badge variant="secondary">
                  <MapPin size={16} />
                  {`${employer?.address?.sub_location}, ${employer?.address?.region_name} ${employer?.country?.name}`}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* statistics */}
      <div className="grid auto-rows-min gap-4 md:grid-cols-5">
        <Card>
          <CardContent>
            <h3 className="font-semibold text-muted-foreground">Total Jobs</h3>
            <div>
              <p className="text-2xl font-bold">
                {statistics?.total_jobs ?? 0}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <h3 className="font-semibold">Published</h3>
            <div>
              <p className="text-2xl font-bold">
                {statistics?.published_jobs ?? 0}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <h3 className="font-semibold">Unpublished</h3>
            <div>
              <p className="text-2xl font-bold">
                {statistics?.unpublished_jobs ?? 0}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <h3 className="font-semibold">Active</h3>
            <div>
              <p className="text-2xl font-bold">
                {statistics?.active_jobs ?? 0}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <h3 className="font-semibold">Expired</h3>
            <div>
              <p className="text-2xl font-bold">
                {statistics?.expired_jobs ?? 0}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Applications pipeline */}
      <ApplicationsPipeline />

      {/* Activities */}
      <Tabs defaultValue="profile">
        <TabsList variant="line">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="jobs">Jobs</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Profile employer={employer} />
        </TabsContent>

        <TabsContent value="jobs">
          <EmployerJobs
            jobs={jobs}
            isLoading={isLoadingJobs}
            search={search}
            setSearch={setSearch}
            page={page}
            setPage={setPage}
            perPage={perPage}
            setPerPage={setPerPage}
            jobsData={employerJobsData}
          />
        </TabsContent>
        <TabsContent value="users">
          <Users />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmployerDetails;
