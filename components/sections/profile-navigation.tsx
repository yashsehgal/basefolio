import { cn } from "@/helpers";
import { Button } from "../ui";
import { UserCircle2, GraduationCap, Briefcase, Link, User } from "lucide-react";

const ProfileNavigationOptionsData: Array<{
  title: string;
  value: ProfileViewTabsType;
  icon: React.ReactNode;
}> = [
    {
      title: "About",
      value: "about",
      icon: <UserCircle2 className="w-4 h-4" />,
    },
    {
      title: "Education",
      value: "education",
      icon: <GraduationCap className="w-4 h-4" />,
    },
    {
      title: "Experience",
      value: "experience",
      icon: <Briefcase className="w-4 h-4" />,
    },
    {
      title: "Links",
      value: "links",
      icon: <Link className="w-4 h-4" />,
    },
    {
      title: "Account Settings",
      value: "account-settings",
      icon: <User className="w-4 h-4" />
    }
  ];

const ProfileNavigation: React.FunctionComponent<ProfileNavigationProps> = ({
  className,
  selectedTab,
  setSelectedTab,
  ...props
}) => {
  return (
    <nav
      className={cn(
        "profile-navigation h-[100svh] border-r",
        "w-1/5 pt-4 pb-4 pl-4 bg-white",
        "max-md:w-full max-md:h-fit max-md:border-r-0 max-md:border-t max-md:absolute max-md:bottom-0 max-md:left-0 max-md:px-4 max-md:py-3",
        "max-lg:w-full max-lg:h-fit max-lg:border-r-0 max-lg:border-b max-lg:px-4 max-lg:py-3",
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "profile-options-wrapper grid grid-cols-1 w-full gap-4",
          "max-lg:flex max-lg:flex-row max-lg:overflow-x-scroll max-lg:justify-center",
          "max-md:gap-2",
        )}
      >
        {ProfileNavigationOptionsData.map((option, index) => {
          return (
            <Button
              key={index}
              className={cn(
                "lg:justify-start lg:rounded-r-none",
                selectedTab === option.value && "",
                selectedTab !== option.value && "border-transparent",
              )}
              variant={selectedTab === option.value ? "primary" : "solid"}
              onClick={() => setSelectedTab(option.value)}
            >
              <span className="profile-option-icon-wrapper">{option.icon}</span>
              <span className="profile-option-title-wrapper hidden md:block">
                {option.title}
              </span>
            </Button>
          );
        })}
      </div>
    </nav>
  );
};

export { ProfileNavigation };
