import SiteFooter from "@/components/site-footer";
import { buttonVariants } from "@/components/ui/button";
import MainNav from "@/components/ui/main-nav";
import { marketingConfig } from "@/config/marketing";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Metadata } from "next/types";
import React from "react";

// ↓子要素のタイトルを追加する場合の指定
// export const metadata: Metadata = {
//   title: "marketing",
// };

function Header() {
  return (
    <header className="bg-background container z-40 mx-auto px-4">
      <div className="flex h-20 items-center justify-between py-6">
        {/* ↓インポートしたコンポーネント内の処理の呼び出しは.処理名で呼び出す */}
        <MainNav items={marketingConfig.mainNav} />
        <nav>
          <Link
            href={"/login"}
            className={
              (cn(buttonVariants({ variant: "secondary", size: "sm" })), "px-4")
            }
          >
            ログイン
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
