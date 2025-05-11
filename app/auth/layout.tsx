import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

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
