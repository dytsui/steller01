import { cn } from "@/lib/utils";

export function Button({
  className,
  variant = "default",
  type = "button",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "primary" | "ghost" | "warn";
}) {
  return <button className={cn("button", variant, className)} type={type} {...props} />;
}
