import React from "react";
import { Home, BarChart2, ShoppingCart, Settings, LogOut, X } from "lucide-react";
import { NavLink } from "react-router-dom";

const menuItems = [
  { name: "Dashboard", icon: Home, path: "/" },
  { name: "Add Accounts", icon: BarChart2, path: "/sale-add" },
  { name: "Settings", icon: ShoppingCart, path: "/setting" },
];

export default function Sidebar({ open, onClose, sidebarWidth = "w-60" }) {
  // Extract numeric width for inline styles if needed (eg for box-shadow offsets)
  // But we rely mostly on Tailwind classes like md:ml-60 for shifting main content.

  return (
    <>
      {/* Desktop & Mobile Drawer Panel */}
      {/* Container fixed left so sticky header/footers inside behave properly */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out
          ${/* Desktop: slide in/out using translate-x with md breakpoint */ ""}
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:flex md:h-full
          ${sidebarWidth} bg-[#0f172a] text-white flex flex-col shadow-xl
        `}
        aria-hidden={!open}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-14 px-4 border-b border-slate-700">
          <div className="text-lg font-semibold">Project</div>
          {/* show close only on mobile */}
          <button
            onClick={onClose}
            className="md:hidden text-slate-300 hover:text-white p-1 rounded"
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 overflow-y-auto no-scrollbar space-y-1 px-3 py-4">
          {menuItems.map((item, idx) => (
            <NavLink
              key={idx}
              to={item.path}
              end
              onClick={onClose} // on mobile this will close drawer when navigating
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-1.5 space-x-1  rounded-lg text-[15px] font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-md"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <item.icon size={18} />
              <span className="truncate">{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-slate-700 px-4 py-3 flex items-center justify-between text-slate-300">
          <button className="flex items-center gap-2 text-sm hover:text-indigo-400 transition">
            <Settings size={16} /> <span className="hidden sm:inline">Settings</span>
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("authToken");
              window.location.href = "/login";
            }}
            className="hover:text-red-400 transition"
            title="Logout"
          >
            <LogOut size={18} />
          </button>
        </div>
      </aside>

      {/* Mobile overlay (only active when drawer open and on mobile) */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 md:hidden ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden={!open}
      />
    </>
  );
}
