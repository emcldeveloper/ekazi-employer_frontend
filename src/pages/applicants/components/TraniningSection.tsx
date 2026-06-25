import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/utils/helpers";

const TraniningSection = ({ applicant }: { applicant: any }) => {
  const trainings = applicant?.training ?? [];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="uppercase">Trainings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {trainings.map((training: any) => (
            <div key={training.id} className="flex-1 space-y-1">
              {/* Title */}
              <h3 className="text-sm font-semibold">
                {training.name}
                <span className="ml-2 text-xs text-muted-foreground font-normal">
                  – {formatDate(training.started)} -{" "}
                  {formatDate(training.ended)}
                </span>
              </h3>

              {/* Institution */}
              <p className="text-sm text-foreground">{training.institution}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TraniningSection;
