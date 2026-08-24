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
import { PlusIcon } from "lucide-react";
import StaffForm from "./StaffForm";

const CreateStaff = () => {
  const isMobile = useIsMobile();

  return (
    <>
      {isMobile ? (
        // For mobile devices
        <Drawer>
          <DrawerTrigger asChild>
            <Button>
              <PlusIcon /> Add Staff
            </Button>
          </DrawerTrigger>

          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Add Staff</DrawerTitle>
            </DrawerHeader>

            <div className="flex-1 scroll-fade overflow-y-auto p-4">
              <StaffForm />
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
        // For large screen devices
        <Sheet>
          <SheetTrigger asChild>
            <Button>
              <PlusIcon /> Add Staff
            </Button>
          </SheetTrigger>

          <SheetContent className="sm:max-w-2xl!">
            <SheetHeader>
              <SheetTitle>Add Staff</SheetTitle>
            </SheetHeader>

            <div className="scrollbar overflow-y-auto px-4">
              <StaffForm />
            </div>
          </SheetContent>
        </Sheet>
      )}
    </>
  );
};

export default CreateStaff;
