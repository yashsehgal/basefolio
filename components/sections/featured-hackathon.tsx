'use client';
import { cn } from "@/helpers"
import { CardContainer } from "../ui/card"
import { Section } from "../layouts"
import { useEffect, useState } from "react"
import { fetchFeaturedHackathon } from "@/middleware"
import Image from "next/image";
import { format } from 'date-fns';
import { parseStrapiDate } from "@/helpers/datetime";
import { Button } from "../ui";
import { Twitter, Instagram, Link } from "lucide-react";

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
    <>
      {
        (featuredHackathonData.desktopBanner
          && featuredHackathonData.mobileBanner
          && featuredHackathonData.desktopBanner
        ) &&
        <Section className={cn("featured-hackathon flex flex-row items-stretch gap-4 w-full max-lg:grid max-md:w-[90%] max-md:mx-auto")}>
          {featuredHackathonData.desktopBanner && <Image
            src={featuredHackathonData.desktopBanner}
            width={"900"}
            height={"800"}
            alt={featuredHackathonData.title}
            className="rounded-xl shadow-xl shadow-zinc-200 max-sm:hidden"
          />}
          {featuredHackathonData.mobileBanner && <Image
            src={featuredHackathonData.mobileBanner}
            alt={featuredHackathonData.title}
            className="rounded-xl shadow-xl shadow-zinc-200 hidden max-sm:block"
            width={"400"}
            height={"600"}
          />}
          <CardContainer
            id="feature-hackathon-details-wrapper"
            className="w-[40%] max-lg:w-full"
          >
            <div className="featured-hackthon-label w-fit h-fit text-xs font-medium">
              {"FEATURED"}
            </div>
            <h1 className="font-semibold text-4xl tracking-tight mt-3">
              {featuredHackathonData.title}
            </h1>
            <h3 className="font-normal text-base tracking-tight mt-2 text-zinc-400 w-[32ch]">
              {featuredHackathonData.subtitle}
            </h3>
            <div className="links-wrapper my-3 flex flex-row items-center justify-start gap-2">
              {featuredHackathonData.website &&
                <Button
                  variant="secondary"
                  className="p-3"
                  onClick={() => window.open(featuredHackathonData.website)}
                >
                  <Link />
                </Button>}
              {featuredHackathonData.twitter &&
                <Button
                  variant="secondary"
                  className="p-3"
                  onClick={() => window.open(featuredHackathonData.twitter)}
                >
                  <Twitter />
                </Button>}
            </div>
            <div className="hackathon-details-wrapper my-6 pl-2 border-l-2 border-neutral-800 flex flex-col items-start gap-2">
              <div className="hackathon-startDate-wrapper">
                <p className="leading-snug tracking-tight text-base text-zinc-400">{"starts from"}</p>
                <h4 className="leading-snug tracking-tight font-medium text-lg">
                  {parseStrapiDate(featuredHackathonData.startDate)}
                </h4>
              </div>
              <div
                className="location-wrapper"
              >
                <p className="leading-snug tracking-tight text-base text-zinc-400">{"happening"}</p>
                <h4 className="leading-snug tracking-tight font-medium text-lg">
                  {featuredHackathonData.isRemote && "Remote"}
                </h4>
              </div>
            </div>
            <Button
              stretch
              size="large"
            >
              {"Apply now"}
            </Button>
          </CardContainer>
        </Section>
      }
    </>
  )
}

export {
  FeaturedHackathonSection
}