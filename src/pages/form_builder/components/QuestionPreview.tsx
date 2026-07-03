import { CalendarIcon } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Label } from "@/components/ui/label";

import { useBuilder } from "../hooks/useBuilder";

interface Props {
  questionId: string;
}

export function QuestionPreview({ questionId }: Props) {
  const question = useBuilder((state) => state.questions[questionId]);

  if (!question) return null;

  return (
    <Card className="space-y-6 p-6">
      <div>
        <h3 className="font-semibold">Preview</h3>

        <p className="text-sm text-muted-foreground">
          This is how applicants will see this question.
        </p>
      </div>

      <div className="space-y-2">
        <Label>
          {question.title || "Untitled Question"}

          {question.required && <span className="ml-1 text-red-500">*</span>}
        </Label>

        {question.description && (
          <p className="text-sm text-muted-foreground">
            {question.description}
          </p>
        )}

        {renderField(question)}

        {question.helpText && (
          <p className="text-xs text-muted-foreground">{question.helpText}</p>
        )}
      </div>
    </Card>
  );
}

function renderField(question: any) {
  switch (question.type) {
    case "TEXT":
      return (
        <Input
          disabled
          placeholder={question.placeholder || "Short answer..."}
        />
      );

    case "TEXTAREA":
      return (
        <Textarea
          disabled
          rows={4}
          placeholder={question.placeholder || "Long answer..."}
        />
      );

    case "EMAIL":
      return (
        <Input
          disabled
          type="email"
          placeholder={question.placeholder || "example@email.com"}
        />
      );

    case "NUMBER":
      return (
        <Input
          disabled
          type="number"
          placeholder={question.placeholder || "0"}
        />
      );

    case "DATE":
      return (
        <div className="relative">
          <Input disabled type="date" />

          <CalendarIcon className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
        </div>
      );

    case "SELECT":
      return (
        <Select disabled>
          <SelectTrigger>
            <SelectValue placeholder="Select..." />
          </SelectTrigger>
        </Select>
      );

    case "CHECKBOX":
      return (
        <div className="space-y-2">
          {question.options.map((option: any) => (
            <div key={option.id} className="flex items-center gap-2">
              <Checkbox disabled />

              <Label>{option.value}</Label>
            </div>
          ))}
        </div>
      );

    case "RADIO":
      return (
        <RadioGroup>
          {question.options.map((option: any) => (
            <div key={option.id} className="flex items-center gap-2">
              <RadioGroupItem disabled value={option.id} />

              <Label>{option.value}</Label>
            </div>
          ))}
        </RadioGroup>
      );

    default:
      return null;
  }
}
