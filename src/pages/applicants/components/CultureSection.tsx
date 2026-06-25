import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CultureSection = ({ applicant }: { applicant: any }) => {
  const cultures = applicant?.culture ?? [];
  return (
    <Card>
      <CardHeader>
        <CardTitle className="uppercase">Culture</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {cultures.map((item: any) => {
            const cultureName =
              item.culture?.culture_name || item.culture_name || "-";

            return (
              <Badge key={item.id} variant="secondary">
                {cultureName}
              </Badge>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default CultureSection;
