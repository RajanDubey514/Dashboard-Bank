import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import Footer from "../components/footer/Footer";
import { Menu } from "lucide-react";

export default function MainLayout() {
  const location = useLocation();
  const pathname = location.pathname;
  const params = new URLSearchParams(location.search);
  const pageParam = params.get("page");

  const [open, setOpen] = useState(false);

  /* ------------------------------------------
      1️⃣ Page Title Mapping
  ------------------------------------------- */
  const pageTitleMap = {
    product: "Product",
    account: "Account",
    bom: "Bill Of Material",
    usermanagement: "User Management",
  };

  const fallbackTitleMap = {
    dashboard: "Dashboard",
    admin: "Admin Panel",
    profile: "Profile",
    settings: "Settings",
  };

  /* ------------------------------------------
      2️⃣ Title Logic (Admin + Normal paths)
  ------------------------------------------- */

let title = "Dashboard";

// Routes that support query-based pages
const queryBasedRoutes = ["/admin", "/sales", "/purchase", "/finance"];

if (queryBasedRoutes.includes(pathname) && pageParam) {
  title =
    pageTitleMap[pageParam] ||
    pageParam
      .replace(/_/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
} else {
  // Normal routes
  const parts = pathname.split("/").filter(Boolean);
  const last = parts[parts.length - 1]?.toLowerCase() || "dashboard";

  title =
    fallbackTitleMap[last] ||
    last.charAt(0).toUpperCase() + last.slice(1);
}

  /* ------------------------------------------
      3️⃣ Layout UI
  ------------------------------------------- */

  return (
    <div className="flex h-screen w-screen bg-slate-50 overflow-hidden">

      {/* Sidebar */}
      <Sidebar open={open} onClose={() => setOpen(false)} sidebarWidth="w-55" />

      {/* Main Area */}
      <div
        className={`
          flex flex-col flex-1 min-w-0 transition-all duration-300 ease-in-out
          ${open ? "md:ml-60" : "md:ml-0"}
        `}
      >

        {/* Topbar */}
        <div className="sticky top-0 z-30 bg-white shadow-sm">
          <div className="flex items-center justify-between p-2 border-b border-slate-200">

            {/* Left: Menu + Title */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setOpen(true)}
                className="p-2 rounded-md hover:bg-slate-100 transition md:hidden"
              >
                <Menu size={18} />
              </button>

              <div
                className="text-base md:text-lg font-semibold text-slate-700"
                style={{ color: "var(--color-primary)" }}
              >
                {title}
              </div>
            </div>

            {/* Right: Topbar */}
            <div className="flex items-center">
              <Topbar />
            </div>
          </div>
        </div>

        {/* Routed Content */}
        <main className="flex-1 overflow-auto p-1">
          <div className="">
            <Outlet />
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
