import type { Form } from "@/@types/forms";

import { QuestionRenderer } from "./QuestionRenderer";

import { Card, CardContent } from "@/components/ui/card";

interface Props {
  form: Form;

  readonly?: boolean;
}

export function FormRenderer({ form, readonly = true }: Props) {
  return (
    <div className="mx-auto max-w-5xl space-y-8">
      {/* Form Header */}

      <Card className="p-8">
        <div className="space-y-3">
          <h1 className="text-3xl font-bold">{form.title}</h1>

          {form.description && (
            <p className="text-muted-foreground">{form.description}</p>
          )}
        </div>

        <CardContent>
          {/* Questions */}

          <div className="space-y-6">
            {[...form.questions]
              .sort((a, b) => a.order - b.order)
              .map((question, index) => (
                <QuestionRenderer
                  key={question.id}
                  question={question}
                  index={index}
                  readonly={readonly}
                />
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
