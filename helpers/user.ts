import { getCookie } from ".";

export function getAuthorizedUsername() {
  return getCookie("username");
}

export function getAuthorizedUserFullName() {
  return {
    firstName: getCookie("firstName"),
    lastName: getCookie("lastName"),
  };
}
