import { useMemo } from "react";
import moment from "moment";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Experience, ExperienceGroup } from "@/@types/applicants";

interface ExperienceSectionProps {
  experiences: Experience[];
}

const calculateDuration = (positions: Experience[] = []) => {
  let totalMonths = 0;

  positions.forEach((position) => {
    const start = moment(position.start_date);
    const end = position.end_date ? moment(position.end_date) : moment();

    totalMonths += moment.duration(end.diff(start)).asMonths();
  });

  const roundedMonths = Math.round(totalMonths);
  const years = Math.floor(roundedMonths / 12);
  const months = roundedMonths % 12;

  return {
    years,
    months,
    text: `${years} yrs - ${months} mos`,
  };
};

const ExperienceSection = ({ experiences }: ExperienceSectionProps) => {
  const groupedExperience = useMemo(() => {
    if (!experiences?.length) return [];

    const groups = Object.values(
      experiences.reduce((acc: Record<string, ExperienceGroup>, experience) => {
        if (!acc[experience.employer]) {
          acc[experience.employer] = {
            employer: experience.employer,
            region: experience.region,
            sub_location: experience.sub_location,
            positions: [],
          };
        }

        acc[experience.employer].positions.push(experience);

        return acc;
      }, {}),
    );

    return groups.map((group) => ({
      ...group,
      positions: [...group.positions].sort(
        (a, b) =>
          (b.end_date ? new Date(b.end_date).getTime() : Date.now()) -
          (a.end_date ? new Date(a.end_date).getTime() : Date.now()),
      ),
    }));
  }, [experiences]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="uppercase">Experience</CardTitle>
      </CardHeader>

      <CardContent>
        {groupedExperience.length === 0 ? (
          <div className="text-muted-foreground text-sm">
            No work experience added yet
          </div>
        ) : (
          <div className="space-y-6">
            {groupedExperience.map((group) => {
              const employer = group.employer;
              const subLocation = group.sub_location;
              const region = group.region;
              // const country = group.country;

              const duration = calculateDuration(group.positions);

              return (
                <div key={employer} className="flex-1 space-y-2">
                  <h5 className="font-semibold">{employer}</h5>

                  <p className="text-sm text-muted-foreground">
                    {subLocation}, {region}
                  </p>

                  <Badge variant="secondary" className="w-fit">
                    {duration.text}
                  </Badge>

                  <div className="relative mt-3 space-y-4 border-l pl-4">
                    {group.positions.map((position, idx: number) => (
                      <div key={position.id || idx} className="relative">
                        <span className="absolute -left-5.5 top-1 h-3 w-3 rounded-full bg-blue-600" />

                        <div className="space-y-1">
                          <p className="font-medium">{position.position}</p>

                          {position.industry && (
                            <p className="text-sm">
                              {position.industry} Industry
                            </p>
                          )}

                          <p className="text-xs text-muted-foreground">
                            {moment(position.start_date).format("MMM YYYY")} -{" "}
                            {position.end_date
                              ? moment(position.end_date).format("MMM YYYY")
                              : "Present"}
                          </p>

                          <div className="text-sm">
                            <strong>Responsibility:</strong>{" "}
                            <span
                              className="prose prose-sm"
                              dangerouslySetInnerHTML={{
                                __html: position.responsibility || "",
                              }}
                            />
                          </div>

                          {position.remark && (
                            <p className="text-sm">
                              <strong>Reason:</strong>{" "}
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: position.remark,
                                }}
                              />
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ExperienceSection;
