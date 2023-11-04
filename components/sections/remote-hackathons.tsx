
'use client';

import { useEffect, useState } from "react";
import { Section } from "../layouts";
import { fetchRemoteHackathonList } from "@/middleware";
import { CONTROLLED_SIZE } from "@/common";
import { Button, HackathonCard } from "../ui";

const RemoteHackathonsSection: React.FunctionComponent = () => {
  const [remoteHackathonsList, setRemoteHackathonsList] = useState<Array<HackathonInterface>>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchRemoteHackathonList(CONTROLLED_SIZE);
      setRemoteHackathonsList(data);
    }
    fetchData();
  }, [])

  return (
    <Section>
      <div className="grid grid-cols-2 gap-6 items-start justify-between max-md:grid-cols-1 max-md:gap-12">
        <div className="remote-cta-content-container">
          <h1 className="leading-[105%] font-bold text-6xl tracking-tighter text-zinc-800">
            We understand<br />
            it's tough to travel <br />
            for offline hackathons. <br />
          </h1>
          <h3 className="text-lg font-medium text-zinc-500 mt-6">
            Here are some remote hackathons for you
          </h3>
          <div className="mt-12">
            <Button>
              {"See more remote hackathons"}
            </Button>
          </div>
        </div>
        <div className="remote-hackathons-container grid grid-cols-1 gap-6 max-md:grid-cols-1">
          {remoteHackathonsList.map((hackathon: HackathonInterface, index: number) => {
            return (
              <HackathonCard {...hackathon} key={index} />
            )
          })}
        </div>
      </div>
    </Section>
  )
}

export {
  RemoteHackathonsSection
}