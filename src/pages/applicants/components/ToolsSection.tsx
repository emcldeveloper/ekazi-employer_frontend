import type { Skill } from "@/@types/applicants";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ToolsSectionProps {
  tools: Skill[];
}

export const ToolsSection = ({ tools }: ToolsSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="uppercase">Tools</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {tools.map((item: Skill) => (
            <Badge key={item.id} variant="secondary">
              {item.name}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
