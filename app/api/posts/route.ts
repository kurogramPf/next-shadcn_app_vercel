import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
// ↓* as zはzにという変数に格納する記述
import * as z from "zod";

const postCreateSchema = z.object({
  title: z.string(),
  // optional()はデータがあってもなくても良いという状態
  content: z.string().optional(),
});

// 投稿はPATCH
// エンドポイントは、 api/posts
export async function POST(req: NextRequest) {
  try {
    // getServerSession()はサーバー側からの呼び出し(nextバージョン14)
    // 引数にauthOptionsを渡すことで詳細な情報を取得できる
    const session = await getServerSession(authOptions);

    if (!session) {
      // ↓403の認証エラー
      return NextResponse.json("Unauthorized", { status: 403 });
    }

    // sessionからuser情報を取得できる
    const { user } = session;
    const json = await req.json();

    // parse()で型エラーを返す
    const body = postCreateSchema.parse(json);
    const { title, content } = body;

    // ↓sppabaseのテーブルへデータを作成する
    // db.post.create()でprismaデータを作成する(dbはprismaのインスタンス)
    const post = await db.post.create({
      data: {
        // title: titleと記述した場合は keyとvalueが同じ場合は省略できる
        title,
        content,
        authorId: user.id,
      },
      // select: {}で利用するデータのみ抽出できる
      select: {
        id: true,
      },
    });

    return NextResponse.json(post);
  } catch (err) {
    // zodエラーの場合の内容
    // パース(必要なデータを取り出す)した時に型が違う場合はエラーを返す
    if (err instanceof z.ZodError) {
      return NextResponse.json(err.issues, { status: 422 });
    }

    // それ以外のエラーの場合は500エラー(サーバーエラー)を返す
    return NextResponse.json(null, { status: 500 });
  }
}
