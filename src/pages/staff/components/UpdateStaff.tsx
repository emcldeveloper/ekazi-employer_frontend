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
import StaffForm from "./StaffForm";
import { PencilLine } from "lucide-react";
import type { ClientStaff } from "@/@types/staff";

interface UpdateStaffProps {
  staff: ClientStaff;
}

const UpdateStaff = ({ staff }: UpdateStaffProps) => {
  const isMobile = useIsMobile();

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
              <StaffForm staff={staff} />
            </div>
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
              <StaffForm staff={staff} />
            </div>
          </SheetContent>
        </Sheet>
      )}
    </>
  );
};

export default UpdateStaff;
