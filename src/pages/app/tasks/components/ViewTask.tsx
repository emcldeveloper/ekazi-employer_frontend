import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import { useIsMobile } from "@/hooks/use-mobile";
import TaskDetails from "./TaskDetails";
import { Eye } from "lucide-react";

const ViewTask = () => {
  const isMobile = useIsMobile();

  return (
    <>
      {isMobile ? (
        // For mobile devices
        <Drawer>
          <DrawerTrigger>
            <Button size="xs" variant="link">
              <Eye />
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
              <TaskDetails />
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
        // For large screen devices
        <Sheet>
          <SheetTrigger asChild>
            <Button size="sm" variant="link">
              <Eye />
            </Button>
          </SheetTrigger>

          <SheetContent className="sm:max-w-2xl!">
            <VisuallyHidden>
              <SheetHeader>
                <SheetTitle />
                <SheetDescription />
              </SheetHeader>
            </VisuallyHidden>

            <div className="scrollbar overflow-y-auto px-4 py-8">
              <TaskDetails />
            </div>
          </SheetContent>
        </Sheet>
      )}
    </>
  );
};

export default ViewTask;
