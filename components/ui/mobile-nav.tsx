import { SiteConfig } from "@/config/site";
import { NavItemType } from "@/types";
import { useLockBodyScroll } from "@uidotdev/usehooks";
import Link from "next/link";

interface MobileNavProps {
  items?: NavItemType[];
}

export default function MobileNav({ items }: MobileNavProps) {
  useLockBodyScroll();

  return (
    <div className="animate-in slide-in-from-bottom-80 fixed inset-0 top-16 z-50 p-6 md:hidden">
      <div className="bg-popover text-popover-foreground grid gap-6 p-4 shadow-md">
        <Link href={"/"} className="font-bold">
          {SiteConfig.name}
        </Link>
        <nav className="flex gap-4 text-sm">
          {items?.map((item, index) => (
            <Link key={index} href={item.href} className="font-bold">
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
