"use client";
import { usePathname } from "next/navigation";
import React from "react";
import AdminHeader from "./Admin/Header";
import CustomerHeader from "./Customer/Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  if (pathname.includes("auth")) {
    return children;
  }

  if (pathname.includes("admin")) {
    return (
      <>
        <AdminHeader />
        {children}
      </>
    );
  }

  return (
    <>
      <CustomerHeader />
      {children}
    </>
  );
};

export default Layout;
