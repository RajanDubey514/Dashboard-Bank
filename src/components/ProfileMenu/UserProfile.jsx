import React from "react";

export default function UserProfile() {
  return (
    <div className="mt-2 bg-white border border-slate-100 rounded-xl shadow p-3 w-64 md:w-72 mx-auto z-50">
      <div className="flex flex-col items-center text-center">
        <img
          src="https://randomuser.me/api/portraits/men/45.jpg"
          alt="User"
          className="w-20 h-20 rounded-full border-2 border-indigo-500"
        />
        <h3 className="mt-2 text-lg font-semibold text-slate-800">
          Rajan Dubey
        </h3>
        <p className="text-sm text-slate-500">Frontend Developer</p>

        <div className="mt-3 text-sm text-slate-600">
          <p>Email: rajan.dubey@example.com</p>
          <p>Phone: +91 98765 43210</p>
          <p>Location: Mumbai, India</p>
        </div>

        <button className="mt-3 bg-indigo-500 text-white px-4 py-1.5 rounded-md text-sm hover:bg-indigo-600 transition">
          Edit Profile
        </button>
      </div>
    </div>
  );
}
