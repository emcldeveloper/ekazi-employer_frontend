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
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import { useIsMobile } from "@/hooks/use-mobile";
import type { Application } from "@/@types/applications";
import ApplicationDetails from "./ApplicationDetails";
import ShortlistCandidate from "@/pages/app/jobs/actions/ShortlistCandidate";
import EvaluateCandidate from "../evaluation/EvaluateCandidate";
import ScreenCandidate from "../actions/ScreenCandidate";
import InterviewCandidate from "../actions/InterviewCandidate";
import SelectCandidate from "../actions/SelectCandidate";
import BackgroundCheckCandidate from "../actions/BackgroundCheckCandidate";
import OfferCandidate from "../actions/OfferCandidate";
import EmployCandidate from "../actions/EmployCandidate";

interface ViewApplicationProps {
  application: Application;
}

const ViewApplication = ({ application }: ViewApplicationProps) => {
  const isMobile = useIsMobile();

  const jobId = application?.job_id;
  const applicantId = application.applicant_id;
  const jobStage = application?.stage?.id;

  return (
    <>
      {isMobile ? (
        // For mobile devices
        <Drawer>
          <DrawerTrigger asChild>
            <Button size="xs" variant="secondary">
              View
            </Button>
          </DrawerTrigger>

          <DrawerContent>
            <VisuallyHidden>
              <DrawerHeader>
                <DrawerTitle />
                <DrawerDescription />
              </DrawerHeader>
            </VisuallyHidden>

            <div className="flex-1 scroll-fade overflow-y-auto p-4">
              <ApplicationDetails application={application} />
            </div>

            <DrawerFooter>
              {jobStage === 1 && (
                <ShortlistCandidate jobId={jobId} applicantId={applicantId} />
              )}

              {jobStage === 2 && (
                <ShortlistCandidate jobId={jobId} applicantId={applicantId} />
              )}

              {jobStage === 4 && (
                <EvaluateCandidate applicantId={applicantId} jobId={jobId} />
              )}
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ) : (
        // For large screen devices
        <Sheet>
          <SheetTrigger asChild>
            <Button size="xs" variant="link">
              View
            </Button>
          </SheetTrigger>

          <SheetContent className="sm:max-w-3xl!">
            <VisuallyHidden>
              <SheetHeader>
                <SheetTitle />
                <SheetDescription />
              </SheetHeader>
            </VisuallyHidden>

            <div className="scrollbar overflow-y-auto px-4 py-8">
              <ApplicationDetails application={application} />
            </div>

            <SheetFooter>
              <div>
                {/* applied */}
                {jobStage === 1 && (
                  <ShortlistCandidate jobId={jobId} applicantId={applicantId} />
                )}

                {/* shortlisted */}
                {jobStage === 2 && (
                  <ScreenCandidate jobId={jobId} applicantId={applicantId} />
                )}

                {/* screening */}
                {jobStage === 3 && (
                  <InterviewCandidate applicantId={applicantId} jobId={jobId} />
                )}

                {/* interview */}
                {jobStage === 4 && (
                  <div className="flex items-center gap-2">
                    <SelectCandidate applicantId={applicantId} jobId={jobId} />
                    <EvaluateCandidate
                      applicantId={applicantId}
                      jobId={jobId}
                    />
                  </div>
                )}

                {/* selection */}
                {jobStage === 5 && (
                  <BackgroundCheckCandidate
                    applicantId={applicantId}
                    jobId={jobId}
                  />
                )}

                {/* background check */}
                {jobStage === 6 && (
                  <OfferCandidate applicantId={applicantId} jobId={jobId} />
                )}

                {/* offer */}
                {jobStage === 93 && (
                  <EmployCandidate applicantId={applicantId} jobId={jobId} />
                )}
              </div>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      )}
    </>
  );
};

export default ViewApplication;
