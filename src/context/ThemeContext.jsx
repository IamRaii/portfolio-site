import { createContext, useContext, useEffect, useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// ThemeContext
// ─────────────────────────────────────────────────────────────────────────────
// Controls dark / light mode for the entire app.
//
// HOW IT WORKS:
//   1. On first load, reads preference from localStorage (key: "theme").
//   2. Falls back to "dark" if no preference is stored.
//   3. Applies/removes the `dark` class on <html> — Tailwind reads this.
//   4. Persists any change to localStorage automatically.
//
// HOW TO USE IN A COMPONENT:
//   import { useTheme } from "../context/ThemeContext";
//   const { theme, toggleTheme } = useTheme();
// ─────────────────────────────────────────────────────────────────────────────

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // Read persisted preference; default to dark
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "dark";
    }
    return "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
  return ctx;
}
