'use client';
import { cn } from "@/helpers";
import { ViewContainer } from "../layouts";
import { AuthView, BasefolioLogo, Button, UI } from "../ui";
import Link from "next/link";
import { BASEROUTE } from "@/common";
import { useState } from "react";

/**
 * Constructs the navbar for desktop & mobile views
 * @returns {React.ReactNode} Navigation bar
 */
const Navbar: React.FunctionComponent<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  return (
    <nav className={cn("navbar py-4 border-b", className)} {...props}>
      <ViewContainer className="flex flex-row items-center justify-between max-md:flex mx-md:flex-row max-md:justify-between max-md:gap-6">
        <div className="flex flex-row items-center justify-start gap-8">
          <Link href={BASEROUTE}>
            <BasefolioLogo responsiveForMobileView />
          </Link>
          <NavbarOptions />
        </div>
        <div className="navbar-cta-actions-container">
          <NavbarActions />
        </div>
      </ViewContainer>
    </nav>
  );
};

const NavbarOptionsData: Array<NavbarOptionInterface> = [
  { title: "home", path: "/home" },
  { title: "blogs", path: "/blogs" },
];

/**
 * Constructs the navbar options for desktop & mobile views
 * @returns {React.ReactNode} Navigation Options
 */
const NavbarOptions: React.FunctionComponent<
  React.HTMLAttributes<HTMLDivElement>
> = ({ className, ...props }): React.ReactNode => {
  return (
    <div
      className={cn(
        "navigation-options-wrapper w-fit max-md:hidden",
        className,
      )}
      {...props}
    >
      <ul
        className={cn(
          "navigation-options-list flex flex-row items-center justify-center gap-4",
        )}
      >
        {NavbarOptionsData.map((option, index) => {
          return (
            <Link
              href={option.path}
              className="w-fit h-auto text-zinc-500 hover:text-zinc-600"
              key={index}
            >
              <li>{option.title}</li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

const NavbarActions: React.FunctionComponent<
  React.HTMLAttributes<HTMLDivElement>
> = ({ className, ...props }): React.ReactNode => {
  return (
    <>
      <div
        className={cn(
          "navbar-actions-wrapper flex flex-row items-center justify-end gap-3",
          className,
        )}
        {...props}
      >
        <UI.Dialog>
          <UI.DialogTrigger asChild>
            <Button variant="secondary">Login</Button>
          </UI.DialogTrigger>
          <UI.DialogOverlay>
            <AuthView />
          </UI.DialogOverlay>
        </UI.Dialog>
        <UI.Dialog>
          <UI.DialogTrigger asChild>
            <Button>Create account</Button>
          </UI.DialogTrigger>
          <UI.DialogOverlay>
            <AuthView />
          </UI.DialogOverlay>
        </UI.Dialog>
      </div>
    </>
  );
};

export { Navbar };
