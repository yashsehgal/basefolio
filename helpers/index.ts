import { COOKIE_EXPIRATION_ON_DELETE } from "@/common";
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

export function getCookie(cookieName: string): {
  status: "error" | "success";
  data: string;
} {
  var name = cookieName + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var cookieArray = decodedCookie.split(";");

  for (var i = 0; i < cookieArray.length; i++) {
    var cookie = cookieArray[i].trim();
    if (cookie.indexOf(name) === 0) {
      return {
        status: "success",
        data: cookie.substring(name.length, cookie.length),
      };
    }
  }

  // If the cookie with the specified name is not found, return null
  return {
    status: "error",
    data: "",
  };
}

export function deleteCookie(name: string) {
  document.cookie = name + `=; expires=${COOKIE_EXPIRATION_ON_DELETE}; path=/;`;
}

export {
  parseDatestamp,
  parseStrapiDate,
  sortScheduleTimelineCollection,
  parseTimestampToHHMM,
  convertToRFC5545Timestamp,
  getHackathonCardStatus,
} from "./datetime";

export { createHackathonEventOnGoogleCalendar } from "./calendar";
