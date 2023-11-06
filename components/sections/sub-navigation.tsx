"use client";
import { cn } from "@/helpers";
import { Button } from "../ui";
import { usePathname, useRouter } from "next/navigation";

type SubNavigationOptionType =
  | "discover"
  | "hackathons"
  | "builders"
  | "projects";

const SubNavigationOptions: Array<{
  title: string;
  value: SubNavigationOptionType;
  path: string;
  isComingSoon?: boolean;
}> = [
  {
    title: "discover",
    value: "discover",
    path: "/",
  },
  {
    title: "hackathons",
    value: "hackathons",
    path: "/hackathons",
  },
  {
    title: "builders",
    value: "builders",
    path: "/builders",
  },
  {
    title: "projects",
    value: "projects",
    path: "/projects",
  },
];

const SubNavigation: React.FunctionComponent<
  React.HTMLAttributes<HTMLDivElement>
> = ({ className, ...props }) => {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div
      className={cn(
        "sub-navigation py-4 border-b flex flex-row items-center justify-center",
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "sub-navigation-actions-wrapper border flex flex-row items-center justify-center w-fit bg-white p-2 rounded-2xl max-sm:grid max-sm:grid-cols-2 max-sm:gap-2 max-sm:w-auto",
        )}
      >
        {SubNavigationOptions.map((option, index) => {
          return (
            <Button
              key={index}
              variant={pathname === option.path ? "primary" : "secondary"}
              className={cn(
                pathname !== option.path && "shadow-none hover:shadow-none",
                "uppercase text-sm",
              )}
              onClick={() => router.push(option.path)}
            >
              {option.title}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export { SubNavigation };
