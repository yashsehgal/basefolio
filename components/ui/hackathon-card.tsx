'use client';
import { CardContainer } from "./card";
import { getHackathonCardStatus, parseStrapiDate } from "@/helpers";
import { Button } from "../ui";
import { Twitter, Instagram, Link as LinkIcon } from "lucide-react";
import { cn } from "@/helpers";
import { APP_BASE_HOSTNAME } from "@/common";
import Link from "next/link";
import { useEffect, useState } from "react";

const HackathonCard: React.FunctionComponent<HackathonCardProps & React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  showSocialLinks = false,
  showEndDate = false,
  variant = "apply",
  showApplyButtonWithStatus = false,
  ...props
}): React.ReactNode => {

  // to store and generate the status according to datetime-stamps
  const [statusContent, setStatusContent] = useState<{
    time?: string;
    message: HackathonCardStatusMessageType | string;
  }>({
    time: "",
    message: "Coming soon"
  });

  useEffect(() => {
    if (variant === "status") {
      const _statusData = getHackathonCardStatus(
        new Date(props.registrationStartDate),
        new Date(props.registrationEndDate),
        new Date(props.startDate),
        new Date(props.endDate)
      )
      switch (_statusData.status) {
        case "Coming soon":
          setStatusContent({
            time: _statusData.daysRemaining.toString(),
            message: "Coming soon"
          });
          break;
        case "Registrations starting soon":
          setStatusContent({
            time: _statusData.daysRemaining.toString(),
            message: "Registrations starting soon"
          });
          break;
        case "Registrations started":
          setStatusContent({
            time: _statusData.daysRemaining.toString(),
            message: "Registrations started"
          });
          break;
        case "Registrations ended":
          setStatusContent({
            time: _statusData.daysRemaining.toString(),
            message: "Registrations ended"
          });
          break;
        case "Hackathon started":
          setStatusContent({
            time: _statusData.daysRemaining.toString(),
            message: `${props.isHackathon ? "Hackathon" : "Event"} started`
          });
          break;
        case "Hackathon ended":
          setStatusContent({
            time: _statusData.daysRemaining.toString(),
            message: `${props.isHackathon ? "Hackathon" : "Event"} ended`
          });
          break;
        default: break;
      }
    }
  }, [getHackathonCardStatus(
    new Date(props.registrationStartDate),
    new Date(props.registrationEndDate),
    new Date(props.startDate),
    new Date(props.endDate)
  ).status]);

  return (
    <CardContainer
      className={cn(
        "hackathon-card flex flex-col items-start justify-between",
        className,
      )}
    >
      <div className="hackathon-card-body">
        {props.isFeatured && (
          <div className="featured-hackthon-label w-fit h-fit text-xs font-medium">
            {"FEATURED"}
          </div>
        )}
        <h1 className="font-semibold text-4xl tracking-tight mt-3">
          {props.title}
        </h1>
        <h3 className="font-normal text-base tracking-tight mt-2 text-zinc-400 w-[32ch]">
          {props.subtitle}
        </h3>
        {showSocialLinks && <div className="links-wrapper my-3 flex flex-row items-center justify-start gap-2">
          {props.website && (
            <Button
              variant="secondary"
              className="p-3"
              onClick={() => window.open(props.website)}
            >
              <LinkIcon />
            </Button>
          )}
          {props.twitter && (
            <Button
              variant="secondary"
              className="p-3"
              onClick={() => window.open(props.twitter)}
            >
              <Twitter />
            </Button>
          )}
          {props.instagram && (
            <Button
              variant="secondary"
              className="p-3"
              onClick={() => window.open(props.instagram)}
            >
              <Instagram />
            </Button>
          )}
        </div>}
        <div className="hackathon-details-wrapper my-8 pl-2 border-l-2 border-zinc-800 grid grid-cols-2 items-start gap-6 lg:flex lg:flex-row">
          <div className="hackathon-startDate-wrapper">
            <p className="leading-snug tracking-tight text-base text-zinc-400">
              {"starting from"}
            </p>
            <h4 className="leading-snug tracking-tight font-medium text-base">
              {parseStrapiDate(props.startDate)}
            </h4>
          </div>
          {props.endDate && (
            <div className="hackathon-endDate-wrapper">
              <p className="leading-snug tracking-tight text-base text-zinc-400">
                {"ends at"}
              </p>
              <h4 className="leading-snug tracking-tight font-medium text-base">
                {parseStrapiDate(props.endDate)}
              </h4>
            </div>
          )}
          <div className="location-wrapper">
            <p className="leading-snug tracking-tight text-base text-zinc-400">
              {"location"}
            </p>
            <h4 className="leading-snug tracking-tight font-medium text-base">
              {props.isRemote && "Remote"}
              {!props.isRemote && props.location}
            </h4>
          </div>
        </div>
      </div>
      <div className={cn("grid grid-cols-1 gap-2 w-full")}>
        {(variant === "status" || showApplyButtonWithStatus) && <div className={cn("status-content-wrapper",
          "rounded-lg bg-zinc-100 py-3 px-4 w-full",
          "font-bold uppercase text-zinc-500"
        )}>
          {statusContent.message}
          {statusContent.time && <p className="days-remaining-content-wrapper text-zinc-400">
            {statusContent.time}{" "}
            {parseInt(statusContent.time) <= 1 ? "Day" : "Days"}{" remaining"}
          </p>}
        </div>}
        {(variant === "apply" || showApplyButtonWithStatus) && <Link
          href={`${APP_BASE_HOSTNAME}/hackathons/${props.slug}`}
          className="w-full"
        >
          <Button stretch size="large">
            {"Apply now"}
          </Button>
        </Link>}
      </div>
    </CardContainer>
  );
};

export { HackathonCard };
