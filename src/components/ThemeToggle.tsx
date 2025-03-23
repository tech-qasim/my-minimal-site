import { useEffect, useState } from "react";
import { Sun, Moon, Monitor } from "lucide-react";
import { motion, useAnimation } from "framer-motion";

const iconVariants = {
  visible: {
    rotate: 0,
    scale: 1,
    opacity: 1,
  },
  hidden: {
    scale: 0,
    opacity: 0,
    rotate: 180,
  },
};

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");
  const controlsSun = useAnimation();
  const controlsMoon = useAnimation();
  const controlsSystem = useAnimation();

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
    if (!mounted) return;

    if (theme === "system") {
      controlsSun.start("hidden");
      controlsSystem.start("visible");
      controlsMoon.start("hidden");
    } else {
      controlsSun.start(theme === "light" ? "visible" : "hidden");
      controlsMoon.start(theme === "dark" ? "visible" : "hidden");
      controlsSystem.start("hidden");
    }

    localStorage.setItem("theme", theme);
    applyTheme(theme);
  }, [theme, mounted, controlsSun, controlsMoon, controlsSystem]);

  if (!mounted) return null;

  const handleClick = () => {
    const themeMap = {
      light: "dark",
      dark: "system",
      system: "light",
    };
    setTheme(themeMap[theme] as "light" | "dark" | "system");
  };

  return (
    <button
      onClick={handleClick}
      className="relative size-5 flex items-center justify-center cursor-pointer"
      aria-label="切换主题"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        className="relative size-5 flex items-center justify-center"
      >
        <motion.div
          className="absolute inset-0"
          variants={iconVariants}
          initial="hidden"
          animate={controlsSun}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          <Sun className="size-5" fill="currentColor" />
        </motion.div>
        <motion.div
          className="absolute inset-0"
          variants={iconVariants}
          initial="hidden"
          animate={controlsSystem}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          <Monitor className="size-5 dark:rotate-180" />
        </motion.div>
        <motion.div
          className="absolute inset-0"
          variants={iconVariants}
          initial="hidden"
          animate={controlsMoon}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          <Moon className="size-5" fill="currentColor" />
        </motion.div>
      </motion.div>
    </button>
  );
};

export default ThemeToggle;
