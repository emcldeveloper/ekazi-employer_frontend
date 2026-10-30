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
import StaffForm from "./StaffForm";
import { PencilLine } from "lucide-react";
import type { ClientStaff } from "@/@types/staff";
import { useState } from "react";

interface UpdateStaffProps {
  staff: ClientStaff;
}

const UpdateStaff = ({ staff }: UpdateStaffProps) => {
  const isMobile = useIsMobile();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeactivating] = useState(false);

  return (
    <>
      {isMobile ? (
        // For mobile devices
        <Drawer>
          <DrawerTrigger asChild>
            <Button size="sm" variant="secondary">
              <PencilLine />
            </Button>
          </DrawerTrigger>

          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Edit User</DrawerTitle>
            </DrawerHeader>

            <div className="flex-1 scroll-fade overflow-y-auto p-4">
              <StaffForm staff={staff} onLoadingChange={setIsSubmitting} />
            </div>

            <DrawerFooter>
              <Button type="submit" form="staff-form" disabled={isSubmitting}>
                {isSubmitting ? "Updating..." : "Update"}
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ) : (
        // For large screen devices
        <Sheet>
          <SheetTrigger asChild>
            <Button size="sm" variant="secondary">
              <PencilLine />
            </Button>
          </SheetTrigger>

          <SheetContent className="sm:max-w-2xl!">
            <SheetHeader>
              <SheetTitle>Edit User</SheetTitle>
            </SheetHeader>

            <div className="scrollbar overflow-y-auto px-4">
              <StaffForm staff={staff} onLoadingChange={setIsSubmitting} />
            </div>

            <SheetFooter>
              <div className="flex gap-2">
                <Button type="submit" form="staff-form" disabled={isSubmitting}>
                  {isSubmitting ? "Updating..." : "Update"}
                </Button>

                <Button type="button" variant="destructive">
                  {isDeactivating ? "Deactivating..." : "Deactivate"}
                </Button>
              </div>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      )}
    </>
  );
};

export default UpdateStaff;
