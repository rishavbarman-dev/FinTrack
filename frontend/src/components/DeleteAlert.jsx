import React from "react";

const DeleteAlert = ({ content, onDelete, onCancel, darkMode }) => {
  // --- Dynamic classes ---
  const containerClasses = `
    w-full max-w-md mx-auto rounded-md shadow-lg border p-4 transition-colors
    ${darkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-200 text-gray-900"}
  `;

  const textColor = darkMode ? "text-gray-200" : "text-gray-700";
  const cancelBtnClasses = `
    px-4 py-2 rounded-md text-sm transition border
    ${
      darkMode
        ? "bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600"
        : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
    }
  `;

  return (
    <div className={containerClasses}>
      <p className={`text-sm ${textColor}`}>{content}</p>

      <div className="mt-4 flex justify-end space-x-2">
        <button type="button" onClick={onCancel} className={cancelBtnClasses}>
          Cancel
        </button>

        <button
          type="button"
          onClick={onDelete}
          className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-sm text-white transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteAlert;
