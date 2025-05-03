import { withAuth } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req });
    // !!でteruかfalseに変換される。
    const isAuth = !!token;
    const isAuthPage =
      req.nextUrl.pathname.startsWith("/login") ||
      req.nextUrl.pathname.startsWith("/register");

    if (isAuthPage) {
      if (isAuth) {
        // redirect()には絶対パスの指定が必要となるので、パスを直接記載好ましくない
        // req.urlをつけると絶対パスのURLになる。
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }

      return null;
    }

    if (!isAuth) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  },
  {
    callbacks: {
      async authorized() {
        // ↓の指定でlib/auth.tsのpagesで指定したloginページにリダイレクトされなくなる。
        // 権限別でリダイレクトを調整したい場合は、ここに記述する
        // 例えば、admin権限のユーザーは/adminにリダイレクトするなど
        // if(token.role === "admin") true;など
        return true;

        // 以前いたページにリダイレクトさせる方法もある
      },
    },
  }
);

export const config = {
  // :pathは/dashboard/配下が対象となる
  matcher: [
    "/dashboard/:path",
    "/editor/:path",
    "/login",
    "/register",
    "/:path*",
  ],
};

export function middleware(req: NextRequest) {
  const isLocalDevelopment = process.env.NODE_ENV === "development";

  if (isLocalDevelopment || !process.env.BASIC_ID || !process.env.BASIC_PWD) {
    return NextResponse.next();
  }

  const basicAuth = req.headers.get("authorization");
  if (!basicAuth) {
    return new Response("Authentication required", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Secure Area"',
      },
    });
  }

  try {
    const authValue = basicAuth.split(" ")[1];
    const [user, pwd] = atob(authValue).split(":");

    if (user === process.env.BASIC_ID && pwd === process.env.BASIC_PWD) {
      return NextResponse.next();
    }
  } catch (e) {
    return new Response("Invalid Authentication", { status: 400 });
  }

  return new Response("Unauthorized", { status: 401 });
}
