import React, { useState, useRef, useEffect } from "react";
import { Palette } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo , updateUserInfoImage } from "../../redux/slice/personalInfo/PersonalInfoSlice";
import { alertError , alertSuccess } from "../alert/Alert";
import EditProfileModal from "./EditProfileModal";
import Loader from "../loader/Loader";

export default function UserProfile() {
   const dispatch = useDispatch();
  const { profileDataList , loading} = useSelector((state) => state.PersonalInfoUse);
  const [showThemeSelect, setShowThemeSelect] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
  const themeRef = useRef(null);
  const fileInputRef = useRef();
  const themes = [
    { name: "Indigo", class: "theme-indigo", color: "#6366f1" },
    { name: "Teal", class: "theme-teal", color: "#0d9488" },
    { name: "Orange", class: "theme-orange", color: "#f97316" },
    { name: "Emerald", class: "theme-emerald", color: "#047857" },
    { name: "Dark", class: "theme-dark", color: "#334155" },
  ];

    useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

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

   // ✅ Image Upload
  const handleImageChange = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  try {
    const resp = await dispatch(updateUserInfoImage(file)).unwrap(); // ✅ sirf file
    alertSuccess(resp.message);
    dispatch(getUserInfo());
  } catch (err) {
    console.log(err);
    alertError(err.message);
  }

  e.target.value = null; // reset input
};

  return (
    <>
    {loading && (<Loader />)}
     <div
  className="
    mt-4 rounded-2xl shadow-md border border-slate-200
    bg-[var(--color-surface)] text-[var(--color-text)]
    p-5 w-72 md:w-80 mx-auto relative transition-all duration-300
  "
>
  {/* 🎨 Theme Button */}
  <div className="absolute top-3 right-3 md:hidden" ref={themeRef}>
    <button
      onClick={() => setShowThemeSelect(!showThemeSelect)}
      className="p-2 rounded-full bg-[var(--color-primary)] text-white shadow hover:scale-105 transition"
    >
      <Palette size={16} />
    </button>

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
                className="w-4 h-4 rounded-full border"
                style={{ backgroundColor: t.color }}
              ></span>
              <span className="text-[var(--color-text)]">{t.name}</span>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>

  {/* 👤 Profile */}
  <div className="flex flex-col items-center text-center">

    {/* Avatar */}
    <div className="relative group">
      <img
        src={profileDataList?.avatar}
        alt="User"
        className="
          w-30 h-30 rounded-full object-fit
          border-4 border-[var(--color-primary)]
          shadow-md transition-transform duration-300
          group-hover:scale-105 
        "
      />

      {/* Edit Button */}
      <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-1 rounded-full cursor-pointer text-xs">
            ✏️
            <input type="file"
              hidden
             ref={fileInputRef}
             onChange={handleImageChange} />
          </label>
    </div>

    {/* Name */}
    <h3 className="mt-3 text-lg font-semibold text-[var(--color-text)]">
      {profileDataList?.fullName}
    </h3>

    {/* Role */}
    <p className="text-sm text-[var(--color-text-light)]">
      {profileDataList?.role}
    </p>

    {/* Info */}
    <div className="mt-4 w-full text-sm text-[var(--color-text-light)] space-y-2">

      <div className="flex justify-between border-b border-slate-200 pb-1">
        <span>Email</span>
        <span className="text-[var(--color-text)] font-medium">
          {profileDataList?.email}
        </span>
      </div>

      <div className="flex justify-between border-b border-slate-200 pb-1">
        <span>Phone</span>
        <span className="text-[var(--color-text)] font-medium">
          {profileDataList?.phone}
        </span>
      </div>

      <div className="flex justify-between">
        <span>Status</span>
        <span className="text-[var(--color-primary)] font-medium">
          {profileDataList?.accountStatus}
        </span>
      </div>
      <div className="flex justify-between">
        <span>Location</span>
        <span className="text-[var(--color-primary)] font-medium">
          {profileDataList?.location}
        </span>
      </div>
      <div className="flex justify-between">
        <span>Bio</span>
        <span className="text-[var(--color-primary)] font-medium">
          {profileDataList?.bio}
        </span>
      </div>
    </div>

    {/* Button */}
    <button
      onClick={() => setShowEditModal(true)}
      className="
        mt-5 w-full
        bg-[var(--color-primary)] text-white
        py-2 rounded-lg text-sm
        shadow hover:opacity-90 transition
      "
    >
      Edit Profile
    </button>
  </div>

     {/* Modal */}
      {showEditModal && (
        <EditProfileModal
          data={profileDataList}
          onClose={() => setShowEditModal(false)}
        />
      )}
   </div>
    </>
  );
}
