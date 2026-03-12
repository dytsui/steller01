import { MobileNav } from "@/components/nav/mobile-nav";
import { Topbar } from "@/components/nav/topbar";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-shell">
      <Topbar />
      {children}
      <MobileNav />
    </div>
  );
}
