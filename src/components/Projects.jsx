import { useState } from "react";
import { projects } from "../data/portfolio";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { FeaturedImage, ThumbnailStrip } from "./ProjectImage";

// ─────────────────────────────────────────────────────────────────────────────
// ProjectCard
// ─────────────────────────────────────────────────────────────────────────────
// Layout:
//   Desktop (lg+): Two-column — Image left | Description right
//   Mobile:        Stacked   — Image top  | Description below
//
// Each card has an expandable "Details" section showing features + highlights.
// ─────────────────────────────────────────────────────────────────────────────
function ProjectCard({ project }) {
  const [expanded, setExpanded] = useState(false);
  const ref = useScrollReveal();

  return (
    <article
      ref={ref}
      className="fade-up border border-wire bg-ink-800 hover:border-ink-500 transition-colors duration-300"
      aria-label={`Project: ${project.title}`}
    >
      {/* ── TOP META BAR ──────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-wire">
        <span className="font-mono text-xs text-stone-600 tracking-widest">
          {project.id}
        </span>
        <span className="tag">{project.category}</span>
      </div>

      {/* ── MAIN CONTENT: two-column on desktop, stacked on mobile ────────── */}
      <div className="lg:grid lg:grid-cols-[1fr_1fr] lg:divide-x lg:divide-wire">

        {/* LEFT COLUMN — Visual preview */}
        {/* ─────────────────────────────────────────────────────────────────
            IMAGES COLUMN
            Images are loaded from: /public/images/projects/
            To swap in your own screenshots:
              1. Drop your .png/.jpg files into /public/images/projects/
              2. Update the filenames in src/data/portfolio.js
              3. Done — no changes needed here.
        ───────────────────────────────────────────────────────────────── */}
        <div className="flex flex-col border-b border-wire lg:border-b-0">

          {/* Featured image — always present, always first */}
          {project.images && project.images.length > 0 && (
            <FeaturedImage
              image={project.images[0]}
              projectTitle={project.title}
            />
          )}

          {/* Thumbnail strip — renders only if project has 2+ images */}
          {project.images && project.images.length > 1 && (
            <ThumbnailStrip images={project.images} />
          )}

          {/* Fallback — shown if images array is empty or missing */}
          {(!project.images || project.images.length === 0) && (
            <div
              className="w-full flex items-center justify-center bg-ink-900 border-b border-wire"
              style={{ aspectRatio: "16 / 9" }}
              aria-label="No preview available"
            >
              <span className="font-mono text-xs text-stone-700 tracking-wider">
                // no preview
              </span>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN — Project description */}
        <div className="flex flex-col">

          {/* Title + stack */}
          <div className="p-6 lg:p-8 border-b border-wire">
            <h3 className="font-display font-bold text-stone-200 text-xl lg:text-2xl mb-5 leading-snug">
              {project.title}
            </h3>
            {/* Tech stack tags */}
            <div className="flex flex-wrap gap-2" role="list" aria-label="Technology stack">
              {project.stack.map((t) => (
                <span key={t} role="listitem" className="tag text-accent-glow border-ink-600">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Problem / Solution */}
          <div className="p-6 lg:p-8 grid sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6 flex-1">
            <div>
              <p className="font-mono text-xs text-stone-600 uppercase tracking-wider mb-2">
                Problem
              </p>
              <p className="text-stone-400 text-sm leading-relaxed">
                {project.problem}
              </p>
            </div>
            <div>
              <p className="font-mono text-xs text-stone-600 uppercase tracking-wider mb-2">
                Solution
              </p>
              <p className="text-stone-400 text-sm leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Toggle button — bottom of right column */}
          <div className="px-6 lg:px-8 py-4 border-t border-wire">
            <button
              onClick={() => setExpanded(!expanded)}
              className="font-mono text-xs text-stone-500 hover:text-accent-glow transition-colors flex items-center gap-2 tracking-wider"
              aria-expanded={expanded}
              aria-controls={`details-${project.id}`}
            >
              {expanded ? "— Collapse Details" : "+ Show Technical Details"}
            </button>
          </div>
        </div>
      </div>

      {/* ── EXPANDABLE DETAILS (full-width) ───────────────────────────────── */}
      {expanded && (
        <div
          id={`details-${project.id}`}
          className="border-t border-wire px-6 lg:px-8 py-8 grid sm:grid-cols-2 gap-8 bg-ink-900/50"
        >
          <div>
            <p className="font-mono text-xs text-stone-600 uppercase tracking-wider mb-4">
              Key Features
            </p>
            <ul className="space-y-3" role="list">
              {project.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-stone-400">
                  <span className="text-accent-glow mt-0.5 text-xs flex-shrink-0" aria-hidden="true">
                    ◆
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-mono text-xs text-stone-600 uppercase tracking-wider mb-4">
              Technical Highlights
            </p>
            <ul className="space-y-3" role="list">
              {project.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3 text-sm text-stone-400">
                  <span className="text-accent-glow mt-0.5 text-xs flex-shrink-0" aria-hidden="true">
                    ◆
                  </span>
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </article>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Projects section
// ─────────────────────────────────────────────────────────────────────────────
export default function Projects() {
  return (
    <section id="projects" className="py-28 border-t border-wire">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-14">
          <p className="section-label mb-4">Projects</p>
          <h2 className="section-title text-3xl sm:text-4xl lg:text-5xl max-w-xl">
            Selected work.<br />
            <span className="text-stone-500">Architecture documented.</span>
          </h2>
          <p className="text-stone-500 text-sm mt-4 font-mono">
            Click any screenshot to view full size. Expand each card for technical details.
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
