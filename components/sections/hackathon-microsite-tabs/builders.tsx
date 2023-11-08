'use client';
import { Section } from "@/components/layouts";
import { Button, CardContainer } from "@/components/ui";
import { cn } from "@/helpers";
import { fetchBuildersForHackathon } from "@/middleware";
import Image from "next/image";
import { useEffect, useState } from "react";
import { UserCircle, BadgeCheck } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

const Builders = (hackathonData: HackathonInterface) => {
  const [builders, setBuilders] =
    useState<Array<BuilderInterface & { participationType?: "solo" | "team" }>>([]);

  useEffect(() => {
    async function fetchData() {
      let data = await fetchBuildersForHackathon(hackathonData.slug);
      setBuilders(data);
    }
    fetchData();
  }, []);

  return (
    <div id="builders-content-container">
      <Section className="border rounded-2xl px-8 max-md:p-0 max-md:border-none">
        <div className="builders-list-container grid grid-cols-1 gap-4">
          {builders.map((builder, index) => {
            return (
              <BuilderRowCard {...builder} key={index} />
            )
          })}
        </div>
      </Section>
    </div>
  )
}

const BuilderRowCard = (builderData: BuilderInterface & { participationType?: "solo" | "team" }) => {
  return (
    <CardContainer className="shadow flex flex-row items-center justify-between max-lg:flex-col max-lg:gap-4">
      <div className="builder-avatar-and-details-wrapper flex flex-row items-start gap-4 max-lg:w-full">
        <div className={cn("builder-avatar-wrapper flex flex-row items-center justify-center",
          "overflow-hidden w-16 h-16 rounded-xl",
          !builderData.profileImageURL && "border border-dashed border-zinc-400 text-zinc-400"
        )}>
          {builderData.profileImageURL && <Image
            src={builderData.profileImageURL}
            width={"240"}
            height={"240"}
            alt="profile-avatar"
            className="w-full h-auto"
            loading="lazy"
          />}
          {!builderData.profileImageURL && <UserCircle />}
        </div>
        <div className="builder-details-wrapper">
          <div className="flex flex-row items-center justify-start gap-1">
            <h2 className="builder-fullName font-semibold">
              {builderData.fullName.firstName}{" "}
              {builderData.fullName.lastName}
            </h2>
            {builderData.isVerified && <BadgeCheck className="fill-blue-500 text-white h-5 w-5" />}
          </div>
          <p className="builder-username text-zinc-400 font-medium text-sm">
            {`@${builderData.username}`}
          </p>
        </div>
      </div>
      <div className="member-participation-type flex flex-row items-center justify-end gap-6 max-lg:w-full">
        <Badge variant="outline" className="capitalize">
          {builderData.participationType === "team" ? "Participating in a team" : "Participating solo"}
        </Badge>
        <Button variant="solid">View profile</Button>
      </div>
    </CardContainer>
  )
}

export {
  Builders
}