import { useEffect } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { Dot, Loader } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import { useEvaluateCandidate, useEvaluationQuestions } from "@/hooks/forms";
import { getErrorMessage } from "@/utils/axios-helpers";

type Criterion = {
  id: number;
  evaluation_id: number;
  name: string;
  hide: number;
};

type Evaluation = {
  id: number;
  name: string;
  description: string;
  hide: number;
  criteria: Criterion[];
};

type FormValues = {
  scores: Record<number, Record<number, number>>;
  comment: string;
};

type EvaluationFormProps = {
  applicantId: number;
  jobId: number;
  onLoadingChange?: (loading: boolean) => void;
  onSuccess?: () => void;
};

const SCORE_OPTIONS = [
  {
    value: 1,
    label: "Poor",
  },
  {
    value: 2,
    label: "Below Average",
  },
  {
    value: 3,
    label: "Average",
  },
  {
    value: 4,
    label: "Good",
  },
  {
    value: 5,
    label: "Excellent",
  },
];

const EvaluationForm = ({
  applicantId,
  jobId,
  onLoadingChange,
  onSuccess: closeModal,
}: EvaluationFormProps) => {
  const { data: questionsData, isLoading } = useEvaluationQuestions({});

  const questions: Evaluation[] = questionsData?.data ?? [];

  const { register, handleSubmit, watch, setValue, reset } =
    useForm<FormValues>({
      defaultValues: {
        scores: {},
        comment: "",
      },
    });

  const { mutate: evaluateCandidate, isPending } = useEvaluateCandidate();

  useEffect(() => {
    onLoadingChange?.(isPending);
  }, [isPending, onLoadingChange]);

  const scores = watch("scores");

  /**
   * Calculate the score for one evaluation.
   *
   * Each criterion is rated from 1 - 5.
   * The final evaluation score is converted to 0 - 100.
   */
  const calculateEvaluationScore = (evaluation: Evaluation) => {
    const visibleCriteria = evaluation.criteria?.filter(
      (criterion) => criterion.hide !== 1,
    );

    if (!visibleCriteria?.length) {
      return 0;
    }

    const evaluationScores = visibleCriteria.map(
      (criterion) => scores?.[evaluation.id]?.[criterion.id] ?? 0,
    );

    const total = evaluationScores.reduce(
      (sum, score) => sum + Number(score),
      0,
    );

    const maxScore = visibleCriteria.length * 5;

    return Math.round((total / maxScore) * 100);
  };

  /**
   * Check whether all criteria have been rated.
   */
  const isEvaluationComplete = (evaluation: Evaluation) => {
    const visibleCriteria = evaluation.criteria?.filter(
      (criterion) => criterion.hide !== 1,
    );

    return visibleCriteria?.every(
      (criterion) => scores?.[evaluation.id]?.[criterion.id] !== undefined,
    );
  };

  const onSubmit = async (data: FormValues) => {
    const payload = {
      applicant_id: applicantId,
      job_id: jobId,

      evaluations: questions
        .filter((evaluation) => evaluation.hide !== 1)
        .map((evaluation) => ({
          evaluation_id: evaluation.id,
          total_score: calculateEvaluationScore(evaluation),
        })),

      comment: data.comment,
    };

    await evaluateCandidate(payload, {
      onSuccess: (res) => {
        toast.success(res?.message || "Evaluation complete");
        reset();
        closeModal?.();
      },
      onError: (err) => {
        toast.error(getErrorMessage(err));
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex min-h-75 items-center justify-center">
        <Loader className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (!questions.length) {
    return (
      <div className="rounded-lg border p-8 text-center">
        <p className="text-muted-foreground">No evaluation questions found.</p>
      </div>
    );
  }

  return (
    <form
      id="evaluation-form"
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      {questions
        .filter((evaluation) => evaluation.hide !== 1)
        .map((evaluation, evaluationIndex) => {
          const visibleCriteria =
            evaluation.criteria?.filter((criterion) => criterion.hide !== 1) ??
            [];

          const totalScore = calculateEvaluationScore(evaluation);

          const completed = isEvaluationComplete(evaluation);

          return (
            <Card key={evaluation.id}>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">
                      {evaluationIndex + 1}. {evaluation.name}
                    </CardTitle>

                    {evaluation.description && (
                      <CardDescription>
                        {evaluation.description}
                      </CardDescription>
                    )}
                  </div>

                  <div className="shrink-0 text-right">
                    <div className="text-2xl font-semibold">{totalScore}</div>

                    <div className="text-xs text-muted-foreground">/ 100</div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {visibleCriteria.map((criterion, criterionIndex) => {
                  const selectedScore = scores?.[evaluation.id]?.[criterion.id];

                  return (
                    <div key={criterion.id}>
                      <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center gap-1  text-base font-medium">
                          <Dot />
                          {criterion.name}
                        </div>

                        {selectedScore && (
                          <span className="text-sm font-medium">
                            {selectedScore}/5
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <Label className="text-muted-foreground">Rating:</Label>
                        <Select
                          value={
                            selectedScore ? String(selectedScore) : undefined
                          }
                          onValueChange={(value) => {
                            setValue(
                              `scores.${evaluation.id}.${criterion.id}`,
                              Number(value),
                              {
                                shouldDirty: true,
                              },
                            );
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select score" />
                          </SelectTrigger>

                          <SelectContent>
                            {SCORE_OPTIONS.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={String(option.value)}
                              >
                                {option.value} - {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {criterionIndex < visibleCriteria.length - 1 && (
                        <Separator className="mt-6" />
                      )}
                    </div>
                  );
                })}

                {!completed && (
                  <p className="text-sm text-destructive">
                    Please rate all criteria in this section.
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}

      {/* Overall comment */}
      <Card>
        <CardHeader>
          <CardTitle>Overall Comments</CardTitle>
        </CardHeader>

        <CardContent>
          <Textarea
            {...register("comment")}
            placeholder="Enter your comments about the applicant..."
            rows={6}
          />
        </CardContent>
      </Card>
    </form>
  );
};

export default EvaluationForm;
