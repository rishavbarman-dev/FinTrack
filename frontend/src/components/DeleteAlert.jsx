import React from "react";

const DeleteAlert = ({ content, onDelete, onCancel }) => {
  return (
    <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg p-4">
      <p className="text-sm text-gray-700 dark:text-gray-200">{content}</p>

      <div className="mt-4 flex justify-end space-x-2">
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
