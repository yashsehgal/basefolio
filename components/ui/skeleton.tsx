import { cn } from "@/helpers";
import Skeleton, { SkeletonProps } from "react-loading-skeleton";

const SkeletonContent: React.FunctionComponent<SkeletonProps> = ({
  count = 1,
  className,
  ...props
}) => {
  return (
    <Skeleton
      count={count}
      className={cn("", className)}
      {...props}
    />
  )
};

export {
  SkeletonContent
}