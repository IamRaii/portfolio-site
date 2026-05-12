import { services } from "../data/portfolio";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useTheme } from "../context/ThemeContext";

export default function Services() {
  const { ref, revealed } = useScrollReveal();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const bg = isDark ? "bg-ink-900" : "bg-paper-100";
  const divider = isDark ? "bg-wire" : "bg-wire-light";

  return (
    <section id="services"
      className={`py-32 border-t transition-colors duration-300
        ${isDark ? "border-wire" : "border-wire-light"} ${bg}`}>
      <div className="max-w-6xl mx-auto px-6">

        <div className="mb-16">
          <p className="section-label mb-5">Services</p>
          <h2 className={`section-title text-4xl lg:text-5xl max-w-lg
            ${isDark ? "text-neutral-100" : "text-neutral-900"}`}>
            What I build<br />
            <span className={isDark ? "text-neutral-500" : "text-neutral-400"}>for your business.</span>
          </h2>
        </div>

        <div ref={ref}
             className={`${revealed ? "fade-up visible" : "fade-up"} grid md:grid-cols-3 gap-px ${divider}`}>
          {services.map((service) => (
            <div key={service.id}
                 className={`p-8 group transition-colors duration-200
                   ${isDark ? "bg-ink-900 hover:bg-ink-800" : "bg-paper-100 hover:bg-white"}`}>
              <div className="flex items-start justify-between mb-6">
                <span className={`font-mono text-xs tracking-widest
                  ${isDark ? "text-neutral-700" : "text-neutral-400"}`}>
                  {service.id}
                </span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity font-mono text-xs"
                      style={{ color: "var(--primary)" }}>↗</span>
              </div>

              <h3 className={`font-semibold text-[1.0625rem] mb-4 tracking-tight leading-snug
                ${isDark ? "text-neutral-200" : "text-neutral-800"}`}>
                {service.title}
              </h3>

              <p className={`text-sm leading-relaxed mb-8
                ${isDark ? "text-neutral-500" : "text-neutral-600"}`}>
                {service.description}
              </p>

              <ul className="space-y-2.5">
                {service.items.map((item) => (
                  <li key={item} className={`flex items-start gap-2.5 text-sm
                    ${isDark ? "text-neutral-600" : "text-neutral-500"}`}>
                    <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0"
                          style={{ backgroundColor: "var(--primary)" }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
