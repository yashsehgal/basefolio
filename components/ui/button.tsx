import { cn } from "@/helpers"

const Button: React.FunctionComponent<ButtonProps> = ({
  className,
  children,
  variant = "primary",
  size = "medium",
  icon = "",
  iconPosition = "start",
  stretch = false,
  ...props
}) => {
  return (
    <button
      className={cn(
        // default button properties for all the variants and sizes
        "flex flex-row items-center justify-center gap-2 border hover:scale-105 transition-all shadow-zinc-200",
        // classes for different button variants
        (variant === "primary" && "bg-zinc-800 text-zinc-100 border-transparent hover:bg-zinc-700"),
        (variant === "secondary" && "bg-white text-zinc-800 border-transparent"),
        (variant === "solid" && "bg-transparent text-zinc-600 border-zinc-600 hover:bg-zinc-50"),
        (variant === "destructive" && "bg-red-400 text-red-50 border-transparent hover:bg-red-300"),
        // classes for different button sizes
        (size === "small" && "font-normal px-3 py-1.5 rounded-xl text-sm shadow-sm hover:shadow"),
        (size === "medium" && "font-medium px-6 py-2.5 rounded-xl text-base shadow-md hover:shadow-lg"),
        (size === "large" && "font-medium px-8 py-3.5 rounded-2xl text-lg shadow-xl hover:shadow-2xl"),
        // conditional check for "stretch"
        stretch && "w-full"
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export {
  Button
}