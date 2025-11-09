import React, { useState, useRef, useEffect } from "react";
import { Palette } from "lucide-react";

export default function UserProfile() {
  const [showThemeSelect, setShowThemeSelect] = useState(false);
  const themeRef = useRef(null);

  const themes = [
    { name: "Indigo", class: "theme-indigo", color: "#6366f1" },
    { name: "Teal", class: "theme-teal", color: "#0d9488" },
    { name: "Orange", class: "theme-orange", color: "#f97316" },
    { name: "Emerald", class: "theme-emerald", color: "#047857" },
    { name: "Dark", class: "theme-dark", color: "#334155" },
  ];

  // Close theme dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!themeRef.current?.contains(e.target)) {
        setShowThemeSelect(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleThemeChange = (themeClass) => {
    document.body.className = themeClass; // Apply theme globally
    setShowThemeSelect(false);
  };

  return (
    <div
      className="
        mt-2 rounded-xl shadow border border-slate-100
        bg-[var(--color-surface)] text-[var(--color-text)]
        p-4 w-64 md:w-72 mx-auto relative transition-colors duration-300
      "
    >
      {/* 🎨 Mobile Theme Button */}
      <div className="absolute top-2 right-2 md:hidden" ref={themeRef}>
        <button
          onClick={() => setShowThemeSelect(!showThemeSelect)}
          className="flex rounded-full bg-[var(--color-primary)] text-white hover:opacity-90 transition"
        > 
          <Palette size={18} /> 
        </button>

        {/* Theme Dropdown */}
        {showThemeSelect && (
          <div className="absolute right-0 mt-2 w-36 bg-[var(--color-surface)] border border-slate-200 rounded-lg shadow-lg z-50">
            <div className="p-2 space-y-1 text-sm">
              {themes.map((t) => (
                <div
                  key={t.name}
                  onClick={() => handleThemeChange(t.class)}
                  className="flex items-center gap-2 cursor-pointer px-2 py-1 rounded-md hover:bg-[var(--color-surface-hover)] transition"
                >
                  <span
                    className="inline-block w-4 h-4 rounded-full border border-gray-300"
                    style={{ backgroundColor: t.color }}
                  ></span>
                  <span className="text-[var(--color-text)]">{t.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 👤 Profile Content */}
      <div className="flex flex-col items-center text-center">
        <img
          src="https://randomuser.me/api/portraits/men/45.jpg"
          alt="User"
          className="w-20 h-20 rounded-full border-2 border-[var(--color-primary)]"
        />
        <h3 className="mt-2 text-lg font-semibold text-[var(--color-text)]">
          Rajan Dubey
        </h3>
        <p className="text-sm text-[var(--color-text-light)]">
          Frontend Developer
        </p>

        <div className="mt-3 text-sm text-[var(--color-text-light)] space-y-1">
          <p>Email: rajan.dubey@example.com</p>
          <p>Phone: +91 98765 43210</p>
          <p>Location: Mumbai, India</p>
        </div>

        <button className="mt-3 bg-[var(--color-primary)] text-white px-4 py-1.5 rounded-md text-sm hover:bg-[var(--color-primary-hover)] transition">
          Edit Profile
        </button>
      </div>
    </div>
  );
}
