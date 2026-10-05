import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { useIsMobile } from "@/hooks/use-mobile";
import EvaluationForm from "./EvaluationForm";

const EvaluateCandidate = () => {
  const isMobile = useIsMobile();

  return (
    <>
      {isMobile ? (
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline">Evaluate Candidate</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Job Interview Evaluation Form</DrawerTitle>
              <DrawerDescription>
                Evaluate the candidate’s performance and suitability for the
                position.
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4">
              <EvaluationForm />
            </div>
            <DrawerFooter>
              <Button>Submit</Button>
              <DrawerClose asChild>
                <Button>Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ) : (
        <Sheet>
          <SheetTrigger asChild>
            <Button>Evaluate Candidate</Button>
          </SheetTrigger>

          <SheetContent className="sm:max-w-3xl!">
            <SheetHeader>
              <SheetTitle>Job Interview Evaluation Form</SheetTitle>
              <SheetDescription>
                {" "}
                Evaluate the candidate’s performance and suitability for the
                position.
              </SheetDescription>
            </SheetHeader>

            <div className="scrollbar overflow-y-auto p-4">
              <EvaluationForm />
            </div>

            <SheetFooter>
              <div className="flex items-center gap-2">
                <Button type="submit">Save changes</Button>
                <SheetClose>
                  <Button variant="outline">Close</Button>
                </SheetClose>
              </div>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      )}
    </>
  );
};

export default EvaluateCandidate;
