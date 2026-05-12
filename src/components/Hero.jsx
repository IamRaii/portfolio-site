import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";

const roles = ["Web Developer", "Mobile Developer", "Systems Architect"];

// ─────────────────────────────────────────────────────────────────────────────
// ProfilePhoto
// ─────────────────────────────────────────────────────────────────────────────
// Four images total — one default + one hover per theme.
// On hover: default fades out (opacity → 0), hover image fades in (opacity → 1).
// Theme switch instantly swaps which pair is active via opacity.
//
// FILE LOCATIONS  →  /public/images/profile/
//
//   profile-dark.jpg        default photo shown in dark mode
//   profile-dark-hover.png  hover photo shown in dark mode   (covering face pose)
//   profile-light.jpg       default photo shown in light mode
//   profile-light-hover.png hover photo shown in light mode  (covering face pose)
//
// To replace placeholders:
//   1. Drop your .jpg / .png / .webp files into /public/images/profile/
//   2. Use the exact filenames above (or update the src props below)
//   3. Recommended: square crop, 400×400px minimum
// ─────────────────────────────────────────────────────────────────────────────
function ProfilePhoto({ isDark }) {
  const [hovered, setHovered] = useState(false);

  // Transition duration in ms — must match the CSS transition below
  const DURATION = 350;

  return (
    <div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Decorative rotating ring */}
      <div
        className="absolute -inset-px rounded-full opacity-20 pointer-events-none"
        style={{
          background: "conic-gradient(from 90deg, var(--primary), transparent, var(--primary))",
        }}
        aria-hidden="true"
      />

      {/* Photo frame */}
      <div
        className={`relative w-60 h-60 xl:w-[272px] xl:h-[272px] rounded-full overflow-hidden border transition-colors duration-300
          ${isDark ? "border-ink-600" : "border-paper-300"}`}
        style={{ boxShadow: "0 0 0 1px var(--primary-muted)" }}
      >
        {/* ── DARK MODE: default ── */}
        <img
          src="/images/profile/profile-dark.jpg"
          alt="Developer profile"
          width="272"
          height="272"
          loading="eager"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            transition: `opacity ${DURATION}ms ease`,
            // Visible when: dark mode AND not hovered
            opacity: isDark && !hovered ? 1 : 0,
          }}
        />

        {/* ── DARK MODE: hover (covering face) ── */}
        <img
          src="/images/profile/profile-dark-hover.png"
          alt="Developer playfully covering face"
          width="272"
          height="272"
          loading="eager"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            transition: `opacity ${DURATION}ms ease`,
            // Visible when: dark mode AND hovered
            opacity: isDark && hovered ? 1 : 0,
          }}
        />

        {/* ── LIGHT MODE: default ── */}
        <img
          src="/images/profile/profile-light.jpg"
          alt="Developer profile"
          width="272"
          height="272"
          loading="eager"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            transition: `opacity ${DURATION}ms ease`,
            // Visible when: light mode AND not hovered
            opacity: !isDark && !hovered ? 1 : 0,
          }}
        />

        {/* ── LIGHT MODE: hover (covering face) ── */}
        <img
          src="/images/profile/profile-light-hover.png"
          alt="Developer playfully covering face"
          width="272"
          height="272"
          loading="eager"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            transition: `opacity ${DURATION}ms ease`,
            // Visible when: light mode AND hovered
            opacity: !isDark && hovered ? 1 : 0,
          }}
        />
      </div>

      {/* Status badge — sits outside the frame, below right */}
      <div
        className={`absolute bottom-3 right-1 flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-mono transition-colors duration-300
          ${isDark
            ? "bg-ink-800 border-wire text-neutral-400"
            : "bg-white border-wire-light text-neutral-500"}`}
      >
        <span
          className="w-1.5 h-1.5 rounded-full animate-pulse"
          style={{ backgroundColor: "var(--primary)" }}
        />
        {hovered ? "Peek-a-boo!" : "Open to work"}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Hero
