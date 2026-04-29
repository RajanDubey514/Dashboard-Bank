import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        
        {/* Spinner */}
        <div className="w-14 h-14 border-4 border-white/30 border-t-teal-400 rounded-full animate-spin"></div>
        
        {/* Text */}
        <p className="text-white text-lg font-medium tracking-wide">
          Please wait...
        </p>

      </div>
    </div>
  );
};

export default Loader;