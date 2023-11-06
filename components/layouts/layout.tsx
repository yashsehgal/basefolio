"use client";
import { cn } from "@/helpers";
import { Section, ViewContainer } from ".";
import { Navbar } from "../sections/navbar";
import { SubNavigation } from "../sections/sub-navigation";
import { usePathname } from "next/navigation";

const ROUTES_WITH_SUB_NAVIGATION = [
  "/",
  "/hackathons",
  "/projects",
  "/builders",
];

const Layout: React.FunctionComponent<LayoutProps> = ({
  className,
  hideFooter = false,
  hideNavigation = false,
  forMicrosite = false,
  children,
  hideSubNavigation = false,
  ...props
}): React.ReactNode => {
  const pathname = usePathname();
  return (
    <div className={cn("layout", className)} {...props}>
      {!hideNavigation && <Navbar />}
      {!hideSubNavigation && ROUTES_WITH_SUB_NAVIGATION.includes(pathname) && (
        <SubNavigation />
      )}
      <Section>
        <ViewContainer>{children}</ViewContainer>
      </Section>
    </div>
  );
};

export { Layout };
