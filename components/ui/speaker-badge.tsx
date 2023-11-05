import { cn } from "@/helpers"
import Image from "next/image"
import Link from "next/link"

const SpeakerBadge: React.FunctionComponent<SpeakerBadgeProps> = ({
  speakerProfileImage = "",
  speakerURL = "",
  className,
  children,
  ...props
}) => {
  if (speakerURL) {
    return (
      <Link href={speakerURL} target="_blank">
        <div
          className={cn("speaker-badge w-fit h-auto flex flex-row items-center justify-center gap-2 rounded-full border",
            "p-2 pr-3 text-sm"
          )}
          {...props}
        >
          {speakerProfileImage && <Image
            src={speakerProfileImage}
            width={"24"}
            height={"24"}
            alt={children?.toString() ?? 'speaker-image'}
            loading="lazy"
            className={cn("w-[24px] h-[24px] rounded-full")}
          />}
          {children}
        </div>
      </Link>
    )
  } else {
    return (
      <div
        className={cn("speaker-badge w-fit h-auto flex flex-row items-center justify-center gap-2 rounded-full border",
          "p-2 pr-3 text-sm"
        )}
        {...props}
      >
        {speakerProfileImage && <Image
          src={speakerProfileImage}
          width={"24"}
          height={"24"}
          alt={children?.toString() ?? 'speaker-image'}
          loading="lazy"
          className={cn("w-[24px] h-[24px] rounded-full")}
        />}
        {children}
      </div>
    )
  }
}

export {
  SpeakerBadge
}