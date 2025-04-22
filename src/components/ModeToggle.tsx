import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function ModeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  function toggleTheme() {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative transition-all duration-300 hover:ring-2 hover:ring-ring hover:scale-105"
    >
      <Sun
        className="absolute h-[1.2rem] w-[1.2rem] text-yellow-500 transition-all duration-300 ease-in-out rotate-0 scale-100 dark:rotate-90 dark:scale-0"
      />
      <Moon
        className="absolute h-[1.2rem] w-[1.2rem] text-blue-500 transition-all duration-300 ease-in-out rotate-90 scale-0 dark:rotate-0 dark:scale-100"
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
