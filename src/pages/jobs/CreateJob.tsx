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
  );
};

export default CreateJob;
