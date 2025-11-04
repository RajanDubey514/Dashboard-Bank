import React from "react";
import {
  Home,
  BarChart2,
  ShoppingCart,
  Mail,
  MessageSquare,
  Calendar,
  Settings,
  LogOut,
} from "lucide-react";
import { Drawer } from "@mui/material";
import { NavLink } from "react-router-dom";

const menuItems = [
  { name: "Dashboard", icon: Home, path: "/" },
  { name: "Analytics", icon: BarChart2, path: "/analytics" },
  { name: "eCommerce", icon: ShoppingCart, path: "/ecommerce" },
];

const appItems = [
  { name: "Email", icon: Mail },
  { name: "Chat", icon: MessageSquare },
  { name: "Calendar", icon: Calendar },
];

export default function Sidebar({ open, onClose, sidebarWidth = "w-52" }) {
  const SidebarContent = () => (
    <div
      className={`bg-[#111827] text-white h-full flex flex-col ${sidebarWidth} shadow-lg`}
    >
      {/* Logo */}
      <div className="flex items-center justify-center h-14 text-lg font-semibold border-b border-slate-800 tracking-wide">
        TPro Admin
      </div>

      {/* Menu */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-2 py-3">
        <div className="space-y-1">
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-all duration-150 ${
                  isActive
                    ? "bg-indigo-600 text-white"
                    : "text-slate-300 hover:bg-slate-700"
                }`
              }
            >
              <item.icon size={18} />
              {item.name}
            </NavLink>
          ))}
        </div>

        <div className="mt-4 text-xs uppercase text-slate-400 px-3">Apps</div>
        <div className="mt-2 space-y-1">
          {appItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-slate-300 hover:bg-slate-700 cursor-pointer"
            >
              <item.icon size={18} />
              {item.name}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-slate-800 px-3 py-2 text-slate-300">
        <div className="flex items-center justify-between">
          <button className="flex items-center gap-2 text-sm hover:text-white transition">
            <Settings size={16} />
            Settings
          </button>
          <button className="hover:text-red-400 transition">
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <div
        className={`hidden md:flex fixed top-0 left-0 h-full ${sidebarWidth} z-40`}
      >
        {SidebarContent()}
      </div>

      {/* Mobile Drawer */}
      <Drawer anchor="left" open={open} onClose={onClose}>
        <div className="w-52 bg-[#111827] text-white h-full">
          {SidebarContent()}
        </div>
      </Drawer>
    </>
  );
}
