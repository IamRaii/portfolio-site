import { useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useTheme } from "../context/ThemeContext";

// ─────────────────────────────────────────────────────────────────────────────
// CERTIFICATIONS
// ─────────────────────────────────────────────────────────────────────────────
// To add or edit: update the array below.
// To hide a cert: set completed: false — it will not render.
// Images: drop files into /public/images/certs/ and update the image field.
// ─────────────────────────────────────────────────────────────────────────────
const certifications = [
  {
    id: "cert-01",
    completed: true,
    title: "Basic Web Development Workshop",
    type: "Certificate of Participation",
    org: "Zuitt Coding Bootcamp",
    partner: "Google Developer Student Clubs, Batangas State University",
    year: "2023",
    date: "March 11, 2023",
    credential: null,
    image: "/images/certs/cert-web-dev.jpg",
    imageAlt: "Certificate of Participation — Free Coding Bootcamp: Basic Web Development Workshop by Zuitt and GDSC BatState-U",
    tags: ["Web Development", "HTML/CSS", "JavaScript"],
  },
  {
    id: "cert-02",
    completed: true,
    title: "Lean Six Sigma Yellow Belt",
    type: "Yellow Belt Certification",
    org: "Council for Six Sigma Certification",
    partner: "MF Operational Excellence",
    year: "2026",
    date: "April 20, 2026",
    credential: null,
    image: "/images/certs/cert-lean-yellow-belt.jpg",
    imageAlt: "Yellow Belt Certification — 20-hour Lean Six Sigma training, issued April 20, 2026",
    tags: ["Lean Six Sigma", "Process Improvement", "Quality Management"],
  },
  {
    id: "cert-03",
    completed: true,
    title: "Lean Six Sigma White Belt",
    type: "White Belt Certification",
    org: "Council for Six Sigma Certification",
    partner: "MF Operational Excellence",
    year: "2026",
    date: "April 20, 2026",
    credential: null,
    image: "/images/certs/cert-lean-white-belt.jpg",
    imageAlt: "White Belt Certification — 4-hour Lean Six Sigma training, issued April 20, 2026",
    tags: ["Lean Six Sigma", "Process Fundamentals"],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// CertModal — full-screen certificate viewer
// ─────────────────────────────────────────────────────────────────────────────
function CertModal({ cert, onClose }) {
  const { theme } = useTheme();   // ← theme-aware: was missing, causing dark-only colors
  const isDark = theme === "dark";

  // Near-black backdrop works for both themes — dark content on both backgrounds
  // reads well at this opacity level.
  const backdropBg = isDark ? "rgba(6,8,10,0.97)" : "rgba(20,22,26,0.95)";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Certificate: ${cert.title}`}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-10"
      style={{ background: backdropBg }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className={`absolute top-5 right-5 flex items-center gap-2 font-mono text-[11px]
          tracking-wider z-10 transition-colors duration-150
          ${isDark ? "text-neutral-500 hover:text-neutral-200" : "text-neutral-400 hover:text-white"}`}
        aria-label="Close certificate preview"
      >
        ESC <span className="text-base leading-none">✕</span>
      </button>

      <div className="relative w-full max-w-4xl">
        <img
          src={cert.image}
          alt={cert.imageAlt}
          className="w-full h-auto rounded-lg shadow-2xl"
          style={{ maxHeight: "88vh", objectFit: "contain" }}
        />
        <p className={`mt-4 text-center font-mono text-[11px] tracking-wider
          ${isDark ? "text-neutral-600" : "text-neutral-400"}`}>
          {cert.title} &middot; {cert.date}
        </p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CertCard
// ─────────────────────────────────────────────────────────────────────────────
function CertCard({ cert, isDark }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <article
        className={`group flex flex-col rounded-xl overflow-hidden border transition-all duration-200
          ${isDark
            ? "bg-ink-800 border-wire hover:border-ink-500"
            : "bg-white border-wire-light hover:border-neutral-300 hover:shadow-md"}`}
      >
        {/* ── CERTIFICATE IMAGE ────────────────────────────────────────────
            Aspect ratio 4/3 matches the actual certificate proportions.
            Click opens the full-screen modal viewer.
            To replace: drop your .jpg/.png into /public/images/certs/
            and update the `image` field in the certifications array above.
        ─────────────────────────────────────────────────────────────────── */}
        <div
          className="relative overflow-hidden cursor-zoom-in"
          style={{ aspectRatio: "4/3" }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={() => setModalOpen(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && setModalOpen(true)}
          aria-label={`View certificate: ${cert.title}`}
        >
          <img
            src={cert.image}
            alt={cert.imageAlt}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 ease-out"
            style={{ transform: hovered ? "scale(1.03)" : "scale(1)" }}
          />

          {/* Hover overlay */}
          <div
            className="absolute inset-0 flex items-center justify-center transition-opacity duration-250 pointer-events-none"
            style={{ background: "rgba(6,8,10,0.48)", opacity: hovered ? 1 : 0 }}
            aria-hidden="true"
          >
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-md backdrop-blur-sm"
              style={{
                background: isDark ? "rgba(6,8,10,0.82)" : "rgba(255,255,255,0.88)",
                border: `1px solid ${isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)"}`,
              }}
            >
              <svg
                width="12" height="12" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2"
                style={{ color: "var(--primary)" }}
              >
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
              </svg>
              <span className="font-mono text-[11px] tracking-wider" style={{ color: "var(--primary)" }}>
                View Certificate
              </span>
            </div>
          </div>
        </div>

        {/* ── CARD BODY ─────────────────────────────────────────────────── */}
        <div className="flex flex-col flex-1 p-5">

          {/* Type label */}
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] mb-1.5"
             style={{ color: "var(--primary)" }}>
            {cert.type}
          </p>

          {/* Title */}
          <h3 className={`font-semibold text-[0.9375rem] tracking-tight leading-snug mb-1
            ${isDark ? "text-neutral-200" : "text-neutral-800"}`}>
            {cert.title}
          </h3>

          {/* Org */}
          <p className={`text-[0.8125rem] font-medium mb-0.5
            ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
            {cert.org}
          </p>

          {/* Partner (if exists) */}
          {cert.partner && (
            <p className={`text-[0.75rem] mb-4 leading-snug
              ${isDark ? "text-neutral-600" : "text-neutral-400"}`}>
              in partnership with {cert.partner}
            </p>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {cert.tags.map((tag) => (
              <span key={tag} className="tag tag-primary">{tag}</span>
            ))}
          </div>

          {/* Footer row */}
          <div className={`mt-auto pt-4 border-t flex items-center justify-between gap-3
            ${isDark ? "border-wire" : "border-wire-light"}`}>

            {/* Date + checkmark */}
            <div className="flex items-center gap-1.5 font-mono text-[11px]"
                 style={{ color: "var(--primary)" }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {cert.date}
            </div>

            {/* Credential link or pending */}
            {cert.credential ? (
              <a
                href={cert.credential}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] tracking-wider flex items-center gap-1.5 transition-colors"
                style={{ color: "var(--primary)" }}
                aria-label={`Verify ${cert.title} credential`}
                onClick={(e) => e.stopPropagation()}
              >
                Verify
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                </svg>
              </a>
            ) : (
              <span className={`font-mono text-[11px] ${isDark ? "text-neutral-700" : "text-neutral-300"}`}>
                No digital credential
              </span>
            )}
          </div>
        </div>
      </article>

      {/* Full-screen modal */}
      {modalOpen && (
        <CertModal cert={cert} onClose={() => setModalOpen(false)} />
      )}
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Certifications section
// ─────────────────────────────────────────────────────────────────────────────
export default function Certifications() {
  const { ref, revealed } = useScrollReveal();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const completed = certifications.filter((c) => c.completed);
  if (completed.length === 0) return null;

  return (
    <section
      id="certifications"
      className={`py-32 border-t transition-colors duration-300
        ${isDark ? "bg-ink-950 border-wire" : "bg-paper-50 border-wire-light"}`}
    >
      <div className="max-w-6xl mx-auto px-6">

        <div className="mb-16">
          <p className="section-label mb-5">Certifications</p>
          <h2 className={`section-title text-4xl lg:text-5xl max-w-xl
            ${isDark ? "text-neutral-100" : "text-neutral-900"}`}>
            Formal recognition<br />
            <span className={isDark ? "text-neutral-500" : "text-neutral-400"}>
              of applied skills.
            </span>
          </h2>
        </div>

        {/* 3-column grid — drops to 2 on tablet, 1 on mobile */}
        <div
          ref={ref}
          className={`${revealed ? "fade-up visible" : "fade-up"} grid sm:grid-cols-2 lg:grid-cols-3 gap-6`}
        >
          {completed.map((cert) => (
            <CertCard key={cert.id} cert={cert} isDark={isDark} />
          ))}
        </div>

        <p className={`mt-8 text-[11px] font-mono tracking-wider
          ${isDark ? "text-neutral-700" : "text-neutral-400"}`}>
          {certifications.length - completed.length > 0
            ? `${certifications.length - completed.length} in progress, shown when completed`
            : "Additional certifications added as completed"}
        </p>
      </div>
    </section>
  );
}
