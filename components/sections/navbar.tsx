"use client";
import { cn, deleteCookie, getCookie } from "@/helpers";
import { ViewContainer } from "../layouts";
import {
  AuthView,
  BasefolioLogo,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  UI,
} from "../ui";
import Link from "next/link";
import { BASEROUTE, INITIAL_USER_AUTHORIZATION } from "@/common";
import React, { useContext, useEffect, useState } from "react";
import { UserAuthenticationContext } from "@/contexts";
import Image from "next/image";

import { User, LogOut, Settings, Github, Users, Keyboard } from 'lucide-react';
import { useRouter } from "next/navigation";

/**
 * Constructs the navbar for desktop & mobile views
 * @returns {React.ReactNode} Navigation bar
 */
const Navbar: React.FunctionComponent<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  const { userData, setUserData } = useContext(UserAuthenticationContext);
  const [isJWTAvailable, setIsJWTAvailable] = useState<boolean>(false);

  useEffect(() => {
    if (getCookie('jwt').status === "success") {
      setIsJWTAvailable(true);
      // storing the cookie(ed) data in global context
      setUserData({
        ...userData,
        profileAvatar: getCookie('profileAvatar').data,
        fullName: {
          firstName: getCookie('firstName').data,
          lastName: getCookie('lastName').data
        },
        isAuthenticated: true,
        email: getCookie('email').data,
        username: getCookie('username').data,
        password: getCookie('password').data,
      })
    }
  }, []);

  return (
    <nav className={cn("navbar py-4 border-b", className)} {...props}>
      <ViewContainer className="flex flex-row items-center justify-between max-md:flex mx-md:flex-row max-md:justify-between max-md:gap-6">
        <div className="flex flex-row items-center justify-start gap-8">
          <Link href={BASEROUTE}>
            <BasefolioLogo responsiveForMobileView />
          </Link>
          <NavbarOptions />
        </div>
        {(!userData.isAuthenticated && !isJWTAvailable) && (
          <div className="navbar-cta-actions-container">
            <NavbarActions />
          </div>
        )}
        {(userData.isAuthenticated || isJWTAvailable) && (
          <div className="navbar-user-actions-container">
            <NavbarUserActions userData={userData} setUserData={setUserData} />
          </div>
        )}
      </ViewContainer>
    </nav>
  );
};

const NavbarUserActions: React.FunctionComponent<
  React.HTMLAttributes<HTMLDivElement> & { userData: AuthorizedUserType; setUserData: (data: AuthorizedUserType) => void }
> = ({ userData, setUserData, className, ...props }) => {

  const router = useRouter();

  const handleLogOut = () => {
    // removing JWT and user detail cookies
    ['jwt', 'firstName', 'lastName',
      'username', 'profileAvatar', 'email',
      'password'].map((key: string) => {
        deleteCookie(key);
      });

    // restoring global context
    // setUserData(INITIAL_USER_AUTHORIZATION);

    //   // routing to base route
    window.location.href = "/";
  }

  return (
    <div
      className={cn(
        "navbar-actions-wrapper flex flex-row items-center justify-end gap-3",
        className,
      )}
      {...props}
    >
      <DropdownMenu>
        <DropdownMenuTrigger>
          {userData.profileAvatar && <Image
            src={userData.profileAvatar}
            width={"60"}
            height={"60"}
            className={cn("w-8 h-8 rounded-full cursor-pointer select-none")}
            alt={"avatar"}
          />}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>{userData.fullName.firstName}{" "}{userData.fullName.lastName}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Keyboard className="mr-2 h-4 w-4" />
              <span>Keyboard shortcuts</span>
              <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Users className="mr-2 h-4 w-4" />
              <span>Your Hackathons</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Github className="mr-2 h-4 w-4" />
            <span>GitHub</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogOut}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>

      </DropdownMenu>
    </div>
  );
};

const NavbarOptionsData: Array<NavbarOptionInterface> = [
  { title: "timeline", path: "/" },
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
          <AuthView initialView="login" />
        </UI.DialogOverlay>
      </UI.Dialog>
      <UI.Dialog>
        <UI.DialogTrigger asChild>
          <Button>Create account</Button>
        </UI.DialogTrigger>
        <UI.DialogOverlay>
          <AuthView initialView="create-account" />
        </UI.DialogOverlay>
      </UI.Dialog>
    </div>
  );
};

export { Navbar };
