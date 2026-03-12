import { cn } from "@/lib/utils";

export function Badge({
  children,
  tone
}: {
  children: React.ReactNode;
  tone?: "mint" | "gold" | "danger";
}) {
  return <span className={cn("badge", tone)}>{children}</span>;
}
