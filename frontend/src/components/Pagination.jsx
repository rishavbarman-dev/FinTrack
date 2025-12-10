import React from "react";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  darkMode = false,
}) => {
  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;

  return (
    <div
      className={`flex items-center justify-center gap-3 py-4 border-t text-sm font-medium
      ${darkMode ? "border-gray-700 text-gray-300" : "border-gray-200 text-gray-700"}`}
    >
      {/* Previous Button */}
      <button
        disabled={isFirst}
        onClick={() => !isFirst && onPageChange(currentPage - 1)}
        className={`px-3 py-1 rounded-md transition
        ${
          isFirst
            ? "opacity-30 cursor-not-allowed"
            : darkMode
              ? "hover:bg-gray-700"
              : "hover:bg-purple-100"
        }`}
      >
        ◀ Prev
      </button>

      {/* Page Indicators */}
      <span className="opacity-80">
        Page <b>{currentPage}</b> of {totalPages}
      </span>

      {/* Next Button */}
      <button
        disabled={isLast}
        onClick={() => !isLast && onPageChange(currentPage + 1)}
        className={`px-3 py-1 rounded-md transition
        ${
          isLast
            ? "opacity-30 cursor-not-allowed"
            : darkMode
              ? "hover:bg-gray-700"
              : "hover:bg-purple-100"
        }`}
      >
        Next ▶
      </button>
    </div>
  );
};

export default Pagination;
