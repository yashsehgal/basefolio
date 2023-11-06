"use client";
import { HackathonMicrositeLayout } from "@/components/layouts";
import {
  Overview,
  Schedule,
} from "@/components/sections/hackathon-microsite-tabs";
import { Button } from "@/components/ui";
import { cn } from "@/helpers";
import { fetchHackathonData } from "@/middleware";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const HackathonMicrositeTabs: Array<{
  value: HackathonMicrositeTabType;
  title: string;
}> = [
    { value: "overview", title: "Overview" },
    { value: "schedule", title: "Schedule" },
    { value: "projects", title: "Projects" },
    { value: "builders", title: "Builders" },
  ];

const HackathonMicrosite: React.FunctionComponent = () => {
  const pathname = usePathname();
  const slug = pathname.replace("/hackathons/", "");

  const [hackathonData, setHackathonData] = useState<HackathonInterface>();

  const [micrositeTab, setMicrositeTab] =
    useState<HackathonMicrositeTabType>("overview");

  useEffect(() => {
    async function fetchData() {
      const data = await fetchHackathonData(slug);
      setHackathonData(data);
    }
    fetchData();
  }, [slug]);

  return (
    <>
      <HackathonMicrositeLayout hackathonData={hackathonData}>
        <HackathonMicrositeTabNavigation
          micrositeTab={micrositeTab}
          setMicrositeTab={setMicrositeTab}
        />
        <div className={"microsite-content-container mt-6"}>
          {micrositeTab === "overview" && (
            <Overview {...(hackathonData as any)} />
          )}
          {micrositeTab === "schedule" && (
            <Schedule {...(hackathonData as any)} />
          )}
        </div>
      </HackathonMicrositeLayout>
    </>
  );
};

interface HackathonMicrositeTabNavigationProps {
  micrositeTab: HackathonMicrositeTabType;
  setMicrositeTab: (tab: HackathonMicrositeTabType) => void;
}

const HackathonMicrositeTabNavigation: React.FunctionComponent<
  HackathonMicrositeTabNavigationProps
> = ({ micrositeTab, setMicrositeTab }) => {
  return (
    <div
      className={cn(
        "sub-navigation-actions-wrapper border flex flex-row items-center justify-center w-full bg-white p-2 rounded-2xl max-sm:grid max-sm:grid-cols-2 max-sm:gap-2",
      )}
    >
      {HackathonMicrositeTabs.map((option, index) => {
        return (
          <Button
            key={index}
            variant={micrositeTab === option.value ? "primary" : "secondary"}
            className={cn(
              micrositeTab !== option.value && "shadow-none hover:shadow-none",
              "uppercase text-sm",
            )}
            onClick={() => setMicrositeTab(option.value)}
          >
            {option.title}
          </Button>
        );
      })}
    </div>
  );
};

export default HackathonMicrosite;
