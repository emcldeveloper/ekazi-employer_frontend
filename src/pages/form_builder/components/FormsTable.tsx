import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";

import type { Form } from "@/@types/forms";
import { StatusBadge } from "./StatusBadge";
import { Button } from "@/components/ui/button";
import { Eye, Trash2 } from "lucide-react";

interface Props {
  forms: Form[];
}

export function FormsTable({ forms }: Props) {
  const navigate = useNavigate();

  if (!forms.length) {
    return (
      <Card className="flex h-72 items-center justify-center">
        <div className="text-center space-y-2">
          <h3 className="font-semibold text-lg">No Forms Found</h3>

          <p className="text-muted-foreground">Create your first form.</p>
        </div>
      </Card>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>

          <TableHead>Status</TableHead>

          <TableHead>Questions</TableHead>

          <TableHead>Created</TableHead>

          <TableHead className="text-end">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {forms.map((form) => (
          <TableRow key={form.id}>
            <TableCell>
              <div>
                <div className="font-medium">{form.title}</div>

                <div className="text-sm text-muted-foreground">
                  {form.description}
                </div>
              </div>
            </TableCell>

            <TableCell>
              <StatusBadge status={form.status} />
            </TableCell>

            <TableCell>{form.questions.length}</TableCell>

            <TableCell>
              {format(new Date(form.createdAt), "dd MMM yyyy")}
            </TableCell>

            <TableCell className="text-end">
              <div className="flex items-center justify-end gap-2">
                <Button
                  size="xs"
                  variant="default"
                  onClick={() => navigate(`/forms/${form.id}/preview`)}
                  className="rounded-full"
                >
                  <Eye size={16} /> View
                </Button>

                <Button
                  size="xs"
                  variant="destructive"
                  onClick={() => navigate(`/forms/${form.id}/preview`)}
                  className="rounded-full"
                >
                  <Trash2 size={16} /> Delete
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
