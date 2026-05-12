import { techStack } from "../data/portfolio";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useTheme } from "../context/ThemeContext";

const categories = [
  { key: "Backend",  label: "Backend" },
  { key: "Frontend", label: "Frontend" },
  { key: "Mobile",   label: "Mobile" },
  { key: "Tools",    label: "Tools" },
];

export default function Stack() {
  const { ref, revealed } = useScrollReveal();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section id="stack"
      className={`py-32 border-t transition-colors duration-300
        ${isDark ? "bg-ink-900 border-wire" : "bg-paper-100 border-wire-light"}`}>
      <div className="max-w-6xl mx-auto px-6">

        <div className="mb-16">
          <p className="section-label mb-5">Tech Stack</p>
          <h2 className={`section-title text-4xl lg:text-5xl
            ${isDark ? "text-neutral-100" : "text-neutral-900"}`}>
            Tools & technologies<br />
            <span className={isDark ? "text-neutral-500" : "text-neutral-400"}>I work with.</span>
          </h2>
        </div>

        <div ref={ref}
             className={`${revealed ? "fade-up visible" : "fade-up"} grid sm:grid-cols-2 lg:grid-cols-4 gap-px
               ${isDark ? "bg-wire" : "bg-wire-light"}`}>
          {categories.map(({ key, label }) => (
            <div key={key}
                 className={`p-8 ${isDark ? "bg-ink-900" : "bg-paper-100"}`}>
              <p className="font-mono text-[11px] font-medium tracking-[0.18em] uppercase mb-6"
                 style={{ color: "var(--primary)" }}>
                {label}
              </p>
              <ul className="space-y-3">
                {(techStack[key] || []).map((item) => (
                  <li key={item}
                      className={`flex items-center gap-3 text-sm
                        ${isDark ? "text-neutral-300" : "text-neutral-700"}`}>
                    <span className="w-1 h-1 rounded-full flex-shrink-0 opacity-50"
                          style={{ backgroundColor: "var(--primary)" }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className={`mt-8 font-mono text-[11px] text-right tracking-wider
          ${isDark ? "text-neutral-700" : "text-neutral-400"}`}>
          Continuously expanding. Currently exploring React and Tailwind CSS
        </p>
      </div>
    </section>
  );
}
