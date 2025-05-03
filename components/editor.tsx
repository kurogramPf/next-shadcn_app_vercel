"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import TextareaAutosize from "react-textarea-autosize";
import EditorJS from "@editorjs/editorjs";
import { useCallback, useEffect, useRef, useState } from "react";
import Header from "@editorjs/header";
// LinkToolは"noImplicitAny": false,でanyを許可しているので、型を指定しない。後ほど修正
import LinkTool from "@editorjs/link";
import List from "@editorjs/list";
import Code from "@editorjs/code";
import { Post } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postPatchSchema, postPatchSchemaType } from "@/lib/validations/post";
import { on } from "events";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Icon } from "./icon";

interface EditorProps {
  post: Pick<Post, "id" | "title" | "content" | "published">;
}

export default function Editor({ post }: EditorProps) {
  // useRef()は更新されても再レンダリングが発生しないような（変更可能な）値を保存することと、DOM要素への参照を保存
  const ref = useRef<EditorJS>();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // useCallback()は、関数をメモ化するためのフック
  // useCallback()を使用することで、関数が再生成されるのを防ぐ
  // 依存配列に指定したものが更新された場合に更新される
  const initializeEditor = useCallback(async () => {
    const body = postPatchSchema.parse(post);

    const editor = new EditorJS({
      holder: "editor",
      // onReady()は初期化の完了を待つためのコールバック関数
      onReady() {
        ref.current = editor;
      },
      placeholder: "ここに記事を入力してください。",
      inlineToolbar: true,
      data: body.content,
      tools: {
        header: Header,
        linkTool: LinkTool,
        list: List,
        code: Code,
      },
    });
  }, [post]);

  useEffect(() => {
    // windowオブジェクトがある時は、mount済み
    // maunt済みの時にisMountedをtrueにする
    if (typeof window !== "undefined") setIsMounted(true);
  }, []);

  useEffect(() => {
    // 開発環境ではuseEffect内の関数は2回発火される。本番は1回。
    // isMountedされたら処理を発火させる。
    // isMountedを利用することで開発環境での2回発火を防ぐ。
    if (isMounted) {
      initializeEditor();
    }

    return () => {
      // editorの情報を破壊する
      ref.current?.destroy();
      // editoerを初期化する
      ref.current = undefined;
    };

    // 依存配列にisMountedを指定して、isMountedの状態が変わった時のみ処理を実行する(initializeEditorも含む)
  }, [isMounted, initializeEditor]);

  // formState: {errors}は、バリデーションエラーを取得するためのもの
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<postPatchSchemaType>({
    // resolverは名前解決（ドメイン名をIPアドレスに変換する）
    resolver: zodResolver(postPatchSchema),
  });

  const onSubmit = async (data: postPatchSchemaType) => {
    setIsSaving(true);

    // save()は、EditorJSのインスタンスを保存するためのメソッド
    const blocks = await ref.current?.save();

    const response = await fetch(`/api/posts/${post.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "appliction/json",
      },
      body: JSON.stringify({
        title: data.title,
        content: blocks,
      }),
    });

    setIsSaving(false);

    if (!response.ok) {
      return toast({
        title: "問題が発生しました。",
        description:
          "あなたの記事は保存されませんでした。もう一度お試しください。",
        variant: "destructive",
      });
    }

    router.refresh();

    return toast({
      description: "正常に保存されました。",
      variant: "default",
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid w-full gap-10">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center space-x-10">
            <Link
              href="/dashboard"
              className={cn(buttonVariants({ variant: "ghost" }))}
            >
              戻る
            </Link>
            <p className="text-sm text-muted-foreground">公開</p>
          </div>
          <button className={cn(buttonVariants())} type="submit">
            {isSaving && <Icon.spinner className="mr-2 h-4 w-4 animate-spin" />}
            <span>保存</span>
          </button>
        </div>
        <div className="mx-auto w-[800px]">
          {/* 文字数に合わせて自動改行する */}
          <TextareaAutosize
            id="title"
            autoFocus
            defaultValue={post.title}
            placeholder="Post Title"
            className="w-full resize-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
            {...register("title")}
          />
        </div>
        <div id="editor" className="min-h-[500px]" />
        <p className="text-sm text-gray-500">
          Use
          {/* kbdタグはキーボード入力要素 */}
          <kbd className="rounded-md border bg-muted px-1 text-xs uppercase">
            Tab
          </kbd>
          to open the command menu
        </p>
      </div>
    </form>
  );
}
