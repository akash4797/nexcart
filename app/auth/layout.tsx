import React from "react";
import { redirect } from "next/navigation";
import { isAdmin, serverAuth } from "@/lib/auth/serverAuth";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await serverAuth();

  if (!session) {
    return <>{children}</>;
  }

  const isAdminUser = await isAdmin();
  const redirectPath = isAdminUser ? "/admin" : "/";
  redirect(redirectPath);
};

export default Layout;
