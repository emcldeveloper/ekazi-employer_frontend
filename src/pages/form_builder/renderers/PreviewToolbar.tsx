import { ArrowLeft, Download, Pencil } from "lucide-react";

import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";

interface Props {
  formId: string;
}

export function PreviewToolbar({ formId }: Props) {
  const navigate = useNavigate();

  return (
    <div className="sticky top-0 z-20 flex items-center justify-between rounded-lg border bg-background p-4">
      <Button variant="ghost" onClick={() => navigate("/forms")}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={() => navigate(`/forms/${formId}/edit`)}
        >
          <Pencil className="mr-2 h-4 w-4" />
          Edit
        </Button>

        <Button
          onClick={() => {
            // PDF download next phase
          }}
        >
          <Download className="mr-2 h-4 w-4" />
          Download PDF
        </Button>
      </div>
    </div>
  );
}
