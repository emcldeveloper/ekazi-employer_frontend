export type Profile = {
  id: string;

  name: string;
  tin?: string | null;
  business?: string | null;
  industryId?: number | null;

  foundedYear?: string | number | null;
  companySizeId?: number | null;

  region?: number | null;
  subLocation?: string | null;
  locationNotes?: string | null;

  website?: string | null;
  extraCommunication?: string | null;

  fax?: string | null;

  attachment?: string | File | null;

  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
};

export type CreateProfileData = {
  name: string;

  tin?: string;
  business?: string;
  industry_id?: number;

  founded_year?: Date;
  company_size_id?: number;

  country?: number | null;
  region?: number;
  sub_location?: string;
  location_notes?: string;

  about_company?: string;
  website?: string;
  extra_communication?: string;

  fax?: string;

  attachment?: FileList;
};

export type UpdateProfileData = {
  id: string;

  name?: string;

  tin?: string;
  business?: string;
  industryId?: number;

  foundedYear?: string | number;
  companySizeId?: number;

  region?: number;
  subLocation?: string;
  locationNotes?: string;

  website?: string;
  extraCommunication?: string;

  fax?: string;

  attachment?: File | null;
};
