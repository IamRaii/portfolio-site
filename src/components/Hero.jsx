import { useEffect, useState } from "react";

const roles = ["Web Developer", "Mobile Developer", "Systems Architect"];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const target = roles[roleIndex];
    let i = displayed.length;

    if (typing) {
      if (i < target.length) {
        const t = setTimeout(() => setDisplayed(target.slice(0, i + 1)), 60);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setTyping(false), 1800);
        return () => clearTimeout(t);
      }
    } else {
      if (i > 0) {
        const t = setTimeout(() => setDisplayed(target.slice(0, i - 1)), 35);
        return () => clearTimeout(t);
      } else {
        setRoleIndex((prev) => (prev + 1) % roles.length);
        setTyping(true);
      }
    }
  }, [displayed, typing, roleIndex]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center pt-16 overflow-hidden"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(#c2c8cf 1px, transparent 1px), linear-gradient(90deg, #c2c8cf 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Subtle gradient orb */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.04] blur-3xl"
        style={{ background: "radial-gradient(circle, #5a9e88, transparent 70%)" }}
      />

      <div className="relative max-w-6xl mx-auto px-6 py-24">
        {/* Meta label */}
        <div className="flex items-center gap-3 mb-10">
          <span className="section-label">Available for Projects</span>
          <span className="w-2 h-2 rounded-full bg-accent-glow animate-pulse" />
        </div>

        {/* Main headline */}
        <h1 className="font-display font-extrabold text-stone-200 leading-[1.05] mb-6">
          <span className="block text-4xl sm:text-6xl lg:text-7xl mb-2">
            Building Systems
          </span>
          <span className="block text-4xl sm:text-6xl lg:text-7xl mb-2 text-stone-400">
            That Work in
          </span>
          <span className="block text-4xl sm:text-6xl lg:text-7xl text-accent">
            Production.
          </span>
        </h1>

        {/* Typewriter */}
        <div className="flex items-center gap-2 mb-8 h-8">
          <span className="font-mono text-stone-500 text-sm">&gt;</span>
          <span className="font-mono text-accent-glow text-sm sm:text-base">
            {displayed}
          </span>
          <span className="font-mono text-accent-glow text-sm animate-blink">_</span>
        </div>

        {/* Subtext */}
        <p className="max-w-xl text-stone-400 text-base sm:text-lg leading-relaxed mb-12">
          I build secure, structured web and mobile applications for businesses —
          PHP backends, normalized databases, Flutter apps with Firebase. Clean
          architecture. Maintainable code. Systems designed to last.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4 mb-20">
          <a href="#projects" className="btn-primary">
            View Projects
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a href="#contact" className="btn-secondary">
            Get in Touch
          </a>
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap gap-10 border-t border-wire pt-8">
          {[
            { value: "4th Year", label: "IT Student" },
            { value: "PHP + SQL", label: "Web Stack" },
            { value: "Flutter", label: "Mobile Stack" },
            { value: "Firebase", label: "Cloud Backend" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="font-display font-bold text-stone-200 text-lg">{stat.value}</div>
              <div className="font-mono text-xs text-stone-500 tracking-wider uppercase">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
