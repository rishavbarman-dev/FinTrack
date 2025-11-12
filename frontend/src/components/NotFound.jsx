import React from "react";
import { Link, useOutletContext } from "react-router-dom";

const NotFound = () => {
  const outletContext = useOutletContext();
  const darkMode = outletContext?.darkMode ?? false;
  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen px-6 text-center transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* 404 Heading */}
      <h1
        className={`text-9xl font-extrabold tracking-widest ${
          darkMode ? "text-purple-400" : "text-purple-600"
        }`}
      >
        404
      </h1>

      {/* Message */}
      <p
        className={`mt-4 text-lg ${
          darkMode ? "text-gray-400" : "text-gray-600"
        }`}
      >
        Oops! The page you're looking for doesn't exist in FinTrack.
      </p>

      {/* Back to Dashboard Button */}
      <Link
        to="/dashboard"
        className={`mt-6 inline-block px-6 py-3 rounded-lg shadow-md font-medium transition-all duration-300 ${
          darkMode
            ? "bg-purple-600 hover:bg-purple-700 text-white"
            : "bg-purple-500 hover:bg-purple-600 text-white"
        }`}
      >
        Back to Dashboard
      </Link>

      {/* Footer */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <p
          className={`text-sm ${darkMode ? "text-gray-500" : "text-gray-400"}`}
        >
          © {new Date().getFullYear()} FinTrack
        </p>
      </div>
    </div>
  );
};

export default NotFound;
