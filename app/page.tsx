import { ExploreHackathonsSection, FeaturedHackathonSection } from "@/components/sections";
import { RemoteHackathonsSection } from "@/components/sections/remote-hackathons";

const MainView: React.FunctionComponent = () => {
  return (
    <>
      <FeaturedHackathonSection />
      <ExploreHackathonsSection />
      <RemoteHackathonsSection />
    </>
  )
}

export default MainView;