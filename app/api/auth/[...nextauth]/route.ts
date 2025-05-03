import { authOptions } from "@/lib/auth";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);

// GET、POSTはnext13の指定方法
export { handler as GET, handler as POST };
