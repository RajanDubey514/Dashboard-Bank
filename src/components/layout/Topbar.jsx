import React from "react";
import { Bell, Search, User } from "lucide-react";

export default function Topbar() {
  return (
    <div className="flex items-center justify-between bg-white shadow-sm px-4 py-2 rounded-b-lg">
      {/* Left: Search */}
      <div className="flex items-center bg-slate-100 px-2 rounded-md">
        <Search size={16} className="text-slate-400" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none text-sm ml-2 w-40 md:w-64 text-slate-600"
        />
      </div>

      {/* Right: Icons */}
      <div className="flex items-center gap-3">
        <button className="relative p-1 rounded-full hover:bg-slate-100">
          <Bell size={18} className="text-slate-500" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-7 h-7 rounded-full bg-indigo-500 flex items-center justify-center text-white text-sm font-medium">
            U
          </div>
          <span className="hidden md:inline text-sm font-medium text-slate-700">
            User
          </span>
        </div>
      </div>
    </div>
  );
}
