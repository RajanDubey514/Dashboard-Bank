import React, { useState, useRef, useEffect } from "react";
import { Bell, User, User2, Building2 } from "lucide-react";
import NotificationDropdown from "../notification/NotificationDropdown";
import ProfileMenu from "../ProfileMenu/ProfileMenu";
import Tooltip from "../tooltip/Tooltip"; // ✅ import Tooltip

export default function Topbar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showPersonSelect, setShowPersonSelect] = useState(false);
  const [showBusinessSelect, setShowBusinessSelect] = useState(false);

  const notifRef = useRef(null);
  const userRef = useRef(null);
  const personRef = useRef(null);
  const businessRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        !notifRef.current?.contains(e.target) &&
        !userRef.current?.contains(e.target) &&
        !personRef.current?.contains(e.target) &&
        !businessRef.current?.contains(e.target)
      ) {
        setShowNotifications(false);
        setShowUserMenu(false);
        setShowPersonSelect(false);
        setShowBusinessSelect(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative flex items-center justify-end bg-white shadow-sm px-4 py-2 rounded-b-lg">
      <div className="flex items-center gap-3 md:gap-4">
        {/* 🧍 Person */}
        <div className="relative" ref={personRef}>
          <Tooltip text="Person ID">
            <button
              onClick={() => {
                setShowPersonSelect(!showPersonSelect);
                setShowNotifications(false);
                setShowUserMenu(false);
                setShowBusinessSelect(false);
              }}
              className="relative p-1 rounded-full hover:bg-slate-100 transition"
            >
              <User2 size={18} className="text-slate-600" />
            </button>
          </Tooltip>

          {showPersonSelect && (
            <div className="absolute right-0 mt-2 w-36 bg-white border border-slate-200 rounded-lg shadow-lg text-sm z-50">
              <div className="p-2 text-slate-600">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="personType" className="accent-indigo-500" />
                  <span>Person A</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer mt-1">
                  <input type="radio" name="personType" className="accent-indigo-500" />
                  <span>Person B</span>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* 🏢 Business */}
        <div className="relative" ref={businessRef}>
          <Tooltip text="Business ID">
            <button
              onClick={() => {
                setShowBusinessSelect(!showBusinessSelect);
                setShowNotifications(false);
                setShowUserMenu(false);
                setShowPersonSelect(false);
              }}
              className="relative p-1 rounded-full hover:bg-slate-100 transition"
            >
              <Building2 size={18} className="text-slate-600" />
            </button>
          </Tooltip>

          {showBusinessSelect && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-slate-200 rounded-lg shadow-lg text-sm z-50">
              <div className="p-2 text-slate-600 space-y-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="accent-indigo-500" />
                  <span>Business A</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="accent-indigo-500" />
                  <span>Business B</span>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* 🔔 Notification */}
        <div className="relative" ref={notifRef}>
          <Tooltip text="Notifications">
            <button
              className="relative p-1 rounded-full hover:bg-slate-100 transition"
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowUserMenu(false);
                setShowPersonSelect(false);
                setShowBusinessSelect(false);
              }}
            >
              <Bell size={18} className="text-slate-600" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </Tooltip>

          {showNotifications && <NotificationDropdown />}
        </div>

        {/* 👤 User Profile */}
        <div className="relative" ref={userRef}>
          <Tooltip text="User Profile">
            <div
              className="flex items-center gap-2 cursor-pointer hover:bg-slate-100 rounded-md px-2 py-1 transition"
              onClick={() => {
                setShowUserMenu(!showUserMenu);
                setShowNotifications(false);
                setShowPersonSelect(false);
                setShowBusinessSelect(false);
              }}
            >
              <div className="w-7 h-7 rounded-full bg-indigo-500 flex items-center justify-center text-white text-sm font-medium">
                J
              </div>
              <span className="hidden md:inline text-sm font-medium text-slate-700">
                John
              </span>
            </div>
          </Tooltip>

          {showUserMenu && <ProfileMenu />}
        </div>
      </div>
    </div>
  );
}
