import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import type { Applicant } from "@/@types/applicants";
import { formatDate } from "@/utils/helpers";
import { Button } from "@/components/ui/button";

interface EducationSectionProps {
  applicant: Applicant;
}

const EducationSection = ({ applicant }: EducationSectionProps) => {
  const educationList = applicant?.education ?? [];

  const handleViewCertificate = (attachment: string) => {
    window.open(`${import.meta.env.VITE_BASE_URL}/${attachment}`, "_blank");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="uppercase">Education</CardTitle>
      </CardHeader>
      <CardContent>
        {educationList.length > 0 ? (
          <>
            {educationList.map((education) => (
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold">
                    {education.level?.education_level}{" "}
                    {education.course?.course_name &&
                      `in ${education.course.course_name}`}
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

                <p className="text-sm text-foreground">
                  {education.college?.college_name}
                </p>

                <p className="text-xs text-muted-foreground">
                  {formatDate(education.started)} –{" "}
                  {formatDate(education.ended)}
                </p>
              </div>
            ))}
          </>
        ) : (
          <div className="text-center py-10 text-sm text-muted-foreground">
            No education records found
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EducationSection;
