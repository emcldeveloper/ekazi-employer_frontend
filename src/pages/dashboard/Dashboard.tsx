import { Card, CardContent } from "@/components/ui/card";

import JobsPostedChart from "./components/JobsPostedChart";
import JobStagesChart from "./components/JobStagesChart";
import { useStatistics } from "@/hooks/statistics";
import { formatNumber } from "@/utils/helpers";

const Dashboard = () => {
  const { data: statisticsData } = useStatistics();
  const statistics = statisticsData?.data;

  const allJobs = statistics?.total_jobs;
  const allApplications = statistics?.total_applications;
  const totalViews = statistics?.total_views;

  return (
    <>
      <div className="grid auto-rows-min gap-4 md:grid-cols-4">
        <Card>
          <CardContent>
            <h3>Jobs</h3>
            <div>
              <p className="text-2xl font-bold">{formatNumber(allJobs)}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h3>Job Applications</h3>
            <div>
              <p className="text-2xl font-bold">
                {formatNumber(allApplications)}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h3>Total Views</h3>
            <div>
              <p className="text-2xl font-bold">{formatNumber(totalViews)}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <h3>Selected</h3>
            <div>
              <p className="text-2xl font-bold">0</p>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="min-h-screen flex-1 rounded-xl bg-muted/50 md:min-h-min">
        <div className="grid auto-rows-min gap-4 md:grid-cols-2">
          <JobStagesChart data={statistics} />
          <JobsPostedChart data={statistics} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
