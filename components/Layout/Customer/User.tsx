import React from "react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const User = () => {
  const { data: session } = useSession();
  if (!session) return <Link href={"/auth/signin"}>Sign In</Link>;
  return (
    <>
      {session.user.role === "admin" ? (
        <Button className="" size={"sm"}>
          <Link href={"/admin"}>Dashboard</Link>
        </Button>
      ) : (
        <Button className="cursor-pointer" onClick={() => signOut()}>
          Sign Out
        </Button>
      )}
    </>
  );
};

export default User;
