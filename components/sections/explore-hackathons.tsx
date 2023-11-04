'use client';
import { fetchHackathonList } from "@/middleware";
import { useEffect, useState } from "react"
import { Section } from "../layouts";
import { Button, HackathonCard } from "../ui";
import { cn } from "@/helpers";
import { CONTROLLED_SIZE } from "@/common";

const ExploreHackathonsSection: React.FunctionComponent = () => {
  const [exploreHackathonsList, setExploreHackathonsList] = useState<Array<HackathonInterface>>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchHackathonList(CONTROLLED_SIZE);
      setExploreHackathonsList(data);
    }
    fetchData();
  }, []);

  return (
    <Section id="explore-hackathons-section">
      <header className="flex flex-row items-center justify-between">
        <h1 className="leading-snug text-3xl font-medium tracking-tight max-md:text-lg">{"New hackathons"}</h1>
        <Button variant="secondary">{"All new hackathons"}</Button>
      </header>
      <Section
        className={cn("grid grid-cols-2 gap-6 max-md:grid-cols-1")}
      >
        {exploreHackathonsList.map((hackathon: HackathonInterface, index: number) => {
          return (
            <HackathonCard
              {...hackathon}
              key={index}
            />
          )
        })}
      </Section>
    </Section>
  )
}

export {
  ExploreHackathonsSection
}