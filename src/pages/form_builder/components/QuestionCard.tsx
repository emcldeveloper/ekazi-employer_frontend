import { useBuilder } from "../hooks/useBuilder";

interface Props {
  id: string;
}

export function QuestionCard({ id }: Props) {
  const question = useBuilder((state) => state.questions[id]);

  const selected = useBuilder((state) => state.selectedQuestionId === id);

  const select = useBuilder((state) => state.selectQuestion);

  return (
    <button
      onClick={() => select(id)}
      className={`w-full rounded-lg border p-4 text-left transition

      ${selected ? "border-primary bg-primary/10" : ""}`}
    >
      <div className="font-medium">{question.title || "Untitled Question"}</div>

      <div className="mt-1 text-xs text-muted-foreground">{question.type}</div>
    </button>
  );
}
