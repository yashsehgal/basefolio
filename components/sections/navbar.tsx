import { cn } from "@/helpers"
import { ViewContainer } from "../layouts"
import { BasefolioLogo, Button } from "../ui"
import Link from "next/link"
import { BASEROUTE } from "@/common"
import { fetchFeaturedHackathon } from "@/middleware"

/**
 * Constructs the navbar for desktop & mobile views
 * @returns {React.ReactNode} Navigation bar
 */
const Navbar: React.FunctionComponent<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}): React.ReactNode => {
  return (
    <nav className={cn("navbar py-6", className)} {...props}>
      <ViewContainer className="flex flex-row items-center justify-between">
        <Link href={BASEROUTE}>
          <BasefolioLogo responsiveForMobileView />
        </Link>
        <div className="navbar-options-container">
          <NavbarOptions />
        </div>
        <div className="navbar-cta-actions-container">
          <NavbarActions />
        </div>
      </ViewContainer>
    </nav>
  )
}

const NavbarOptionsData: Array<NavbarOptionInterface> = [
  { title: "about", path: "/about" },
  { title: "hackathons", path: "/hackathons" },
  { title: "hackers", path: "/explore-hackers" }
]

/**
 * Constructs the navbar options for desktop & mobile views
 * @returns {React.ReactNode} Navigation Options
 */
const NavbarOptions: React.FunctionComponent<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}): React.ReactNode => {
  return (
    <div className={cn("navigation-options-wrapper w-fit", className)} {...props}>
      <ul className={cn("navigation-options-list flex flex-row items-center justify-center gap-6")}>
        {NavbarOptionsData.map((option, index) => {
          return (
            <Link
              href={option.path}
              className="w-fit h-auto text-zinc-500 hover:text-zinc-600"
              key={index}
            >
              <li>{option.title}</li>
            </Link>
          )
        })}
      </ul>
    </div>
  )
}

const NavbarActions: React.FunctionComponent<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}): React.ReactNode => {
  return (
    <div className={cn("navbar-actions-wrapper flex flex-row items-center justify-end gap-3", className)} {...props}>
      <Button variant="secondary">
        Login
      </Button>
      <Button>
        Get started
      </Button>
    </div>
  )
}

export {
  Navbar
}