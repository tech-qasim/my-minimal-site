import React, { useEffect, useState } from "react";
import { Sun, Moon, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | "system";
    setTheme(savedTheme || "system");
  }, []);

  const applyTheme = (newTheme: string) => {
    const root = document.documentElement;
    const isDark =
      newTheme === "dark" || (newTheme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

    root.classList.toggle("dark", isDark);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (theme === "system") {
        applyTheme("system");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("theme", theme);
    applyTheme(theme);
  }, [theme, mounted]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 rounded-lg border p-1">
      <button
        onClick={() => setTheme("light")}
        className={cn("p-1.5 rounded-md transition-colors", theme === "light" && "bg-gray-100 dark:bg-gray-800")}
        aria-label="浅色模式"
      >
        <Sun size={18} />
      </button>
      <button
        onClick={() => setTheme("dark")}
        className={cn("p-1.5 rounded-md transition-colors", theme === "dark" && "bg-gray-100 dark:bg-gray-800")}
        aria-label="深色模式"
      >
        <Moon size={18} />
      </button>
      <button
        onClick={() => setTheme("system")}
        className={cn("p-1.5 rounded-md transition-colors", theme === "system" && "bg-gray-100 dark:bg-gray-800")}
        aria-label="跟随系统"
      >
        <Monitor size={18} />
      </button>
    </div>
  );
};

export default ThemeToggle;
