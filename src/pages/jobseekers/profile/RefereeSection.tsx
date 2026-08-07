import type { Referee } from "@/@types/applicants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RefereeSectionProps {
  referees: Referee[];
}

const RefereeSection = ({ referees }: RefereeSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="uppercase">Referees</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between space-y-3">
          {referees.map((referee: Referee) => (
            <div key={referee.id} className="flex-1 space-y-1">
              <h3 className="text-sm font-semibold">
                {referee.first_name} {referee.middle_name} {referee.last_name}
              </h3>

              <p className="text-sm text-foreground">{referee.position}</p>

              <p className="text-sm text-muted-foreground">
                {referee.employer}
              </p>

              <p className="text-xs text-muted-foreground">{referee.email}</p>
              <p className="text-xs">{referee.phone}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RefereeSection;
