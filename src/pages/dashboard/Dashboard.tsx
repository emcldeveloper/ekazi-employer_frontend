import JobsPostedChart from "./components/JobsPostedChart";
import JobStagesChart from "./components/JobStagesChart";
import { useStatistics } from "@/hooks/statistics";
import { formatNumber } from "@/utils/helpers";
import { Briefcase, Eye, FolderCheck, GalleryVerticalEnd } from "lucide-react";
import { StatsCard } from "@/components/stats-card";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const navigate = useNavigate();

  const { data: statisticsData } = useStatistics();
  const statistics = statisticsData?.data;

  const allJobs = statistics?.total_jobs;
  const allApplications = statistics?.total_applications;
  const totalViews = statistics?.total_views;
  const totalEmployed = statistics?.pipeline?.[6]?.total || 0;

  return (
    <div className="mt-4 space-y-4">
      <div className="grid auto-rows-min gap-4 md:grid-cols-4">
        <StatsCard
          title="Jobs"
          value={formatNumber(allJobs)}
          icon={Briefcase}
          onClick={() => navigate("/jobs")}
        />

        <StatsCard
          title="Job Applications"
          value={formatNumber(allApplications)}
          icon={GalleryVerticalEnd}
          // onClick={() => navigate("/applications")}
        />

        <StatsCard
          title="Total Views"
          value={formatNumber(totalViews)}
          icon={Eye}
          // onClick={() => navigate("/views")}
        />

        <StatsCard
          title="Employed"
          value={formatNumber(totalEmployed)}
          icon={FolderCheck}
          // onClick={() => navigate("/employed")}
        />
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
