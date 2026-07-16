import { useNavigate } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ApplicationStagesProps {
  jobId?: number;
  currentStage?: string;
  applied?: number;
}

const ApplicationStages = ({ jobId, currentStage }: ApplicationStagesProps) => {
  const navigate = useNavigate();

  const stages = [
    { label: "Applied", value: "applied", count: 0 },
    { label: "Shortlisted", value: "shortlisted", count: 0 },
    { label: "Screening", value: "screening", count: 0 },
    { label: "Interview", value: "interview", count: 0 },
    { label: "Selected", value: "selected", count: 0 },
    { label: "Background Check", value: "background-check", count: 0 },
    { label: "Offer", value: "offer", count: 0 },
    { label: "Employed", value: "employed", count: 0 },
    { label: "Indirect Applicants", value: "indirect", count: 0 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Application Stages</CardTitle>
      </CardHeader>

      <CardContent className="space-y-2">
        {stages.map((stage) => (
          <Button
            key={stage.value}
            variant={currentStage === stage.value ? "default" : "outline"}
            className="w-full justify-between"
            onClick={() =>
              navigate(`/jobs/${jobId}/applications/${stage.value}`)
            }
          >
            {stage.label}
            <Badge>{stage.count}</Badge>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};

export default ApplicationStages;
