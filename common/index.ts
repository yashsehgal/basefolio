export const BASEFOLIO_LOGO: string = "/basefolio-logo.svg";
export const BASEROUTE = process.env.NEXT_PUBLIC_BASE_ROUTE ?? "/";
export const STRAPI_HOSTNAME = process.env.NEXT_PUBLIC_STRAPI_BASE_URL;
export const STRAPI_BASE_API_URL =
  process.env.NEXT_PUBLIC_STRAPI_BASE_URL + "/api";
export const APP_BASE_HOSTNAME =
  process.env.NEXT_PUBLIC_APP_HOSTNAME ?? "https://localhost:3000";

export const CONTROLLED_SIZE: number = 3;

export const MONTH_NAMES: Array<string> = [
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

export const INITIAL_HACKATHON_DATA: HackathonInterface = {
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

export const INITIAL_USER_AUTHORIZATION: AuthorizedUserType = {
  id: -10000,
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
  socialLinks: [],
  education: [],
  experience: [],
};

export const JWT_EXPIRATION_TIME: number = 2; // In days

export const DUMMY_BUILDER_PROFILE_BG: string =
  "https://ik.imagekit.io/eawrckp8wfi/basefolio-assets/builders-media/dummy-builder-bg_TGXlkha9M.png?updatedAt=1699398291727";

export const STRAPI_REQUEST_OPTIONS = {
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_SHOW_HACKATHONS_APIKEY}`,
  },
};

export const COOKIE_EXPIRATION_ON_DELETE: string =
  "Thu, 01 Jan 1970 00:00:00 UTC";

export const DEFAULT_PROFILE_BG_FOR_BUILDERS: string = "/workspace.jpeg";

export const DEFAULT_NOMINATION_BG: string = "/nominate-bg.avif";
