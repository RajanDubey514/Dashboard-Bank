import React, { useState, useEffect } from "react";
import { X, ChevronDown, ChevronUp, Settings, LogOut } from "lucide-react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import menuItems from "./MenuItems";
import "./sidebar.css";

export default function Sidebar({ open, onClose, sidebarWidth = "w-60" }) {
  const [openMenu, setOpenMenu] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Extract page parameter (for admin)
  const params = new URLSearchParams(location.search);
  const activePage = params.get("page"); // e.g. "user-management"

  // Automatically open submenu if its child is active
  useEffect(() => {
    menuItems.forEach((item) => {
      if (item.subItems) {
        const match = item.subItems.some((sub) => {
          if (sub.path.includes("?page=")) {
            return sub.path.includes(`page=${activePage}`);
          }
          return location.pathname === sub.path;
        });

        if (match) setOpenMenu(item.name);
      }
    });
  }, [location]);

  const toggleSubMenu = (name) => {
    setOpenMenu(openMenu === name ? null : name);
  };

  return (
    <>
      <aside
        className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static
        ${sidebarWidth} flex flex-col shadow-xl`}
        style={{
          backgroundColor: "var(--theme-bg)",
          color: "var(--theme-text)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-12 px-4 border-b">
          <div
            onClick={() => navigate("/")}
            className="text-[14px] font-semibold cursor-pointer"
          >
            Project
          </div>
          <button onClick={onClose} className="md:hidden text-slate-300">
            <X size={18} />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-1 text-[13px] no-scrollbar">

          {menuItems.map((item, idx) => (
            <div key={idx} className="w-full">

              {/* Parent / Single */}
              {item.subItems ? (
                <button
                  onClick={() => toggleSubMenu(item.name)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg
                    hover:bg-white/10 transition-all"
                >
                  <span className="flex items-center gap-2">
                    <item.icon size={16} />
                    <span>{item.name}</span>
                  </span>

                  {openMenu === item.name ? (
                    <ChevronUp size={15} />
                  ) : (
                    <ChevronDown size={15} />
                  )}
                </button>
              ) : (
                <NavLink
                  to={item.path}
                  onClick={onClose}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all"
                  style={({ isActive }) => ({
                    backgroundColor: isActive ? "var(--theme-accent)" : "transparent",
                    color: isActive ? "#fff" : "var(--theme-text)",
                    fontWeight: isActive ? "600" : "400",
                  })}
                >
                  <item.icon size={16} />
                  <span>{item.name}</span>
                </NavLink>
              )}

              {/* Sub Menu */}
              {item.subItems && openMenu === item.name && (
                <ul className="pl-8 mt-1 space-y-1 border-l border-white/10">
                  {item.subItems.map((sub, sIdx) => {
                    const isActive =
                      sub.path.includes("?page=")
                        ? sub.path.includes(`page=${activePage}`)
                        : location.pathname === sub.path;

                    return (
                      <li key={sIdx} className="list-disc">
                        <NavLink
                          to={sub.path}
                          onClick={onClose}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all 
                          ${
                            isActive
                              ? "bg-[var(--theme-accent)] text-white font-semibold"
                              : "text-[var(--theme-text)] hover:bg-[var(--theme-hover)] hover:translate-x-1"
                          }`}
                        >
                          <span>{sub.name}</span>
                        </NavLink>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t px-3 py-2 flex items-center justify-between text-[13px]">
          <button
            onClick={() => navigate("/setting")}
            className="flex items-center gap-2 hover:bg-white/10 px-3 py-1 rounded-lg transition-all"
          >
            <Settings size={15} /> Settings
          </button>

          <button
            onClick={() => {
              localStorage.removeItem("authToken");
              window.location.href = "/login";
            }}
            className="hover:bg-white/10 p-1.5 rounded-lg transition"
          >
            <LogOut size={16} />
          </button>
        </div>
      </aside>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 md:hidden transition
          ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />
    </>
  );
}
