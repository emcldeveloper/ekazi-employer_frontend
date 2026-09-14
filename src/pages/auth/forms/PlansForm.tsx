import { useFormContext, Controller } from "react-hook-form";

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import type { OnboardingFormData } from "@/schema/auth.schema";

const plans = [
  {
    id: "1",
    name: "Basic",
    price: "TZS 100,000",
    description: "Small businesses and startups.",
  },
  {
    id: "2",
    name: "Standard",
    price: "TZS 150,000",
    description: "Medium-sized businesses.",
  },
  {
    id: "3",
    name: "Premium",
    price: "TZS 300,000",
    description: "Large corporations.",
  },
  {
    id: "4",
    name: "Enterprise",
    price: "TZS 500,000",
    description: "Enterprise companies.",
  },
];

export function PlansForm() {
  const { control } = useFormContext<OnboardingFormData>();

  return (
    <FieldGroup className="w-full">
      <FieldSet>
        <Controller
          name="planId"
          control={control}
          render={({ field, fieldState }) => (
            <>
              <RadioGroup
                value={field.value}
                onValueChange={field.onChange}
                className="gap-4"
              >
                {plans.map((plan) => (
                  <FieldLabel key={plan.id} htmlFor={plan.id}>
                    <Field
                      orientation="horizontal"
                      className="cursor-pointer rounded-xl border p-4 transition hover:bg-muted/50"
                    >
                      <FieldContent>
                        <FieldTitle className="text-base font-bold">
                          {plan.name}

                          <span className="ml-2 text-muted-foreground">
                            {plan.price} /mo
                          </span>
                        </FieldTitle>

                        <FieldDescription>{plan.description}</FieldDescription>
                      </FieldContent>

                      <RadioGroupItem value={plan.id} id={plan.id} />
                    </Field>
                  </FieldLabel>
                ))}
              </RadioGroup>

              {fieldState.error && (
                <p className="mt-2 text-xs text-destructive">
                  {fieldState.error.message}
                </p>
              )}
            </>
          )}
        />
      </FieldSet>
    </FieldGroup>
  );
}
