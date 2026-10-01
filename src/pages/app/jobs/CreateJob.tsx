import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

import { useIsMobile } from "@/hooks/use-mobile";
import BasicInfoForm from "./forms/BasicInfoForm";
import { useState } from "react";
import ReportingForm from "./forms/ReportingForm";
import EducationForm from "./forms/EducationForm";
import LanguageForm from "./forms/LanguageForm";
import RequirementsForm from "./forms/RequirementsForm";
import MainDutiesForm from "./forms/MainDutiesForm";
import OtherRequirementsForm from "./forms/OtherRequirementsForm";
import { Loader } from "lucide-react";
import MetaForm from "./forms/MetaForm";

type CreateJobStep =
  | "basic"
  | "meta"
  | "reporting"
  | "education"
  | "language"
  | "requirements"
  | "main-duties"
  | "other-requirements"
  | "meta";

const CreateJob = () => {
  const isMobile = useIsMobile();

  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<CreateJobStep>("basic");
  const [jobId, setJobId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getFormId = () => {
    switch (step) {
      case "basic":
        return "basic-info-form";

      case "meta":
        return "meta-form";

      case "reporting":
        return "reporting-form";

      case "education":
        return "education-form";

      case "language":
        return "language-form";

      case "requirements":
        return "requirements-form";

      case "main-duties":
        return "main-duties-form";

      case "other-requirements":
        return "other-requirements-form";

      default:
        return undefined;
    }
  };

  // const isFirstStep = step === "basic";
  const isLastStep = step === "other-requirements";

  const handleJobCreated = (createdJobId: number) => {
    setJobId(createdJobId);
    setStep("meta");
  };

  const handleNext = () => {
    setStep("reporting");
  };

  const handleBack = () => {
    switch (step) {
      case "meta":
        setStep("basic");
        break;

      case "reporting":
        setStep("meta");
        break;

      case "education":
        setStep("reporting");
        break;

      case "language":
        setStep("education");
        break;

      case "requirements":
        setStep("language");
        break;

      case "main-duties":
        setStep("requirements");
        break;

      case "other-requirements":
        setStep("main-duties");
        break;
    }
  };

  const description = (
    <span className="font-medium">
      {step === "basic" && "Basic Information"}
      {step === "meta" && "Metadata Details"}
      {step === "reporting" && "Reporting Structure"}
      {step === "education" && "Education Details"}
      {step === "language" && "Language Details"}
      {step === "requirements" && "Requirements"}
      {step === "main-duties" && "Main Duties"}
      {step === "other-requirements" && "Other Requirements"}
    </span>
  );

  const content = (
    <>
      {step === "basic" && (
        <BasicInfoForm
          onSuccess={handleJobCreated}
          onLoadingChange={setIsSubmitting}
        />
      )}

      {step === "meta" && jobId && (
        <MetaForm
          createdJobId={jobId}
          onSuccess={handleNext}
          onBack={handleBack}
          onLoadingChange={setIsSubmitting}
        />
      )}

      {step === "reporting" && jobId && (
        <ReportingForm
          createdJobId={jobId}
          onSuccess={() => setStep("education")}
          onBack={handleBack}
          onLoadingChange={setIsSubmitting}
        />
      )}

      {step === "education" && jobId && (
        <EducationForm
          jobId={jobId}
          onSuccess={() => setStep("language")}
          onBack={() => setStep("education")}
          onLoadingChange={setIsSubmitting}
        />
      )}

      {step === "language" && jobId && (
        <LanguageForm
          jobId={jobId}
          onSuccess={() => setStep("requirements")}
          onBack={() => setStep("education")}
          onLoadingChange={setIsSubmitting}
        />
      )}

      {step === "requirements" && jobId && (
        <RequirementsForm
          createdJobId={jobId}
          onSuccess={() => setStep("main-duties")}
          onBack={() => setStep("language")}
          onLoadingChange={setIsSubmitting}
        />
      )}

      {step === "main-duties" && jobId && (
        <MainDutiesForm
          createdJobId={jobId}
          onSuccess={() => setStep("other-requirements")}
          onBack={() => setStep("requirements")}
          onLoadingChange={setIsSubmitting}
        />
      )}

      {step === "other-requirements" && jobId && (
        <OtherRequirementsForm
          createdJobId={jobId}
          onBack={() => setStep("main-duties")}
          onComplete={() => setOpen(false)}
          onLoadingChange={setIsSubmitting}
        />
      )}
    </>
  );

  return (
    <>
      {isMobile ? (
        // For mobile devices
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button>Create Job</Button>
          </DrawerTrigger>

          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Create New Job</DrawerTitle>
              <DrawerDescription>{description}</DrawerDescription>
            </DrawerHeader>

            <div className="flex-1 scroll-fade overflow-y-auto p-4 h-full">
              {content}
            </div>

            <DrawerFooter>
              <div className="flex items-center justify-between">
                {/* <Button
                  type="button"
                  variant="outline"
                  disabled={isFirstStep}
                  onClick={handleBack}
                >
                  Back
                </Button> */}

                {!isLastStep && (
                  <Button type="submit" form={getFormId()}>
                    {isSubmitting ? (
                      <>
                        <Loader className="animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save"
                    )}
                  </Button>
                )}

                {isLastStep && (
                  <Button type="submit" form={getFormId()}>
                    {isSubmitting ? (
                      <>
                        <Loader className="animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save"
                    )}
                  </Button>
                )}
              </div>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ) : (
        // For large screen devices
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button>Create Job</Button>
          </SheetTrigger>

          <SheetContent className="sm:max-w-3xl!">
            <SheetHeader>
              <SheetTitle>Create New Job</SheetTitle>
              <SheetDescription>{description}</SheetDescription>
            </SheetHeader>

            <div className="scrollbar overflow-y-auto h-full px-8 pb-8 pt-1">
              {content}
            </div>

            <SheetFooter>
              <div className="flex items-center justify-between">
                {/* <Button
                  type="button"
                  variant="outline"
                  disabled={isFirstStep || isSubmitting}
                  onClick={handleBack}
                >
                  Back
                </Button> */}

                {!isLastStep && (
                  <Button
                    type="submit"
                    form={getFormId()}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader className="animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save"
                    )}
                  </Button>
                )}

                {isLastStep && (
                  <Button
                    type="submit"
                    form={getFormId()}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader className="animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Finish"
                    )}
                  </Button>
                )}
              </div>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      )}
    </>
  );
};

export default CreateJob;
