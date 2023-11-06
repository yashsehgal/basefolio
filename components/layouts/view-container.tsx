import { cn } from "@/helpers";

const ViewContainer: React.FunctionComponent<
  React.HTMLAttributes<HTMLDivElement>
> = ({ children, className, ...props }) => {
  return (
    <div className={cn("view-container", className)} {...props}>
      {children}
    </div>
  );
};

export { ViewContainer };
