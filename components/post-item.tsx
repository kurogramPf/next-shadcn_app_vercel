import { Post } from "@prisma/client";
import { format } from "date-fns";
import Link from "next/link";
import PostOperations from "./post-operations";

interface PostItemProps {
  // Pick<T, Keys>指定した型内で定義したオブジェクトの一部を選択して利用できる
  post: Pick<Post, "id" | "title" | "published" | "createdAt">;
}

export default function PostItem({ post }: PostItemProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid gap-1">
        <Link
          href={`/editor/${post.id}`}
          className="font-semibold hover:underline"
        >
          {post.title}
        </Link>
        <div>
          <p className="text-sm text-muted-foreground">
            {format(post.createdAt, "yyy-MM-dd")}
          </p>
        </div>
      </div>
      <PostOperations post={post} />
    </div>
  );
}
