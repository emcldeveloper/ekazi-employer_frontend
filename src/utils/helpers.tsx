import dayjs from "dayjs";

// sidebar routing helper
export const isRouteActive = (path: string) => {
  return location.pathname === path || location.pathname.startsWith(`${path}/`);
};

// date format
export const formatDate = (
  date: string | Date | null | undefined,
  format = "DD MMM YYYY",
) => {
  if (!date) return "";

  return dayjs(date).format(format);
};
