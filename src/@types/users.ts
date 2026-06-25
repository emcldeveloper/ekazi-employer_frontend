import type { OptionType } from "./jobs";

export type FormValues = {
  username: string;
  email: string;
  password: string;
  role: OptionType | null;
  permissions: string[];
};
