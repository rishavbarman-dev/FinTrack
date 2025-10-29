import React from "react";

const Model = ({ darkMode, isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div
        className={`relative w-full max-w-md rounded-lg shadow-xl p-6 ${
          darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className={`text-xl leading-none ${
              darkMode
                ? "text-gray-300 hover:text-gray-100"
                : "text-gray-500 hover:text-gray-700"
            }`}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        <div>{children}</div>
      </div>
    </div>
  );
};

export default Model;
