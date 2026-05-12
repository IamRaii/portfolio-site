import { process } from "../data/portfolio";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useTheme } from "../context/ThemeContext";

export default function Process() {
  const { ref, revealed } = useScrollReveal();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section id="process"
      className={`py-32 border-t transition-colors duration-300
        ${isDark ? "bg-ink-950 border-wire" : "bg-paper-50 border-wire-light"}`}>
      <div className="max-w-6xl mx-auto px-6">

        <div className="mb-16">
          <p className="section-label mb-5">Process</p>
          <h2 className={`section-title text-4xl lg:text-5xl max-w-lg
            ${isDark ? "text-neutral-100" : "text-neutral-900"}`}>
            How a project<br />
            <span className={isDark ? "text-neutral-500" : "text-neutral-400"}>actually gets built.</span>
          </h2>
        </div>

        <div ref={ref} className={`${revealed ? "fade-up visible" : "fade-up"}`}>

          {/* Desktop timeline */}
          <div className={`hidden lg:grid grid-cols-6 gap-px ${isDark ? "bg-wire" : "bg-wire-light"}`}>
            {process.map((step) => (
              <div key={step.step}
                   className={`px-6 py-8 ${isDark ? "bg-ink-950" : "bg-paper-50"}`}>
                <div className="font-mono text-[11px] tracking-widest mb-4"
                     style={{ color: "var(--primary)", opacity: 0.7 }}>
                  {step.step}
                </div>
                <h3 className={`font-semibold text-sm mb-3 tracking-tight leading-snug
                  ${isDark ? "text-neutral-200" : "text-neutral-800"}`}>
                  {step.title}
                </h3>
                <p className={`text-xs leading-relaxed
                  ${isDark ? "text-neutral-600" : "text-neutral-500"}`}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          {/* Mobile */}
          <div className={`lg:hidden rounded-lg overflow-hidden border
            ${isDark ? "border-wire" : "border-wire-light"}`}>
            {process.map((step, i) => (
              <div key={step.step}
                   className={`flex gap-5 px-6 py-5
                     ${i < process.length - 1 ? `border-b ${isDark ? "border-wire" : "border-wire-light"}` : ""}
                     ${isDark ? "bg-ink-900" : "bg-white"}`}>
                <span className="font-mono text-[11px] w-5 flex-shrink-0 mt-0.5 font-medium"
                      style={{ color: "var(--primary)" }}>
                  {step.step}
                </span>
                <div>
                  <h3 className={`font-semibold text-sm mb-1.5 tracking-tight
                    ${isDark ? "text-neutral-200" : "text-neutral-800"}`}>
                    {step.title}
                  </h3>
                  <p className={`text-sm leading-relaxed
                    ${isDark ? "text-neutral-500" : "text-neutral-600"}`}>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Note */}
        <div className={`mt-10 rounded-lg border px-6 py-4
          ${isDark ? "border-wire bg-ink-900" : "border-wire-light bg-paper-100"}`}>
          <p className={`font-mono text-xs leading-relaxed
            ${isDark ? "text-neutral-600" : "text-neutral-500"}`}>
            <span style={{ color: "var(--primary)", fontWeight: 500 }}>Note: </span>
            This process isn't rigid. Every project has different constraints. What stays constant is the order of thinking: design decisions before development decisions, always.
          </p>
        </div>
      </div>
    </section>
  );
}
