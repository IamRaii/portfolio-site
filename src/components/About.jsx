import { useTheme } from "../context/ThemeContext";
import { useScrollReveal } from "../hooks/useScrollReveal";

const principles = [
  {
    icon: "◈",
    title: "Database-First Thinking",
    body: "A well-structured schema prevents entire categories of bugs. I design data models before writing application logic, with normalization, relationships, and indexing decisions settled up front.",
  },
  {
    icon: "◉",
    title: "Security by Default",
    body: "Parameterized queries, input validation, auth boundary checks, and CSRF protection are not afterthoughts. They are part of how the system is built from the first commit.",
  },
  {
    icon: "◎",
    title: "Maintainable Architecture",
    body: "Code that works today but can't be understood or extended tomorrow is a liability. Clean separation of concerns and consistent patterns mean the next developer isn't starting from scratch.",
  },
];

export default function About() {
  const { ref, revealed } = useScrollReveal();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section id="about"
      className={`py-32 border-t transition-colors duration-300
        ${isDark ? "bg-ink-950 border-wire" : "bg-paper-50 border-wire-light"}`}>
      <div className="max-w-6xl mx-auto px-6">
        <div ref={ref} className={`${revealed ? "fade-up visible" : "fade-up"} grid md:grid-cols-2 gap-20 items-start`}>

          {/* Left */}
          <div>
            <p className="section-label mb-5">About</p>
            <h2 className={`section-title text-4xl lg:text-5xl mb-3 ${isDark ? "text-neutral-100" : "text-neutral-900"}`}>
              Systems thinker.
            </h2>
            <h2 className="section-title text-4xl lg:text-5xl mb-10" style={{ color: "var(--primary)" }}>
              Backend engineer.
            </h2>

            <div className={`space-y-5 text-[0.9375rem] leading-relaxed
              ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
              <p>
                I'm a 4th-year Information Technology student who builds full-stack web
                and mobile applications. My work skews heavily toward backend architecture —
                database design, server-side logic, authentication systems, and the structural decisions that determine whether a system holds up over time.
              </p>
              <p>
                On the web side, I work with PHP and MySQL. On mobile, I build with Flutter
                and Firebase, including offline-capable applications that sync reliably when
                connectivity is restored. I apply clean architecture principles in both contexts.
              </p>
              <p>
                I'm not interested in shipping something that works once. I'm interested in
                building systems that work consistently, can be extended without major
                rework, and don't create security exposure in production.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-2">
              {["PHP", "MySQL", "Flutter", "Firebase", "REST APIs", "Clean Architecture"].map((t) => (
                <span key={t} className="tag tag-primary">{t}</span>
              ))}
            </div>
          </div>

          {/* Right: principles */}
          <div className="space-y-4">
            {principles.map((p) => (
              <div key={p.title} className="card group">
                <div className="flex items-start gap-4">
                  <span className="font-mono text-base mt-0.5 flex-shrink-0 transition-colors duration-150"
                        style={{ color: "var(--primary)" }}>
                    {p.icon}
                  </span>
                  <div>
                    <h3 className={`font-semibold text-[0.9375rem] mb-2 tracking-tight
                      ${isDark ? "text-neutral-200" : "text-neutral-800"}`}>
                      {p.title}
                    </h3>
                    <p className={`text-sm leading-relaxed
                      ${isDark ? "text-neutral-500" : "text-neutral-600"}`}>
                      {p.body}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
