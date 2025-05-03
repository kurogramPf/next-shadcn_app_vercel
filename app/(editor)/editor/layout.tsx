import SiteFooter from "@/components/site-footer";
import DashboardNav from "@/components/dashboard-nav";
import MainNav from "@/components/ui/main-nav";
import { dashboardConfig } from "@/config/dashboard";
import React from "react";

// ↓子要素のタイトルを追加する場合の指定
// export const metadata: Metadata = {
//   title: "marketing",
// };

export default function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto grid items-center gap-10 py-8">
      {children}
    </div>
  );
}
