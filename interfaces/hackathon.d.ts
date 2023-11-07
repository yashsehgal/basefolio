/**
 * Data Interface for hackathon details
 */
declare interface HackathonInterface {
  title: string;
  subtitle?: string;
  description: string;
  startDate: string;
  endDate: string;
  registrationStartDate: string;
  registrationEndDate: string;
  desktopBanner: string;
  mobileBanner: string;
  isFeatured: boolean;
  isRemote: boolean;
  twitter?: string;
  website?: string;
  linkedin?: string;
  instagram?: string;
  github?: string;
  email?: string;
  slug: string;
  isHackathon: boolean;
  location?: string;
}

declare interface HackathonMicrositeLayoutProps
  extends React.HTMLAttributes<HTMLDivElement> {
  hackathonData?: HackathonInterface;
}

declare type HackathonMicrositeTabType =
  | "overview"
  | "schedule"
  | "projects"
  | "builders"
  | "register";

declare interface EventInterface {
  title: string;
  description?: string;
  startDate: string;
  endDate?: string;
  speaker?: string;
  speakerImage?: string;
  speakerSocialURL?: string;
  hackathonSlug: string;
}

declare interface ScheduleInterface {
  datestamp: {
    date: string;
    month: string;
    year: string;
    mainTimestamp: string;
  };
  events: Array<EventInterface>;
}

declare type HackathonCardStatusMessageType = "Coming soon"
  | "Registrations started"
  | "Registrations ended"
  | "Hackathon started"
  | "Hackathon ended"
  | "Registrations starting soon";

declare type OverviewSocialLinksContainerProps = {
  twitter?: string;
  email?: string;
  linkedin?: string;
  instagram?: string;
  github?: string;
  website?: string;
  discord?: string;
}