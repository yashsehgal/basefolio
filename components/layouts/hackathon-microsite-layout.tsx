import { cn } from "@/helpers";
import { HackathonCard } from "../ui";

const HackathonMicrositeLayout: React.FunctionComponent<
  HackathonMicrositeLayoutProps
> = ({ className, children, hackathonData, ...props }) => {
  return (
    <div
      className={cn(
        "hackathon-microsite-layout relative flex flex-row items-start justify-between gap-6 w-full max-xl:grid max-xl:mx-auto max-xl:w-fit",
        className,
      )}
      {...props}
    >
      <div
        className={cn("hackathon-microsite-layout-content-container w-full")}
      >
        {children}
      </div>
      <div
        className={cn(
          "hackathon-microsite-apply-hackathon-card-container sticky top-12 max-xl:hidden",
        )}
      >
        {hackathonData && <HackathonCard {...hackathonData} variant="status" showSocialLinks />}
      </div>
    </div>
  );
};

export { HackathonMicrositeLayout };
