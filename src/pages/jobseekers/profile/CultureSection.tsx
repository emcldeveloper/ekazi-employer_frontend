import type { Culture } from "@/@types/applicants";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CultureSectionProps {
  cultures: Culture[];
}

const CultureSection = ({ cultures }: CultureSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="uppercase">Culture</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {cultures.map((item: Culture) => {
            return (
              <Badge key={item.id} variant="secondary">
                {item.name}
              </Badge>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default CultureSection;
