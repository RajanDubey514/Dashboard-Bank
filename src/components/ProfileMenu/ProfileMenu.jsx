import React from "react";
import { LogOut, Mail, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProfileMenu = () => {

  const navigate = useNavigate();

  const user = {
    name: "John Doe",
    email: "john@example.com",
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/login";
  };

  const handleProfile = () =>{
    navigate("/setting") 
  }

  return (
    <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 shadow-lg rounded-lg z-20 animate-fadeIn">
      <div className="flex items-center gap-3 p-3 border-b border-slate-100">
        <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white text-sm font-medium">
          {user.name.charAt(0)}
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-700">{user.name}</p>
          <p className="text-xs text-slate-500">{user.email}</p>
        </div>
      </div>

      <div className="flex flex-col p-2">
        <button  onClick={handleProfile} 
         className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-slate-100 text-sm text-slate-700 transition">
          <User size={16} /> Profile
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-red-50 text-sm text-red-600 transition"
        >
          <LogOut size={16} /> Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileMenu;