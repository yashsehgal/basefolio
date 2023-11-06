import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function copyToClipboard({ content }: { content: string }) {
  if ("clipboard" in navigator) {
    return await navigator.clipboard.writeText(content);
  } else {
    return document.execCommand("copy", true, content);
  }
}

export function checkIfDateLogged(objA: any, objB: any) {
  return (
    objA.date === objB.date &&
    objA.month === objB.month &&
    objA.year === objB.year
  );
}

export { sanitizeHackathonDetails } from "./sanitizeHackathonData";

export {
  parseDatestamp,
  parseStrapiDate,
  sortScheduleTimelineCollection,
  parseTimestampToHHMM,
  convertToRFC5545Timestamp
} from "./datetime";

export {
  createHackathonEventOnGoogleCalendar
} from './calendar'