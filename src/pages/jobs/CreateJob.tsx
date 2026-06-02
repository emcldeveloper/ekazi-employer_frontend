import { Card, CardContent, CardHeader } from "@/components/ui/card";
import BasicInfoForm from "./components/BasicInfoForm";
import StepWizard from "@/components/step-wizard";
import EducationForm from "./components/EducationForm";
import LanguageForm from "./components/LanguageForm";
import RequirementsForm from "./components/RequirementsForm";
import MainDutiesForm from "./components/MainDutiesForm";
import ReportingForm from "./components/ReportingForm";
import { useState } from "react";

const CreateJob = () => {
  const [jobId, setJobId] = useState<number | null>(null);

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold">Create New Job</h2>
            </div>

            <p className="leading-7 text-muted-foreground">
              Please add job information
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <StepWizard
          steps={[
            {
              title: "Basic",
              content: ({ next }) => (
                <BasicInfoForm
                  onSuccess={(id) => {
                    setJobId(id);
                    next();
                  }}
                />
              ),
            },
            {
              title: "Education",
              content: ({ next }) => (
                <EducationForm jobId={jobId!} onSuccess={next} />
              ),
            },
            {
              title: "Language",
              content: ({ next }) => (
                <LanguageForm jobId={jobId!} onSuccess={next} />
              ),
            },
            {
              title: "Requirements",
              content: ({ next }) => (
                <RequirementsForm jobId={jobId!} onSuccess={next} />
              ),
            },
            {
              title: "Duties",
              content: ({ next }) => (
                <MainDutiesForm jobId={jobId!} onSuccess={next} />
              ),
            },
            {
              title: "Reporting",
              content: ({ next }) => (
                <ReportingForm jobId={jobId!} onSuccess={next} />
              ),
            },
          ]}
        />
      </CardContent>
    </Card>
  );
};

export default CreateJob;
