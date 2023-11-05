

/**
 * Variants for button component: primary, secondary, solid and destructive
 */
declare type ButtonVariantType = "primary" | "secondary" | "solid" | "destructive";

/**
 * Props interface for button component
 */
declare interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariantType;
  icon?: React.ReactNode | string;
  iconPosition?: "start" | "end";
  size?: "small" | "medium" | "large";
  stretch?: boolean;
}

declare interface SpeakerBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  speakerProfileImage?: string;
  speakerURL?: string;
}