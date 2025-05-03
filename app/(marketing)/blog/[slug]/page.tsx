import { allPosts } from "@/.contentlayer/generated";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import Mdx from "@/components/ui/mdx-component";
import { Metadata } from "next";
import { SiteConfig } from "@/config/site";

// getPostFromSlug(slug(slag)のslagは現在のページのファイル名となる
async function getPostFromSlug(slug: string) {
  // ページのURLのslugと一致するpostを取得する
  // find()はコールバック関数を引数に持ちます。
  // booleanとなる条件を設定し、条件を満たした場合、配列内の一番最初の要素のみ返します。
  const post = allPosts.find((post) => post.slugAsParams === slug);

  return post;
}

// generateMetadataコンポーネントの引数にparamsを受け取り個別のページの情報を取得する
// Promise <Metadata>は、非同期関数であることを示すためにPromiseを使用しています。
export async function generateMetadata({params}: {params: {slug: string}}): Promise<Metadata> {
  const page =  await getPostFromSlug(params.slug);

  if(!page) {
    return {};
  }

  return {
    title: page.title,
    description: page.description,
    openGraph: {
      type: "article",
      locale: "ja",
      url: SiteConfig.url,
      title: SiteConfig.name,
      description: SiteConfig.description,
      siteName: SiteConfig.name,
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
};

// PostPageコンポーネントの引数にparamsを受け取り個別のページの情報を取得する
export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params.slug;
  const post = await getPostFromSlug(slug);
  if (!post) {
    notFound();
  }

  return (
    <article className="container mx-auto max-w-4xl px-4 py-6 lg:py-10">
      <div>
        {post.date && (
          <time>Published on {format(post.date, "yyy/MM/dd")}</time>
        )}
        <h1 className="mt-2 text-4xl font-extrabold leading-tight lg:text-5xl">
          {post.title}
        </h1>
      </div>
      {post.image && (
        <Image
          src={post.image}
          alt={post.title}
          width={720}
          height={405}
          className="bg-muted my-8 rounded-md border w-full"
        />
      )}
      {/* 下記でもHTMLを呼び出せるが、セキュリティの面で推奨できない */}
      {/* <div
        // dangerouslySetInnerHTMLはクロスサイトスクリプティング(XSS)攻撃を受ける可能性があるので注意が必要
        dangerouslySetInnerHTML={{ __html: post.body.html }}
      /> */}
      <Mdx code={post.body.code} />
      <hr className="mt-12" />
      <div className="py-6 text-center lg:py-10">
        <Link
          href={"/blog"}
          className={cn(buttonVariants({ variant: "ghost" }))}
        >
          全ての記事を見る
        </Link>
      </div>
    </article>
  );
}
