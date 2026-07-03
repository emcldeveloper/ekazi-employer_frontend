import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

import { MoreHorizontal } from "lucide-react";

import type { Form } from "@/@types/forms";
import { useDeleteForm } from "@/hooks/forms";
import { DeleteFormDialog } from "./DeleteFormDialog";

interface Props {
  form: Form;
}

export function FormActions({ form }: Props) {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const deleteMutation = useDeleteForm();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => navigate(`/forms/${form.id}/edit`)}>
            Edit
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => navigate(`/forms/${form.id}/preview`)}
          >
            View
          </DropdownMenuItem>

          <DropdownMenuItem
            className="text-red-500"
            onClick={() => setOpen(true)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteFormDialog
        open={open}
        loading={deleteMutation.isPending}
        onClose={() => setOpen(false)}
        onDelete={() =>
          deleteMutation.mutate(form.id, {
            onSuccess() {
              setOpen(false);
            },
          })
        }
      />
    </>
  );
}
