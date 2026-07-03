import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

import { useBuilder } from "../hooks/useBuilder";
import { QuestionCard } from "./QuestionCard";

export function Sidebar() {
  const order = useBuilder((state) => state.questionOrder);

  const addQuestion = useBuilder((state) => state.addQuestion);

  return (
    <div className="flex w-80 flex-col border-r">
      <div className="border-b p-4">
        <Button className="w-full" onClick={() => addQuestion()}>
          <Plus className="mr-2 h-4 w-4" />
          Add Question
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="space-y-2 p-4">
          {order.map((id) => (
            <QuestionCard key={id} id={id} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
