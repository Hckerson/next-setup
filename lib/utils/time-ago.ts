import { formatDistanceToNow } from "date-fns";

export const getTimeAgo = (date: string | Date): string => {
  if (!date) return "";

  try {
    const dateObj = typeof date === "string" ? new Date(date) : date;

    if (isNaN(dateObj.getTime())) {
      return "";
    }

    return formatDistanceToNow(dateObj, { addSuffix: true });
  } catch {
    return "";
  }
};
