import { useNavigate } from "react-router-dom";
import { FileStack, UserCheck, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import JobSettings from "./actions/JobSettings";
import type { Job } from "@/@types/job";
import PublishJob from "./actions/PublishJob";
import DeleteJob from "./actions/DeleteJob";

interface JobActionsProps {
  job: Job;
}

const JobActions = ({ job }: JobActionsProps) => {
  // job published status, 1 === true or 0 === false
  const jobId = job?.id;
  const publishedStatus = Number(job?.published);
  const published = publishedStatus === 1;

  const navigate = useNavigate();

  const handleViewApplications = () => {
    navigate(`/app/jobs/${jobId}/applications/applied`);
  };

  const handlePotentialCandidates = () => {
    navigate(`/app/jobs/${jobId}/potential-candidates`);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Actions</CardTitle>
          <Separator />
        </CardHeader>
        <CardContent className="space-y-3">
          <PublishJob jobId={jobId} published={published} />

          <Button
            variant="outline"
            onClick={handleViewApplications}
            className="w-full justify-between"
          >
            View Applications
            <FileStack size={16} />
          </Button>

          <Button
            variant="outline"
            onClick={handlePotentialCandidates}
            className="w-full justify-between"
          >
            Potential Candidates
            <Users size={16} />
          </Button>

          <Button
            variant="outline"
            onClick={() => {}}
            className="w-full justify-between"
          >
            Selected Applicants
            <UserCheck size={16} />
          </Button>
          {/* 
          <Button
            variant="outline"
            onClick={() => {}}
            className="w-full justify-between"
          >
            Add Screener
            <Plus size={16} />
          </Button> */}

          {/* Job settings  */}
          <JobSettings job={job} />

          {/* Delete job */}
          <DeleteJob jobId={jobId} />
        </CardContent>
      </Card>
    </>
  );
};

export default JobActions;
