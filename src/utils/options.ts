// Create options to be used in Creatable select
export const toOptions = <T extends { id: number | string; name: string }>(
  items?: T[],
) =>
  items?.map((item) => ({
    value: item.id,
    label: item.name,
  })) ?? [];

//   usage example
// import { toOptions } from "@/utils/select";

// const positionOptions = toOptions(positions?.data);
// const positionLevelOptions = toOptions(positionLevels);
// const industryOptions = toOptions(industries);
