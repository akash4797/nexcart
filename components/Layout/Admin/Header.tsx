import React from "react";
import { ModeToggle } from "../../Theme/ToggleTheme";
import UserDropDown from "./UserDropDown";
import Sidebar from "./Sidebar";
const AdminHeader = () => {
  return (
    <div className="flex justify-between items-center container mx-auto p-5 h-20">
      <div className="font-bold flex gap-3 justify-center items-center">
        <Sidebar />
        NEXCART
      </div>
      <div className="flex gap-5 justify-center items-center">
        <ModeToggle />
        <UserDropDown />
      </div>
    </div>
  );
};

export default AdminHeader;
