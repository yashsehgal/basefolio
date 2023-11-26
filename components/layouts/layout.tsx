"use client";
import { cn } from "@/helpers";
import { Section, ViewContainer } from ".";
import { Navbar } from "../sections/navbar";
import { SubNavigation } from "../sections/sub-navigation";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useKeyboardAccessibility } from "@/contexts";

const ROUTES_WITH_SUB_NAVIGATION = [
  "/",
  "/hackathons",
  "/projects",
  "/builders",
];

const ROUTES_WITH_NO_VIEW_CONTAINER_CONROL = ["/profile"];

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
  const { handleKeyDown } = useKeyboardAccessibility();

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className={cn("layout", className)} {...props}>
      {!hideNavigation && <Navbar className={cn(ROUTES_WITH_NO_VIEW_CONTAINER_CONROL.includes(pathname) && "")} />}
      {!hideSubNavigation && ROUTES_WITH_SUB_NAVIGATION.includes(pathname) && (
        <SubNavigation />
      )}
      {ROUTES_WITH_NO_VIEW_CONTAINER_CONROL.includes(pathname) ? (
        <>{children}</>
      ) : (
        <Section>
          <ViewContainer>{children}</ViewContainer>
        </Section>
      )}
    </div>
  );
};

export { Layout };
