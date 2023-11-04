'use client';
import { cn } from "@/helpers"
import { CardContainer } from "../ui/card"
import { Section } from "../layouts"
import { useEffect, useState } from "react"
import { fetchFeaturedHackathon } from "@/middleware"
import Image from "next/image";
import { format } from 'date-fns';
import { parseStrapiDate } from "@/helpers/datetime";

const FeaturedHackathonSection: React.FunctionComponent = () => {
  const [featuredHackathonData, setFeaturedHackathonData] = useState<HackathonInterface>({
    title: "",
    subtitle: "",
    description: "",
    startDate: "",
    endDate: "",
    desktopBanner: "",
    mobileBanner: "",
    isFeatured: true,
    isRemote: false,
    twitter: "",
    website: "",
    linkedin: "",
    instagram: "",
    slug: "",
    isHackathon: true,
  });

  useEffect(() => {
    async function fetchData() {
      const response = await fetchFeaturedHackathon();
      console.log("data as response", response);
      const responseAttributes = await response.data[0].attributes;
      setFeaturedHackathonData({
        ...featuredHackathonData,
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
      });
    }
    !featuredHackathonData.title && fetchData();
  });

  return (
    <Section className={cn("featured-hackathon flex flex-row items-stretch gap-4 w-full")}>
      <CardContainer
        id="featured-hackathon-banner-wrapper"
        className="w-[60%]"
      >
        {featuredHackathonData.desktopBanner && <Image
          src={featuredHackathonData.desktopBanner}
          width={"700"}
          height={"400"}
          alt={featuredHackathonData.title}
          className="rounded-xl shadow-xl shadow-zinc-200"
        />}
      </CardContainer>
      <CardContainer
        id="feature-hackathon-details-wrapper"
        className="w-[40%]"
      >
        <div className="featured-hackthon-label w-fit h-fit text-xs font-medium">
          {"FEATURED"}
        </div>
        <h1 className="font-semibold text-4xl tracking-tight mt-4">
          {featuredHackathonData.title}
        </h1>
        <h3 className="font-normal text-base tracking-tight mt-2 text-zinc-500 w-[32ch]">
          {featuredHackathonData.subtitle}
        </h3>
        <div className="hackathon-details-wrapper my-6">
          <div className="hackathon-startDate-wrapper pl-2 border-l-2 border-neutral-800">
            <p className="leading-snug tracking-tight text-base text-zinc-400">{"starts from"}</p>
            <h4 className="leading-snug tracking-tight font-medium text-lg">
              {parseStrapiDate(featuredHackathonData.startDate)}
            </h4>
          </div>
        </div>
      </CardContainer>
    </Section>
  )
}

export {
  FeaturedHackathonSection
}