import React from "react";
import { X } from "lucide-react";

const ModalCom = ({ isOpen, onClose, title, content }) => {
  if (!isOpen) return null;

  return (
    <div
      className="
        fixed inset-0 z-50 flex items-center justify-center
        bg-black/50 backdrop-blur-sm
        transition-all duration-300
      "
    >
      {/* Modal Container */}
      <div
        className="
          bg-white rounded-2xl shadow-2xl 
          w-[90%] sm:w-[75%] lg:w-[80%]
          max-h-[90vh] overflow-hidden 
          transform animate-fadeIn scale-100
        "
      >
        {/* Header */}
        <div className="flex justify-between items-center px-4 py-2 border-b border-gray-200">
          <p className="text-lg font-semibold text-gray-800">
            {title || ""}
          </p>
          <button
            onClick={onClose}
            className="text-red-500 hover:text-red-600 transition"
          >
            <X size={22} />
          </button>
        </div>

        {/* Body */}
        <div
          className="
            p-4 overflow-y-auto
            max-h-[70vh]
            text-gray-700
            scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent
          "
        >
          {content || <p>No content available</p>}
        </div>
      </div>
    </div>
  );
};

export default ModalCom;
