import { Eye } from "lucide-react";
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
import EvaluationQuestionDetails from "./EvaluationQuestionDetails";

interface ViewEvaluationQuestionProps {
  questionId: number;
}

const ViewEvaluationQuestion = ({
  questionId,
}: ViewEvaluationQuestionProps) => {
  const isMobile = useIsMobile();

  return (
    <>
      {isMobile ? (
        // For mobile devices
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="ghost" size="icon-sm">
              <Eye />
            </Button>
          </DrawerTrigger>

          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Add Staff</DrawerTitle>
            </DrawerHeader>

            <div className="flex-1 scroll-fade overflow-y-auto p-4">
              <EvaluationQuestionDetails questionId={questionId} />
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
        // For large screen devices
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon-sm">
              <Eye />
            </Button>
          </SheetTrigger>

          <SheetContent className="sm:max-w-2xl!">
            <SheetHeader>
              <SheetTitle>Evaluation Question</SheetTitle>
            </SheetHeader>

            <div className="scrollbar overflow-y-auto p-4">
              <EvaluationQuestionDetails questionId={questionId} />
            </div>
          </SheetContent>
        </Sheet>
      )}
    </>
  );
};

export default ViewEvaluationQuestion;
