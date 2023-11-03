
/**
 * Data Interface for hackathon details
 */
declare interface HackathonInterface {
  title:          string;
  subtitle?:      string;
  description:    string;
  startDate:      string;
  endDate:        string;
  desktopBanner:  string;
  mobileBanner:   string;
  isFeatured:     boolean;
  isRemote:       boolean;
  twitter?:       string;
  website?:       string;
  linkedin?:      string;
  instagram?:     string;
  slug:           string;
  isHackathon:    boolean;
}