import { Builder } from "./components/Builder";
import { Card, CardContent } from "@/components/ui/card";

export default function CreateFormPage() {
  return (
    <div className="my-4 space-y-4">
      <Card>
        <CardContent>
          <Builder />
        </CardContent>
      </Card>
    </div>
  );
}
