import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md";
};

export function Logo({ className, showText = true, size = "md" }: LogoProps) {
  const iconSize = size === "sm" ? "h-8 w-8 text-sm" : "h-9 w-9 text-base";

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <span
        className={cn(
          "flex items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 font-bold text-white shadow-lg shadow-violet-500/25",
          iconSize,
        )}
      >
        P
      </span>
      {showText && (
        <span className="text-lg font-bold tracking-tight text-slate-900">
          Pitch<span className="text-violet-600">Draft</span>
        </span>
      )}
    </div>
  );
}
