"use client";

import { Camera, ClipboardList, Dumbbell, House, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const items = [
  { href: "/", label: "Home", icon: House },
  { href: "/capture", label: "Capture", icon: Camera },
  { href: "/records", label: "Records", icon: ClipboardList },
  { href: "/training", label: "Training", icon: Dumbbell },
  { href: "/students", label: "Students", icon: Users }
];

export function MobileNav() {
  const pathname = usePathname();
  return (
    <nav className="mobile-nav">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <Link key={item.href} href={item.href} className={cn(pathname === item.href && "active")}>
            <Icon size={18} />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
