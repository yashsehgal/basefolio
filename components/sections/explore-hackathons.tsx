'use client';
import { fetchHackathonList } from "@/middleware";
import { useEffect, useState } from "react"
import { Section } from "../layouts";
import { Button, HackathonCard } from "../ui";
import { cn } from "@/helpers";

const ExploreHackathonsSection: React.FunctionComponent = () => {
  const [exploreHackathonsList, setExploreHackathonsList] = useState<Array<HackathonInterface>>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetchHackathonList(3);
      console.log("receiving", response);

      await response.map((item: any, index: number) => {
        const responseAttributes = item.attributes;

        setExploreHackathonsList([
          ...exploreHackathonsList,
          {
            title: responseAttributes.title,
            subtitle: responseAttributes.subtitle,
            description: responseAttributes.description,
            startDate: responseAttributes.startDate,
            endDate: responseAttributes.endDate,
            desktopBanner: responseAttributes.desktopBanner,
            mobileBanner: responseAttributes.mobileBanner,
            isRemote: responseAttributes.isRemote ?? false,
            twitter: responseAttributes.twitter ?? '',
            website: responseAttributes.website ?? '',
            linkedin: responseAttributes.linkedin ?? '',
            instagram: responseAttributes.instagram ?? '',
            slug: responseAttributes.slug,
            isHackathon: responseAttributes.isHackathon,
            isFeatured: false,
            location: responseAttributes.location ?? 'Not listed'
          }
        ])
      });
    }
    (exploreHackathonsList.length < 3) && fetchData();
  });

  return (
    <Section id="explore-hackathons-section">
      <header className="flex flex-row items-center justify-between">
        <h1 className="leading-snug text-3xl font-medium tracking-tight">{"New hackathons"}</h1>
        <Button variant="secondary">{"All new hackathons"}</Button>
      </header>
      <Section
        className={cn("grid grid-cols-2 gap-6")}
      >
        {exploreHackathonsList.map((hackathon, index) => {
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