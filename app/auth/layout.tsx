import { isAdmin, serverAuth } from "@/lib/auth/serverAuth";
import { redirect } from "next/navigation";
import React from "react";

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
