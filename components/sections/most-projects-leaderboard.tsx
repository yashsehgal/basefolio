"use client";
import { useEffect, useState } from "react";
import { CardContainer } from "../ui";
import { BuilderRowCard } from "../ui/builder-row-card";
import { fetchMostProjects } from "@/middleware";

const MostProjectsLeaderboard: React.FunctionComponent = () => {
  const [leaderboard, setLeaderboard] = useState<Array<BuilderInterface>>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchMostProjects();
      setLeaderboard(data);
    }
    fetchData();
  }, []);

  return (
    <CardContainer
      className="most-projects-leaderboard"
      style={{
        backgroundImage: `url('/exotic-workspace.jpeg')`,
      }}
    >
      <h2 className="text-white font-semibold text-2xl">
        {"Most projects submitted"}
      </h2>
      <div className="grid grid-cols-1 gap-4 mt-8">
        {leaderboard.map((builder, index) => {
          return (
            <BuilderRowCard
              {...builder}
              key={index}
              id={index}
              hideTeamType
              hideViewProfileButton
              className="p-4 shadow-none bg-opacity-30"
              role="button"
            />
          );
        })}
      </div>
    </CardContainer>
  );
};

export { MostProjectsLeaderboard };
