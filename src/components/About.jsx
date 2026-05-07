import { useScrollReveal } from "../hooks/useScrollReveal";

const principles = [
  {
    icon: "◈",
    title: "Database-First Thinking",
    body: "A well-structured schema prevents entire categories of bugs. I design data models before writing application logic — normalization, relationships, and indexing decisions made up front.",
  },
  {
    icon: "◉",
    title: "Security by Default",
    body: "Parameterized queries, input validation, auth boundary checks, CSRF protection — not afterthoughts, but part of how the system is built from the first commit.",
  },
  {
    icon: "◎",
    title: "Maintainable Architecture",
    body: "Code that works today but can't be understood or extended tomorrow is a liability. Clean separation of concerns and consistent patterns mean the next developer isn't starting from scratch.",
  },
];

export default function About() {
  const ref = useScrollReveal();

  return (
    <section id="about" className="py-28 border-t border-wire">
      <div className="max-w-6xl mx-auto px-6">
        <div ref={ref} className="fade-up grid md:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <p className="section-label mb-4">About</p>
            <h2 className="section-title text-3xl sm:text-4xl lg:text-5xl mb-8">
              Systems thinker.<br />
              <span className="text-stone-500">Backend engineer.</span>
            </h2>
            <div className="space-y-5 text-stone-400 leading-relaxed">
              <p>
                I'm a 4th-year Information Technology student who builds full-stack web
                and mobile applications. My work skews heavily toward backend architecture —
                database design, server-side logic, authentication systems, and the
                structural decisions that determine whether a system holds up over time.
              </p>
              <p>
                On the web side, I work with PHP and MySQL. On mobile, I build with Flutter
                and Firebase — including offline-capable applications that sync reliably when
                connectivity is restored. I apply clean architecture principles in both
                contexts.
              </p>
              <p>
                I'm not interested in shipping something that works once. I'm interested in
                building systems that work consistently, can be extended without major
                rework, and don't create security exposure in production.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              {["PHP", "MySQL", "Flutter", "Firebase", "REST APIs", "Clean Architecture"].map((t) => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
          </div>

          {/* Right: principles */}
          <div className="space-y-6">
            {principles.map((p) => (
              <div key={p.title} className="card group">
                <div className="flex items-start gap-4">
                  <span className="text-accent-glow font-mono text-lg mt-0.5 group-hover:text-accent transition-colors">
                    {p.icon}
                  </span>
                  <div>
                    <h3 className="font-display font-semibold text-stone-200 mb-2">{p.title}</h3>
                    <p className="text-stone-400 text-sm leading-relaxed">{p.body}</p>
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
