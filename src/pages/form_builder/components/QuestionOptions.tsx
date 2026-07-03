import { Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import { useBuilder } from "../hooks/useBuilder";

interface Props {
  questionId: string;
}

export function QuestionOptions({ questionId }: Props) {
  const question = useBuilder((state) => state.questions[questionId]);

  const addOption = useBuilder((state) => state.addOption);

  const patchOption = useBuilder((state) => state.patchOption);

  const removeOption = useBuilder((state) => state.removeOption);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>Options</Label>

        <Button
          size="sm"
          variant="outline"
          onClick={() => addOption(questionId)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add
        </Button>
      </div>

      {question.options.map((option) => (
        <div key={option.id} className="flex gap-2">
          <Input
            value={option.value}
            placeholder="Option"
            onChange={(e) =>
              patchOption(questionId, option.id, {
                value: e.target.value,
              })
            }
          />

          <Button
            size="icon"
            variant="ghost"
            onClick={() => removeOption(questionId, option.id)}
          >
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      ))}
    </div>
  );
}
