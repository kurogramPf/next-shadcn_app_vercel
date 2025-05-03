// useStateはクライアントコンポーネントなのでuse clientの記述が必要
"use client";

import { NavItemType } from "@/types";
import Link from "next/link";
import MobileNav from "./mobile-nav";
import { useState } from "react";

// interfaceはTypeScriptの型定義の一つで、オブジェクトの構造を定義するために使用される
// コンポーネントのPropsであるitemsに対して、NavItemType[]で型を指定
interface MainNavProps {
  items?: NavItemType[];
  children?: React.ReactNode;
}

export default function MainNav({ items }: MainNavProps) {
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);

  return (
    <div className="flex items-center md:gap-10">
      <Link href={"/"} className="hidden items-center space-x-2 md:flex">
        <span className="hidden font-bold sm:inline-block">Post Writer</span>
      </Link>
      <nav className="hidden gap-6 md:flex">
        {items?.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            //text-foregroundはapp/globals.cssで設定されたbaseカラーで、80%の透明度を持つ
            className="hover:text-foreground/80 text-lg font-medium sm:text-sm"
          >
            {item.title}
          </Link>
        ))}
      </nav>
      <button
        className="md:hidden"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        <span>メニュー</span>
      </button>
      {showMobileMenu && <MobileNav items={items} />}
    </div>
  );
}