// ─────────────────────────────────────────────────────────────────────────────
export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const target = roles[roleIndex];
    const i = displayed.length;
    if (typing) {
      if (i < target.length) {
        const t = setTimeout(() => setDisplayed(target.slice(0, i + 1)), 58);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setTyping(false), 2000);
        return () => clearTimeout(t);
      }
    } else {
      if (i > 0) {
        const t = setTimeout(() => setDisplayed(target.slice(0, i - 1)), 32);
        return () => clearTimeout(t);
      } else {
        setRoleIndex((p) => (p + 1) % roles.length);
        setTyping(true);
      }
    }
  }, [displayed, typing, roleIndex]);

  return (
    <section
      id="hero"
      className={`relative min-h-screen flex flex-col justify-center pt-16 overflow-hidden transition-colors duration-300
        ${isDark ? "bg-ink-950" : "bg-paper-50"}`}
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: `
            linear-gradient(${isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.04)"} 1px, transparent 1px),
            linear-gradient(90deg, ${isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.04)"} 1px, transparent 1px)
          `,
          backgroundSize: "72px 72px",
        }}
      />

      {/* Ambient glow */}
      <div
        className="absolute pointer-events-none"
        aria-hidden="true"
        style={{
          top: "20%", right: "-5%",
          width: "480px", height: "480px",
          borderRadius: "50%",
          background: "radial-gradient(circle, var(--primary), transparent 68%)",
          opacity: isDark ? 0.06 : 0.05,
          filter: "blur(40px)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 py-28 w-full">
        <div className="grid lg:grid-cols-[1fr_auto] gap-16 lg:gap-24 items-center">

          {/* LEFT: text */}
          <div className="max-w-2xl">

            {/* Eyebrow */}
            <div className="flex items-center gap-2.5 mb-10">
              <span className="section-label">Available for Projects</span>
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ backgroundColor: "var(--primary)" }}
              />
            </div>

            {/* Headline */}
            <h1
              className="section-title mb-7"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4.25rem)" }}
            >
              <span className={`block mb-1 ${isDark ? "text-neutral-100" : "text-neutral-900"}`}>
                Building Systems
              </span>
              <span className={`block mb-1 ${isDark ? "text-neutral-500" : "text-neutral-400"}`}>
                That Work in
              </span>
              <span className="block" style={{ color: "var(--primary)" }}>
                Production.
              </span>
            </h1>

            {/* Typewriter */}
            <div className="flex items-center gap-2 mb-8 h-7">
              <span className={`font-mono text-sm ${isDark ? "text-neutral-600" : "text-neutral-400"}`}>
                &gt;
              </span>
              <span className="font-mono text-sm" style={{ color: "var(--primary)" }}>
                {displayed}
              </span>
              <span
                className="font-mono text-sm animate-blink"
                style={{ color: "var(--primary)" }}
              >
                _
              </span>
            </div>

            {/* Body */}
            <p
              className={`text-[1.0625rem] leading-relaxed mb-12 max-w-lg
                ${isDark ? "text-neutral-400" : "text-neutral-600"}`}
            >
              I build secure, structured web and mobile applications for businesses.
              PHP backends, normalized databases, Flutter apps with Firebase. Clean
              architecture, maintainable code, and systems designed to last.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-16">
              <a href="#projects" className="btn-primary">
                View Projects
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <a href="#contact" className="btn-secondary">Get in Touch</a>
            </div>

            {/* Stats */}
            <div
              className={`flex flex-wrap gap-10 border-t pt-8
                ${isDark ? "border-wire" : "border-wire-light"}`}
            >
              {[
                { value: "4th Year", label: "IT Student" },
                { value: "PHP + SQL", label: "Web Stack" },
                { value: "Flutter",   label: "Mobile Stack" },
                { value: "Firebase",  label: "Cloud Backend" },
              ].map((s) => (
                <div key={s.label}>
                  <div
                    className={`font-display font-semibold text-base tracking-tight
                      ${isDark ? "text-neutral-200" : "text-neutral-800"}`}
                  >
                    {s.value}
                  </div>
                  <div
                    className="font-mono text-[11px] tracking-widest uppercase mt-0.5"
                    style={{ color: "var(--primary)" }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: profile photo with hover swap */}
          <div className="hidden lg:flex justify-center">
            <ProfilePhoto isDark={isDark} />
          </div>

        </div>
      </div>
    </section>
  );
}
