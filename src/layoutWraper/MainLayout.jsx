import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import { Menu } from "lucide-react";
import Footer from "../components/footer/Footer";
import { useLocation } from "react-router-dom";

// If you don't want to import IconButton from MUI, replace with native button:
// import { Menu } from "lucide-react";

export default function MainLayout() {
    const location = useLocation();
  const [open, setOpen] = useState(false);
   const pathname = location.pathname;
  
  // Custom title mapping
const titleMapping = {
  bom: "Bill Of Materials",     // optional alias
  qc: "Quality Control",        // example
  grn: "Goods Received Note",   // example
};

// If root path → Dashboard
const title =
  pathname === "/"
    ? "Dashboard"
    : (() => {
        const parts = pathname.split("/").filter(Boolean); // remove empty values
        const last = parts[parts.length - 1].toLowerCase();
        // 1) Check custom mapping first
        if (titleMapping[last]) return titleMapping[last];
        // 2) Default fallback → Capitalize first letter
        return last.charAt(0).toUpperCase() + last.slice(1);
      })();


  return (
    <div className="flex h-screen w-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <Sidebar open={open} onClose={() => setOpen(false)} sidebarWidth="w-55" />

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
              <div className="text-base md:text-medium font-semibold text-slate-700 " style={{ color: "var(--color-primary)" }}>
                {title}
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
            <Footer />
      </div>
    </div>
  );
}
