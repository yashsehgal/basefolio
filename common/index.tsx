export const BASEFOLIO_LOGO = "/basefolio-logo.svg";
export const BASEROUTE = process.env.NEXT_PUBLIC_BASE_ROUTE ?? "/";
export const STRAPI_HOSTNAME = process.env.NEXT_PUBLIC_STRAPI_BASE_URL;
export const STRAPI_BASE_API_URL =
  process.env.NEXT_PUBLIC_STRAPI_BASE_URL + "/api";
export const APP_BASE_HOSTNAME =
  process.env.NEXT_PUBLIC_APP_HOSTNAME ?? "https://localhost:3000";

export const CONTROLLED_SIZE = 3;

export const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const INITIAL_HACKATHON_DATA = {
  title: "",
  subtitle: "",
  description: "",
  startDate: "",
  endDate: "",
  desktopBanner: "",
  mobileBanner: "",
  isFeatured: true,
  isRemote: false,
  twitter: "",
  website: "",
  linkedin: "",
  instagram: "",
  slug: "",
  isHackathon: true,
  registrationEndDate: "",
  registrationStartDate: ""
};