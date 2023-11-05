'use client';
import { Section } from "@/components/layouts";
import { HackathonMicrositeLayout } from "@/components/layouts";
import { fetchHackathonData } from "@/middleware";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import Markdown from 'react-markdown';

const HackathonMicrosite: React.FunctionComponent = () => {
  const pathname = usePathname();
  const slug = pathname.replace('/hackathons/', '');

  const [hackathonData, setHackathonData] = useState<HackathonInterface>();

  useEffect(() => {
    async function fetchData() {
      const data = await fetchHackathonData(slug);
      setHackathonData(data);
    }
    fetchData();
  }, []);

  return (
    <>
      <HackathonMicrositeLayout hackathonData={hackathonData}>
        <div className="overview-content-container">
          <div className="hackathon-desktop-banner mb-6">
            {hackathonData?.desktopBanner && <Image
              src={hackathonData?.desktopBanner}
              alt={hackathonData.title}
              width={"600"}
              height={"400"}
              className="w-full shadow-md rounded-2xl"
            />}
          </div>
          <h1 className="leading-snug tracking-tight font-semibold text-3xl">{"Overview"}</h1>
          <div className="overview-content-description-wrapper mt-8 text-justify w-[90%]">
            <Markdown className="leading-loose markdown">
              {hackathonData?.description}
            </Markdown>
          </div>
        </div>
      </HackathonMicrositeLayout>
    </>
  )
}

export default HackathonMicrosite;