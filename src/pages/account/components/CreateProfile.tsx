import {
  BriefcaseBusiness,
  Building2Icon,
  ContactIcon,
  HexagonIcon,
  LayoutList,
  MapPin,
  Upload,
} from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import SearchSelect from "react-select";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
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

import { useCreateProfile, useProfile } from "@/hooks/profile";
import { toast } from "sonner";
import type { OptionType } from "@/@types/jobs";
import RichTextEditor from "@/components/RichTextEditor";

const CreateProfile = () => {
  const navigate = useNavigate();

  const [industrySearch, setIndustrySearch] = useState("");
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CreateProfileData>();

  // create/update profile mutation
  const { mutate: createProfile, isPending } = useCreateProfile();

  // data fetch
  const { data: companyProfile } = useProfile();
  const profile = companyProfile?.data;
  console.log(profile);

  const { data: industries } = useIndustries(industrySearch);
  const industryOptions =
    industries?.map((industry: Industry) => ({
      value: industry.id,
      label: industry.industry_name,
    })) ?? [];

  const { data: companySizes } = useCompanySizes();
  const sizeOptions =
    companySizes?.map((size: CompanySize) => ({
      value: size.id,
      label: size.name,
    })) ?? [];

  const { data: countries } = useCountries();
  const countryOptions =
    countries?.map((country: Country) => ({
      value: country.id,
      label: country.name,
    })) ?? [];

  const { data: regions } = useRegions();

  const attachment = watch("attachment");
  const selectedCountry = watch("country");
  const selectedRegion = watch("region");

  const filteredRegions =
    regions
      ?.filter((region: Region) => region.country_id === selectedCountry)
      .map((region: Region) => ({
        value: region.id,
        label: region.region_name,
      })) ?? [];

  // preview picture
  useEffect(() => {
    if (attachment?.[0]) {
      const url = URL.createObjectURL(attachment[0]);
      setLogoPreview(url);

      return () => URL.revokeObjectURL(url);
    }
  }, [attachment]);

  useEffect(() => {
    if (!profile) {
      setValue("region", undefined);
    }
  }, [selectedCountry, setValue, profile]);

  useEffect(() => {
    if (!profile) return;

    reset({
      name: profile.name,
      tin: profile.tin,
      business: profile.business,
      founded_year: profile.founded_year?.split(" ")[0],

      industry_id: profile.industry?.id,
      company_size_id: profile.company_size?.id,

      country: profile.country?.id,
      region: profile.region?.id,

      sub_location: profile.sub_location,
      location_notes: profile.location_notes,

      about_company: profile.description,

      website: profile.website,
      fax: profile.fax,
      extra_communication: profile.extra_communication,
    });
  }, [profile, reset]);

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
    formData.append("fax", data.fax || "");
    formData.append("extra_communication", data.extra_communication || "");

    if (data.attachment?.[0]) {
      formData.append("attachment", data.attachment[0]);
    }

    createProfile(formData, {
      onSuccess: (res) => {
        toast.success(res?.message || "Profile created successfully");
        navigate("/profile");
        reset();
      },
      onError: () => {
        toast.error("Failed to create profile");
      },
    });
  };

  return (
    <div className="mt-4 space-y-4">
      {/* Header */}

      <Card>
        <CardContent>
          <h2 className="text-2xl font-bold">Company Profile</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Complete and manage your company information.
          </p>
        </CardContent>
      </Card>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Logo + Basic */}
        <div className="grid gap-4 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex items-center gap-2">
              <div className="bg-blue-100 text-blue-500 rounded-lg p-2">
                <HexagonIcon size={16} />
              </div>
              <div>
                <CardTitle>Company Logo</CardTitle>
                <CardDescription>Upload your company logo.</CardDescription>
              </div>
            </CardHeader>

            <CardContent>
              <div className="flex flex-col items-center gap-4">
                <div className="flex p-2 h-32 w-32 items-center justify-center rounded-2xl border bg-muted">
                  <img
                    src={
                      logoPreview || profile?.logo || "/images/default-img.jpeg"
                    }
                    alt="Company Logo"
                    className="w-full object-cover"
                  />
                </div>

                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="logo-upload">
                      <Button
                        type="button"
                        variant="outline"
                        asChild
                        className="w-full"
                      >
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
            <CardHeader className="flex items-center gap-2">
              <div className="bg-blue-100 text-blue-500 rounded-lg p-2">
                <Building2Icon size={16} />
              </div>
              <div>
                <CardTitle>Company Information</CardTitle>
                <CardDescription>
                  Basic information about your company.
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <FieldGroup className="grid gap-4 md:grid-cols-2">
                <Field>
                  <FieldLabel>Company Name</FieldLabel>
                  <Input
                    {...register("name", {
                      required: "Company name is required",
                    })}
                  />
                  {errors.name && (
                    <FieldError>{errors.name.message}</FieldError>
                  )}
                </Field>

                <Field>
                  <FieldLabel>Founded Year</FieldLabel>
                  <Input
                    type="date"
                    placeholder="2022"
                    {...register("founded_year", {
                      required: "Founded year is required",
                    })}
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="industry_id">Industry</FieldLabel>
                  <Controller
                    name="industry_id"
                    control={control}
                    rules={{
                      required: "Industry is required",
                    }}
                    render={({ field }) => (
                      <SearchSelect
                        menuPortalTarget={document.body}
                        styles={{
                          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                        }}
                        {...field}
                        isClearable
                        options={industryOptions}
                        value={industryOptions.find(
                          (option: OptionType) => option.value === field.value,
                        )}
                        onChange={(option) =>
                          field.onChange(option?.value ?? null)
                        }
                        onInputChange={setIndustrySearch}
                      />
                    )}
                  />
                  {errors.industry_id && (
                    <FieldError>{errors.industry_id.message}</FieldError>
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
                      <SearchSelect
                        menuPortalTarget={document.body}
                        styles={{
                          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                        }}
                        {...field}
                        isClearable
                        options={sizeOptions}
                        value={sizeOptions.find(
                          (option: OptionType) => option.value === field.value,
                        )}
                        onChange={(option) =>
                          field.onChange(option?.value ?? null)
                        }
                      />
                    )}
                  />
                  {errors.company_size_id && (
                    <FieldError>{errors.company_size_id.message}</FieldError>
                  )}
                </Field>
              </FieldGroup>
            </CardContent>
          </Card>
        </div>

        {/* About Company */}
        <Card>
          <CardHeader className="flex items-center gap-2">
            <div className="bg-blue-100 text-blue-500 rounded-lg p-2">
              <LayoutList size={16} />
            </div>
            <div>
              <CardTitle>About Company</CardTitle>
              <CardDescription>
                Describe your company, mission, vision, culture and values...
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent>
            <Field>
              <Controller
                name="about_company"
                control={control}
                rules={{
                  required: "Company description is required",
                }}
                render={({ field }) => (
                  <RichTextEditor
                    value={field.value || ""}
                    onChange={field.onChange}
                  />
                )}
              />

              {errors.about_company && (
                <FieldError>{errors.about_company.message}</FieldError>
              )}
            </Field>

            {/* <Textarea
              rows={8}
              {...register("about_company", {
                required: "Company description is required",
              })}
            /> */}
          </CardContent>
        </Card>

        {/* Address */}
        <Card>
          <CardHeader className="flex items-center gap-2">
            <div className="bg-blue-100 text-blue-500 rounded-lg p-2">
              <MapPin size={16} />
            </div>
            <div>
              <CardTitle>Location</CardTitle>
              <CardDescription>
                Provide your company location details
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent>
            <FieldGroup className="grid gap-4 md:grid-cols-3 mb-4">
              <Field>
                <FieldLabel>Country</FieldLabel>
                <Controller
                  name="country"
                  control={control}
                  rules={{
                    required: "Country is required",
                  }}
                  render={({ field }) => (
                    <SearchSelect
                      menuPortalTarget={document.body}
                      styles={{
                        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                      }}
                      {...field}
                      isClearable
                      options={countryOptions}
                      value={countryOptions.find(
                        (option: OptionType) => option.value === field.value,
                      )}
                      onChange={(option) =>
                        field.onChange(option?.value ?? null)
                      }
                    />
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
                    <SearchSelect
                      menuPortalTarget={document.body}
                      styles={{
                        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                      }}
                      {...field}
                      isClearable
                      options={filteredRegions}
                      value={filteredRegions.find(
                        (option: OptionType) => option.value === field.value,
                      )}
                      onChange={(option) =>
                        field.onChange(option?.value ?? null)
                      }
                    />
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

            <FieldGroup>
              <Field>
                <FieldLabel>Location Notes</FieldLabel>
                <Controller
                  name="location_notes"
                  control={control}
                  rules={{
                    required: "Location notes are required",
                  }}
                  render={({ field }) => (
                    <RichTextEditor
                      value={field.value || ""}
                      onChange={field.onChange}
                    />
                  )}
                />

                {/* <Textarea
                  rows={8}
                  placeholder="Describe your company location and directions..."
                  {...register("location_notes", {
                    required: "Location notes are required",
                  })}
                /> */}
              </Field>
            </FieldGroup>
          </CardContent>
        </Card>

        {/* Business Verification */}
        <Card>
          <CardHeader className="flex items-center gap-2">
            <div className="bg-blue-100 text-blue-500 rounded-lg p-2">
              <BriefcaseBusiness size={16} />
            </div>
            <div>
              <CardTitle>Business Verification</CardTitle>
              <CardDescription>
                Add business information of your company for verification.
              </CardDescription>
            </div>
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

        {/* Contact Information */}
        <Card>
          <CardHeader className="flex items-center gap-2">
            <div className="bg-blue-100 text-blue-500 rounded-lg p-2">
              <ContactIcon size={16} />
            </div>
            <div>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>
                Provide contact details for your company.
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent>
            <FieldGroup className="grid gap-4 md:grid-cols-2">
              <Field>
                <FieldLabel>Website</FieldLabel>
                <Input
                  placeholder="https://yourcompany.com"
                  {...register("website")}
                />
              </Field>

              <Field>
                <FieldLabel>Fax</FieldLabel>
                <Input
                  type="text"
                  placeholder="Enter fax number"
                  {...register("fax")}
                />
              </Field>

              <Field>
                <FieldLabel>Extra Communication</FieldLabel>
                <Input type="text" {...register("extra_communication")} />
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
