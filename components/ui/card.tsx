import { cn } from "@/helpers";

const CardContainer: React.FunctionComponent<
  CardProps
> = ({ className, withSeparator = false, title = "", subtitle = "", children, ...props }) => {
  return (
    <div
      className={cn(
        "card-container bg-white p-6 rounded-xl border border-zinc-200/90 shadow-md shadow-zinc-200/80",
        withSeparator && "p-0",
        className,
      )}
      {...props}
    >
      {withSeparator && <header className="card-header p-6 flex flex-col items-start gap-1 border-b">
        {title && <h3 className="font-semibold text-2xl">{title}</h3>}
        {subtitle && <p className="text-zinc-400 text-sm">{subtitle}</p>}
      </header>}
      {withSeparator && <div className="p-6">{children}</div>}
      {!withSeparator && children}
    </div>
  );
};

export { CardContainer };
