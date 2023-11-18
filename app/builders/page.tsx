import { Section } from "@/components/layouts";
import {
  FeaturedBuildersSection,
  WinnerBuildersLeaderboard,
} from "@/components/sections";

const BuildersView: React.FunctionComponent = () => {
  return (
    <>
      <FeaturedBuildersSection />
      <Section>
        <header className="flex flex-row items-center justify-between mb-12">
          <h1 className="leading-snug text-3xl font-medium tracking-tight max-md:text-lg">
            {"Builders Leaderboard"}
          </h1>
        </header>
        <div className="grid grid-cols-2 max-lg:grid-cols-1">
          <WinnerBuildersLeaderboard />
        </div>
      </Section>
    </>
  );
};

export default BuildersView;
