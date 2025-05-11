import React from "react";
import { ModeToggle } from "../../Theme/ToggleTheme";
import UserDropDown from "./UserDropDown";
const AdminHeader = () => {
  return (
    <div className="flex justify-between items-center container mx-auto p-5 h-20">
      <div className="font-bold">NEXCART</div>
      <div className="flex gap-5 justify-center items-center">
        <ModeToggle />
        <UserDropDown />
      </div>
    </div>
  );
};

export default AdminHeader;
