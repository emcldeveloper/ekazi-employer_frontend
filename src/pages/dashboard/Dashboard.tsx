import { Card, CardContent } from "@/components/ui/card";

import JobsPostedChart from "./components/JobsPostedChart";
import JobStagesChart from "./components/JobStagesChart";

const Dashboard = () => {
  return (
    <>
      <div className="grid auto-rows-min gap-4 md:grid-cols-4">
        <Card>
          <CardContent>
            <h3>Jobs</h3>
            <div>
              <p className="text-2xl font-bold">960</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <h3>Applicants</h3>
            <div>
              <p className="text-2xl font-bold">120</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <h3>Selected</h3>
            <div>
              <p className="text-2xl font-bold">120</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <h3>Total Views</h3>
            <div>
              <p className="text-2xl font-bold">1,200</p>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="min-h-screen flex-1 rounded-xl bg-muted/50 md:min-h-min">
        <div className="grid auto-rows-min gap-4 md:grid-cols-2">
          <JobStagesChart />
          <JobsPostedChart />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
