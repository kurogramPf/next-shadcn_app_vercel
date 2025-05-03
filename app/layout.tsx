import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SiteConfig } from "@/config/site";
import { Toaster } from "@/components/ui/toaster";

// フォント設定
const fontNotoSansJP = Noto_Sans_JP({ subsets: ["latin"] });

// metaデータの設定
export const metadata: Metadata = {
  title: {
    default: SiteConfig.name,
    // %s指定により子のlayout.tsxで指定したものが定期用される。
    template: `%s | ${SiteConfig.name}`,
  },
  description: SiteConfig.description,
  keywords: ["Next.js", "React", "Tailwind CSS", "shadcn/ui"],
  authors: [
    {
      name: "make name",
      url: SiteConfig.url,
    },
  ],
  metadataBase: new URL(SiteConfig.url),
  openGraph: {
    type: "website",
    locale: "ja",
    url: SiteConfig.url,
    title: SiteConfig.name,
    description: SiteConfig.description,
    siteName: SiteConfig.name,
    // images: [],
  },
  twitter: {
    card: "summary_large_image",
    title: SiteConfig.name,
    site: SiteConfig.url,
    description: SiteConfig.description,
    images: [`${SiteConfig.url}/og.jpg`],
    creator: "@producerName",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={cn(
          "min-h-screen bg-background antialiased",
          fontNotoSansJP.className
        )}
        suppressHydrationWarning={true}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
