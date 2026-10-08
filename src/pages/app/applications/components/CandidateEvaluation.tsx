import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  ClipboardCheck,
  Users,
  ChartNoAxesColumnIncreasing,
  UserRound,
} from "lucide-react";

interface Evaluator {
  evaluator_id: number;
  evaluator_username: string;
  average_percentage: number;
  total_evaluations: number;
}

interface EvaluationResult {
  applicant_id: number;
  job_id: number;
  evaluators: Evaluator[];
  total_evaluators: number;
  total_percentage: number;
}

interface Props {
  data: EvaluationResult | null | undefined;
}

export function CandidateEvaluation({ data }: Props) {
  if (!data) {
    return (
      <Card>
        <CardContent className="py-12 text-center text-muted-foreground">
          No evaluation results available.
        </CardContent>
      </Card>
    );
  }

  const totalEvaluations = data.evaluators.reduce(
    (total, evaluator) => total + evaluator.total_evaluations,
    0,
  );

  const getScoreBadge = (score: number) => {
    if (score >= 80) {
      return <Badge variant="default">Excellent</Badge>;
    }

    if (score >= 60) {
      return <Badge variant="secondary">Good</Badge>;
    }

    if (score >= 40) {
      return <Badge variant="outline">Average</Badge>;
    }

    return <Badge variant="destructive">Low</Badge>;
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm text-muted-foreground">
            Overview of candidate assessment results
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Overall Score</p>
              <ChartNoAxesColumnIncreasing className="size-4 text-muted-foreground" />
            </div>

            <div className="text-3xl font-bold">{data.total_percentage}%</div>

            <Progress value={data.total_percentage} />

            {getScoreBadge(data.total_percentage)}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Total Evaluators</p>
              <Users className="size-4 text-muted-foreground" />
            </div>

            <div className="text-3xl font-bold">{data.total_evaluators}</div>

            <p className="text-xs text-muted-foreground">
              Evaluators participated
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Total Evaluations</p>
              <ClipboardCheck className="size-4 text-muted-foreground" />
            </div>

            <div className="text-3xl font-bold">{totalEvaluations}</div>

            <p className="text-xs text-muted-foreground">
              Completed assessments
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Evaluators Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Evaluator Breakdown</CardTitle>
          <CardDescription>
            Individual evaluator scores and completed assessments
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {data.evaluators.length === 0 ? (
            <div className="py-8 text-center text-sm text-muted-foreground">
              No evaluators found.
            </div>
          ) : (
            data.evaluators.map((evaluator) => (
              <div
                key={evaluator.evaluator_id}
                className="rounded-lg border p-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>
                        <UserRound className="size-5" />
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <p className="font-medium">
                        {evaluator.evaluator_username}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {evaluator.total_evaluations} evaluations completed
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-xl font-semibold">
                      {evaluator.average_percentage}%
                    </p>
                    {getScoreBadge(evaluator.average_percentage)}
                  </div>
                </div>

                <Progress
                  value={evaluator.average_percentage}
                  className="mt-4 h-2"
                />
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
