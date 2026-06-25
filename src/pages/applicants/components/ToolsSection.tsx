import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const ToolsSection = ({ applicant }: { applicant: any }) => {
  const toolsList = applicant?.tools ?? [];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="uppercase">Tools</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {toolsList.map((item: any) => (
            <Badge key={item.id || item.tool_id} variant="secondary">
              {item.tool?.tool_name ?? "-"}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
