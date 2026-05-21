import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type StepperContextType = {
  value: number;
  setValue: (value: number) => void;
};

const StepperContext = React.createContext<StepperContextType | null>(null);

const useStepper = () => {
  const context = React.useContext(StepperContext);

  if (!context) {
    throw new Error("Stepper components must be used inside <Stepper />");
  }

  return context;
};

interface StepperProps {
  defaultValue?: number;
  value?: number;
  onValueChange?: (value: number) => void;
  children: React.ReactNode;
  className?: string;
}

export function Stepper({
  defaultValue = 1,
  value,
  onValueChange,
  children,
  className,
}: StepperProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue);

  const currentValue = value ?? internalValue;

  const setValue = (newValue: number) => {
    if (value === undefined) {
      setInternalValue(newValue);
    }

    onValueChange?.(newValue);
  };

  return (
    <StepperContext.Provider
      value={{
        value: currentValue,
        setValue,
      }}
    >
      <div className={cn("w-full space-y-8", className)}>{children}</div>
    </StepperContext.Provider>
  );
}

interface StepperItemsProps {
  children: React.ReactNode;
  className?: string;
}

export function StepperItems({ children, className }: StepperItemsProps) {
  return (
    <div className={cn("flex items-center w-full", className)}>{children}</div>
  );
}

interface StepperItemProps {
  step: number;
  children?: React.ReactNode;
  className?: string;
}

export function StepperItem({ step, children, className }: StepperItemProps) {
  const { value, setValue } = useStepper();

  const completed = step < value;
  const active = step === value;

  return (
    <div className={cn("flex items-center flex-1", className)}>
      <button
        type="button"
        onClick={() => setValue(step)}
        className={cn(
          "relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all",
          completed && "border-primary bg-primary text-primary-foreground",
          active && "border-primary text-primary bg-background",
          !completed &&
            !active &&
            "border-muted-foreground/30 text-muted-foreground",
        )}
      >
        {completed ? <Check className="h-4 w-4" /> : step}
      </button>

      {children}
    </div>
  );
}

interface StepperSeparatorProps {
  className?: string;
}

export function StepperSeparator({ className }: StepperSeparatorProps) {
  // const { value } = useStepper();

  return <div className={cn("h-[2px] flex-1 bg-muted", className)} />;
}

interface StepperContentProps {
  value: number;
  children: React.ReactNode;
  className?: string;
}

export function StepperContent({
  value: stepValue,
  children,
  className,
}: StepperContentProps) {
  const { value } = useStepper();

  if (value !== stepValue) return null;

  return <div className={className}>{children}</div>;
}
