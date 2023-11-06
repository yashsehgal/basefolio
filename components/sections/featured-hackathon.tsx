"use client";
import { cn } from "@/helpers";
import { Section } from "../layouts";
import { useEffect, useState } from "react";
import { fetchFeaturedHackathon } from "@/middleware";
import Image from "next/image";
import { HackathonCard } from "../ui";
import { INITIAL_HACKATHON_DATA } from "@/common";

const FeaturedHackathonSection: React.FunctionComponent = () => {
  const [featuredHackathonData, setFeaturedHackathonData] =
    useState<HackathonInterface>(INITIAL_HACKATHON_DATA);

  useEffect(() => {
    async function fetchData() {
      const response = await fetchFeaturedHackathon();
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
        twitter: responseAttributes.twitter ?? "",
        website: responseAttributes.website ?? "",
        linkedin: responseAttributes.linkedin ?? "",
        instagram: responseAttributes.instagram ?? "",
        slug: responseAttributes.slug,
        isHackathon: responseAttributes.isHackathon,
      });
    }
    fetchData();
  }, []);

  return (
    <>
      {featuredHackathonData.desktopBanner &&
        featuredHackathonData.mobileBanner &&
        featuredHackathonData.desktopBanner && (
          <Section
            className={cn(
              "featured-hackathon flex flex-row items-stretch gap-4 max-lg:grid max-lg:mx-auto",
            )}
          >
            {featuredHackathonData.desktopBanner && (
              <Image
                src={featuredHackathonData.desktopBanner}
                width={"900"}
                height={"800"}
                alt={featuredHackathonData.title}
                className="rounded-xl shadow-xl shadow-zinc-200 max-sm:hidden"
              />
            )}
            {featuredHackathonData.mobileBanner && (
              <Image
                src={featuredHackathonData.mobileBanner}
                alt={featuredHackathonData.title}
                className="rounded-xl shadow-xl shadow-zinc-200 hidden max-sm:block"
                width={"400"}
                height={"600"}
              />
            )}
            <HackathonCard
              {...featuredHackathonData}
              className="w-[40%] max-lg:w-full"
              showSocialLinks
              showApplyButtonWithStatus
            />
          </Section>
        )}
    </>
  );
};

export { FeaturedHackathonSection };
