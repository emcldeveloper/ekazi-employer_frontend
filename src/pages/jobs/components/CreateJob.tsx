"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import {
  Stepper,
  StepperContent,
  StepperItem,
  StepperItems,
} from "@/components/stepper";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function CreateJob() {
  const [step, setStep] = useState(1);

  return (
    <div className=" py-10">
      <Stepper value={step} onValueChange={setStep}>
        <StepperItems>
          <StepperItem step={1} />
          <StepperItem step={2} />
          <StepperItem step={3} />
          <StepperItem step={4} />
        </StepperItems>

        <StepperContent value={1}>
          <div className="rounded-xl border p-6 space-y-4">
            <h2 className="text-xl font-semibold">Basic Information</h2>

            <form action="">
              <FieldGroup className="grid grid-cols-2">
                <Field>
                  <FieldLabel>Title/Position</FieldLabel>
                  <Input />
                </Field>
                <Field>
                  <FieldLabel>Job Type</FieldLabel>
                  <Input />
                </Field>
                <Field>
                  <FieldLabel>Position Level</FieldLabel>
                  <Input />
                </Field>
                <Field>
                  <FieldLabel>Salary</FieldLabel>
                  <Input />
                </Field>
                <Field>
                  <FieldLabel>Currency</FieldLabel>
                  <Input />
                </Field>
                <Field>
                  <FieldLabel>Country</FieldLabel>
                  <Input />
                </Field>
                <Field>
                  <FieldLabel>Region</FieldLabel>
                  <Input />
                </Field>
                <Field>
                  <FieldLabel>Sub Location</FieldLabel>
                  <Input />
                </Field>
                <Field>
                  <FieldLabel>Contact Person</FieldLabel>
                  <Input />
                </Field>
                <Field>
                  <FieldLabel>Job Category</FieldLabel>
                  <Input />
                </Field>
                <Field>
                  <FieldLabel>Application Deadline</FieldLabel>
                  <Input />
                </Field>
              </FieldGroup>
            </form>

            <Button onClick={() => setStep(2)}>Next</Button>
          </div>
        </StepperContent>

        <StepperContent value={2}>
          <div className="rounded-xl border p-6 space-y-4">
            <h2 className="text-xl font-semibold">Address Information</h2>

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep(1)}>
                Previous
              </Button>

              <Button onClick={() => setStep(3)}>Next</Button>
            </div>
          </div>
        </StepperContent>

        <StepperContent value={3}>
          <div className="rounded-xl border p-6 space-y-4">
            <h2 className="text-xl font-semibold">Payment Information</h2>

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep(2)}>
                Previous
              </Button>

              <Button onClick={() => setStep(4)}>Next</Button>
            </div>
          </div>
        </StepperContent>

        <StepperContent value={4}>
          <div className="rounded-xl border p-6 space-y-4">
            <h2 className="text-xl font-semibold">Complete</h2>

            <Button variant="outline" onClick={() => setStep(1)}>
              Reset
            </Button>
          </div>
        </StepperContent>
      </Stepper>
    </div>
  );
}
