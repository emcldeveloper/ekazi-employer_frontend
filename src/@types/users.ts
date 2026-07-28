import type { OptionType } from "./jobs";

export type FormValues = {
  username: string;
  email: string;
  password: string;
  role: OptionType | null;
  permissions: string[];
};

export type Client = {
  id: number;
  client_name: string;
};

export type User = {
  id: number;
  email: string;
};

export type StaffRecord = {
  id: number;
  prefix_id: number;
  client_id: number;
  user_id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  phone_number: string;

  client: Client;
  user: User;
};
