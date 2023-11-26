import { cn } from "@/helpers";
import { ProfileNavigation } from "../sections";
import { ViewContainer } from ".";

const ProfileViewLayout: React.FunctionComponent<ProfileViewLayoutProps> = ({
  className,
  children,
  selectedTab,
  setSelectedTab,
  ...props
}) => {
  return (
    <div
      className={cn(
        "profile-view-layout flex flex-row items-start max-lg:flex-col",
        className,
      )}
      {...props}
    >
      <ProfileNavigation
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      // className="fixed"
      />
      <ViewContainer className="py-8" forProfileView>
        {children}
      </ViewContainer>
    </div>
  );
};

export { ProfileViewLayout };
