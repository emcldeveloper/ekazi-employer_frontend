import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SoftwareSection = ({ applicant }: { applicant: any }) => {
  const softwareList = applicant?.software ?? [];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="uppercase">Software</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {softwareList.map((item: any) => (
            <Badge key={item.id} variant="secondary">
              {item.software?.software_name}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SoftwareSection;
