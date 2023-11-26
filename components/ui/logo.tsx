import { BASEFOLIO_LOGO } from "@/common";
import { cn } from "@/helpers";
import Image from "next/image";

const BasefolioLogo: React.FunctionComponent<BasefolioLogoProps> = ({
  className,
  responsiveForMobileView = false,
  ...props
}) => {
  return (
    <div
      className={cn(
        "basefolio-logo-wrapper w-fit h-fit flex flex-row items-center justify-center gap-2",
      )}
      {...props}
    >
      <Image
        src={BASEFOLIO_LOGO}
        width={"24"}
        height={"24"}
        alt={"basefolio"}
        priority
      />
      <p
        className={cn(
          "font-medium text-base tracking-tight",
          responsiveForMobileView && "max-sm:hidden",
        )}
      >
        {"basefolio"}
      </p>
    </div>
  );
};

export { BasefolioLogo };
