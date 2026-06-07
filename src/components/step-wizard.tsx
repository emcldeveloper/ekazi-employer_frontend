import { type ReactNode, useState } from "react";

import Steps, { type StepItem } from "./steps";

export interface StepRenderProps {
  next: () => void;
  previous: () => void;
  goTo: (step: number) => void;
  currentStep: number;
  totalSteps: number;
  isFirstStep: boolean;
  isLastStep: boolean;
}

export interface WizardStep extends StepItem {
  content: (props: StepRenderProps) => ReactNode;
}

interface StepWizardProps {
  steps: WizardStep[];
  initialStep?: number;
  orientation?: "horizontal" | "vertical";
  allowStepNavigation?: boolean;
}

const StepWizard = ({
  steps,
  initialStep = 0,
  orientation = "horizontal",
  allowStepNavigation = false,
}: StepWizardProps) => {
  const [currentStep, setCurrentStep] = useState(initialStep);

  const next = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const previous = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const goTo = (step: number) => {
    if (step < 0 || step >= steps.length) return;

    setCurrentStep(step);
  };

  return (
    <div className="space-y-4">
      <Steps
        steps={steps}
        currentStep={currentStep}
        orientation={orientation}
        onStepClick={allowStepNavigation ? goTo : undefined}
      />

      <div>
        {steps[currentStep].content({
          next,
          previous,
          goTo,
          currentStep,
          totalSteps: steps.length,
          isFirstStep: currentStep === 0,
          isLastStep: currentStep === steps.length - 1,
        })}
      </div>
    </div>
  );
};

export default StepWizard;
