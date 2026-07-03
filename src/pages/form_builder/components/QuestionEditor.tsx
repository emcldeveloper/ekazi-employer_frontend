import { Copy, Trash2 } from "lucide-react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";

import { useBuilder } from "../hooks/useBuilder";

import { QuestionTypeSelect } from "./QuestionTypeSelect";
import { QuestionOptions } from "./QuestionOptions";
import { QuestionPreview } from "./QuestionPreview";

interface Props {
  id: string;
}

export function QuestionEditor({ id }: Props) {
  const question = useBuilder((state) => state.questions[id]);

  const patchQuestion = useBuilder((state) => state.patchQuestion);

  const duplicateQuestion = useBuilder((state) => state.duplicateQuestion);

  const deleteQuestion = useBuilder((state) => state.deleteQuestion);

  if (!question) return null;

  const optionQuestion =
    question.type === "SELECT" ||
    question.type === "CHECKBOX" ||
    question.type === "RADIO";

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Question</h2>

          <p className="text-muted-foreground">
            Configure the selected question.
          </p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={() => duplicateQuestion(id)}>
            <Copy size={16} />
            Duplicate
          </Button>

          <Button variant="destructive" onClick={() => deleteQuestion(id)}>
            <Trash2 size={16} />
            Delete
          </Button>
        </div>
      </div>

      {/* Main */}

      <Card className="space-y-6 p-6">
        <div className="space-y-2">
          <Label>Question Title</Label>

          <Input
            value={question.title}
            placeholder="Enter question..."
            onChange={(e) =>
              patchQuestion(id, {
                title: e.target.value,
              })
            }
          />
        </div>

        <div className="space-y-2">
          <Label>Description</Label>

          <Textarea
            rows={3}
            value={question.description}
            placeholder="Optional description..."
            onChange={(e) =>
              patchQuestion(id, {
                description: e.target.value,
              })
            }
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Question Type</Label>

            <QuestionTypeSelect
              value={question.type}
              onChange={(type: any) =>
                patchQuestion(id, {
                  type,
                })
              }
            />
          </div>

          <div className="flex items-end">
            <div className="flex items-center space-x-3">
              <Switch
                checked={question.required}
                onCheckedChange={(checked) =>
                  patchQuestion(id, {
                    required: checked,
                  })
                }
              />

              <Label>Required</Label>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Placeholder</Label>

          <Input
            value={question.placeholder}
            placeholder="Enter placeholder..."
            onChange={(e) =>
              patchQuestion(id, {
                placeholder: e.target.value,
              })
            }
          />
        </div>

        <div className="space-y-2">
          <Label>Help Text</Label>

          <Textarea
            rows={2}
            value={question.helpText}
            placeholder="Optional help text..."
            onChange={(e) =>
              patchQuestion(id, {
                helpText: e.target.value,
              })
            }
          />
        </div>

        {optionQuestion && <QuestionOptions questionId={id} />}
      </Card>

      <QuestionPreview questionId={id} />
    </div>
  );
}
