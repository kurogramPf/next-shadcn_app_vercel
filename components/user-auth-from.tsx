"use client";

import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Icon } from "@/components/icon";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function UserAuthFrom() {
  const [isGithubLoading, setIsGithubLoading] = useState<boolean>(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);

  return (
    <div className="mx-auto grid max-w-[20rem] gap-6">
      <form>
        <div className="grid gap-2">
          <div className="grid gap-1 text-left">
            <Label htmlFor="email">メールアドレス</Label>
            <Input id="email" placeholder="name@example.com" type="email" />
          </div>
          <button className={cn(buttonVariants(), "w-full")}>
            メールアドレスでログイン
          </button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-background px-2 text-muted-foreground">
            または
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <button
          className={cn(buttonVariants({ variant: "outline" }), "w-full")}
          onClick={() => {
            setIsGithubLoading(true), signIn("github");
          }}
        >
          {/* <Icon.github /> */}
          {/* ↓は引数に任意の値を指定できる */}
          {isGithubLoading ? (
            <Icon.spinner className="mr-2 animate-spin" />
          ) : (
            <Icon.github className="mr-2" />
          )}
          GitHub
        </button>
        <button
          className={cn(buttonVariants({ variant: "outline" }), "w-full")}
          onClick={() => {
            setIsGoogleLoading(true), signIn("google");
          }}
        >
          {isGoogleLoading ? (
            <Icon.spinner className="mr-2 animate-spin" />
          ) : (
            <Icon.google className="mr-2" />
          )}
          Google
        </button>
      </div>
    </div>
  );
}
