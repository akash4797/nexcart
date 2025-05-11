"use client";
import React from "react";
import CustomerHeader from "./Customer/Header";
import AdminHeader from "./Admin/Header";
import { usePathname } from "next/navigation";

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
