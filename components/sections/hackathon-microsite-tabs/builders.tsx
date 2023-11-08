'use client';
import { Section } from "@/components/layouts";
import { Button, CardContainer, Input } from "@/components/ui";
import { cn } from "@/helpers";
import { fetchBuildersForHackathon } from "@/middleware";
import Image from "next/image";
import { KeyboardEvent, useEffect, useState } from "react";
import { UserCircle, BadgeCheck, MapPin } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const Builders = (hackathonData: HackathonInterface) => {
  const [builders, setBuilders] =
    useState<Array<BuilderInterface & { participationType?: "solo" | "team" }>>([]);

  const [searchInput, setSearchInput] = useState<string>("");

  const [filteredBuilders, setFilteredBuilders] =
    useState<Array<BuilderInterface & { participationType?: "solo" | "team" }>>([]);

  useEffect(() => {
    async function fetchData() {
      let data = await fetchBuildersForHackathon(hackathonData.slug);
      setBuilders(data);
      setFilteredBuilders(data);
    }
    fetchData();
  }, []);

  const filterBuildersOnSearch = () => {
    const searchTermLowerCase = searchInput.toLowerCase().trim();

    const filteredResults = builders.filter(item => {
      const username = item.username.toLowerCase();
      const firstName = item.fullName.firstName.toLowerCase();
      const location = item.location.toLowerCase();

      return (
        username.includes(searchTermLowerCase) ||
        firstName.includes(searchTermLowerCase) ||
        location.includes(searchTermLowerCase)
      );
    });

    setFilteredBuilders(filteredResults);
  };

  useEffect(() => {
    filterBuildersOnSearch();
  }, [searchInput]);

  return (
    <div id="builders-content-container">
      <Section className="border rounded-2xl px-8 max-md:p-0 max-md:border-none grid gap-6">
        <div className="builders-list-filter-actions-wrapper">
          <Input
            className={cn("p-4 rounded-xl placeholder:text-zinc-400")}
            placeholder="Search by username, full name, location, etc"
            onChange={(e) => {
              e.preventDefault();
              setSearchInput(e.target.value as string);
            }}
            value={searchInput}
          />
        </div>
        <div className="builders-list-container grid grid-cols-1 gap-4">
          {filteredBuilders.map((builder, index) => {
            return (
              <BuilderRowCard {...builder} key={index} id={index} />
            )
          })}
        </div>
      </Section>
    </div>
  )
}

const BuilderRowCard = (builderData: BuilderInterface & { participationType?: "solo" | "team"; id: number; }) => {
  return (
    <motion.div
      initial={{
        y: !builderData.id ? 6 : (12 + builderData.id),
        opacity: 0.5
      }}
      animate={{
        y: 0,
        opacity: 1
      }}
      transition={{
        type: "spring",
        bounce: 0.65
      }}
    >
      <CardContainer className="shadow flex flex-row items-center justify-between max-lg:flex-col max-lg:gap-8">
        <div className="builder-avatar-and-details-wrapper flex flex-row items-center gap-4 max-lg:w-full">
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
            {builderData.participationType === "team" ? <>
              <span className="max-lg:hidden truncate">{"Participating in a team"}</span>
              <span className="hidden max-lg:block truncate">{"Team"}</span>
            </> : <>
              <span className="max-lg:hidden truncate">{"Participating solo"}</span>
              <span className="hidden max-lg:block truncate">{"Solo"}</span>
            </>}
          </Badge>
          <div className="text-zinc-400 text-xs flex flex-row items-center w-fit h-auto gap-1 font-medium">
            <MapPin className="h-3 w-3" />{" "}
            <span className="truncate">{builderData.location}</span>
          </div>
          <Button variant="solid" className="max-lg:hidden">View profile</Button>
        </div>
      </CardContainer>
    </motion.div>
  )
}

export {
  Builders
}