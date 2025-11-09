import React, { useEffect, useState } from "react";
import { X, Info, AlertCircle, CheckCircle } from "lucide-react";

const ModalCom = ({
  isOpen,
  onClose,
  title,
  content,
  iconType = "info",
  onSubmit,
  onReset, // ✅ added reset handler prop
  submitText = "Submit",
  cancelText = "Cancel",
}) => {
  const [visible, setVisible] = useState(false);

  // For smooth open/close mount animation
  useEffect(() => {
    if (isOpen) {
      setVisible(true);
    } else {
      const timeout = setTimeout(() => setVisible(false), 250);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  if (!isOpen && !visible) return null;

  // ✅ Icon mapping for header
  const iconMap = {
    info: <Info size={22} color="white" />,
    warning: <AlertCircle size={16} color="white" />,
    success: <CheckCircle size={16} color="white" />,
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center 
        bg-black/50 backdrop-blur-sm transition-opacity duration-300
        ${isOpen ? "opacity-100" : "opacity-0"}`}
    >
      <div
        className={`bg-[var(--color-surface)] rounded-2xl shadow-2xl 
          w-[80%] sm:w-[80%] lg:w-[80%] xl:w-[80%]
          max-h-[90vh] flex flex-col overflow-hidden transform 
          transition-all duration-300 ease-in-out
          ${isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
      >
        {/* ===== HEADER ===== */}
        <div
          className="flex items-center justify-between px-5 py-2"
          style={{
            backgroundColor: "var(--color-primary)",
            color: "#fff",
          }}
        >
          <div className="flex items-center gap-2">
            {iconMap[iconType]}
            <p className="text-base sm:text-sm font-semibold">{title || ""}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-red-500 hover:bg-red-600 transition"
            title="Close"
          >
            <X size={15} color="white" />
          </button>
        </div>

        {/* ===== BODY ===== */}
        <div
          className="flex-1 overflow-y-auto p-4 text-[var(--color-text)]"
          style={{ backgroundColor: "var(--color-bg)" }}
        >
          {content || <p>No content available</p>}
        </div>

        {/* ===== FOOTER ===== */}
        {/* <div
          className="flex justify-end gap-3 px-5 py-3 border-t border-gray-200 sticky bottom-0"
          style={{ backgroundColor: "var(--color-surface)" }}
        >
          <button
            onClick={onReset}
            className="border border-yellow-500 text-yellow-600 hover:bg-yellow-50 px-4 py-2 rounded-md text-sm font-medium transition"
          >
            Reset
          </button>
          <button
            onClick={onClose}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition"
          >
            {cancelText}
          </button>
          <button
            onClick={onSubmit}
            className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white px-4 py-2 rounded-md text-sm font-medium transition"
          >
            {submitText}
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default ModalCom;
