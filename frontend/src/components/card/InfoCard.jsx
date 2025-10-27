import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function InfoCard({
  icon: Icon,
  label,
  value,
  color = "bg-indigo-500",
  darkMode,
}) {
  return (
    <Card
      className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className={`w-3 h-3 rounded-full ${color}`} />
            <CardTitle
              className={`text-sm font-medium ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {label}
            </CardTitle>
          </div>
          {Icon ? <Icon className="w-5 h-5 text-gray-400" /> : null}
        </div>
      </CardHeader>

      <CardContent>
        <div
          className={`text-3xl font-bold ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          {value}
        </div>
      </CardContent>
    </Card>
  );
}
