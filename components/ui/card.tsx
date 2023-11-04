import { cn } from "@/helpers"

const CardContainer: React.FunctionComponent<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={cn("card-container bg-white p-6 rounded-xl border border-zinc-200/80 shadow-xl shadow-zinc-200",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export {
  CardContainer
}