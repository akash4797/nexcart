"use client";
import React from "react";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  if (session && session.user.role === "user")
    return (
      <div className="container mx-auto flex flex-col justify-center items-center min-h-[calc(100vh-80px)]">
        <h1 className="text-xl font-bold">Hello, {session.user.name}</h1>
        <h2>welcome as customer</h2>
      </div>
    );
  return (
    <div className="flex justify-center items-center text-xl font-bold p-5 text-center min-h-[calc(100vh-80px)]">
      This is product landing page
    </div>
  );
}
