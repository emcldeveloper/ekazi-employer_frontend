import { Loader } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useEvaluationQuestion } from "@/hooks/forms";
import CreateQuestionCriteria from "../criterias/CreateQuestionCriteria";
import UpdateQuestionCriteria from "../criterias/UpdateQuestionCriteria";
import type { QuestionCriteria } from "@/@types/forms";
import { DeleteQuestionCriteria } from "../criterias/DeleteQuestionCriteria";

interface EvaluationQuestionDetailsProps {
  questionId: number;
}

const EvaluationQuestionDetails = ({
  questionId,
}: EvaluationQuestionDetailsProps) => {
  const { data: question, isLoading } = useEvaluationQuestion(questionId);

  console.log(question);

  if (isLoading) {
    return (
      <>
        <Loader className="animate-spin" />
      </>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text- grid grid-cols-[120px_1fr] gap-y-3">
        <p className="text-sm text-muted-foreground">Question:</p>
        <p className="font-medium">{question.name}</p>

        <p className="text-sm text-muted-foreground">Description:</p>
        <p className="font-medium">{question.description}</p>
      </div>

      <Card size="sm">
        <CardHeader>
          <CardTitle>Criterias</CardTitle>
          <CardDescription>
            Define the criteria used to evaluate candidate responses.
          </CardDescription>
          <CardAction>
            <CreateQuestionCriteria questionId={questionId} />
          </CardAction>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Criteria</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={2} className="h-40">
                    <div className="flex items-center justify-center">
                      <Loader className="animate-spin" />
                    </div>
                  </TableCell>
                </TableRow>
              ) : question?.criteria?.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={2}
                    className="h-20 text-center text-muted-foreground"
                  >
                    No criterias found
                  </TableCell>
                </TableRow>
              ) : (
                question?.criteria?.map((criteria: QuestionCriteria) => (
                  <TableRow key={criteria?.id}>
                    <TableCell>{criteria?.name}</TableCell>

                    <TableCell className="text-right">
                      <div>
                        <UpdateQuestionCriteria criteria={criteria} />
                        <DeleteQuestionCriteria criteriaId={criteria?.id} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default EvaluationQuestionDetails;
