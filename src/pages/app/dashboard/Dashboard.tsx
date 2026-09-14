import JobsPostedChart from "./components/JobsPostedChart";
import JobStagesChart from "./components/JobStagesChart";
import { useStatistics } from "@/hooks/statistics";
import { formatNumber } from "@/utils/helpers";
import {
  BriefcaseBusiness,
  Eye,
  FolderCheck,
  GalleryVerticalEnd,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

const Dashboard = () => {
  const { data: statisticsData } = useStatistics();
  const statistics = statisticsData?.data;

  const allJobs = statistics?.totalJobs;
  const allApplications = statistics?.totalApplications;
  const totalViews = statistics?.totalJobViews;
  const totalEmployed = statistics?.pipeline?.[6]?.total || 0;

  return (
    <div className="space-y-4">
      <div className="grid auto-rows-min grid-cols-2 gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-muted-foreground">Jobs</h3>
              <p className="mt-1 text-2xl font-bold">{formatNumber(allJobs)}</p>
            </div>

            <div className="rounded-lg bg-blue-100 p-3 text-blue-600">
              <BriefcaseBusiness size={16} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-muted-foreground">Applications</h3>
              <p className="mt-1 text-2xl font-bold">
                {formatNumber(allApplications)}
              </p>
            </div>

            <div className="rounded-lg bg-green-100 p-3 text-green-600">
              <GalleryVerticalEnd size={16} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-muted-foreground">Total Views</h3>
              <p className="mt-1 text-2xl font-bold">
                {formatNumber(totalViews)}
              </p>
            </div>

            <div className="rounded-lg bg-orange-100 p-3 text-orange-600">
              <Eye size={16} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between">
            <div>
              <h3 className="text-sm text-muted-foreground">Employed</h3>
              <p className="mt-1 text-2xl font-bold">
                {formatNumber(totalEmployed)}
              </p>
            </div>

            <div className="rounded-lg bg-yellow-100 p-3 text-yellow-600">
              <FolderCheck size={16} />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="min-h-screen md:min-h-min">
        <div className="grid auto-rows-min gap-4 md:grid-cols-2">
          <JobStagesChart data={statistics} />
          <JobsPostedChart data={statistics} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
