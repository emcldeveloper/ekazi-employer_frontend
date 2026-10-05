import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { TechnicalSkillsSection } from "./TechnicalSkillsSection";

type InterviewEvaluationForm = {
  technicalSkills: {
    criterionId: string;
    rating: number;
  }[];
};

const defaultValues: InterviewEvaluationForm = {
  technicalSkills: [
    {
      criterionId: "relevant-technologies",
      rating: 0,
    },
    {
      criterionId: "problem-solving",
      rating: 0,
    },
    {
      criterionId: "technical-depth",
      rating: 0,
    },
    {
      criterionId: "learning-new-technologies",
      rating: 0,
    },
  ],
};

export default function EvaluationForm() {
  const form = useForm<InterviewEvaluationForm>({
    defaultValues,
  });

  const onSubmit = (data: InterviewEvaluationForm) => {
    console.log("Evaluation:", data);

    const totalTechnicalPoints = data.technicalSkills.reduce(
      (total, skill) => total + skill.rating * 2,
      0,
    );

    console.log("Technical Skills:", totalTechnicalPoints);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <TechnicalSkillsSection />

        <div className="flex justify-end">
          <Button type="submit">Save Evaluation</Button>
        </div>
      </form>
    </FormProvider>
  );
}
