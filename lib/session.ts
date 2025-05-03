import { getServerSession } from "next-auth";

export async function getCurrentUser() {
  // getServerSession()はnextバージョン14
  // nextバージョン15はauth()という関数で呼び出せる
  const session = await getServerSession();

  return session?.user;
}
