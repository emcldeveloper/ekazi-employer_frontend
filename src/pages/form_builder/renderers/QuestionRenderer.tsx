import { Label } from "@/components/ui/label";

import type { Question } from "@/@types/forms";

import { QUESTION_RENDERERS } from "./renderer-map";

interface Props {
  question: Question;

  index: number;

  readonly?: boolean;
}

export function QuestionRenderer({ question, index, readonly = true }: Props) {
  const Renderer = QUESTION_RENDERERS[question.type];

  return (
    <div>
      <div className="mb-6">
        <Label className="text-lg font-semibold leading-7">
          {index + 1}. {question.title}
          {question.required && <span className="ml-1 text-red-500">*</span>}
        </Label>

        {question.description && (
          <p className="mt-2 text-sm text-muted-foreground">
            {question.description}
          </p>
        )}
      </div>

      <Renderer question={question} readonly={readonly} />
    </div>
  );
}
