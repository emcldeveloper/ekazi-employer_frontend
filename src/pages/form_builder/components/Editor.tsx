import { useBuilder } from "../hooks/useBuilder";

import { QuestionEditor } from "./QuestionEditor";

export function Editor() {
  const selected = useBuilder((state) => state.selectedQuestionId);

  if (!selected) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <h2 className="text-muted-foreground">Select or create a question</h2>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto p-8">
      <QuestionEditor id={selected} />
    </div>
  );
}
