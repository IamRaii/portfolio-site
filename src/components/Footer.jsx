import { useTheme } from "../context/ThemeContext";

export default function Footer() {
  const year = new Date().getFullYear();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <footer className={`border-t py-10 transition-colors duration-300
      ${isDark ? "border-wire bg-ink-950" : "border-wire-light bg-paper-50"}`}>
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className={`font-mono text-[11px] ${isDark ? "text-neutral-700" : "text-neutral-400"}`}>
          © {year} All rights reserved.
        </span>
        <span className={`font-mono text-[11px] ${isDark ? "text-neutral-800" : "text-neutral-300"}`}>
          Built with React + Tailwind CSS
        </span>
        <div className={`flex items-center gap-2 font-mono text-[11px] ${isDark ? "text-neutral-700" : "text-neutral-400"}`}>
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "var(--primary)" }} />
          Available for work
        </div>
      </div>
    </footer>
  );
}
