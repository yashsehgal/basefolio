import { Section } from "@/components/layouts";
import Image from "next/image";
import Markdown from "react-markdown";

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
    </div>
  );
};



const OverviewSocialLinksContainer = (socialLinks: OverviewSocialLinksContainerProps) => {
  return (
    <Section id="socials-overview">

    </Section>
  )
}

export { Overview };
