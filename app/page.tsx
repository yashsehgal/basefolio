import { Layout } from "@/components/layouts";
import { ExploreHackathonsSection, FeaturedHackathonSection } from "@/components/sections";

const MainView: React.FunctionComponent = () => {
  return (
    <Layout>
      <FeaturedHackathonSection />
      <ExploreHackathonsSection />
    </Layout>
  )
}

export default MainView;