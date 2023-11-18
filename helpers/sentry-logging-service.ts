import * as Sentry from "@sentry/nextjs";
import { getAuthorizedUsername } from ".";

async function Logger({ level = "log", message }: LoggerProps) {
  let user = "not-authorized";
  if (getAuthorizedUsername().status === "error") {
    user = getAuthorizedUsername().data as string;
    Sentry.setUser({
      username: user,
    });
  } else {
    // If user not found, fetching the IP Address
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    if (data.ip) {
      user = data.ip;
      Sentry.setUser({
        ip_address: user as string,
      });
    }
  }
  Sentry.withScope((scope) => {
    scope.setLevel(level);
    Sentry.captureMessage(message);
  });
}

export { Logger };
