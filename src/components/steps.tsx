import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

export interface StepItem {
  title?: string;
  description?: string;
}

interface StepsProps {
  steps: StepItem[];
  currentStep: number;
  className?: string;
  orientation?: "horizontal" | "vertical";
  onStepClick?: (index: number) => void;
}

const Steps = ({
  steps,
  currentStep,
  orientation = "horizontal",
  className,
  onStepClick,
}: StepsProps) => {
  return (
    <div className={cn("rounded-xl bg-background py-6", className)}>
      <div
        className={cn(
          orientation === "horizontal"
            ? "flex items-center"
            : "flex flex-col gap-6",
        )}
      >
        {steps.map((step, index) => {
          const completed = index < currentStep;
          const active = index === currentStep;

          return (
            <div
              key={step.title}
              className={cn(
                orientation === "horizontal"
                  ? "flex flex-1 items-center"
                  : "flex items-start",
              )}
            >
              <div
                className={cn(
                  "flex items-center gap-3",
                  onStepClick && "cursor-pointer",
                )}
                onClick={() => onStepClick?.(index)}
              >
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full border-2 font-semibold transition-all",
                    completed &&
                      "border-primary bg-primary text-primary-foreground",
                    active && "border-primary bg-background text-primary",
                    !completed &&
                      !active &&
                      "border-muted-foreground/30 text-muted-foreground",
                  )}
                >
                  {completed ? <Check className="h-5 w-5" /> : index + 1}
                </div>

                <div>
                  <p
                    className={cn(
                      "text-sm font-medium",
                      active || completed
                        ? "text-foreground"
                        : "text-muted-foreground",
                    )}
                  >
                    {step.title}
                  </p>

                  {step.description && (
                    <p className="text-xs text-muted-foreground">
                      {step.description}
                    </p>
                  )}
                </div>
              </div>

              {index !== steps.length - 1 && (
                <div
                  className={cn(
                    completed ? "bg-primary" : "bg-border",
                    orientation === "horizontal"
                      ? "mx-4 h-0.5 flex-1"
                      : "ml-5 mt-2 h-12 w-0.5",
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Steps;
