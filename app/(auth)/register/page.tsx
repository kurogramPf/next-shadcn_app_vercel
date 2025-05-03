import { buttonVariants } from "@/components/ui/button";
import UserAuthFrom from "@/components/user-auth-from";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Register() {
  return (
    <div className="container grid h-screen w-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        href={"/login"}
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-4 top-4 md:left-8 md:top-8"
        )}
      >
        ログイン
      </Link>
      <div className="hidden h-full bg-muted lg:block" />
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="space-y-3 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            アカウントの作成
          </h1>
          <p className="text-sm text-muted-foreground">
            メールアドレスを入力して作成してください。
          </p>
          <UserAuthFrom />
        </div>
        <p className="px-8 text-center text-sm text-muted-foreground">
          続けてクリックすれば私たちの
          <Link href={"/terms"} className="underline underline-offset-4">
            利用規約
          </Link>
          <Link href={"/privacy"} className="underline underline-offset-4">
            プライバシーポリシー
          </Link>
          に同意したことになります。
        </p>
      </div>
    </div>
  );
}
