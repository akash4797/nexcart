import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

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
