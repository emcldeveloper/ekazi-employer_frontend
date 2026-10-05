import { useMemo } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export type TechnicalSkill = {
  id: string;
  criterion: string;
  rating: number;
  points: number;
};

export type InterviewEvaluationForm = {
  technicalSkills: TechnicalSkill[];
};

const TECHNICAL_CRITERIA = [
  {
    id: "relevant-technologies",
    criterion: "Knowledge of relevant technologies",
  },
  {
    id: "problem-solving",
    criterion: "Problem solving skills",
  },
  {
    id: "technical-depth",
    criterion: "Technical depth and expertise",
  },
  {
    id: "learning-new-technologies",
    criterion: "Ability to learn new technologies fast",
  },
];

const RATINGS = [
  { value: "1", label: "Poor" },
  { value: "2", label: "Fair" },
  { value: "3", label: "Average" },
  { value: "4", label: "Good" },
  { value: "5", label: "Outstanding" },
];

export function TechnicalSkillsSection() {
  const { control, watch } = useFormContext<InterviewEvaluationForm>();

  const technicalSkills = watch("technicalSkills");

  const totalPoints = useMemo(() => {
    return technicalSkills?.reduce(
      (total, skill) => total + (skill?.points || 0),
      0,
    );
  }, [technicalSkills]);

  return (
    <Card className="overflow-hidden">
      {/* Section Header */}
      <CardHeader className="border-b bg-blue-50 px-4 py-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-blue-900">
            1. Technical Skills
          </h2>

          <div className="text-sm font-semibold text-blue-900">
            Total: <span className="text-base">{totalPoints} / 40</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {/* Desktop Header */}
        <div className="hidden border-b bg-muted/50 md:grid md:grid-cols-[50px_minmax(220px,1fr)_repeat(5,90px)_100px_90px]">
          <div className="border-r p-3 text-center text-xs font-semibold">
            No.
          </div>

          <div className="border-r p-3 text-center text-xs font-semibold">
            Criteria
          </div>

          {RATINGS.map((rating) => (
            <div
              key={rating.value}
              className="border-r p-2 text-center text-xs font-semibold"
            >
              <div className="text-sm">{rating.value}</div>
              <div className="font-normal text-muted-foreground">
                {rating.label}
              </div>
            </div>
          ))}

          <div className="border-r p-2 text-center text-xs font-semibold">
            Score
            <br />
            (1-5)
          </div>

          <div className="p-2 text-center text-xs font-semibold">
            Points
            <br />
            (Max)
          </div>
        </div>

        {/* Criteria */}
        {TECHNICAL_CRITERIA.map((item, index) => {
          const currentRating = technicalSkills?.[index]?.rating || 0;

          const currentPoints = technicalSkills?.[index]?.points || 0;

          return (
            <div key={item.id} className="border-b last:border-b-0">
              {/* Desktop */}
              <div className="hidden md:grid md:grid-cols-[50px_minmax(220px,1fr)_repeat(5,90px)_100px_90px]">
                <div className="flex items-center justify-center border-r p-3 text-sm">
                  {index + 1}
                </div>

                <div className="flex items-center border-r p-3 text-sm">
                  {item.criterion}
                </div>

                <Controller
                  name={`technicalSkills.${index}.rating`}
                  control={control}
                  render={({ field }) => (
                    <RadioGroup
                      value={field.value?.toString() || ""}
                      onValueChange={(value) => {
                        const rating = Number(value);

                        field.onChange(rating);

                        // Rating 1-5 → points 2-10
                        const points = rating * 2;

                        control._subjects.state.next({
                          name: `technicalSkills.${index}.points`,
                        } as never);
                      }}
                      className="col-span-5 contents"
                    >
                      {RATINGS.map((rating) => (
                        <div
                          key={rating.value}
                          className="flex items-center justify-center border-r p-3"
                        >
                          <RadioGroupItem
                            value={rating.value}
                            id={`${item.id}-${rating.value}`}
                          />
                        </div>
                      ))}
                    </RadioGroup>
                  )}
                />

                {/* Score */}
                <div className="flex items-center justify-center border-r p-3">
                  <Badge variant="outline">{currentRating || "-"}</Badge>
                </div>

                {/* Points */}
                <div className="flex items-center justify-center p-3 text-sm font-medium">
                  {currentPoints || 0} / 10
                </div>
              </div>

              {/* Mobile */}
              <div className="space-y-4 p-4 md:hidden">
                <div className="flex items-start gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold">
                    {index + 1}
                  </span>

                  <p className="text-sm font-medium">{item.criterion}</p>
                </div>

                <Controller
                  name={`technicalSkills.${index}.rating`}
                  control={control}
                  render={({ field }) => (
                    <RadioGroup
                      value={field.value?.toString() || ""}
                      onValueChange={(value) => {
                        field.onChange(Number(value));
                      }}
                      className="grid grid-cols-5 gap-2"
                    >
                      {RATINGS.map((rating) => (
                        <div
                          key={rating.value}
                          className="flex flex-col items-center gap-1"
                        >
                          <RadioGroupItem
                            value={rating.value}
                            id={`mobile-${item.id}-${rating.value}`}
                          />

                          <Label
                            htmlFor={`mobile-${item.id}-${rating.value}`}
                            className="text-xs"
                          >
                            {rating.value}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  )}
                />

                <div className="flex justify-between rounded-md bg-muted/50 p-3 text-sm">
                  <span>
                    Score: <strong>{currentRating || "-"}</strong>
                  </span>

                  <span>
                    Points: <strong>{currentPoints || 0} / 10</strong>
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
