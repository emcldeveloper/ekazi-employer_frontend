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
import CreateUserForm from "../forms/CreateUserForm";

interface UpdateUserProps {
  userId: number;
}

const UpdateUser = ({ userId }: UpdateUserProps) => {
  const isMobile = useIsMobile();

  return (
    <>
      {isMobile ? (
        // For mobile devices
        <Drawer>
          <DrawerTrigger asChild>
            <Button size="xs" variant="outline">
              Edit
            </Button>
          </DrawerTrigger>

          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Edit User</DrawerTitle>
            </DrawerHeader>

            <div className="flex-1 scroll-fade overflow-y-auto p-4">
              <CreateUserForm userId={userId} />
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
        // For large screen devices
        <Sheet>
          <SheetTrigger asChild>
            <Button size="xs" variant="outline">
              Edit
            </Button>
          </SheetTrigger>

          <SheetContent className="sm:max-w-2xl!">
            <SheetHeader>
              <SheetTitle>Edit User</SheetTitle>
            </SheetHeader>

            <div className="scrollbar overflow-y-auto px-4">
              <CreateUserForm userId={userId} />
            </div>
          </SheetContent>
        </Sheet>
      )}
    </>
  );
};

export default UpdateUser;
