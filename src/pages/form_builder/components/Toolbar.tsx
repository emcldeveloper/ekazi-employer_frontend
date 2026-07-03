import { Save } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useCreateForm } from "@/hooks/forms";
import { useBuilder } from "../hooks/useBuilder";
import { toCreateFormDto } from "../utils/mapper";

export function Toolbar() {
  const createMutation = useCreateForm();

  const state = useBuilder();

  const save = () => {
    createMutation.mutate(toCreateFormDto(state));
  };

  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-semibold">Form Builder</h2>
      </div>

      <Button onClick={save} disabled={createMutation.isPending}>
        <Save size={16} />
        Save Form
      </Button>
    </div>
  );
}
