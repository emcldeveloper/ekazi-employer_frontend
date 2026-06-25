import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PersonalitySection = ({ applicant }: { applicant: any }) => {
  const personalities = applicant?.applicant_personality ?? [];
  return (
    <Card>
      <CardHeader>
        <CardTitle className="uppercase">Personality</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {personalities.map((item: any) => (
            <Badge
              key={item.id || item.personality_id}
              variant="secondary"
              className="text-sm px-3 py-1 rounded-md hover:bg-muted transition"
            >
              {item.personality?.personality_name ?? "-"}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalitySection;
