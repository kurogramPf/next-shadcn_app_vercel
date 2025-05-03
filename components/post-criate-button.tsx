"use client";

import { cn } from "@/lib/utils";
import { ButtonProps, buttonVariants } from "./ui/button";
import { useState } from "react";
import { Icon } from "./icon";
import { useRouter } from "next/navigation";
import { Toast } from "./ui/toast";
import { toast } from "@/hooks/use-toast";

// PostCriateButtonPropsにButtonPropsを継承している
interface PostCriateButtonProps extends ButtonProps {}

export default function PostCriateButton({
  className,
  variant,
  ...props
}: PostCriateButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    setIsLoading(true);

    // fetch()でデータ取得
    // /api/postsはAPIのエンドポイント
    const response = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "appication/json",
      },
      // JSON.stringify()オブジェクトや値を JSON 文字列に変換
      body: JSON.stringify({
        title: "untitled Post",
      }),
    });

    setIsLoading(false);

    // エラー処理
    if (!response.ok) {
      return toast({
        title: "問題が発生しました。",
        description: "投稿が作成できませんでした。もう一度お試しください。",
        // variantは赤色のトースト
        variant: "destructive",
      });
    }

    // response.json()でレスポンスをJSON形式に変換
    const post = await response.json();

    // refresh()はページを再読み込みする
    router.refresh();
    // push()は指定したURLに遷移する
    router.push(`editor/${post.id}`);
  };

  return (
    <button
      className={cn(
        buttonVariants({ variant }),
        // : isLoadingによりのboolean値を使って、条件に応じてクラスが適用される
        { "cursor-not-allowed opacity-60": isLoading },
        className
      )}
      onClick={onClick}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <Icon.spinner className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Icon.add className="mr-2 h-4 w-4" />
      )}
      新しい投稿
    </button>
  );
}
