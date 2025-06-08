import React from "react";
import { ModeToggle } from "../../Theme/ToggleTheme";
import User from "./User";

const Header = () => {
  return (
    <div className="container mx-auto flex justify-between items-center p-5 h-20">
      <div className="font-bold flex gap-3 justify-center items-center allenoire-font">
        NEXCART
      </div>
      <div className="flex flex-row justify-end">
        <div className="flex flex-row items-center">
          <div className="">
            <ModeToggle />
          </div>
          <div className="p-2">
            <User />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
