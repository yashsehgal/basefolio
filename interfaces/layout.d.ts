declare interface LayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * for hiding footer component from layout
   */
  hideFooter?: boolean;

  /**
   * for hiding navigation component from layout
   */
  hideNavigation?: boolean;

  /**
   * to render layout from hackathon microsite
   */
  forMicrosite?: boolean;

  /**
   * for hiding sub-navigation from main site layout
   */
  hideSubNavigation?: boolean;
}

declare interface HackathonMicrositeLayoutProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * for passing hackathon data as a prop
   */
  hackathonData?: HackathonInterface;
}

declare type HackathonMicrositeTabType =
  | "overview"
  | "schedule"
  | "projects"
  | "builders"
  | "register";

declare interface ProfileViewLayoutProps
  extends React.HTMLAttributes<HTMLDivElement> {
  selectedTab: ProfileViewTabsType;
  setSelectedTab: (tab: ProfileViewTabsType) => void;
}

declare type ProfileViewTabsType =
  | "about"
  | "education"
  | "experience"
  | "links";

declare interface ProfileNavigationProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * for tracking and changing the current selected tab in profile view
   */
  selectedTab?: ProfileViewTabsType;
  setSelectedTab: (tab: ProfileViewTabsType) => void;
}
