import { Section } from "@/components/layouts";
import { cn } from "@/helpers";
import Image from "next/image";
import Markdown from "react-markdown";
import { Twitter, Linkedin, Instagram, Mail, Github, Globe } from 'lucide-react';
import React from "react";
import { Button, CardContainer } from "@/components/ui";

const Overview = (hackathonData: HackathonInterface) => {
  return (
    <div className="overview-content-container">
      <div className="hackathon-desktop-banner mb-8">
        {hackathonData?.desktopBanner && (
          <Image
            src={hackathonData?.desktopBanner}
            alt={hackathonData.title}
            width={"600"}
            height={"400"}
            className="w-full shadow-md rounded-2xl"
            priority
          />
        )}
      </div>
      <h1 className="leading-snug tracking-tight font-bold text-4xl">
        {"Overview"}
      </h1>
      <div className="overview-content-description-wrapper mt-6 text-justify w-[90%]">
        <Markdown className="leading-loose markdown">
          {hackathonData?.description}
        </Markdown>
      </div>
      <OverviewSocialLinksContainer
        twitter={hackathonData.twitter}
        github={hackathonData.github}
        email={hackathonData.email}
        linkedin={hackathonData.linkedin}
        instagram={hackathonData.instagram}
        discord={hackathonData.discord}
        website={hackathonData.website}
        hackathonTitle={hackathonData.title}
      />
    </div>
  );
};

const OverviewSocialLinksContainer = (socialLinks: OverviewSocialLinksContainerProps) => {
  const OverviewSocialLinksData = [
    {
      title: "twitter",
      data: {
        url: socialLinks.twitter,
        logo: <Twitter />,
        color: "#00acee"
      }
    },
    {
      title: "github",
      data: {
        url: socialLinks.github,
        logo: <Github />,
        color: "#171515"
      }
    },
    {
      title: "email",
      data: {
        url: socialLinks.email,
        logo: <Mail />,
        color: "#EA4335"
      }
    },
    {
      title: "linkedin",
      data: {
        url: socialLinks.linkedin,
        logo: <Linkedin />,
        color: "#0072b1"
      }
    },
    {
      title: "website",
      data: {
        url: socialLinks.website,
        logo: <Globe />,
        color: ""
      }
    }
  ];

  return (
    <Section id="socials-overview">
      <h1 className="leading-snug tracking-tight font-bold text-4xl">
        {"Connect with organizers"}
      </h1>
      <div className={cn("social-links-container grid grid-cols-2 gap-6 mt-12 max-md:grid-cols-1")}>
        {OverviewSocialLinksData.map((social, index) => {
          if (social.data.url) {
            return (
              <SocialBlock
                url={social.data.url as string}
                logo={social.data.logo}
                color={social.data.color}
                title={social.title}
                hackathonName={socialLinks.hackathonTitle}
              />
            )
          } else {
            return <></>
          }
        })}
      </div>
    </Section>
  )
}

const SocialBlock = ({
  url,
  logo,
  color,
  title,
  hackathonName
}: { url: string; logo: React.ReactNode; color: string; title: string; hackathonName: string; }) => {
  return (
    <CardContainer className={cn("social-block")}>
      <CardContainer
        style={{
          backgroundColor: color || "#6D6D6D"
        }}
        className={cn("border-none w-fit mb-6 text-white")}
      >
        {logo}
      </CardContainer>
      <h3 className={cn("text-2xl font-bold capitalize")}>
        {title}
      </h3>
      <span className={cn("text-zinc-400")}>
        {`${hackathonName}'s`}{" "}
        <span className="capitalize">{title}</span>
      </span>
      <Button
        onClick={() => {
          if (title !== "email") {
            window.open(url)
          } else {
            window.open(`mailto:${url}`)
          }
        }}
        stretch
        className="mt-4"
        variant="secondary"
      >
        {url}
      </Button>
    </CardContainer>
  )
}

export { Overview };
