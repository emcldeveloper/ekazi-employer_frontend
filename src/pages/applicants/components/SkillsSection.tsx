import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SkillsSection = ({ jobseeker }: { jobseeker: any }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="uppercase">Skills</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-wrap gap-2">
        {jobseeker?.knowledge.map((item: any) => (
          <Badge
            key={item}
            variant="secondary"
            className="max-w-50 truncate block"
            title={item?.knowledge?.knowledge_name}
          >
            {item?.knowledge?.knowledge_name}
          </Badge>
        ))}
      </CardContent>
    </Card>
  );
};

export default SkillsSection;
