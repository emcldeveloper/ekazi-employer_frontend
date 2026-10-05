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

import type { QuestionCriteria, QuestionCriteriaPayload } from "@/@types/forms";
import { getErrorMessage } from "@/utils/axios-helpers";
import {
  useCreateQuestionCriteria,
  useUpdateQuestionCriteria,
} from "@/hooks/forms";

interface QuestionCriteriaFormProps {
  questionId: number;
  criteria?: QuestionCriteria;
  onLoadingChange?: (loading: boolean) => void;
  onSuccess?: () => void;
}

const QuestionCriteriaForm = ({
  questionId,
  criteria,
  onLoadingChange,
  onSuccess: closeModal,
}: QuestionCriteriaFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<QuestionCriteriaPayload>();

  const { mutate: createUser, isPending: isCreating } =
    useCreateQuestionCriteria();

  const { mutate: updateCriteria, isPending: isUpdating } =
    useUpdateQuestionCriteria();

  // Loading states when creating or updating question criteria
  const isPending = isCreating || isUpdating;

  useEffect(() => {
    onLoadingChange?.(isPending);
  }, [isPending, onLoadingChange]);

  // Auto fill data when updating question criteria
  useEffect(() => {
    if (criteria) {
      reset({
        evaluation_id: criteria.evaluation_id,
        name: criteria.name,
      });
    }
  }, [criteria, reset]);

  const onSubmit = (data: QuestionCriteriaPayload) => {
    const payload = {
      evaluation_id: questionId,
      name: data.name,
    };

    if (criteria) {
      updateCriteria(
        {
          id: criteria.id,
          payload,
        },
        {
          onSuccess: (res) => {
            toast.success(res?.message || "Criteria updated");
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
          toast.success(res?.message || "Criteria added");
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
    <form id="question-criteria-form" onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <Field>
          <FieldLabel>Criteria</FieldLabel>
          <Input
            {...register("name", {
              required: "Criteria is required",
            })}
            placeholder="E.g. Candidate's body language"
          />
          {errors.name && <FieldError>{errors.name.message}</FieldError>}
        </Field>
      </FieldGroup>
    </form>
  );
};

export default QuestionCriteriaForm;
