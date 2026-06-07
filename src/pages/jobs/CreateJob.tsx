import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
        <CardTitle className="text-xl">Create New Job</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <StepWizard
          steps={[
            {
              // title: "Basic",
              content: ({ next }) => (
                <div className="space-y-6">
                  <div className="space-y-1">
                    <h2 className="font-heading text-base leading-normal font-semibold">
                      Basic Information
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Please add the basic information for the job.
                    </p>
                  </div>

                  <BasicInfoForm
                    onSuccess={(id) => {
                      setJobId(id);
                      next();
                    }}
                  />
                </div>
              ),
            },
            {
              // title: "Education",
              content: ({ next }) => (
                <div className="space-y-6">
                  <div className="space-y-1">
                    <h2 className="font-heading text-base leading-normal font-semibold">
                      Education Requirements
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Please add the education requirements for the job.
                    </p>
                  </div>
                  <EducationForm jobId={jobId!} onSuccess={next} />
                </div>
              ),
            },
            {
              // title: "Language",
              content: ({ next }) => (
                <LanguageForm jobId={jobId!} onSuccess={next} />
              ),
            },
            {
              // title: "Requirements",
              content: ({ next }) => (
                <RequirementsForm jobId={jobId!} onSuccess={next} />
              ),
            },
            {
              // title: "Duties",
              content: ({ next }) => (
                <MainDutiesForm jobId={jobId!} onSuccess={next} />
              ),
            },
            {
              // title: "Reporting",
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
