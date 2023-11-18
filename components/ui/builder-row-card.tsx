import { motion } from "framer-motion";
import { Button, CardContainer } from ".";
import Image from "next/image";
import {
  BadgeCheck,
  Instagram,
  LinkIcon,
  MapPin,
  Twitter,
  UserCircle,
} from "lucide-react";
import { Badge } from "./badge";
import { cn } from "@/helpers";
import { useState } from "react";

const BuilderRowCard: React.FunctionComponent<BuilderRowCardProps> = ({
  hideViewProfileButton = false,
  hideTeamType = false,
  withDetails = false,
  ...builderData
}) => {
  const [details, setDetails] = useState(false);

  return (
    <motion.div
      initial={{
        y: !builderData.id ? 6 : 12 + builderData.id,
        opacity: 0.5,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        type: "just",
      }}
      className={cn("bg-white/90 rounded-xl grid grid-cols-1 gap-4")}
      whileHover={{
        padding: details ? "1rem" : "0rem",
        dur: 6,
      }}
      onMouseEnter={() => {
        if (withDetails) {
          setDetails(true);
        }
      }}
      onMouseLeave={() => {
        if (withDetails) {
          setDetails(false);
        }
      }}
      role={builderData.role}
    >
      <CardContainer className={cn("shadow", builderData.className)}>
        <div className="flex flex-row items-center justify-between max-lg:flex-col max-lg:gap-8">
          <div className="builder-avatar-and-details-wrapper flex flex-row items-center gap-4 max-lg:w-full">
            <div
              className={cn(
                "builder-avatar-wrapper flex flex-row items-center justify-center",
                "overflow-hidden w-16 h-16 rounded-xl",
                !builderData.profileImageURL &&
                  "border border-dashed border-zinc-400 text-zinc-400",
              )}
            >
              {builderData.profileImageURL && (
                <Image
                  src={builderData.profileImageURL}
                  width={"240"}
                  height={"240"}
                  alt="profile-avatar"
                  className="w-full h-auto"
                  loading="lazy"
                />
              )}
              {!builderData.profileImageURL && <UserCircle />}
            </div>
            <div className="builder-details-wrapper">
              <div className="flex flex-row items-center justify-start gap-1">
                <h2 className="builder-fullName font-semibold">
                  {builderData.fullName.firstName}{" "}
                  {builderData.fullName.lastName}
                </h2>
                {builderData.isVerified && (
                  <BadgeCheck className="fill-blue-500 text-white h-5 w-5" />
                )}
              </div>
              <p className="builder-username text-zinc-400 font-medium text-sm">
                {`@${builderData.username}`}
              </p>
            </div>
          </div>
          <div className="member-participation-type flex flex-row items-center justify-end gap-6 max-lg:w-full">
            {!hideTeamType && (
              <Badge variant="outline" className="capitalize">
                {builderData.participationType === "team" ? (
                  <>
                    <span className="max-lg:hidden truncate">
                      {"Participating in a team"}
                    </span>
                    <span className="hidden max-lg:block truncate">
                      {"Team"}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="max-lg:hidden truncate">
                      {"Participating solo"}
                    </span>
                    <span className="hidden max-lg:block truncate">
                      {"Solo"}
                    </span>
                  </>
                )}
              </Badge>
            )}
            <div className="text-zinc-400 text-xs flex flex-row items-center w-fit h-auto gap-1 font-medium">
              <MapPin className="h-3 w-3" />{" "}
              <span className="truncate">{builderData.location}</span>
            </div>
            {!hideViewProfileButton && (
              <Button variant="solid" className="max-lg:hidden">
                View profile
              </Button>
            )}
          </div>
        </div>
        {builderData.children && <>{builderData.children}</>}
      </CardContainer>
      {details && (
        <CardContainer>
          <div className="links-wrapper flex flex-row items-center justify-start gap-2">
            {builderData.website && (
              <Button
                variant="secondary"
                className="p-3"
                onClick={() => window.open(builderData.website)}
              >
                <LinkIcon />
              </Button>
            )}
            {builderData.twitter && (
              <Button
                variant="secondary"
                className="p-3"
                onClick={() => window.open(builderData.twitter)}
              >
                <Twitter />
              </Button>
            )}
            {builderData.instagram && (
              <Button
                variant="secondary"
                className="p-3"
                onClick={() => window.open(builderData.instagram)}
              >
                <Instagram />
              </Button>
            )}
          </div>
          <div
            className={cn(
              "status-content-wrapper",
              "rounded-lg bg-zinc-100 py-3 px-4 w-full mt-4",
              "font-bold uppercase text-zinc-500",
            )}
          >
            {"Hackathons won"}
            <p className="days-remaining-content-wrapper text-zinc-400">
              {builderData.hackathonWon.length === 0
                ? "None"
                : builderData.hackathonWon.length}
            </p>
          </div>
        </CardContainer>
      )}
    </motion.div>
  );
};

export { BuilderRowCard };
