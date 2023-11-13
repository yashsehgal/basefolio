'use client';
import { cn } from "@/helpers"
import { Section } from "../layouts"
import { useEffect, useState } from "react";
import { fetchFeaturedBuilders } from "@/middleware/builders";
import { CONTROLLED_SIZE, DEFAULT_NOMINATION_BG, DEFAULT_PROFILE_BG_FOR_BUILDERS } from "@/common";
import { FeaturedBuilderCard } from "../ui";
import Image from "next/image";

const FeaturedBuildersSection: React.FunctionComponent = () => {
  const [featuredBuilders, setFeaturedBuilders] = useState<Array<BuilderInterface>>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchFeaturedBuilders(CONTROLLED_SIZE);
      setFeaturedBuilders(data);
    }
    fetchData();
  }, []);

  return (
    <Section id="featured-builders-section">
      <header className="flex flex-row items-center justify-between">
        <h1 className="leading-snug text-3xl font-medium tracking-tight max-md:text-lg">
          {"Featured Builders"}
        </h1>
      </header>
      <Section className={cn("flex flex-row items-center justify-start gap-6",
        "max-lg:grid max-lg:grid-cols-3",
        "max-md:grid-cols-2",
        "max-sm:grid-cols-5 max-sm:gap-[60%] max-sm:overflow-scroll"
      )}>
        {featuredBuilders.map((builder, index) => {
          return (
            <FeaturedBuilderCard
              key={index}
              username={builder.username}
              firstName={builder.fullName.firstName}
              lastName={builder.fullName.lastName || ""}
              profileImage={builder.profileImageURL || DEFAULT_PROFILE_BG_FOR_BUILDERS}
              isVerified={builder.isVerified}
            />
          )
        })}
        <div className={cn("featured-builder-card relative",
          "rounded-2xl shadow-md w-[200px] h-[200px] overflow-hidden",
          "flex flex-row items-center justify-center",
          "grayscale hover:grayscale-0 transition-all",
        )}>
          <Image
            src={DEFAULT_NOMINATION_BG}
            width={"200"}
            height={"200"}
            alt={'nominate-bg'}
            className="h-full w-auto"
          />
          <div className={cn("featured-profile-content-wrapper absolute bottom-0 left-0",
            "bg-gradient-to-t from-black",
            "px-3 pb-3 pt-6 w-full h-fit"
          )}>
            <h2 className="text-white font-bold text-2xl">
              Nominate a<br />
              builder
            </h2>
          </div>
        </div>
      </Section>
    </Section>
  )
}

export {
  FeaturedBuildersSection
}