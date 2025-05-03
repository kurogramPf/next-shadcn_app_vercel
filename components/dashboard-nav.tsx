"use client";

import { SidebarNavItem } from "@/types";
import Link from "next/link";
// Icon as Icons asキーワードを使うことで、インポートする際に別の名前をつけられる
import { Icon as Icons } from "./icon";
import { usePathname } from "next/navigation";

// interfaceで定義しなおして、SidebarNavItemの型定義を指定する
interface DashboardConfigProps {
  items: SidebarNavItem[];
}

export default function DashboardNav({ items }: DashboardConfigProps) {
  const path = usePathname();

  // itemsが空の時はnullを返す
  if (items.length === 0) {
    return null;
  }

  return (
    <nav>
      {items.map((item, index) => {
        // item.icon が Icons オブジェクトのキーであることを TypeScript に明示的に伝えるために、型アサーションを使用
        const Icon = Icons[(item.icon as keyof typeof Icons) || "arrowRight"];

        // returnは{}カッコの中で指定できる
        return (
          // !をつけることで、item.hrefがundefinedでないことを保証する
          <Link href={item.href!} key={index}>
            <span
              className={`flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground ${path === item.href ? "bg-accent" : "bg-trancsparent"}`}
            >
              <Icon className="mr-2 h-4 w-4" />
              {item.title}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
