import { cn } from "@/helpers"
import { BadgeCheck } from "lucide-react"
import Image from "next/image"

const FeaturedBuilderCard: React.FunctionComponent<FeaturedBuilderCardProps> = ({
  className,
  profileImage,
  username,
  firstName,
  lastName,
  isVerified = false,
  ...props
}) => {
  return (
    <div className={cn("featured-builder-card relative",
      "rounded-2xl shadow-md w-[200px] h-[200px] overflow-hidden",
      "flex flex-row items-center justify-center",
      "grayscale hover:grayscale-0 transition-all",
      className
    )} {...props}>
      <Image
        src={profileImage}
        width={"200"}
        height={"200"}
        alt={`${username}-profile`}
      />
      <div className={cn("featured-profile-content-wrapper absolute bottom-0 left-0",
        "bg-gradient-to-t from-black",
        "px-3 pb-3 pt-6 w-full h-fit"
      )}>
        <h2 className="text-white font-bold text-2xl">
          <span className="firstName-wrapper">{firstName}</span>
          {lastName && <>
            <br />
            <span className="flex flex-row items-center gap-1.5">
              <span className="lastName-wrapper">{lastName}</span>
              {isVerified && (
                <BadgeCheck className="fill-blue-500 h-4 w-4" />
              )}
            </span>
          </>}
        </h2>
      </div>
    </div>
  )
}

export {
  FeaturedBuilderCard
}