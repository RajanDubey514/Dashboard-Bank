import React from "react";
import { Home, BarChart2, ShoppingCart, Settings, LogOut, X , BriefcaseBusiness } from "lucide-react";
import { useNavigate, NavLink } from "react-router-dom";

const menuItems = [
  { name: "Dashboard", icon: Home, path: "/" },
  {name : "Product" , icon :  BriefcaseBusiness , path : "/product"},
  { name: "Account", icon: BarChart2, path: "/sale-add" },
  { name: "Setting", icon: ShoppingCart, path: "/setting" },
];

export default function Sidebar({ open, onClose, sidebarWidth = "w-60" }) {
   const navigate = useNavigate();

  return (
    <>
      {/* Sidebar Drawer */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:flex md:h-full
          ${sidebarWidth}
          flex flex-col shadow-xl
        `}
        style={{
          backgroundColor: "var(--theme-bg)",
          color: "var(--theme-text)",
        }}
        aria-hidden={!open}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between h-14 px-4 border-b"
          style={{ borderColor: "var(--theme-hover)" }}
        >
          <div  onClick={() => navigate("/")} className="text-lg font-semibold cursor-pointer">Project</div>
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
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-1.5 rounded-lg text-[15px] font-medium transition-all duration-200 ${
                  isActive
                    ? "shadow-md"
                    : "hover:opacity-90"
                }`
              }
              style={({ isActive }) => ({
                backgroundColor: isActive ? "var(--theme-accent)" : "transparent",
                color: isActive ? "#fff" : "var(--theme-text)",
              })}
            >
              <item.icon size={18} />
              <span className="truncate">{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div
          className="border-t px-4 py-3 flex items-center justify-between text-slate-300"
          style={{ borderColor: "var(--theme-hover)" }}
        >
          <button className="flex items-center gap-2 text-sm hover:opacity-80 transition"
            style={{ color: "var(--theme-text)" }}
          >
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

      {/* Mobile overlay */}
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
