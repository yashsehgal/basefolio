import { cn } from "@/helpers";
import { LucideIcon } from "lucide-react";
import React, { forwardRef } from "react";

const EmptyState: React.FunctionComponent<
  React.HTMLAttributes<HTMLDivElement> & { icon: LucideIcon }
> = ({ children, className, icon, ...props }) => {
  const IconRender = icon;
  return (
    <div
      className={cn(
        "empty-state cursor-default select-none flex flex-col items-center justify-center gap-4 text-zinc-300 my-12 w-full",
        className,
      )}
      {...props}
    >
      <IconRender className="w-[80px] h-auto" />
      <div className="w-[80%] mx-auto text-center">{children}</div>
    </div>
  );
};

export { EmptyState };
