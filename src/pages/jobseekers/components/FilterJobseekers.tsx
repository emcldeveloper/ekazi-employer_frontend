import { useEffect, useState } from "react";
import { Settings2Icon } from "lucide-react";
import SearchSelect from "react-select";
import { useForm, Controller } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useEducationLevels, useIndustries } from "@/hooks/universals";
import { usePositionLevels } from "@/hooks/universals/usePositionLevels";
import { toOptions } from "@/utils/options";
import type { OptionType } from "@/@types/jobs";
import type { EducationLevel } from "@/@types/universals";
import type { JobseekerFilters } from "@/@types/jobseekers";

interface FilterJobseekersProps {
  value: JobseekerFilters;
  onApply: (filters: JobseekerFilters) => void;
}

export function FilterJobseekers({ value, onApply }: FilterJobseekersProps) {
  const [open, setOpen] = useState(false);
  const [industrySearch, setIndustrySearch] = useState("");

  const { control, register, handleSubmit, reset } = useForm<JobseekerFilters>({
    defaultValues: value,
  });

  useEffect(() => {
    reset(value);
  }, [value, reset]);

  // fetch position levels
  const { data: positionLevels } = usePositionLevels();
  const positionLevelOptions = toOptions(positionLevels);

  // fetch industries
  const { data: industries } = useIndustries(industrySearch);
  const industryOptions = toOptions(industries);

  // Fetch education levels
  const { data: levels } = useEducationLevels();
  const levelOptions: OptionType[] =
    levels?.map((level: EducationLevel) => ({
      value: level.id,
      label: level.education_level,
    })) ?? [];

  const onSubmit = (data: JobseekerFilters) => {
    onApply(data);
    setOpen(false);
  };

  const handleClear = () => {
    reset();
    onApply({});
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Settings2Icon size={16} /> Filters
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Filters</DialogTitle>
          <DialogDescription>Choose one or more filters</DialogDescription>
        </DialogHeader>
        <div className="-mx-4 scrollbar max-h-[70vh] overflow-y-auto px-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel>Enter Position Name</FieldLabel>
                <Input
                  {...register("position")}
                  placeholder="Search position"
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="positionLevelId">
                  Select Position Level
                </FieldLabel>
                <Controller
                  name="positionLevelId"
                  control={control}
                  render={({ field }) => (
                    <SearchSelect
                      {...field}
                      isClearable
                      options={positionLevelOptions}
                      value={positionLevelOptions.find(
                        (option) => option.value === field.value,
                      )}
                      onChange={(option) =>
                        field.onChange(option?.value ?? null)
                      }
                    />
                  )}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="type_id">Select Industry</FieldLabel>
                <Controller
                  name="industryId"
                  control={control}
                  render={({ field }) => (
                    <SearchSelect
                      {...field}
                      isClearable
                      options={industryOptions}
                      value={industryOptions.find(
                        (option) => option.value === field.value,
                      )}
                      onChange={(option) =>
                        field.onChange(option?.value ?? null)
                      }
                      onInputChange={setIndustrySearch}
                    />
                  )}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="type_id">
                  Select Education Level
                </FieldLabel>
                <Controller
                  name="educationLevelId"
                  control={control}
                  render={({ field }) => (
                    <SearchSelect
                      {...field}
                      isClearable
                      options={levelOptions}
                      value={levelOptions.find(
                        (option) => option.value === field.value,
                      )}
                      onChange={(option) =>
                        field.onChange(option?.value ?? null)
                      }
                    />
                  )}
                />
              </Field>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={handleClear}>
                  Clear
                </Button>
                <Button type="submit">Apply</Button>
              </DialogFooter>
            </FieldGroup>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
