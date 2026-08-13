import { Card, CardContent } from "@/components/ui/card";
import {
  Briefcase,
  BriefcaseBusiness,
  CircleUser,
  Users,
  Users2,
} from "lucide-react";
import { JobseekersChart } from "./components/JobseekersChart";
import { SystemUsersChart } from "./components/SystemUsersChart";
import { JobsChart } from "./components/JobsChart";
import { JobStagesChart } from "./components/JobStagesChart";

const AdminDashboard = () => {
  return (
    <div className="space-y-4">
      {/* stats */}
      <div className="grid gap-2 grid-cols-2 md:grid-cols-5">
        <Card>
          <CardContent className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-muted-foreground">Employers</h3>
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
              <h3 className="text-sm text-muted-foreground">Recruiters</h3>
              <p className="mt-1 text-3xl font-bold">0</p>
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
              <p className="mt-1 text-3xl font-bold">0</p>
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
              <p className="mt-1 text-3xl font-bold">0</p>
            </div>

            <div className="rounded-lg bg-yellow-100 p-3 text-yellow-600">
              <Users2 size={16} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-muted-foreground">Admins</h3>
              <p className="mt-1 text-3xl font-bold">0</p>
            </div>

            <div className="rounded-lg bg-orange-100 p-3 text-orange-600">
              <CircleUser size={16} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* charts */}
      <div className="grid auto-rows-min gap-4 md:grid-cols-2">
        <JobseekersChart />
        <SystemUsersChart />
        <JobsChart />
        <JobStagesChart />
      </div>
    </div>
  );
};

export default AdminDashboard;
