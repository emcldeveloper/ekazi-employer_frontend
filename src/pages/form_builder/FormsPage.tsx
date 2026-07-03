import { Plus, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { useForms } from "@/hooks/forms";
import { FormsTable } from "./components/FormsTable";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useState } from "react";

export default function FormsPage() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const { data: forms = [], isLoading } = useForms();

  return (
    <div className="mt-4 space-y-4">
      <Card size="sm">
        <CardContent>
          <h2 className="text-2xl font-bold">Forms Management</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage interviews, questionnaires and screening tests.
          </p>
        </CardContent>
      </Card>

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

            {isLoading ? (
              <Card>
                <CardContent className="space-y-4 p-6">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>
            ) : (
              <FormsTable forms={forms} />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
