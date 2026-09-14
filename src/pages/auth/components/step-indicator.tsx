import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
}

export function StepIndicator({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
}: StepIndicatorProps) {
  return (
    <div className="w-full max-w-180 mx-auto">
      <div className="flex items-center gap-4">
        {/* Previous */}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onPrevious}
          disabled={currentStep === 0}
          className="shrink-0 text-muted-foreground"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        {/* Progress */}
        <div className="flex flex-1 items-center gap-1">
          {Array.from({ length: totalSteps }).map((_, index) => {
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;

            return (
              <div
                key={index}
                className={[
                  "h-1 flex-1 rounded-full transition-all duration-300",
                  isActive || isCompleted ? "bg-blue-600" : "bg-gray-200",
                ].join(" ")}
              />
            );
          })}
        </div>

        {/* Next */}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onNext}
          disabled={currentStep === totalSteps - 1}
          className="shrink-0 text-muted-foreground"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
