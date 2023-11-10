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
  github: "",
  email: "",
  discord: "",
  slug: "",
  isHackathon: true,
  registrationEndDate: "",
  registrationStartDate: "",
};

export const INITIAL_USER_AUTHORIZATION = {
  username: "",
  email: "",
  password: "",
  profileAvatar: "",
  fullName: {
    firstName: "",
    lastName: "",
  },
  bio: "",
  isAuthenticated: false,
};

export const JWT_EXPIRATION_TIME = 2; // In days

export const DUMMY_BUILDER_PROFILE_BG =
  "https://ik.imagekit.io/eawrckp8wfi/basefolio-assets/builders-media/dummy-builder-bg_TGXlkha9M.png?updatedAt=1699398291727";

export const STRAPI_REQUEST_OPTIONS = {
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_SHOW_HACKATHONS_APIKEY}`,
  },
};

export const COOKIE_EXPIRATION_ON_DELETE = "Thu, 01 Jan 1970 00:00:00 UTC";