"use client";
import { useEffect, useState } from "react";
import { CardContainer } from "../ui";
import { fetchWinningBuilders } from "@/middleware";
import { BuilderRowCard } from "../ui/builder-row-card";

const WinnerBuildersLeaderboard: React.FunctionComponent = () => {
  const [leaderboard, setLeaderboard] = useState<Array<BuilderInterface>>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchWinningBuilders();
      setLeaderboard(data);
    }
    fetchData();
  }, []);

  return (
    <CardContainer
      className="winner-builders-leaderboard"
      style={{
        backgroundImage: `url('/workspace.jpeg')`,
      }}
    >
      <h2 className="text-white font-semibold text-2xl">
        {"Most winning builders"}
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
              className="p-4 shadow-none"
              withDetails
              role="button"
            />
          );
        })}
      </div>
    </CardContainer>
  );
};

export { WinnerBuildersLeaderboard };
