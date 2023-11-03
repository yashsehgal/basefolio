
declare interface LayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * for hiding footer component from layout for views
   */
  hideFooter?: boolean;

  /**
   * for hiding navigation component from layout for views
   */
  hideNavigation?: boolean;

  /**
   * to render layout from hackathon microsite
   */
  forMicrosite?: boolean;
}