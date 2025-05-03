import { db } from "@/lib/db";
import { postPatchSchema } from "@/lib/validations/post";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { authOptions } from "@/lib/auth";

// zodを使用して、型を定義する
const routeContextSchema = z.object({
  params: z.object({
    // ↓動的な記事のURLのパス名となる部分
    postId: z.string(),
  }),
});

// 編集はPATCH
export async function PATCH(
  req: NextRequest,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // parse()で型が正しいかを確認する
    const { params } = routeContextSchema.parse(context);

    if (!(await verifyCurrentUserhasAccessToPost(params.postId))) {
      return NextResponse.json(null, { status: 403 });
    }

    const json = await req.json();
    const body = postPatchSchema.parse(json);

    await db.post.update({
      where: {
        // ↓は動的な記事のURLのパス名となる部分
        id: params.postId,
      },
      // 記事のidが取得できることでデータを取得できる
      data: {
        title: body.title,
        content: body.content,
      },
    });

    return NextResponse.json(null, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(error.issues, { status: 422 });
    } else {
      return NextResponse.json(null, { status: 500 });
    }
  }
}

export async function DELETE(
  req: NextRequest,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    // parse()で型が正しいかを確認する
    const { params } = routeContextSchema.parse(context);

    if (!(await verifyCurrentUserhasAccessToPost(params.postId))) {
      return NextResponse.json(null, { status: 403 });
    }

    await db.post.delete({
      where: {
        // ↓は動的な記事のURLのパス名となる部分
        id: params.postId,
      },
    });

    // 削除は204のステータスコードを返す
    return new Response(null, { status: 204 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(error.issues, { status: 422 });
    } else {
      return NextResponse.json(null, { status: 500 });
    }
  }
}

// ユーザーが自身の記事にアクセスできるかを確認する関数
async function verifyCurrentUserhasAccessToPost(postId: string) {
  const session = await getServerSession(authOptions);
  const count = await db.post.count({
    where: {
      id: postId,
      authorId: session?.user.id,
    },
  });

  return count > 0;
}
