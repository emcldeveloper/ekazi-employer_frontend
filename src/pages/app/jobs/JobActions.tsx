import { useNavigate } from "react-router-dom";
import { CircleAlert, FileStack, UserCheck, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import JobSettings from "./actions/JobSettings";
import type { Job } from "@/@types/job";
import PublishJob from "./actions/PublishJob";
import DeleteJob from "./actions/DeleteJob";
import { useRolePermissions } from "@/hooks/useRolePermissions";
import { PERMISSIONS } from "@/constants/role-permissions";

interface JobActionsProps {
  job: Job;
}

const JobActions = ({ job }: JobActionsProps) => {
  const jobId = job?.id;
  const publishedStatus = Number(job?.published);
  const published = publishedStatus === 1;

  const navigate = useNavigate();
  const { hasPermission } = useRolePermissions();

  const hasAnyActionPermission =
    hasPermission(PERMISSIONS.PUBLISH_JOB) ||
    hasPermission(PERMISSIONS.VIEW_JOB_APPLICATIONS) ||
    hasPermission(PERMISSIONS.VIEW_POTENTIAL_CANDIDATES) ||
    hasPermission(PERMISSIONS.VIEW_SELECTED_CANDIDATES) ||
    hasPermission(PERMISSIONS.VIEW_JOB_SETTINGS) ||
    hasPermission(PERMISSIONS.DELETE_JOB);

  const handleViewApplications = () => {
    navigate(`/app/jobs/${jobId}/applications/applied`);
  };

  const handlePotentialCandidates = () => {
    navigate(`/app/jobs/${jobId}/potential-candidates`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Actions</CardTitle>
        <Separator />
      </CardHeader>

      <CardContent className="space-y-3">
        {!hasAnyActionPermission ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              <CircleAlert className="h-6 w-6 text-muted-foreground" />
            </div>

            <h3 className="font-medium text-sm">No actions available</h3>

            <p className="mt-1 max-w-xs text-sm text-muted-foreground">
              You don't have permission to perform any actions on this job at
              the moment.
            </p>
          </div>
        ) : (
          <>
            {hasPermission(PERMISSIONS.PUBLISH_JOB) && (
              <PublishJob jobId={jobId} published={published} />
            )}

            {hasPermission(PERMISSIONS.VIEW_JOB_APPLICATIONS) && (
              <Button
                variant="outline"
                onClick={handleViewApplications}
                className="w-full justify-between"
              >
                View Applications
                <FileStack size={16} />
              </Button>
            )}

            {hasPermission(PERMISSIONS.VIEW_POTENTIAL_CANDIDATES) && (
              <Button
                variant="outline"
                onClick={handlePotentialCandidates}
                className="w-full justify-between"
              >
                Potential Candidates
                <Users size={16} />
              </Button>
            )}

            {hasPermission(PERMISSIONS.VIEW_SELECTED_CANDIDATES) && (
              <Button
                variant="outline"
                onClick={() => {}}
                className="w-full justify-between"
              >
                Selected Applicants
                <UserCheck size={16} />
              </Button>
            )}

            {hasPermission(PERMISSIONS.VIEW_JOB_SETTINGS) && (
              <JobSettings job={job} />
            )}

            {hasPermission(PERMISSIONS.DELETE_JOB) && (
              <DeleteJob jobId={jobId} />
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default JobActions;
