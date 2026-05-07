import { useState, useCallback } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// ProjectImage
// ─────────────────────────────────────────────────────────────────────────────
// Renders a single project image with:
//   - Hover: subtle zoom + "View Full Size" overlay
//   - Click: opens a full-screen modal lightbox
//   - Keyboard: Escape closes modal
//
// REPLACING IMAGES:
//   All image sources come from portfolio.js → project.images[].src
//   You do not need to edit this file to swap in your screenshots.
// ─────────────────────────────────────────────────────────────────────────────

function ImageModal({ image, onClose }) {
  const handleBackdropClick = useCallback(
    (e) => {
      // Close only when clicking the backdrop, not the image itself
      if (e.target === e.currentTarget) onClose();
    },
    [onClose]
  );

  // Close on Escape key
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Full size preview: ${image.alt}`}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
      style={{ background: "rgba(7, 8, 9, 0.96)" }}
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
      // Auto-focus so keyboard events register immediately
      ref={(el) => el && el.focus()}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 flex items-center gap-2 font-mono text-xs text-stone-500 hover:text-stone-200 transition-colors tracking-wider"
        aria-label="Close image preview"
      >
        <span>ESC</span>
        <span className="text-base leading-none">✕</span>
      </button>

      {/* Image container */}
      <div className="relative w-full max-w-5xl">
        <img
          src={image.src}
          alt={image.alt}
          className="w-full h-auto border border-wire shadow-2xl"
          style={{ maxHeight: "85vh", objectFit: "contain" }}
        />
        {/* Caption bar */}
        {image.caption && (
          <div className="mt-3 flex items-center gap-3">
            <span className="font-mono text-xs text-accent-glow">◆</span>
            <span className="font-mono text-xs text-stone-500 tracking-wider">
              {image.caption}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FeaturedImage — the large hero image at the top of each project card
// ─────────────────────────────────────────────────────────────────────────────
export function FeaturedImage({ image, projectTitle }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <>
      {/* Clickable image wrapper */}
      <button
        className="relative w-full overflow-hidden border-b border-wire block text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-accent-dim"
        style={{ aspectRatio: "16 / 9" }}
        onClick={() => setModalOpen(true)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label={`View full-size screenshot: ${image.alt}`}
      >
        {/* ── FEATURED IMAGE ────────────────────────────────────────────────
            To replace: update src in portfolio.js → project.images[0].src
            Recommended size: 1200×700px (16:9 ratio)
        ─────────────────────────────────────────────────────────────────── */}
        <img
          src={image.src}
          alt={image.alt}
          className="w-full h-full object-cover transition-transform duration-500 ease-out"
          style={{ transform: hovered ? "scale(1.03)" : "scale(1)" }}
          loading="lazy"
        />

        {/* Hover overlay */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
          style={{
            background: "rgba(7, 8, 9, 0.55)",
            opacity: hovered ? 1 : 0,
          }}
          aria-hidden="true"
        >
          <div className="flex items-center gap-2 border border-accent-dim px-4 py-2 bg-ink-950/80 backdrop-blur-sm">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-accent"
            >
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
            </svg>
            <span className="font-mono text-xs text-accent tracking-wider">
              View Full Size
            </span>
          </div>
        </div>

        {/* Project number watermark — bottom-left corner */}
        <div
          className="absolute bottom-3 left-4 font-mono text-xs text-stone-600 tracking-wider opacity-70"
          aria-hidden="true"
        >
          {projectTitle}
        </div>
      </button>

      {/* Modal lightbox */}
      {modalOpen && (
        <ImageModal image={image} onClose={() => setModalOpen(false)} />
      )}
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ThumbnailStrip — row of smaller preview thumbnails (images[1], images[2]…)
// ─────────────────────────────────────────────────────────────────────────────
export function ThumbnailStrip({ images }) {
  const [modalImage, setModalImage] = useState(null);
  // Only show thumbnails for secondary images (index 1+)
  const thumbnails = images.slice(1);

  if (thumbnails.length === 0) return null;

  return (
    <>
      <div className="flex gap-3 p-4 border-b border-wire bg-ink-950/40" role="list" aria-label="Additional screenshots">
        {thumbnails.map((image, i) => (
          <button
            key={i}
            role="listitem"
            className="relative overflow-hidden border border-wire flex-1 group focus:outline-none focus-visible:ring-1 focus-visible:ring-accent-dim"
            style={{ aspectRatio: "16 / 9" }}
            onClick={() => setModalImage(image)}
            aria-label={`View screenshot: ${image.alt}`}
          >
            {/* ── THUMBNAIL IMAGE ─────────────────────────────────────────────
                To replace: update src in portfolio.js → project.images[N].src
                Recommended size: 800×500px
            ──────────────────────────────────────────────────────────────── */}
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover transition-transform duration-400 ease-out group-hover:scale-105"
              loading="lazy"
            />
            {/* Thumbnail overlay */}
            <div
              className="absolute inset-0 bg-ink-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end p-2"
              aria-hidden="true"
            >
              <span className="font-mono text-xs text-stone-300 truncate">{image.caption}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Modal triggered from thumbnail click */}
      {modalImage && (
        <ImageModal image={modalImage} onClose={() => setModalImage(null)} />
      )}
    </>
  );
}
