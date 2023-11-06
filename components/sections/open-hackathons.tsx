"use client";

import { cn } from "@/helpers";
import { Section } from "../layouts";
import { useEffect, useState } from "react";
import { fetchAllHackathons } from "@/middleware";
import { HackathonCard } from "../ui";

const OpenHackathonsSection: React.FunctionComponent = () => {
  const [openHackathonsList, setOpenHackathonsList] = useState<
    Array<HackathonInterface>
  >([]);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchAllHackathons();
      setOpenHackathonsList(data);
    }
    fetchData();
  }, []);

  return (
    <Section className="open-hackathons-section">
      <header className="flex flex-row items-center justify-between">
        <h1 className="leading-snug text-3xl font-medium tracking-tight max-md:text-lg">
          {"Open Hackathons"}
        </h1>
      </header>
      <Section
        className={cn(
          "grid grid-cols-3 max-xl:grid-cols-2 gap-6 max-md:grid-cols-1",
        )}
      >
        {openHackathonsList.map(
          (hackathon: HackathonInterface, index: number) => {
            return <HackathonCard {...hackathon} key={index} showSocialLinks />;
          },
        )}
      </Section>
    </Section>
  );
};

export { OpenHackathonsSection };
