import React from "react";
import { Loader } from "lucide-react";

const GlobalLoader = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 z-50 px-4 md:px-8 py-20 transition-colors duration-300">
      {/* Loader Icon */}
      <div className="relative mb-8">
        <Loader
          className="w-16 h-16 text-indigo-600 dark:text-indigo-400 animate-spin"
          style={{ animationDuration: "1.2s" }}
        />
      </div>

      {/* Loading Text */}
      <div className="flex flex-col items-center space-y-3">
        <span className="text-[24px] font-light text-gray-600 dark:text-gray-300 tracking-wide">
          Managing your finances
        </span>
        <span className="text-[42px] font-semibold text-indigo-600 dark:text-indigo-400 tracking-tight">
          FinTrack
        </span>
      </div>

      {/* Loading Dots */}
      <div className="flex space-x-2 mt-6">
        <div className="w-3 h-3 bg-indigo-600 dark:bg-indigo-400 rounded-full animate-bounce"></div>
        <div className="w-3 h-3 bg-indigo-600 dark:bg-indigo-400 rounded-full animate-bounce delay-100"></div>
        <div className="w-3 h-3 bg-indigo-600 dark:bg-indigo-400 rounded-full animate-bounce delay-200"></div>
      </div>
    </div>
  );
};

export default GlobalLoader;
