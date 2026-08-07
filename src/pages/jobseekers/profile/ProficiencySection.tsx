import type { Proficiency } from "@/@types/applicants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/utils/helpers";

interface ProficiencySectionProps {
  proficiencies: Proficiency[];
}

const ProficiencySection = ({ proficiencies }: ProficiencySectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="uppercase">Proficiency</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {proficiencies.map((item: Proficiency) => (
            <div key={item.id} className="flex-1 space-y-1">
              <h3 className="text-sm font-semibold">
                {item.proficiency.name}
                <span className="ml-2 text-xs text-muted-foreground font-normal">
                  – {formatDate(item.started)} - {formatDate(item.ended)}
                </span>
              </h3>

              {/* Award */}
              <p className="text-sm uppercase">
                {item.award}{" "}
                {item.organization?.name && (
                  <span className="text-muted-foreground normal-case">
                    ({item.organization.name})
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
