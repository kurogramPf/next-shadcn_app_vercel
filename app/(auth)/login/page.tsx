import UserAuthFrom from "@/components/user-auth-from";
import Link from "next/link";

export default function Login() {
  return (
    <div className="container mx-auto flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="space-y-3 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Welcom Back</h1>
          <p className="text-sm text-muted-foreground">
            メールアドレスを入力してログインできます。
          </p>
          <UserAuthFrom />
        </div>
        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link href={"/register"} className="underline underline-offset-4">
            アカウントを持っていませんか？
          </Link>
        </p>
      </div>
    </div>
  );
}
