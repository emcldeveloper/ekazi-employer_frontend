import { useState } from "react";
import { PlusIcon } from "lucide-react";

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

import { useIsMobile } from "@/hooks/use-mobile";
import TaskForm from "./TaskForm";

const CreateTask = () => {
  const isMobile = useIsMobile();

  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <>
      {isMobile ? (
        // For mobile devices
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button>
              <PlusIcon size={16} /> Add Task
            </Button>
          </DrawerTrigger>

          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Create Task</DrawerTitle>
              <DrawerDescription>
                Assign tasks to your recruiters or team members.
              </DrawerDescription>
            </DrawerHeader>

            <div className="flex-1 scroll-fade overflow-y-auto p-4">
              <TaskForm
                onSuccess={() => setOpen(false)}
                onLoadingChange={setIsSubmitting}
              />
            </div>

            <DrawerFooter>
              <Button type="submit" form="task-form" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Task"}
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ) : (
        // For large screen devices
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button>
              <PlusIcon size={16} /> Add Task
            </Button>
          </SheetTrigger>

          <SheetContent className="sm:max-w-2xl!">
            <SheetHeader>
              <SheetTitle>Create Task</SheetTitle>
              <SheetDescription>
                Assign tasks to your recruiters or team members.
              </SheetDescription>
            </SheetHeader>

            <div className="scrollbar overflow-y-auto px-4 pb-10">
              <TaskForm
                onSuccess={() => setOpen(false)}
                onLoadingChange={setIsSubmitting}
              />
            </div>

            <SheetFooter>
              <div>
                <Button type="submit" form="task-form" disabled={isSubmitting}>
                  {isSubmitting ? "Creating..." : "Create Task"}
                </Button>
              </div>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      )}
    </>
  );
};

export default CreateTask;
