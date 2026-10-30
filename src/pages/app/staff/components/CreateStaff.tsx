import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

import { useIsMobile } from "@/hooks/use-mobile";
import { PlusIcon } from "lucide-react";
import StaffForm from "./StaffForm";
import { useState } from "react";

const CreateStaff = () => {
  const isMobile = useIsMobile();

  const [isSubmitting, setIsSubmitting] = useState(false);

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
              <StaffForm onLoadingChange={setIsSubmitting} />
            </div>

            <DrawerFooter>
              <Button type="submit" form="staff-form" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create"}
              </Button>
            </DrawerFooter>
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
              <StaffForm onLoadingChange={setIsSubmitting} />
            </div>

            <SheetFooter>
              <div>
                <Button type="submit" form="staff-form" disabled={isSubmitting}>
                  {isSubmitting ? "Creating..." : "Create"}
                </Button>
              </div>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      )}
    </>
  );
};

export default CreateStaff;
