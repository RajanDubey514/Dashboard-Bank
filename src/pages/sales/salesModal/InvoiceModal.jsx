import React, { useEffect, useState } from "react";
import { X, Info, AlertCircle, CheckCircle } from "lucide-react";

const InvoiceModal = ({
  isOpen,
  onClose,
  title,
  content,
  iconType = "info",
  onSubmit,
  onReset,
  submitText = "Submit",
  cancelText = "Cancel",

  // ✅ NEW PROPS
  width = "80%",          // "600px" | "80%" | "50rem"
  maxWidth = "90vw",      // optional
  height = "auto",        // "70vh" | "500px"
  maxHeight = "90vh",     // optional
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) setVisible(true);
    else {
      const timeout = setTimeout(() => setVisible(false), 250);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  if (!isOpen && !visible) return null;

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
          flex flex-col overflow-hidden transform transition-all duration-300
          ${isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
        style={{
          width,
          maxWidth,
          height,
          maxHeight,
        }}
      >
        {/* ===== HEADER ===== */}
        <div
          className="flex items-center justify-between px-3 py-1.5"
          style={{ backgroundColor: "var(--color-primary)", color: "#fff" }}
        >
          <div className="flex items-center gap-2">
            {iconMap[iconType]}
            <p className="text-sm font-semibold">{title}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full bg-red-500 hover:bg-red-600"
          >
            <X size={12} color="white" />
          </button>
        </div>

        {/* ===== BODY ===== */}
        <div className="flex-1 overflow-y-auto p-1">
          {content}
        </div>

        {/* ===== FOOTER ===== */}
        <div className="flex justify-end gap-3 px-3 py-1 border-t">
          <button onClick={onReset} className="border px-2 py-1 text-xs">
            Reset
          </button>
          <button onClick={onClose} className="bg-red-500 px-2 py-1 text-xs text-white">
            {cancelText}
          </button>
          <button onClick={onSubmit} className="bg-[var(--color-primary)] px-2 py-1 text-xs text-white">
            {submitText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceModal;
