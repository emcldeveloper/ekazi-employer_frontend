import type { Skill } from "@/@types/applicants";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SkillsSectionProps {
  knowledges: Skill[];
}

const SkillsSection = ({ knowledges }: SkillsSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="uppercase">Skills</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-wrap gap-2">
        {knowledges.map((item: Skill) => (
          <Badge
            key={item.id}
            variant="secondary"
            className="max-w-50 truncate block"
          >
            {item.name}
          </Badge>
        ))}
      </CardContent>
    </Card>
  );
};

export default SkillsSection;
