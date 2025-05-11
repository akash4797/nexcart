import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/auth.config";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <>{children}</>;
  }

  // Redirect based on user role
  const redirectPath = session.user?.role === "admin" ? "/admin" : "/";
  redirect(redirectPath);
};

export default Layout;
