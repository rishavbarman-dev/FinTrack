import * as React from "react";
import { cn } from "@/lib/utils";

function Select({
  className,
  options = [],
  placeholder = "Select option",
  darkMode = false,
  ...props
}) {
  return (
    <select
      data-slot="select"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        darkMode
          ? "bg-gray-700 text-white border-gray-600 [&>option]:bg-gray-700 [&>option]:text-white"
          : "bg-white text-gray-900 [&>option]:bg-white [&>option]:text-gray-900",
        className
      )}
      {...props}
    >
      <option value="" disabled>
        {placeholder}
      </option>

      {options.map((item, i) => (
        <option key={i} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
}

export { Select };
