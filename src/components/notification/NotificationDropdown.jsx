import React, { useState } from "react";
import { X } from "lucide-react";

const NotificationDropdown = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New order received!" },
    { id: 2, message: "Server backup completed." },
    { id: 3, message: "New user registered." },
  ]);

  const handleRemove = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 shadow-lg rounded-lg z-20 animate-fadeIn">
      <div className="p-3 border-b border-slate-100 font-semibold text-slate-700 text-sm">
        Notifications
      </div>
      <div className="max-h-64 overflow-y-auto">
        {notifications.length > 0 ? (
          notifications.map((n) => (
            <div
              key={n.id}
              className="flex justify-between items-center px-3 py-2 hover:bg-slate-50 transition"
            >
              <p className="text-sm text-slate-600">{n.message}</p>
              <button
                onClick={() => handleRemove(n.id)}
                className="text-slate-400 hover:text-red-500 transition"
              >
                <X size={14} />
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-slate-400 text-sm py-3">
            No new notifications
          </p>
        )}
      </div>
    </div>
  );
};

export default NotificationDropdown;
