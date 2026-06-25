import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ApplicationStagesProps {
  applied?: number;
}

const ApplicationStages = ({ applied }: ApplicationStagesProps) => {
  // const navigate = useNavigate();

  // const handleApplied = () => {
  //   navigate(`/jobs/${jobId}/applications`);
  // };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Application Stages</CardTitle>
        </CardHeader>

        <CardContent className="space-y-2">
          <Button
            variant="outline"
            onClick={() => {}}
            className="w-full justify-between"
          >
            Applied
            <Badge>{applied}</Badge>
          </Button>

          <Button
            variant="outline"
            onClick={() => {}}
            className="w-full justify-between"
          >
            Shortlisted
            <Badge>0</Badge>
          </Button>
          <Button
            variant="outline"
            onClick={() => {}}
            className="w-full justify-between"
          >
            Screening
            <Badge>0</Badge>
          </Button>

          <Button
            variant="outline"
            onClick={() => {}}
            className="w-full justify-between"
          >
            Interview
            <Badge>0</Badge>
          </Button>

          <Button
            variant="outline"
            onClick={() => {}}
            className="w-full justify-between"
          >
            Selected
            <Badge>0</Badge>
          </Button>

          <Button
            variant="outline"
            onClick={() => {}}
            className="w-full justify-between"
          >
            Background Check
            <Badge>0</Badge>
          </Button>

          <Button
            variant="outline"
            onClick={() => {}}
            className="w-full justify-between"
          >
            Offer
            <Badge>0</Badge>
          </Button>

          <Button
            variant="outline"
            onClick={() => {}}
            className="w-full justify-between"
          >
            Employed
            <Badge>0</Badge>
          </Button>

          <Button
            variant="outline"
            onClick={() => {}}
            className="w-full justify-between"
          >
            Indirect Applicants
            <Badge>0</Badge>
          </Button>
        </CardContent>
      </Card>
    </>
  );
};

export default ApplicationStages;
