import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Evaluation from "./evaluation/Evaluation";

const FormsPage = () => {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold">Forms Management</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Create, customize, and manage forms with tailored questions for
          candidate
        </p>
      </div>

      <Tabs defaultValue="evaluation">
        <TabsList variant="line">
          <TabsTrigger value="evaluation">Evaluation</TabsTrigger>
          <TabsTrigger value="screening">Screening</TabsTrigger>
        </TabsList>

        <TabsContent value="evaluation">
          <Evaluation />
        </TabsContent>
        <TabsContent value="screening">2</TabsContent>
      </Tabs>
    </div>
  );
};

export default FormsPage;
