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
import CandidateDetails from "./CandidateDetails";
import type { PotentialCandidate } from "@/@types/potential-candidates";
import ShortlistCandidate from "./ShortlistCandidate";

interface ViewCandidateProps {
  jobId: number;
  candidate: PotentialCandidate;
}

const ViewCandidate = ({ jobId, candidate }: ViewCandidateProps) => {
  const isMobile = useIsMobile();

  return (
    <>
      {isMobile ? (
        // For mobile devices
        <Drawer>
          <DrawerTrigger asChild>
            <Button size="xs">View</Button>
          </DrawerTrigger>

          <DrawerContent>
            <VisuallyHidden>
              <DrawerHeader>
                <DrawerTitle />
                <DrawerDescription />
              </DrawerHeader>
            </VisuallyHidden>

            <div className="flex-1 scroll-fade overflow-y-auto p-4">
              <CandidateDetails candidate={candidate} />
            </div>

            <DrawerFooter>
              <ShortlistCandidate
                jobId={jobId}
                applicantId={candidate.applicant_id}
              />
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ) : (
        // For large screen devices
        <Sheet>
          <SheetTrigger asChild>
            <Button size="xs">View</Button>
          </SheetTrigger>

          <SheetContent className="sm:max-w-3xl!">
            <VisuallyHidden>
              <SheetHeader>
                <SheetTitle />
                <SheetDescription />
              </SheetHeader>
            </VisuallyHidden>

            <div className="scrollbar overflow-y-auto px-4 pb-8">
              <CandidateDetails candidate={candidate} />
            </div>

            <SheetFooter>
              <div>
                <ShortlistCandidate
                  jobId={jobId}
                  applicantId={candidate.applicant_id}
                />
              </div>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      )}
    </>
  );
};

export default ViewCandidate;
