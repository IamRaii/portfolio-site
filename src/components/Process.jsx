import { process } from "../data/portfolio";
import { useScrollReveal } from "../hooks/useScrollReveal";

export default function Process() {
  const ref = useScrollReveal();

  return (
    <section id="process" className="py-28 border-t border-wire">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-14">
          <p className="section-label mb-4">Process</p>
          <h2 className="section-title text-3xl sm:text-4xl lg:text-5xl max-w-xl">
            How a project<br />
            <span className="text-stone-500">actually gets built.</span>
          </h2>
        </div>

        <div ref={ref} className="fade-up">
          {/* Desktop: horizontal timeline */}
          <div className="hidden lg:grid grid-cols-6 gap-px bg-wire mb-px">
            {process.map((step) => (
              <div key={step.step} className="bg-ink-950 px-6 pt-6 pb-2">
                <span className="font-mono text-xs text-stone-600 tracking-widest">{step.step}</span>
              </div>
            ))}
          </div>
          <div className="hidden lg:grid grid-cols-6 gap-px bg-wire">
            {process.map((step) => (
              <div key={step.step} className="bg-ink-950 px-6 pb-8 pt-4">
                <h3 className="font-display font-semibold text-stone-200 text-sm mb-3 leading-snug">
                  {step.title}
                </h3>
                <p className="text-stone-500 text-xs leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>

          {/* Mobile: vertical */}
          <div className="lg:hidden space-y-0 border border-wire">
            {process.map((step, i) => (
              <div
                key={step.step}
                className={`flex gap-6 p-6 ${i < process.length - 1 ? "border-b border-wire" : ""}`}
              >
                <span className="font-mono text-xs text-stone-600 w-6 flex-shrink-0 mt-1">{step.step}</span>
                <div>
                  <h3 className="font-display font-semibold text-stone-200 text-sm mb-2">{step.title}</h3>
                  <p className="text-stone-500 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Philosophy note */}
        <div className="mt-12 border border-wire p-6 bg-ink-900">
          <p className="font-mono text-xs text-stone-500 leading-relaxed">
            <span className="text-accent-glow"> note:</span> This process isn't rigid. Every project has different constraints. What stays constant is the order of thinking — design decisions before development decisions, always.
          </p>
        </div>
      </div>
    </section>
  );
}
