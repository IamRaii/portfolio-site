import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

const navLinks = [
  { label: "About",    href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Stack",    href: "#stack" },
  { label: "Certs",    href: "#certifications" },
  { label: "Contact",  href: "#contact" },
];

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4.5"/>
      <line x1="12" y1="2" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="2" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrolledBg = isDark
    ? "bg-ink-950/90 backdrop-blur-md border-b border-wire"
    : "bg-paper-50/90 backdrop-blur-md border-b border-wire-light";

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? scrolledBg : ""}`}>
      <div className="max-w-6xl mx-auto px-6 h-[60px] flex items-center justify-between">

        {/* Logo */}
        <a href="#hero"
           className="font-mono text-xs font-medium tracking-[0.18em] uppercase transition-colors duration-150"
           style={{ color: "var(--primary)" }}>
          &lt;Rai /&gt;
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}
               className={`text-[13px] font-medium tracking-wide transition-colors duration-150
                 ${isDark
                   ? "text-neutral-400 hover:text-neutral-100"
                   : "text-neutral-500 hover:text-neutral-900"}`}
               style={{"--hover-color": "var(--primary)"}}>
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right: toggle + CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className={`w-8 h-8 flex items-center justify-center rounded-md transition-colors duration-150
              ${isDark ? "text-neutral-500 hover:text-neutral-200" : "text-neutral-400 hover:text-neutral-700"}`}>
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>

          <a href="#contact"
             className={`text-[13px] font-medium px-4 py-2 rounded-md border transition-all duration-150
               ${isDark
                 ? "border-wire text-neutral-300 hover:border-primary hover:text-primary"
                 : "border-wire-light text-neutral-600 hover:border-primary hover:text-primary"}`}
             style={{"--tw-text-opacity": 1}}>
            Hire Me
          </a>
        </div>

        {/* Mobile */}
        <div className="md:hidden flex items-center gap-3">
          <button onClick={toggleTheme} aria-label="Toggle theme"
                  className={`w-8 h-8 flex items-center justify-center transition-colors
                    ${isDark ? "text-neutral-500 hover:text-neutral-200" : "text-neutral-400 hover:text-neutral-700"}`}>
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>

          <button className="flex flex-col gap-[5px] p-1" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {[0,1,2].map((i) => (
              <span key={i} className={`block h-px transition-all duration-200
                ${isDark ? "bg-neutral-400" : "bg-neutral-600"}
                ${i === 0 && menuOpen ? "w-5 rotate-45 translate-y-[9px]" :
                  i === 1 && menuOpen ? "w-5 opacity-0" :
                  i === 2 && menuOpen ? "w-5 -rotate-45 -translate-y-[9px]" : "w-5"}`} />
            ))}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className={`md:hidden px-6 pt-3 pb-5 flex flex-col gap-1 border-b
          ${isDark ? "bg-ink-900/95 border-wire" : "bg-white/95 border-wire-light"}`}>
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}
               className={`text-sm py-2 font-medium transition-colors
                 ${isDark ? "text-neutral-300 hover:text-neutral-100" : "text-neutral-600 hover:text-neutral-900"}`}
               onClick={() => setMenuOpen(false)}>
              {link.label}
            </a>
          ))}
          <a href="#contact" className="btn-primary mt-3 justify-center text-center">Hire Me</a>
        </div>
      )}
    </header>
  );
}
