import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import type { Education } from "@/@types/applicants";
import { capitalizeText, formatDate } from "@/utils/helpers";
import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/config/config";
import { GraduationCap } from "lucide-react";

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
        <CardTitle className="uppercase">
          <div className="bg-blue-100 text-primary p-2 rounded-md">
            <GraduationCap size={16} />
          </div>
          Education
        </CardTitle>
      </CardHeader>
      <CardContent>
        {educations.map((education: Education) => (
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold">
                {capitalizeText(education.education_level.name)}{" "}
                {capitalizeText(education.course?.name) &&
                  `in ${capitalizeText(education.course?.name)}`}
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
                Major: {capitalizeText(education.major.name)}
              </Badge>
            )}

            <p className="text-sm text-foreground">
              {capitalizeText(education.college?.name)}
            </p>

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
