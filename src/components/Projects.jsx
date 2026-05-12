import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { projects } from "../data/portfolio";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { ImageGallery } from "./ProjectImage";

function ProjectCard({ project }) {
  const [expanded, setExpanded] = useState(false);
  const { ref, revealed } = useScrollReveal();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <article
      ref={ref}
      className={`${revealed ? "fade-up visible" : "fade-up"} rounded-xl overflow-hidden border transition-all duration-200
        ${isDark
          ? "border-wire bg-ink-800 hover:border-ink-500"
          : "border-wire-light bg-white hover:border-neutral-300 hover:shadow-md"}`}
      aria-label={`Project: ${project.title}`}
    >
      {/* Meta bar */}
      <div className={`flex items-center justify-between px-6 py-3 border-b
        ${isDark ? "border-wire" : "border-wire-light"}`}>
        <span className={`font-mono text-[11px] tracking-widest
          ${isDark ? "text-neutral-700" : "text-neutral-400"}`}>
          {project.id}
        </span>
        <span className="tag">{project.category}</span>
      </div>

      {/* Two-column */}
      <div className={`lg:grid lg:grid-cols-[1fr_1fr] lg:divide-x
        ${isDark ? "lg:divide-wire" : "lg:divide-wire-light"}`}>

        {/* LEFT — gallery */}
        <div className={`border-b lg:border-b-0 ${isDark ? "border-wire" : "border-wire-light"}`}>
          {project.images?.length > 0 ? (
            <ImageGallery images={project.images} projectTitle={project.title} />
          ) : (
            <div className={`w-full flex items-center justify-center ${isDark ? "bg-ink-900" : "bg-paper-100"}`}
                 style={{ aspectRatio: "16/9" }}>
              <span className={`font-mono text-xs ${isDark ? "text-neutral-700" : "text-neutral-300"}`}>
                No preview available
              </span>
            </div>
          )}
        </div>

        {/* RIGHT — description */}
        <div className="flex flex-col">

          {/* Title block */}
          <div className={`p-6 lg:p-8 border-b ${isDark ? "border-wire" : "border-wire-light"}`}>
            <h3 className={`font-semibold text-xl tracking-tight leading-snug mb-1
              ${isDark ? "text-neutral-100" : "text-neutral-900"}`}>
              {project.title}
            </h3>
            {project.subtitle && (
              <p className={`text-sm mb-5 ${isDark ? "text-neutral-500" : "text-neutral-500"}`}>
                {project.subtitle}
              </p>
            )}
            <div className="flex flex-wrap gap-1.5">
              {project.stack.map((t) => (
                <span key={t} className="tag tag-primary">{t}</span>
              ))}
            </div>
          </div>

          {/* Problem / Solution */}
          <div className="p-6 lg:p-8 grid sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6 flex-1">
            {[
              { label: "Problem", text: project.problem },
              { label: "Solution", text: project.solution },
            ].map(({ label, text }) => (
              <div key={label}>
                <p className={`font-mono text-[11px] uppercase tracking-wider mb-2
                  ${isDark ? "text-neutral-600" : "text-neutral-400"}`}>
                  {label}
                </p>
                <p className={`text-sm leading-relaxed
                  ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
                  {text}
                </p>
              </div>
            ))}
          </div>

          {/* Toggle */}
          <div className={`px-6 lg:px-8 py-4 border-t ${isDark ? "border-wire" : "border-wire-light"}`}>
            <button
              onClick={() => setExpanded(!expanded)}
              className={`font-mono text-[11px] tracking-wider transition-colors flex items-center gap-2
                ${isDark ? "text-neutral-600 hover:text-neutral-300" : "text-neutral-400 hover:text-neutral-700"}`}
              aria-expanded={expanded}
              aria-controls={`details-${project.id}`}
            >
              {expanded ? "Collapse Details" : "Show Technical Details"}
            </button>
          </div>
        </div>
      </div>

      {/* Expanded details */}
      {expanded && (
        <div id={`details-${project.id}`}
             className={`border-t px-6 lg:px-8 py-8 grid sm:grid-cols-2 gap-8
               ${isDark ? "border-wire bg-ink-900/60" : "border-wire-light bg-paper-100/60"}`}>
          {[
            { label: "Key Features", items: project.features },
            { label: "Technical Highlights", items: project.highlights },
          ].map(({ label, items }) => (
            <div key={label}>
              <p className={`font-mono text-[11px] uppercase tracking-wider mb-4
                ${isDark ? "text-neutral-600" : "text-neutral-400"}`}>
                {label}
              </p>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item} className={`flex items-start gap-3 text-sm leading-relaxed
                    ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
                    <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0"
                          style={{ backgroundColor: "var(--primary)" }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </article>
  );
}

export default function Projects() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section id="projects"
      className={`py-32 border-t transition-colors duration-300
        ${isDark ? "border-wire bg-ink-950" : "border-wire-light bg-paper-50"}`}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <p className="section-label mb-5">Projects</p>
          <h2 className={`section-title text-4xl lg:text-5xl max-w-xl
            ${isDark ? "text-neutral-100" : "text-neutral-900"}`}>
            Selected work.<br />
            <span className={isDark ? "text-neutral-500" : "text-neutral-400"}>Architecture documented.</span>
          </h2>
          <p className={`text-sm mt-4 font-mono ${isDark ? "text-neutral-600" : "text-neutral-400"}`}>
            Use ← → keys or arrow buttons to navigate screenshots. Expand each card for technical details.
          </p>
        </div>
        <div className="space-y-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
