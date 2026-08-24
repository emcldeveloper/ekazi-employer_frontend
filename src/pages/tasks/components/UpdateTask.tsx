import { useState } from "react";

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

import { useIsMobile } from "@/hooks/use-mobile";
import TaskForm from "./TaskForm";
import type { Task } from "@/@types/tasks";
import { PencilLine } from "lucide-react";

interface UpdateTaskProps {
  task: Task;
}

const UpdateTask = ({ task }: UpdateTaskProps) => {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  return (
    <>
      {isMobile ? (
        // For mobile devices
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button size="sm" variant="secondary">
              <PencilLine />
            </Button>
          </DrawerTrigger>

          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Update Task</DrawerTitle>
              <DrawerDescription>Update task details.</DrawerDescription>
            </DrawerHeader>

            <div className="flex-1 scroll-fade overflow-y-auto p-4">
              <TaskForm task={task} onSuccess={() => setOpen(false)} />
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
        // For large screen devices
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button size="sm" variant="secondary">
              <PencilLine />
            </Button>
          </SheetTrigger>

          <SheetContent className="sm:max-w-2xl!">
            <SheetHeader>
              <SheetTitle>Update Task</SheetTitle>
              <SheetDescription>Update task details.</SheetDescription>
            </SheetHeader>

            <div className="scrollbar overflow-y-auto px-4 pb-10">
              <TaskForm task={task} onSuccess={() => setOpen(false)} />
            </div>
          </SheetContent>
        </Sheet>
      )}
    </>
  );
};

export default UpdateTask;
