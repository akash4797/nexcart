import React from "react";
import { getServerSession } from "next-auth";

const Dashboard = async () => {
  const session = await getServerSession();
  return (
    <div className="flex flex-col justify-center items-center min-h-[calc(100vh-80px)]">
      <h1 className="text-xl font-bold">Welcome, {session?.user.name}</h1>
      <p className="text-sm">You logged in as an admin</p>
    </div>
  );
};

export default Dashboard;
