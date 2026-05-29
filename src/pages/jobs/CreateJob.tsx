import { Building } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import BasicInfoForm from "./components/BasicInfoForm";

const CreateJob = () => {
  return (
    <Card>
      <CardContent className="space-y-4">
        {/* Basic Info */}
        <div className="flex justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Building className="size-5 text-primary" />
              <h2 className="text-lg font-semibold">Create New Job</h2>
            </div>

            <p className="leading-7 text-muted-foreground">
              Please add job basic information
            </p>
          </div>
        </div>

        <BasicInfoForm />
      </CardContent>
    </Card>
  );
};

export default CreateJob;
