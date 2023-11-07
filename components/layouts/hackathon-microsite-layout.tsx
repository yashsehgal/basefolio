import { cn, getHackathonCardStatus } from "@/helpers";
import { Button, HackathonCard } from "../ui";
import { INITIAL_HACKATHON_DATA } from "@/common";

const HackathonMicrositeLayout: React.FunctionComponent<
  HackathonMicrositeLayoutProps
> = ({
  className,
  children,
  hackathonData = INITIAL_HACKATHON_DATA,
  ...props
}) => {
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
        {hackathonData && (
          <HackathonCard {...hackathonData} variant="status" showSocialLinks />
        )}

        {getHackathonCardStatus(
          new Date(hackathonData.registrationStartDate),
          new Date(hackathonData.registrationEndDate),
          new Date(hackathonData.startDate),
          new Date(hackathonData.endDate),
        ).status === "Registrations started" && (
          <div
            className={cn(
              "registration-actions-container mt-8 grid grid-cols-1 w-full gap-2",
            )}
          >
            <Button variant="secondary">Submit individual application</Button>
            <div className="separator flex flex-row items-center gap-2 cursor-default select-none">
              <div className="w-full h-[1px] bg-zinc-200" />
              <span className="text-zinc-400/80 text-xs">{"OR"}</span>
              <div className="w-full h-[1px] bg-zinc-200" />
            </div>
            <Button variant="secondary">Join or create a team</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export { HackathonMicrositeLayout };
