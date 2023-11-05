import { CardContainer } from "./card"
import { parseStrapiDate } from "@/helpers/datetime";
import { Button } from "../ui";
import { Twitter, Instagram, Link as LinkIcon } from "lucide-react";
import { cn } from "@/helpers";
import { APP_BASE_HOSTNAME, BASEROUTE } from "@/common";
import Link from "next/link";

const HackathonCard: React.FunctionComponent<React.HTMLAttributes<HTMLDivElement> & HackathonInterface> = (hackathonData): React.ReactNode => {
  return (
    <CardContainer
      className={cn("hackathon-card flex flex-col items-start justify-between", hackathonData.className)}
    >
      <div className="hackathon-card-body">
        {hackathonData.isFeatured && <div className="featured-hackthon-label w-fit h-fit text-xs font-medium">
          {"FEATURED"}
        </div>}
        <h1 className="font-semibold text-4xl tracking-tight mt-3">
          {hackathonData.title}
        </h1>
        <h3 className="font-normal text-base tracking-tight mt-2 text-zinc-400 w-[32ch]">
          {hackathonData.subtitle}
        </h3>
        <div className="links-wrapper my-3 flex flex-row items-center justify-start gap-2">
          {hackathonData.website &&
            <Button
              variant="secondary"
              className="p-3"
              onClick={() => window.open(hackathonData.website)}
            >
              <LinkIcon />
            </Button>}
          {hackathonData.twitter &&
            <Button
              variant="secondary"
              className="p-3"
              onClick={() => window.open(hackathonData.twitter)}
            >
              <Twitter />
            </Button>}
          {hackathonData.instagram &&
            <Button
              variant="secondary"
              className="p-3"
              onClick={() => window.open(hackathonData.instagram)}
            >
              <Instagram />
            </Button>}
        </div>
        <div className="hackathon-details-wrapper my-8 pl-2 border-l-2 border-zinc-800 grid grid-cols-2 items-start gap-6 lg:flex lg:flex-row">
          <div className="hackathon-startDate-wrapper">
            <p className="leading-snug tracking-tight text-base text-zinc-400">{"starting from"}</p>
            <h4 className="leading-snug tracking-tight font-medium text-base">
              {parseStrapiDate(hackathonData.startDate)}
            </h4>
          </div>
          {hackathonData.endDate && <div className="hackathon-endDate-wrapper">
            <p className="leading-snug tracking-tight text-base text-zinc-400">{"ends at"}</p>
            <h4 className="leading-snug tracking-tight font-medium text-base">
              {parseStrapiDate(hackathonData.endDate)}
            </h4>
          </div>}
          <div
            className="location-wrapper"
          >
            <p className="leading-snug tracking-tight text-base text-zinc-400">{"location"}</p>
            <h4 className="leading-snug tracking-tight font-medium text-base">
              {hackathonData.isRemote && "Remote"}
              {!hackathonData.isRemote && hackathonData.location}
            </h4>
          </div>
        </div>
      </div>
      <Link href={`${APP_BASE_HOSTNAME}/hackathons/${hackathonData.slug}`} className="w-full">
        <Button
          stretch
          size="large"
        >
          {"Apply now"}
        </Button>
      </Link>
    </CardContainer>
  )
}

export {
  HackathonCard
}