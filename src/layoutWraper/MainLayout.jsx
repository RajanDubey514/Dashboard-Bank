import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import { IconButton } from "@mui/material"; // keep if you already use IconButton; else replace with button
import { Menu } from "lucide-react";

// If you don't want to import IconButton from MUI, replace with native button:
// import { Menu } from "lucide-react";

export default function MainLayout() {
  const [open, setOpen] = useState(false);
  const drawerWidthClass = "md:w-60"; // must match sidebarWidth in Sidebar (w-60 default)

  return (
    <div className="flex h-screen w-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <Sidebar open={open} onClose={() => setOpen(false)} sidebarWidth="w-50" />

      {/* Main content wrapper */}
      <div
        className={`
          flex flex-col flex-1 min-w-0 transition-all duration-300 ease-in-out
          ${open ? "md:ml-60" : "md:ml-0"}
        `}
      >
        {/* Topbar + mobile menu button row */}
       <div className="sticky top-0 z-30 bg-white shadow-sm">
  {/* 🔹 Mobile Header Section (menu + title + topbar right aligned) */}
  <div className="flex items-center justify-between p-1 border-b border-slate-200">
    {/* Left side: Drawer toggle + title */}
    <div className="flex items-center gap-2">
      <button
        onClick={() => setOpen(true)}
        className="p-2 rounded-md hover:bg-slate-100 transition md:hidden"
        aria-label="Open drawer"
      >
        <Menu size={18} />
      </button>
      <div className="text-base md:text-medium font-semibold text-slate-700">
        Project
      </div>
    </div>

    {/* Right side: Topbar content */}
    <div className="flex items-center justify-end">
      <Topbar />
    </div>
  </div>
</div>

        {/* Routed content */}
        <main className="flex-1 overflow-auto p-1">
          <div className="">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
