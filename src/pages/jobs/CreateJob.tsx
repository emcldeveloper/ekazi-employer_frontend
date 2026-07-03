import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BasicInfoForm from "./components/BasicInfoForm";

const CreateJob = () => {
  return (
    <div className="mt-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Create New Job</CardTitle>
          <CardDescription>
            Provide all basic information required for this job below.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <BasicInfoForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateJob;
