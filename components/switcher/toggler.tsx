'use client'
import * as React from "react";
import { useTheme } from "next-themes";
import { FiSun, FiMoon } from "react-icons/fi"; // You can replace these with your preferred icons

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="relative inline-block text-gray-600 dark:text-gray-400">
      <button
        className="text-lg p-2 focus:outline-none"
        onClick={() => {
          if (theme === "light") {
            setTheme("dark");
          } else {
            setTheme("light");
          }
        }}
      >
        {theme === "light" ? (
          <FiSun className="w-6 h-6" />
        ) : (
          <FiMoon className="w-6 h-6" />
        )}
        <span className="sr-only">Toggle theme</span>
      </button>
    </div>
  );
}
