import Editor from "@/components/editor";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { Post, User } from "@prisma/client";
import { redirect } from "next/navigation";

interface EditorProps {
  params: {
    postId: string;
  };
}

// データベースからユーザー情報を取得する関数
async function getPostForUser(postId: Post["id"], userId: User["id"]) {
  // prisamaのfindFirst()を使用して、条件に一致する最初のレコードを取得する
  // findFirst()は、条件に一致する最初のレコードを取得する
  const post = await db.post.findFirst({
    where: {
      id: postId,
      authorId: userId,
    },
  });

  return post;
}

export default async function EditorPage({ params }: EditorProps) {
  const postId = params.postId;

  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }
  const userId = user?.id;

  const post = await getPostForUser(postId, userId);

  if (!post) {
    redirect("/404"); // 適切なリダイレクト先を指定
  }

  return (
    <Editor
      post={{
        id: post.id,
        title: post.title,
        content: post.content,
        published: post.published,
      }}
    />
  );
}
