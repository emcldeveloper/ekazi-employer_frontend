import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import AddEvaluationQuestion from "./questions/AddEvaluationQuestion";
import UpdateEvaluationQuestion from "./questions/UpdateEvaluationQuestion";
import { DeleteEvaluationQuestion } from "./questions/DeleteEvaluationQuestion";
import { useEvaluationQuestions } from "@/hooks/forms/useEvaluationQuestions";
import { Loader, SearchIcon } from "lucide-react";
import type { EvaluationQuestion } from "@/@types/forms";
import { useRolePermissions } from "@/hooks/useRolePermissions";
import { PERMISSIONS } from "@/constants/role-permissions";
import ViewEvaluationQuestion from "./questions/ViewEvaluationQuestion";
import { DataPagination } from "@/components/data-pagination";
import { useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useDebounce } from "@/hooks/useDebounce";

const Evaluation = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(25);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 500);

  const { hasPermission } = useRolePermissions();

  const { data: questionsData, isLoading } = useEvaluationQuestions({
    search: debouncedSearch,
    page,
    limit: perPage,
  });
  const questions = questionsData?.data;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Evaluation Form Questions</CardTitle>
        <CardDescription>
          Manage questions used to evaluate candidates.
        </CardDescription>
        <CardAction>
          <AddEvaluationQuestion />
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <InputGroup className="max-w-md">
            <InputGroupInput
              placeholder="Search question..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />

            <InputGroupAddon>
              <SearchIcon size={16} />
            </InputGroupAddon>
          </InputGroup>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Question</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={3} className="h-40">
                  <div className="flex items-center justify-center">
                    <Loader className="animate-spin" />
                  </div>
                </TableCell>
              </TableRow>
            ) : questions.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-20 text-center text-muted-foreground"
                >
                  No questions found
                </TableCell>
              </TableRow>
            ) : (
              questions.map((question: EvaluationQuestion) => (
                <TableRow key={question?.id}>
                  <TableCell>{question.name}</TableCell>

                  <TableCell>{question.description}</TableCell>

                  <TableCell className="text-right">
                    <div>
                      <ViewEvaluationQuestion questionId={question.id} />

                      {hasPermission(
                        PERMISSIONS.UPDATE_EVALUATION_QUESTION,
                      ) && <UpdateEvaluationQuestion question={question} />}

                      {hasPermission(
                        PERMISSIONS.DELETE_EVALUATION_QUESTION,
                      ) && (
                        <DeleteEvaluationQuestion questionId={question.id} />
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {questions?.length > 0 && (
          <DataPagination
            page={questionsData?.page}
            perPage={questionsData?.limit}
            totalPages={questionsData?.totalPages}
            onPageChange={setPage}
            onPerPageChange={setPerPage}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default Evaluation;
