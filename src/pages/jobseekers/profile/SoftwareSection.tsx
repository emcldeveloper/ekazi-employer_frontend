import type { Skill } from "@/@types/applicants";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SoftwareSectionProps {
  softwares: Skill[];
}

const SoftwareSection = ({ softwares }: SoftwareSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="uppercase">Software</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {softwares.map((item: Skill) => (
            <Badge key={item.id} variant="secondary">
              {item.name}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SoftwareSection;
