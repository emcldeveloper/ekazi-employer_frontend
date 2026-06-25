import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RefereeSection = ({ applicant }: { applicant: any }) => {
  const referees = applicant?.referees ?? [];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="uppercase">Referees</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between space-y-3">
          {referees.map((referee: any) => (
            <div key={referee.id} className="flex-1 space-y-1">
              {/* Name */}
              <h3 className="text-sm font-semibold">
                {referee.first_name} {referee.middle_name} {referee.last_name}
              </h3>

              {/* Position */}
              <p className="text-sm text-foreground">
                {referee.referee_position}
              </p>

              {/* Employer */}
              <p className="text-sm text-muted-foreground">
                {referee.employer}
              </p>

              {/* Contact */}
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
