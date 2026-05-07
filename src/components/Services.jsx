import { services } from "../data/portfolio";
import { useScrollReveal } from "../hooks/useScrollReveal";

export default function Services() {
  const ref = useScrollReveal();

  return (
    <section id="services" className="py-28 border-t border-wire bg-ink-900">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-14">
          <p className="section-label mb-4">Services</p>
          <h2 className="section-title text-3xl sm:text-4xl lg:text-5xl max-w-xl">
            What I build<br />
            <span className="text-stone-500">for your business.</span>
          </h2>
        </div>

        <div ref={ref} className="fade-up grid md:grid-cols-3 gap-px bg-wire">
          {services.map((service, i) => (
            <div
              key={service.id}
              className="bg-ink-900 p-8 group hover:bg-ink-800 transition-colors duration-300"
            >
              <div className="flex items-start justify-between mb-6">
                <span className="font-mono text-xs text-stone-600 tracking-widest">{service.id}</span>
                <span className="text-accent-glow opacity-0 group-hover:opacity-100 transition-opacity font-mono text-xs">
                  ↗
                </span>
              </div>

              <h3 className="font-display font-bold text-stone-200 text-lg mb-4 leading-snug">
                {service.title}
              </h3>

              <p className="text-stone-400 text-sm leading-relaxed mb-8">
                {service.description}
              </p>

              <ul className="space-y-2.5">
                {service.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-stone-500">
                    <span className="text-accent-glow mt-1 text-xs">—</span>
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
