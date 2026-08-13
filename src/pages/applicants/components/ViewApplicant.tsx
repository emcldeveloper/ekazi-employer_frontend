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
import JobseekerDetails from "@/pages/jobseekers/components/JobseekerDetails";
import ShortlistJobseeker from "@/pages/jobseekers/components/ShortlistJobseeker";
import CollectJobseeker from "@/pages/jobseekers/components/CollectJobseeker";

interface ViewJobseekerProps {
  applicantId: number;
}

const ViewApplicant = ({ applicantId }: ViewJobseekerProps) => {
  const isMobile = useIsMobile();

  return (
    <>
      {isMobile ? (
        // For mobile devices
        <Drawer>
          <DrawerTrigger>
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
              <JobseekerDetails jobseekerId={applicantId} />
            </div>

            <DrawerFooter>
              <div className="flex items-center gap-2">
                <ShortlistJobseeker jobseekerId={applicantId} />
                <CollectJobseeker />
              </div>
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

            <div className="scrollbar overflow-y-auto px-4">
              <JobseekerDetails jobseekerId={applicantId} />
            </div>

            <SheetFooter>
              <div className="flex items-center gap-4">
                <ShortlistJobseeker jobseekerId={applicantId} />
                <CollectJobseeker />
              </div>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      )}
    </>
  );
};

export default ViewApplicant;
