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

// number format
export const formatNumber = (num: number) => {
  if (num == null) return "0";

  if (num < 1000) return num.toString();

  const units = ["K", "M", "B", "T"];
  let unitIndex = -1;
  let value = num;

  while (value >= 1000 && unitIndex < units.length - 1) {
    value /= 1000;
    unitIndex++;
  }

  return `${value.toFixed(1).replace(/\.0$/, "")}${units[unitIndex]}`;
};

// Capitalize words
export const capitalizeText = (value: string | null | undefined): string => {
  if (!value) return "";

  return value
    .toLowerCase()
    .replace(/(^|\s|-)\S/g, (char) => char.toUpperCase());
};

// money format
export const formatMoney = (
  amount: number | string | null | undefined,
): string => {
  if (amount === null || amount === undefined || amount === "") {
    return "0";
  }

  const number = Number(amount);

  if (Number.isNaN(number)) {
    return "0";
  }

  return new Intl.NumberFormat("en-US").format(number);
};

export const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-TZ", {
    style: "currency",
    currency: "TZS",
    maximumFractionDigits: 0,
  }).format(amount);
