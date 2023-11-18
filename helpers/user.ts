import { getCookie } from ".";

export function getAuthorizedUsername() {
  return getCookie("username");
}
