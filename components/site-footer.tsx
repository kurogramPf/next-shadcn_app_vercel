import { SiteConfig } from "@/config/site";
import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer>
      <div className="container mx-auto px-4 py-10 md:h-20 md:py-0">
        <p className="text-center text-sm md:text-left">
          Build By {""}
          <Link
            href={SiteConfig.links.x}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4"
          >
            Xのリンク
          </Link>
          .Hosted on {""}
          <Link
            href={"https://vercel.com"}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4"
          >
            Vercel
          </Link>
        </p>
      </div>
    </footer>
  );
}
