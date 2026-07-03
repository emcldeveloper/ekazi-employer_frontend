import type { BuilderQuestion, QuestionType } from "../types/builder.types";

export function createQuestion(type: QuestionType = "TEXT"): BuilderQuestion {
  return {
    id: crypto.randomUUID(),

    title: "",

    description: "",

    type,

    required: false,

    options:
      type === "SELECT" || type === "RADIO" || type === "CHECKBOX"
        ? [
            {
              id: crypto.randomUUID(),
              value: "Option 1",
            },
          ]
        : [],
  };
}
