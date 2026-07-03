import type { BuilderState } from "../types/builder.types";

import type { CreateFormDto } from "@/@types/forms";

export function toCreateFormDto(state: BuilderState): CreateFormDto {
  return {
    title: state.title,

    description: state.description,

    questions: state.questionOrder.map((questionId, questionIndex) => {
      const question = state.questions[questionId];

      return {
        title: question.title,

        description: question.description,

        type: question.type,

        required: question.required,

        order: questionIndex,

        options: question.options.map((option, optionIndex) => ({
          value: option.value,
          order: optionIndex,
        })),
      };
    }),
  };
}
