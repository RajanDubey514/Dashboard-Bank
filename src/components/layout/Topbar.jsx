import React, { useState, useRef, useEffect } from "react";
import { Bell, User2, Building2, Palette } from "lucide-react";
import NotificationDropdown from "../notification/NotificationDropdown";
import ProfileMenu from "../ProfileMenu/ProfileMenu";
import Tooltip from "../tooltip/Tooltip";

export default function Topbar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showPersonSelect, setShowPersonSelect] = useState(false);
  const [showBusinessSelect, setShowBusinessSelect] = useState(false);
  const [showThemeSelect, setShowThemeSelect] = useState(false);

  const notifRef = useRef(null);
  const userRef = useRef(null);
  const personRef = useRef(null);
  const businessRef = useRef(null);
  const themeRef = useRef(null);

  const themes = [
    { name: "Indigo", class: "theme-indigo", color: "#6366f1" },
    { name: "Teal", class: "theme-teal", color: "#0d9488" },
    { name: "Orange", class: "theme-orange", color: "#f97316" },
    { name: "Emerald", class: "theme-emerald", color: "#047857" },
    { name: "Dark", class: "theme-dark", color: "#0ea5e9" },
  ];

  // 🧠 Load theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "theme-indigo";
    document.body.classList.add(savedTheme);
  }, []);

  // 🧠 Handle click outside dropdowns
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        !notifRef.current?.contains(e.target) &&
        !userRef.current?.contains(e.target) &&
        !personRef.current?.contains(e.target) &&
        !businessRef.current?.contains(e.target) &&
        !themeRef.current?.contains(e.target)
      ) {
        setShowNotifications(false);
        setShowUserMenu(false);
        setShowPersonSelect(false);
        setShowBusinessSelect(false);
        setShowThemeSelect(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🎨 Theme switching logic
  const handleThemeChange = (themeClass) => {
    document.body.classList.remove(
      "theme-indigo",
      "theme-teal",
      "theme-orange",
      "theme-emerald",
      "theme-dark"
    );
    document.body.classList.add(themeClass);
    localStorage.setItem("theme", themeClass);
    setShowThemeSelect(false);
  };

  return (
    <div
      className="relative flex items-center justify-end shadow-sm px-4  rounded-b-lg"
      style={{
        // backgroundColor: "var(--color-surface)",
        color: "var(--color-text)",
        transition: "background-color 0.3s ease, color 0.3s ease",
      }}
    >
      <div className="flex items-center gap-1">
        {/* 🎨 Theme Selector */}
        <div
          className="relative hidden md:block "
          ref={themeRef}
          style={{ color: "var(--color-primary)" }}
        >
          <Tooltip text="Change Theme">
            <button
              onClick={() => {
                setShowThemeSelect(!showThemeSelect);
                setShowNotifications(false);
                setShowUserMenu(false);
                setShowPersonSelect(false);
                setShowBusinessSelect(false);
              }}
              className="relative p-1 rounded-full hover:opacity-80 transition"
            >
              <Palette size={18} />
            </button>
          </Tooltip>

          {showThemeSelect && (
            <div
              className="absolute right-0 mt-2 w-40 rounded-lg shadow-lg text-sm z-50"
              style={{
                backgroundColor: "var(--color-surface)",
                border: "1px solid var(--color-primary-hover)",
                color: "var(--color-text)",
              }}
            >
              <div className="p-2 space-y-1">
                {themes.map((t) => (
                  <div
                    key={t.name}
                    onClick={() => handleThemeChange(t.class)}
                    className="flex items-center gap-2 cursor-pointer px-2 py-1 rounded-md hover:opacity-80 transition"
                    style={{
                      background: document.body.classList.contains(t.class)
                        ? "var(--color-primary-hover)"
                        : "transparent",
                    }}
                  >
                    <span
                      className="inline-block w-4 h-4 rounded-full border"
                      style={{ backgroundColor: t.color }}
                    ></span>
                    <span>{t.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 🧍 Person */}
        <div className="relative" ref={personRef}>
          <Tooltip text="Person ID">
            <button
              onClick={() => {
                setShowPersonSelect(!showPersonSelect);
                setShowNotifications(false);
                setShowUserMenu(false);
                setShowBusinessSelect(false);
                setShowThemeSelect(false);
              }}
              className="relative p-1 rounded-full hover:opacity-80 transition"
              style={{ color: "var(--color-text-light)" }}
            >
              <User2 size={18} />
            </button>
          </Tooltip>

          {showPersonSelect && (
            <div
              className="absolute right-0 mt-2 w-36 rounded-lg shadow-lg text-sm z-50"
              style={{
                backgroundColor: "var(--color-surface)",
                border: "1px solid var(--color-primary-hover)",
                color: "var(--color-text)",
              }}
            >
              <div className="p-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="personType" />
                  <span>Person A</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer mt-1">
                  <input type="radio" name="personType" />
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
                setShowThemeSelect(false);
              }}
              className="relative p-1 rounded-full hover:opacity-80 transition"
              style={{ color: "var(--color-text-light)" }}
            >
              <Building2 size={18} />
            </button>
          </Tooltip>

          {showBusinessSelect && (
            <div
              className="absolute right-0 mt-2 w-40 rounded-lg shadow-lg text-sm z-50"
              style={{
                backgroundColor: "var(--color-surface)",
                border: "1px solid var(--color-primary-hover)",
                color: "var(--color-text)",
              }}
            >
              <div className="p-2 space-y-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" />
                  <span>Business A</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" />
                  <span>Business B</span>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* 🔔 Notifications */}
        <div className="relative" ref={notifRef}>
          <Tooltip text="Notifications">
            <button
              className="relative p-1 rounded-full hover:opacity-80 transition"
              style={{ color: "var(--color-text-light)" }}
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowUserMenu(false);
                setShowPersonSelect(false);
                setShowBusinessSelect(false);
                setShowThemeSelect(false);
              }}
            >
              <Bell size={18} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </Tooltip>

          {showNotifications && <NotificationDropdown />}
        </div>

        {/* 👤 User Profile */}
        <div className="relative" ref={userRef}>
          <Tooltip text="User Profile">
            <div
              className="flex items-center gap-2 cursor-pointer rounded-md px-2 py-1 transition"
              style={{
                backgroundColor: "var(--color-primary)",
                color: "#fff",
              }}
              onClick={() => {
                setShowUserMenu(!showUserMenu);
                setShowNotifications(false);
                setShowPersonSelect(false);
                setShowBusinessSelect(false);
                setShowThemeSelect(false);
              }}
            >
              <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-sm font-medium">
                J
              </div>
              <span className="hidden md:inline text-sm font-medium ">
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
