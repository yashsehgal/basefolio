import { cn } from "@/helpers"
import { Section, ViewContainer } from "."
import { Navbar } from "../sections/navbar"
import { SubNavigation } from "../sections/sub-navigation"

const Layout: React.FunctionComponent<LayoutProps> = ({
  className,
  hideFooter = false,
  hideNavigation = false,
  forMicrosite = false,
  children,
  hideSubNavigation = false,
  ...props
}) => {
  return (
    <div className={cn("layout", className)} {...props}>
      {!hideNavigation && <Navbar />}
      {!hideSubNavigation && <SubNavigation />}
      <Section>
        <ViewContainer>
          {children}
        </ViewContainer>
      </Section>
    </div>
  )
}

export {
  Layout
}