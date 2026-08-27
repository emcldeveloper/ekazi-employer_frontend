import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

import { useIsMobile } from "@/hooks/use-mobile";
import BasicInfoForm from "./forms/BasicInfoForm";

const CreateJob = () => {
  const isMobile = useIsMobile();

  return (
    <>
      {isMobile ? (
        // For mobile devices
        <Drawer>
          <DrawerTrigger asChild>
            <Button>Create Job</Button>
          </DrawerTrigger>

          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Create New Job</DrawerTitle>
            </DrawerHeader>

            <div className="flex-1 scroll-fade overflow-y-auto p-4">
              <BasicInfoForm />
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
        // For large screen devices
        <Sheet>
          <SheetTrigger asChild>
            <Button>Create Job</Button>
          </SheetTrigger>

          <SheetContent className="sm:max-w-3xl!">
            <SheetHeader>
              <SheetTitle>Create New Job</SheetTitle>
            </SheetHeader>

            <div className="scrollbar overflow-y-auto px-4 pb-8">
              <BasicInfoForm />
            </div>
          </SheetContent>
        </Sheet>
      )}
    </>
  );
};

export default CreateJob;
