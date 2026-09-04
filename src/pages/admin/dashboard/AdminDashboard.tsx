import { Card, CardContent } from "@/components/ui/card";
import {
  Briefcase,
  BriefcaseBusiness,
  Building2,
  CircleUser,
  UserCheck,
  Users,
  Users2,
} from "lucide-react";
import { JobseekersChart } from "./components/JobseekersChart";
import { SystemUsersChart } from "./components/SystemUsersChart";
import { JobsChart } from "./components/JobsChart";
import { JobStagesChart } from "./components/JobStagesChart";
import { useAdminDashboard } from "@/hooks/admin";
import { formatNumber } from "@/utils/helpers";

const AdminDashboard = () => {
  const { data: dashboardData } = useAdminDashboard();

  const jobseekerProfiles = dashboardData?.data?.applicantProfile ?? [];
  const monthlyJobs = dashboardData?.data?.jobsByMonth ?? [];
  const jobsByStage = dashboardData?.data?.jobsByStage ?? [];
  const statistics = dashboardData?.data?.statistics;

  // statistics cards data
  const employers =
    Number(statistics?.nonVerifiedEmployerCount ?? 0) +
    Number(statistics?.verifiedEmployerCount ?? 0);

  const jobseekers =
    Number(statistics?.verifiedJobSeekerCount ?? 0) +
    Number(statistics?.nonVerifiedJobSeekerCount ?? 0);

  const admins = Number(statistics?.adminCount ?? 0);

  return (
    <div className="space-y-4">
      {/* stats */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        <Card>
          <CardContent className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-muted-foreground">Employers</h3>
              <p className="mt-1 text-2xl font-bold">
                {formatNumber(employers)}
              </p>
            </div>

            <div className="rounded-lg bg-blue-100 p-3 text-blue-600">
              <Building2 size={16} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-muted-foreground">Recruiters</h3>
              <p className="mt-1 text-2xl font-bold">{formatNumber(0)}</p>
            </div>

            <div className="rounded-lg bg-green-100 p-3 text-green-600">
              <Briefcase size={16} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-muted-foreground">JobSeekers</h3>
              <p className="mt-1 text-2xl font-bold">
                {formatNumber(jobseekers)}
              </p>
            </div>

            <div className="rounded-lg bg-red-100 p-3 text-red-600">
              <Users size={16} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-muted-foreground">Freelancers</h3>
              <p className="mt-1 text-2xl font-bold">{formatNumber(0)}</p>
            </div>

            <div className="rounded-lg bg-yellow-100 p-3 text-yellow-600">
              <Users2 size={16} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-muted-foreground">Jobs</h3>
              <p className="mt-1 text-2xl font-bold">{formatNumber(0)}</p>
            </div>

            <div className="rounded-lg bg-yellow-100 p-3 text-yellow-600">
              <BriefcaseBusiness size={16} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-muted-foreground">Applications</h3>
              <p className="mt-1 text-2xl font-bold">{formatNumber(0)}</p>
            </div>

            <div className="rounded-lg bg-orange-100 p-3 text-orange-600">
              <UserCheck size={16} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-muted-foreground">Admins</h3>
              <p className="mt-1 text-2xl font-bold">{admins}</p>
            </div>

            <div className="rounded-lg bg-orange-100 p-3 text-orange-600">
              <CircleUser size={16} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* charts */}
      <div className="grid auto-rows-min gap-4 md:grid-cols-2">
        <JobseekersChart jobseekerProfiles={jobseekerProfiles} />
        <SystemUsersChart />
        <JobsChart monthlyJobs={monthlyJobs} />
        <JobStagesChart jobsByStage={jobsByStage} />
      </div>
    </div>
  );
};

export default AdminDashboard;
