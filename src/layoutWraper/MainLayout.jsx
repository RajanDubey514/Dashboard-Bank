import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
// import Navbar from "../components/layout/Navbar";
import { IconButton } from "@mui/material";
import { Menu } from "lucide-react";

export default function MainLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex bg-slate-50 min-h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar open={open} onClose={() => setOpen(false)} sidebarWidth="w-52" />

      {/* Right content section */}
      <div className="flex-1 md:ml-52 transition-all duration-300">
        {/* Top section */}
        <div className="sticky top-0 bg-slate-50 z-30">
          <div className="md:hidden flex p-2">
            <IconButton onClick={() => setOpen(true)}>
              <Menu />
            </IconButton>
          </div>
          <Topbar />
          {/* <Navbar /> */}
        </div>

        {/* Routed content */}
        <div className="p-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
