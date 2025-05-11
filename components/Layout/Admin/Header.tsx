import React from "react";
import { ModeToggle } from "../../Theme/ToggleTheme";
import UserDropDown from "./UserDropDown";
const AdminHeader = () => {
  return (
    <div className="flex justify-between container mx-auto p-5">
      <div className="font-bold">LOGO</div>
      <div className="flex gap-5 justify-center items-center">
        <ModeToggle />
        <UserDropDown />
      </div>
    </div>
  );
};

export default AdminHeader;
