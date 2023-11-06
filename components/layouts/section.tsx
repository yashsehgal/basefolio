import { cn } from "@/helpers";

const Section: React.FunctionComponent<
  React.HTMLAttributes<HTMLDivElement>
> = ({ children, className, ...props }) => {
  return (
    <div className={cn("section", className)} {...props}>
      {children}
    </div>
  );
};

export { Section };
