import { NextAuthOptions } from "next-auth";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "./db";

export const authOptions: NextAuthOptions = {
  providers: [
    Github({
      // ！をつけることで、undefinedの時にエラーを出す
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIANT_SECRET!,
      // ↓これをtrueにすることで、メールアドレスの重複を許可するがセキュリティーの観点からあまり推奨されない
      allowDangerousEmailAccountLinking: true,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  // ↓nextAuthとprismaの連携でデータを保存できる
  adapter: PrismaAdapter(db),
  pages: { signIn: "login" },
  callbacks: {
    // jwtは認証情報を保存するためのコールバック
    async jwt({ token, user }) {
      if (user) {
        return { ...token, id: user.id };
      }

      return token;
    },
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }

      return session;
    },
  },
  session: {
    // sessionをデータベースではなく、jsonwebtoken(JWT)で保存する
    strategy: "jwt",
  },
};
