/**
 * Variants for button component: primary, secondary, solid and destructive
 */
declare type ButtonVariantType =
  | "primary"
  | "secondary"
  | "solid"
  | "destructive";

/**
 * Props interface for button component
 */
declare interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariantType;
  icon?: React.ReactNode | string;
  iconPosition?: "start" | "end";
  size?: "small" | "medium" | "large";
  stretch?: boolean;
}

declare interface SpeakerBadgeProps
  extends React.HTMLAttributes<HTMLDivElement> {
  speakerProfileImage?: string;
  speakerURL?: string;
}

declare interface HackathonCardProps extends HackathonInterface {
  variant?: "apply" | "status";
  showSocialLinks?: boolean;
  showEndDate?: boolean;
  showApplyButtonWithStatus?: boolean;
}

declare interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  withSeparator?: boolean;
  title?: string;
  subtitle?: string;
  mainAction?: React.ReactNode;
}

declare interface FeaturedBuilderCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  profileImage: string;
  username: string;
  firstName: string;
  lastName: string;
  isVerified?: boolean;
}

declare interface LinkRowContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  allSocialLinks: Array<AuthorizedUserSocialLinksType>;
  setAllSocialLinks: (data: Array<AuthorizedUserSocialLinksType>) => void;
  data: AuthorizedUserSocialLinksType;
}

declare interface NotifierProps
  extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  setIsOpen: (toggleState: boolean) => void;
  title: string;
  description?: string;
  action?: {
    title: string;
    method: (args: any) => any
  };
}

declare interface AlertDialogProps
  extends React.HTMLAttributes<HTMLDivElement> {
  trigger: React.ReactNode;
  }

declare interface AlertDialogContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
}