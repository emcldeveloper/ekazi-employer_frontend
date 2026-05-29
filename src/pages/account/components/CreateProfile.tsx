import { Building2, Upload } from "lucide-react";
import { useForm, Controller } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import type { CreateProfileData } from "@/@types/profile";
import { useNavigate } from "react-router-dom";
import {
  useCompanySizes,
  useCountries,
  useIndustries,
  useRegions,
} from "@/hooks/universals";
import type {
  CompanySize,
  Country,
  Industry,
  Region,
} from "@/@types/universals";
import { useEffect, useState } from "react";
import { useUser } from "@/hooks/auth/useUser";
import { useCreateProfile } from "@/hooks/profile";
import { toast } from "sonner";

const CreateProfile = () => {
  const navigate = useNavigate();

  const [industrySearch, setIndustrySearch] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CreateProfileData>();

  const { mutate: createProfile, isPending } = useCreateProfile();

  // data fetch
  const { data: user } = useUser();
  const { data: industries } = useIndustries();
  const { data: companySizes } = useCompanySizes();
  const { data: countries } = useCountries();
  const { data: regions } = useRegions();

  const company = user?.data?.username;

  const selectedCountry = watch("country");
  const selectedRegion = watch("region");

  const filteredRegions =
    regions?.filter(
      (region: Region) => region.country_id === selectedCountry,
    ) || [];

  useEffect(() => {
    setValue("region", undefined);
    setValue("sub_location", "");
  }, [selectedCountry, setValue]);

  const onSubmit = (data: CreateProfileData) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("tin", data.tin || "");
    formData.append("business", data.business || "");
    formData.append("industry_id", String(data.industry_id));
    formData.append("founded_year", String(data.founded_year || ""));
    formData.append("company_size_id", String(data.company_size_id));
    formData.append("region", String(data.region));
    formData.append("sub_location", data.sub_location || "");
    formData.append("location_notes", data.location_notes || "");
    formData.append("about_company", data.about_company || "");
    formData.append("website", data.website || "");

    if (data.attachment?.[0]) {
      formData.append("attachment", data.attachment[0]);
    }

    createProfile(formData, {
      onSuccess: (res) => {
        toast.success(res?.message || "Profile created successfully");
        navigate("/profile");
        reset();
      },
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-xl font-bold">Company Profile</h2>

          <p className="text-sm text-muted-foreground">
            Complete and manage your company information.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Logo + Basic */}
        <div className="grid gap-6 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Company Logo</CardTitle>
              <CardDescription>Upload your company logo.</CardDescription>
            </CardHeader>

            <CardContent>
              <div className="flex flex-col items-center gap-4">
                <div className="flex h-32 w-32 items-center justify-center rounded-2xl border bg-muted">
                  <Building2 className="h-12 w-12 text-muted-foreground" />
                </div>

                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="logo-upload">
                      <Button type="button" variant="outline" asChild>
                        <span>
                          <Upload className="mr-2 h-4 w-4" />
                          Upload Logo
                        </span>
                      </Button>
                    </FieldLabel>

                    <Input
                      id="logo-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      {...register("attachment")}
                    />
                  </Field>
                </FieldGroup>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
              <CardDescription>
                Basic information about your company.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <FieldGroup className="grid gap-4 md:grid-cols-2">
                <Field>
                  <FieldLabel>Company Name</FieldLabel>
                  <Input
                    defaultValue={company}
                    {...register("name", {
                      required: "Company name is required",
                    })}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </Field>

                <Field>
                  <FieldLabel>Industry</FieldLabel>

                  <Controller
                    name="industry_id"
                    control={control}
                    rules={{
                      required: "Industry is required",
                    }}
                    render={({ field }) => (
                      <Combobox
                        items={industries}
                        value={industrySearch}
                        onValueChange={(value) => {
                          setIndustrySearch(value);

                          const selectedIndustry = industries.find(
                            (industry: Industry) =>
                              industry.industry_name === value,
                          );

                          if (selectedIndustry) {
                            field.onChange(selectedIndustry.id);
                          }
                        }}
                      >
                        <ComboboxInput placeholder="Select an industry" />

                        <ComboboxContent>
                          <ComboboxEmpty>No industry found.</ComboboxEmpty>

                          <ComboboxList>
                            {industries?.map((industry: Industry) => (
                              <ComboboxItem
                                key={industry.id}
                                value={industry.industry_name}
                              >
                                {industry.industry_name}
                              </ComboboxItem>
                            ))}
                          </ComboboxList>
                        </ComboboxContent>
                      </Combobox>
                    )}
                  />

                  {errors.industry_id && (
                    <p className="text-xs text-red-500">
                      {errors.industry_id.message}
                    </p>
                  )}
                </Field>

                <Field>
                  <FieldLabel>Company Size</FieldLabel>
                  <Controller
                    name="company_size_id"
                    control={control}
                    rules={{
                      required: "Company size is required",
                    }}
                    render={({ field }) => (
                      <Select
                        value={field.value?.toString()}
                        onValueChange={(value) => field.onChange(Number(value))}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select company size" />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectGroup>
                            {companySizes?.map((size: CompanySize) => (
                              <SelectItem
                                key={size.id}
                                value={size.id.toString()}
                              >
                                {size.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.company_size_id && (
                    <p className="text-xs text-red-500">
                      {errors.company_size_id.message}
                    </p>
                  )}
                </Field>
                <Field>
                  <FieldLabel>Founded Year</FieldLabel>
                  <Input
                    placeholder="2022"
                    {...register("founded_year", {
                      required: "Founded year is required",
                    })}
                  />
                </Field>
              </FieldGroup>
            </CardContent>
          </Card>
        </div>

        {/* About Company */}
        <Card>
          <CardHeader>
            <CardTitle>About Company</CardTitle>
          </CardHeader>

          <CardContent>
            <Textarea
              rows={8}
              placeholder="Describe your company, mission, vision, culture and values..."
              {...register("about_company", {
                required: "Company description is required",
              })}
            />
          </CardContent>
        </Card>

        {/* Address */}
        <Card>
          <CardHeader>
            <CardTitle>Location</CardTitle>
          </CardHeader>

          <CardContent>
            <FieldGroup className="grid gap-4 md:grid-cols-3">
              <Field>
                <FieldLabel>Country</FieldLabel>
                <Controller
                  name="country"
                  control={control}
                  rules={{
                    required: "Country is required",
                  }}
                  render={({ field }) => (
                    <Select
                      value={field.value?.toString()}
                      onValueChange={(value) => field.onChange(Number(value))}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectGroup>
                          {countries?.map((country: Country) => (
                            <SelectItem
                              key={country.id}
                              value={country.id.toString()}
                            >
                              {country.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.country && (
                  <p className="text-xs text-red-500">
                    {errors.country.message}
                  </p>
                )}
              </Field>

              <Field>
                <FieldLabel>Region</FieldLabel>
                <Controller
                  name="region"
                  control={control}
                  rules={{
                    required: "Region is required",
                  }}
                  render={({ field }) => (
                    <Select
                      disabled={!selectedCountry}
                      value={field.value?.toString()}
                      onValueChange={(value) => field.onChange(Number(value))}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select region" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectGroup>
                          {filteredRegions?.map((region: Region) => (
                            <SelectItem
                              key={region.id}
                              value={region.id.toString()}
                            >
                              {region.region_name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.region && (
                  <p className="text-xs text-red-500">
                    {errors.region.message}
                  </p>
                )}
              </Field>

              <Field>
                <FieldLabel>Sub Location</FieldLabel>
                <Input
                  disabled={!selectedRegion}
                  {...register("sub_location")}
                />
              </Field>
            </FieldGroup>
          </CardContent>
        </Card>

        {/* Business Verification */}

        <Card>
          <CardHeader>
            <CardTitle>Business Verification</CardTitle>

            {/* <CardDescription>
              Upload company verification documents.
            </CardDescription> */}
          </CardHeader>

          <CardContent>
            <FieldGroup className="grid gap-4 md:grid-cols-2">
              <Field>
                <FieldLabel>Business Type</FieldLabel>
                <Input
                  placeholder="Sales, Consultancy etc."
                  {...register("business")}
                />
              </Field>

              <Field>
                <FieldLabel>TIN Number</FieldLabel>
                <Input type="text" {...register("tin")} />
              </Field>
            </FieldGroup>
          </CardContent>
        </Card>

        {/* Bottom Save */}

        <div className="flex justify-end">
          <Button disabled={isPending} size="lg">
            {isPending ? "Saving" : "Save Profile"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateProfile;
