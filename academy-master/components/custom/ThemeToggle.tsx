"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => setMounted(true), []);
  if (!mounted) return (
    <div className="w-8 h-8 rounded-lg bg-surface-3 border border-white/[0.08] animate-pulse" />
  );

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      className={`relative w-8 h-8 rounded-lg flex items-center justify-center border transition-all duration-200 ${
        isDark
          ? "bg-surface-3 border-white/[0.08] text-warm-400 hover:bg-surface-4 hover:text-warm-200"
          : "bg-amber-50 border-amber-200 text-amber-600 hover:bg-amber-100"
      }`}
    >
      {isDark ? (
        <Sun className="h-3.5 w-3.5" />
      ) : (
        <Moon className="h-3.5 w-3.5" />
      )}
    </button>
  );
};

export default ThemeToggle;
