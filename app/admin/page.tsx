import React from "react";
import { getServerSession } from "next-auth";

const Dashboard = async () => {
  const session = await getServerSession();
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-2xl font-bold">Welcome, {session?.user.name}</div>
    </div>
  );
};

export default Dashboard;
