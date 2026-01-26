import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function InfoCard({
  icon: Icon,
  label,
  value,
  color = "bg-purple-500",
  darkMode,
}) {
  
  const textColor = color.startsWith("bg-")
    ? color.replace("bg-", "text-")
    : `text-${color}-500`;

  return (
    <Card
      className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}
    >
      {/* Header */}
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* Colored Dot */}
            <span className={`w-3 h-3 rounded-full ${color}`} />
            <CardTitle
              className={`text-sm font-medium ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {label}
            </CardTitle>
          </div>

          {/* Optional Icon */}
          {Icon && (
            <Icon
              className={`w-5 h-5 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
            />
          )}
        </div>
      </CardHeader>

      {/* Value */}
      <CardContent>
        <div className={`text-xl sm:text-2xl font-bold text-cyan-500 ${textColor}`}>
          {value}
        </div>
      </CardContent>
    </Card>
  );
}
