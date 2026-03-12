import type { Metadata } from "next";
import "@/app/globals.css";
import { Providers } from "@/app/providers";
import { AppShell } from "@/components/shell/app-shell";

export const metadata: Metadata = {
  title: "steller01",
  description: "Cloudflare-first structured golf swing analysis and coaching product.",
  icons: {
    icon: "/brand/favicon.svg"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}
