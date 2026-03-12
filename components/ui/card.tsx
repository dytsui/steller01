import { cn } from "@/lib/utils";

export function Card({
  className,
  padded = true,
  children
}: {
  className?: string;
  padded?: boolean;
  children: React.ReactNode;
}) {
  return <div className={cn("card", padded && "pad", className)}>{children}</div>;
}
