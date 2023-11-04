import { Layout } from "@/components/layouts";
import { ExploreHackathonsSection, FeaturedHackathonSection } from "@/components/sections";

const MainView: React.FunctionComponent = () => {
  return (
    <>
      <FeaturedHackathonSection />
      <ExploreHackathonsSection />
    </>
  )
}

export default MainView;