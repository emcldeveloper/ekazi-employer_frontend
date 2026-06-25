import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/utils/helpers";

const ProficiencySection = ({ applicant }: { applicant: any }) => {
  const proficiencies = applicant?.proficiency ?? [];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="uppercase">Proficiency</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {proficiencies.map((item: any) => (
            <div key={item.id} className="flex-1 space-y-1">
              {/* Title */}
              <h3 className="text-sm font-semibold">
                {item.proficiency?.proficiency_name}
                <span className="ml-2 text-xs text-muted-foreground font-normal">
                  – {formatDate(item.started)} - {formatDate(item.ended)}
                </span>
              </h3>

              {/* Award */}
              <p className="text-sm uppercase">
                {item.award}{" "}
                {item.organization?.organization_name && (
                  <span className="text-muted-foreground normal-case">
                    ({item.organization.organization_name})
                  </span>
                )}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProficiencySection;
