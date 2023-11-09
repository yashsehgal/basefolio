import { cn } from "@/helpers";

const ViewContainer: React.FunctionComponent<
  React.HTMLAttributes<HTMLDivElement> & { forProfileView?: boolean }
> = ({ children, className, forProfileView = false, ...props }) => {
  return (
    <div
      className={cn(
        !forProfileView && "view-container",
        forProfileView && "profile-view-container",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export { ViewContainer };
