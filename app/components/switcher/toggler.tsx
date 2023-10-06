'use client'
import * as React from "react";
import { useTheme } from "next-themes";
import { FiSun, FiMoon } from "react-icons/fi"; // You can replace these with your preferred icons

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="relative inline-block">
      <button
        className="focus:outline-none"
        onClick={() => {
          if (theme === "light") {
            setTheme("dark");
          } else {
            setTheme("light");
          }
        }}
      >
        {theme === "light" ? (
          <span><FiSun className="w-6 h-6 inline" /> Light mode</span>
        ) : (
          <span><FiMoon className="w-6 h-6 inline" /> Dark mode</span>
        )}
        <span className="sr-only">Toggle theme</span>
      </button>
    </div>
  );
}
