import DashBoardHeader from "@/components/dashboard-header";
import DashBoardShell from "@/components/dashboard-shell";
import PostCriateButton from "@/components/post-criate-button";
import PostItem from "@/components/post-item";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  // ↓spabaseのデータを取得する
  // findMany({})で全てのデータを取得
  const posts = await db.post.findMany({
    // where: {}で条件を指定する
    where: {
      authorId: user.id,
    },
    // ↓取得する記事の情報を指定できる
    select: {
      id: true,
      title: true,
      published: true,
      createdAt: true,
    },
    // orderByで並び替えを指定できる
    orderBy: {
      // descは最新順に並び替え
      updateAt: "desc",
    },
  });

  return (
    <DashBoardShell>
      <DashBoardHeader heading="記事投稿" text="記事の投稿と管理">
        <PostCriateButton />
      </DashBoardHeader>
      <div>
        {posts.length ? (
          <div className="divide-y rounded-md border">
            {posts.map((post) => (
              <PostItem key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="ml-2">投稿がありません。</div>
        )}
      </div>
    </DashBoardShell>
  );
}
