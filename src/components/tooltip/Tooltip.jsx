import React from "react";

const Tooltip = ({ text, children }) => {
  return (
    <div className="relative group flex items-center justify-center">
      {children}
      <span
        className="
          absolute top-8 left-1/2 -translate-x-1/2 
          bg-slate-800 text-white text-xs px-2 py-1 rounded 
          opacity-0 group-hover:opacity-100 
          translate-y-1 group-hover:translate-y-0 
          transition-all duration-200 whitespace-nowrap z-50
        "
      >
        {text}
      </span>
    </div>
  );
};

export default Tooltip;
