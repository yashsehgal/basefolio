
declare interface BuilderInterface {
  username: string;
  fullName: {
    firstName: string;
    lastName: string;
  };
  bio?: string;
  isVerified: boolean;
  profileImageURL?: string;
  twitter?: string;
  linkedin?: string;
  website?: string;
  github?: string;
  hashnode?: string;
  instagram?: string;
  hackathonWon?: Array<{
    position: string;
    hackathonSlug: string;
  }>;
  hackathonParticipations?: Array<{
    participationType?: "solo" | "team";
    position?: string;
    hackathonSlug: string;
  }>;
  projects?: any;   // Optional, interface and system for this is yet to be built
};