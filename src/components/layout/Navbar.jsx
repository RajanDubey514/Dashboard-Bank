import React from "react";
import { Bell, UserCircle } from "lucide-react";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center bg-white/80 backdrop-blur-md p-4 shadow-md sticky top-0 z-30">
      <h2 className="text-xl font-semibold text-gray-700">Dashboard Overview</h2>
      <div className="flex items-center gap-5">
        <Bell className="text-gray-600 cursor-pointer hover:text-blue-500 transition" />
        <UserCircle className="text-gray-600 cursor-pointer hover:text-blue-500 transition" size={28} />
      </div>
    </div>
  );
};

export default Navbar;
