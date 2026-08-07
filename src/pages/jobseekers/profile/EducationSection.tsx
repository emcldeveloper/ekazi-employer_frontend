import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import type { Education } from "@/@types/applicants";
import { formatDate } from "@/utils/helpers";
import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/config/config";

interface EducationSectionProps {
  educations: Education[];
}

const EducationSection = ({ educations }: EducationSectionProps) => {
  const handleViewCertificate = (attachment: string) => {
    window.open(`${BASE_URL}/${attachment}`, "_blank");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="uppercase">Education</CardTitle>
      </CardHeader>
      <CardContent>
        {educations.map((education: Education) => (
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">
                {education.education_level.name}{" "}
                {education.course?.name && `in ${education.course?.name}`}
              </h3>

              <Button
                size="sm"
                variant="outline"
                onClick={() => handleViewCertificate(education.attachment)}
              >
                View
              </Button>
            </div>

            {education.major?.name && (
              <Badge variant="secondary" className="text-xs">
                Major: {education.major.name}
              </Badge>
            )}

            <p className="text-sm text-foreground">{education.college?.name}</p>

            <p className="text-xs text-muted-foreground">
              {formatDate(education.started)} – {formatDate(education.ended)}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default EducationSection;
