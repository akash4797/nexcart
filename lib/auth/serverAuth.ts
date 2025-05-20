import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth.config";
export async function serverAuth() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return null;
  }
  return {
    ...session,
  };
}
export async function isAdmin() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return false;
  }
  if (session?.user?.role !== "admin") {
    return false;
  }
  return true;
}
export async function isUser() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return false;
  }
  if (session?.user?.role !== "user") {
    return false;
  }
  return true;
}
