"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/brand/logo";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", key: "nav.home" },
  { href: "/capture", key: "nav.capture" },
  { href: "/upload", key: "nav.upload" },
  { href: "/records", key: "nav.records" },
  { href: "/training", key: "nav.training" },
  { href: "/students", key: "nav.students" },
  { href: "/jobs", key: "nav.jobs" }
];

export function Topbar() {
  const pathname = usePathname();
  const { locale, setLocale, t } = useI18n();

  return (
    <header className="topbar">
      <div className="topbar-inner">
        <Logo />
        <nav className="nav-row">
          {links.map((link) => (
            <Link key={link.href} className={cn("nav-link", pathname === link.href && "active")} href={link.href}>
              {t(link.key)}
            </Link>
          ))}
        </nav>
        <div className="locale-switch" aria-label="locale switch">
          <button className={locale === "zh-CN" ? "active" : ""} onClick={() => setLocale("zh-CN")}>中</button>
          <button className={locale === "en" ? "active" : ""} onClick={() => setLocale("en")}>EN</button>
        </div>
      </div>
    </header>
  );
}
