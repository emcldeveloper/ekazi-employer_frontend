import { useNavigate } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useApplicationStages } from "@/hooks/universals";
import type { ApplicationStage } from "@/@types/universals";
import type { StageStatistics } from "@/@types/applications";

interface ApplicationStagesProps {
  jobId?: number;
  stageStatistics?: StageStatistics;
  currentStage?: string;
  applied?: number;
}

const ApplicationStages = ({
  jobId,
  currentStage,
  stageStatistics,
}: ApplicationStagesProps) => {
  const navigate = useNavigate();

  const { data: stages = [] } = useApplicationStages();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Application Stages</CardTitle>
      </CardHeader>

      <CardContent className="space-y-2">
        {[...stages].reverse().map((stage: ApplicationStage) => (
          <Button
            key={stage.id}
            variant={
              currentStage === stage.stage_name.toLocaleLowerCase()
                ? "default"
                : "outline"
            }
            className="w-full justify-between"
            onClick={() =>
              navigate(
                `/app/jobs/${jobId}/applications/${stage.stage_name.toLowerCase()}`,
              )
            }
          >
            {stage.stage_name}

            {/* stage statistics */}
            <Badge>
              {stageStatistics?.[stage.stage_name as keyof StageStatistics] ??
                0}
            </Badge>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};

export default ApplicationStages;
