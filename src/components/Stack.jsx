import { techStack } from "../data/portfolio";
import { useScrollReveal } from "../hooks/useScrollReveal";

const categoryColors = {
  Backend: "text-blue-400",
  Frontend: "text-purple-400",
  Mobile: "text-emerald-400",
  Tools: "text-amber-400",
};

export default function Stack() {
  const ref = useScrollReveal();

  return (
    <section id="stack" className="py-28 border-t border-wire bg-ink-900">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-14">
          <p className="section-label mb-4">Tech Stack</p>
          <h2 className="section-title text-3xl sm:text-4xl lg:text-5xl">
            Tools & technologies<br />
            <span className="text-stone-500">I work with.</span>
          </h2>
        </div>

        <div ref={ref} className="fade-up grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-wire">
          {Object.entries(techStack).map(([category, items]) => (
            <div key={category} className="bg-ink-900 p-8">
              <div className="mb-6">
                <p className={`font-mono text-xs tracking-[0.2em] uppercase mb-1 ${categoryColors[category]}`}>
                  {category}
                </p>
                <div className="h-px w-8 bg-wire" />
              </div>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-stone-300 text-sm font-body">
                    <span className="w-1 h-1 rounded-full bg-ink-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Learning note */}
        <p className="mt-10 text-stone-600 font-mono text-xs text-right tracking-wider">
          // continuously expanding — currently exploring React and Tailwind CSS
        </p>
      </div>
    </section>
  );
}
