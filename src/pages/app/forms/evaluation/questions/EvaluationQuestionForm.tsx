import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { useCreateEvaluationQuestion } from "@/hooks/forms/useCreateEvaluationQuestion";
import { useUpdateEvaluationQuestion } from "@/hooks/forms/useUpdateEvaluationQuestion";
import type {
  EvaluationQuestion,
  EvaluationQuestionPayload,
} from "@/@types/forms";
import { getErrorMessage } from "@/utils/axios-helpers";

interface EvaluationQuestionFormProps {
  question?: EvaluationQuestion;
  onLoadingChange?: (loading: boolean) => void;
  onSuccess?: () => void;
}

const EvaluationQuestionForm = ({
  question,
  onLoadingChange,
  onSuccess: closeModal,
}: EvaluationQuestionFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EvaluationQuestionPayload>();

  const { mutate: createUser, isPending: isCreating } =
    useCreateEvaluationQuestion();

  const { mutate: updateUser, isPending: isUpdating } =
    useUpdateEvaluationQuestion();

  // Loading states when creating or updating evaluation question
  const isPending = isCreating || isUpdating;

  useEffect(() => {
    onLoadingChange?.(isPending);
  }, [isPending, onLoadingChange]);

  // Auto fill data when updating evaluation question
  useEffect(() => {
    if (question) {
      reset({
        name: question.name,
        description: question.description,
      });
    }
  }, [question, reset]);

  const onSubmit = (data: EvaluationQuestionPayload) => {
    const payload = {
      name: data.name,
      description: data.description,
    };

    if (question) {
      updateUser(
        {
          id: question.id,
          payload,
        },
        {
          onSuccess: (res) => {
            toast.success(res?.message || "Question updated");
            closeModal?.();
          },
          onError: (err) => {
            toast.error(getErrorMessage(err));
          },
        },
      );
    } else {
      createUser(payload, {
        onSuccess: (res) => {
          toast.success(res?.message || "Question added");
          reset();
          closeModal?.();
        },
        onError: (err) => {
          toast.error(getErrorMessage(err));
        },
      });
    }
  };

  return (
    <form id="evaluation-question-form" onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <Field>
          <FieldLabel>Question</FieldLabel>
          <Input
            {...register("name", {
              required: "Name is required",
            })}
            placeholder="E.g. Candidate's appearance"
          />
          {errors.name && <FieldError>{errors.name.message}</FieldError>}
        </Field>

        <Field>
          <FieldLabel>Description</FieldLabel>
          <Textarea {...register("description")} placeholder="Description" />
        </Field>
      </FieldGroup>
    </form>
  );
};

export default EvaluationQuestionForm;
