
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