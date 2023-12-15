import { cn } from "@/helpers";
import { BadgeCheck } from "lucide-react";
import Image from "next/image";
import { Button, UI } from ".";
import { motion } from "framer-motion";
import Markdown from "react-markdown";

const FeaturedBuilderCard: React.FunctionComponent<
  FeaturedBuilderCardProps
> = ({
  className,
  profileImage = "",
  username,
  firstName,
  lastName = null,
  isVerified = false,
  bio,
  ...props
}) => {
  return (
    <UI.Dialog>
      <UI.DialogTrigger asChild>
        <div
          className={cn(
            "featured-builder-card relative",
            "rounded-2xl shadow-md w-[200px] h-[200px] overflow-hidden",
            "flex flex-row items-center justify-center",
            className,
          )}
          {...props}
        >
          <Image
            src={profileImage}
            width={"200"}
            height={"200"}
            alt={`${username}-profile`}
            priority
          />
          <div
            className={cn(
              "featured-profile-content-wrapper absolute bottom-0 left-0",
              "bg-gradient-to-t from-black",
              "px-3 pb-3 pt-6 w-full h-fit",
            )}
          >
            <h2 className="text-white font-bold text-2xl">
              <span className="firstName-wrapper">{firstName}</span>
              {lastName && (
                <>
                  <br />
                  <span className="flex flex-row items-center gap-1.5">
                    <span className="lastName-wrapper">{lastName}</span>
                    {isVerified && (
                      <BadgeCheck className="fill-blue-500 h-4 w-4" />
                    )}
                  </span>
                </>
              )}
            </h2>
          </div>
        </div>
      </UI.DialogTrigger>
      <UI.DialogOverlay>
        <UI.DialogContent className="bg-zinc-900 border-zinc-800 shadow-2xl">
          <UI.DialogHeader>
            <UI.DialogTitle>
              <h1 className="leading-snug bg-gradient-to-t from-zinc-300 to-zinc-600 bg-clip-text text-transparent text-5xl flex flex-row items-center gap-2">
                {firstName}
                {lastName && (
                  <>
                    <span className="flex flex-row items-center gap-1.5">
                      {lastName}
                      {isVerified && (
                        <BadgeCheck className="fill-blue-500 h-8 w-8 text-white" />
                      )}
                    </span>
                  </>
                )}
              </h1>
            </UI.DialogTitle>
          </UI.DialogHeader>
          <div className="dialog-content-body my-6">
            <p className="uppercase font-semibold select-none cursor-default text-sm text-zinc-500 mb-2">
              {"FEATURED BIO"}
            </p>
            <Markdown className="text-zinc-400">{bio}</Markdown>
          </div>
          <UI.DialogFooter>
            <Button
              stretch
              className="bg-zinc-800 hover:shadow-none shadow-none"
            >
              {"View full profile"}
            </Button>
          </UI.DialogFooter>
        </UI.DialogContent>
      </UI.DialogOverlay>
    </UI.Dialog>
  );
};

export { FeaturedBuilderCard };
