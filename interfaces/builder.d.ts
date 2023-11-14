declare interface BuilderInterface extends React.HTMLAttributes<HTMLDivElement> {
  username: string;
  fullName: {
    firstName: string;
    lastName: string;
  };
  location: string;
  bio?: string;
  isVerified: boolean;
  profileImageURL?: string;
  twitter?: string;
  linkedin?: string;
  website?: string;
  github?: string;
  hashnode?: string;
  instagram?: string;
  hackathonWon: Array<{
    position: string;
    hackathonSlug: string;
  }>;
  hackathonParticipations: Array<{
    participationType?: "solo" | "team";
    position?: string;
    hackathonSlug: string;
  }>;
  projects?: any; // Optional, interface and system for this is yet to be built
  isFeatured?: boolean;
}

declare interface BuilderRowCardProps extends BuilderInterface {
  participationType?: "solo" | "team";
  id: number;
  hideViewProfileButton?: boolean;
  hideTeamType?: boolean;
  withDetails?: boolean;
}