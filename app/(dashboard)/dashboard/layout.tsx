import SiteFooter from "@/components/site-footer";
import DashboardNav from "@/components/dashboard-nav";
import MainNav from "@/components/ui/main-nav";
import { dashboardConfig } from "@/config/dashboard";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

// ↓子要素のタイトルを追加する場合の指定
// export const metadata: Metadata = {
//   title: "marketing",
// };

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between p-4">
        <MainNav items={dashboardConfig.mainNav} />
      </div>
    </header>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex min-h-screen flex-col space-y-6">
      <Header />
      {/* [200px_1fr]の1frは対比*/}
      <div className="container mx-auto grid flex-1 gap-12 px-4 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav items={dashboardConfig.sidebarNav} />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
      <SiteFooter />
    </div>
  );
}
