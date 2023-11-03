import { cn } from "@/helpers"
import { Section, ViewContainer } from "."
import { Navbar } from "../sections/navbar"

const Layout: React.FunctionComponent<LayoutProps> = ({
  className,
  hideFooter = false,
  hideNavigation = false,
  forMicrosite = false,
  children,
  ...props
}) => {
  return (
    <div className={cn("layout", className)} {...props}>
      {!hideNavigation && <Navbar />}
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