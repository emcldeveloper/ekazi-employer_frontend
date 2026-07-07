import { Plus, Search } from "lucide-react";
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

import { Button } from "@/components/ui/button";
import { Eye, Trash2 } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import { useForms } from "@/hooks/forms";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { StatusBadge } from "./components/StatusBadge";

export default function FormsPage() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const { data: forms = [], isLoading } = useForms();

  return (
    <div className="mt-4 space-y-4">
      <div>
        <h2 className="text-2xl font-bold">Forms Management</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage interviews, questionnaires and screening tests.
        </p>
      </div>

      <Card>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              {/* Search */}
              <InputGroup className="max-w-md">
                <InputGroupInput
                  placeholder="Search form..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
                <InputGroupAddon>
                  <Search />
                </InputGroupAddon>
              </InputGroup>

              <Button onClick={() => navigate("/forms/create")}>
                <Plus size={16} />
                Create Form
              </Button>
            </div>

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
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-40">
                      <div className="flex items-center justify-center">
                        <Spinner className="size-6" />
                      </div>
                    </TableCell>
                  </TableRow>
                ) : forms.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="h-20 text-center text-muted-foreground"
                    >
                      No forms found
                    </TableCell>
                  </TableRow>
                ) : (
                  forms.map((form) => (
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
                            onClick={() =>
                              navigate(`/forms/${form.id}/preview`)
                            }
                            className="rounded-full"
                          >
                            <Eye size={16} /> View
                          </Button>

                          <Button
                            size="xs"
                            variant="destructive"
                            onClick={() =>
                              navigate(`/forms/${form.id}/preview`)
                            }
                            className="rounded-full"
                          >
                            <Trash2 size={16} /> Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
