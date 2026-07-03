import { FormHeader } from "./FormHeader";
import { Sidebar } from "./Sidebar";
import { Toolbar } from "./Toolbar";
import { Editor } from "./Editor";

export function Builder() {
  return (
    <div className="space-y-6">
      <Toolbar />

      <FormHeader />

      <div className="flex h-[calc(100vh-260px)] overflow-hidden rounded-xl border bg-background">
        <Sidebar />

        <Editor />
      </div>
    </div>
  );
}
