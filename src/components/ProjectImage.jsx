import { useState, useCallback, useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";

// ─────────────────────────────────────────────────────────────────────────────
// ImageModal — full-screen lightbox
// Both themes fully supported: background, buttons, text, dots.
// ─────────────────────────────────────────────────────────────────────────────
function ImageModal({ images, startIndex, onClose }) {
  const [index, setIndex] = useState(startIndex);
  const { theme } = useTheme();          // ← was missing; caused all dark-only colors
  const isDark = theme === "dark";

  const image = images[index];
  const total = images.length;

  const prev = useCallback(() => setIndex((i) => (i - 1 + total) % total), [total]);
  const next = useCallback(() => setIndex((i) => (i + 1) % total), [total]);

  useEffect(() => {
    const fn = (e) => {
      if (e.key === "Escape")     onClose();
      if (e.key === "ArrowLeft")  prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose, prev, next]);

  // Backdrop color — near-black in dark, dark-grey translucent in light
  const backdropBg = isDark ? "rgba(6,8,10,0.97)" : "rgba(20,22,26,0.95)";

  // Arrow + close button styles
  const btnClass = isDark
    ? "border-neutral-700 text-neutral-400 hover:text-neutral-100 hover:border-neutral-500 bg-ink-900/60"
    : "border-neutral-600 text-neutral-300 hover:text-white hover:border-neutral-400 bg-neutral-900/70";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Preview: ${image.alt}`}
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
        aria-label="Close"
      >
        ESC <span className="text-base leading-none">✕</span>
      </button>

      {/* Counter */}
      {total > 1 && (
        <div className={`absolute top-5 left-1/2 -translate-x-1/2 font-mono text-[11px] tracking-widest
          ${isDark ? "text-neutral-600" : "text-neutral-400"}`}>
          {index + 1} / {total}
        </div>
      )}

      {/* Prev arrow */}
      {total > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); prev(); }}
          className={`absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-10 h-10
            flex items-center justify-center rounded-lg border backdrop-blur-sm
            transition-all duration-150 z-10 ${btnClass}`}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = "var(--primary)"}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = ""}
          aria-label="Previous"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
      )}

      {/* Next arrow */}
      {total > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); next(); }}
          className={`absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-10 h-10
            flex items-center justify-center rounded-lg border backdrop-blur-sm
            transition-all duration-150 z-10 ${btnClass}`}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = "var(--primary)"}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = ""}
          aria-label="Next"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>
      )}

      {/* Image + caption row */}
      <div className="relative w-full max-w-5xl mx-16 sm:mx-24">
        <img
          key={image.src}
          src={image.src}
          alt={image.alt}
          className="w-full h-auto rounded-lg shadow-2xl"
          style={{ maxHeight: "82vh", objectFit: "contain" }}
        />

        <div className="mt-4 flex items-center justify-between gap-4">
          {/* Caption */}
          <span className={`font-mono text-[11px] tracking-wider
            ${isDark ? "text-neutral-500" : "text-neutral-400"}`}>
            {image.caption && (
              <>
                <span style={{ color: "var(--primary)" }} className="mr-2">◆</span>
                {image.caption}
              </>
            )}
          </span>

          {/* Dot navigation */}
          {total > 1 && (
            <div className="flex items-center gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setIndex(i); }}
                  className="rounded-full transition-all duration-200"
                  style={{
                    width:  i === index ? "16px" : "6px",
                    height: "6px",
                    backgroundColor: i === index
                      ? "var(--primary)"
                      : isDark ? "#353d47" : "#6b7280",  // dark: slate, light: grey-500
                  }}
                  aria-label={`Image ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ImageGallery — inline gallery with arrows, thumbnails, dots
// ─────────────────────────────────────────────────────────────────────────────
export function ImageGallery({ images, projectTitle }) {
  const [index, setIndex]     = useState(0);
  const [hovered, setHovered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const galleryRef = useRef(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const total = images.length;
  const image = images[index];

  const prev = useCallback(() => setIndex((i) => (i - 1 + total) % total), [total]);
  const next = useCallback(() => setIndex((i) => (i + 1) % total), [total]);

  // Keyboard nav while hovering
  useEffect(() => {
    if (!hovered) return;
    const fn = (e) => {
      if (e.key === "ArrowLeft")  { e.preventDefault(); prev(); }
      if (e.key === "ArrowRight") { e.preventDefault(); next(); }
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [hovered, prev, next]);

  if (!images?.length) return null;

  // Arrow button theme
  const arrowBase = [
    "absolute top-1/2 -translate-y-1/2 w-8 h-8",
    "flex items-center justify-center rounded-lg",
    "border backdrop-blur-sm transition-all duration-150 z-10",
  ].join(" ");

  const arrowTheme = isDark
    ? "border-wire/80 bg-ink-950/70 text-neutral-400 hover:text-neutral-100"
    : "border-neutral-400/70 bg-white/85 text-neutral-600 hover:text-neutral-900";

  // Hover overlay pill — themed so it's readable on both backgrounds
  const overlayPillBg = isDark
    ? "rgba(6,8,10,0.82)"
    : "rgba(255,255,255,0.88)";
  const overlayBorderColor = isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)";

  return (
    <>
      <div
        ref={galleryRef}
        className="flex flex-col select-none"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* ── FEATURED IMAGE ───────────────────────────────────────────── */}
        <div
          className={`relative overflow-hidden border-b
            ${isDark ? "border-wire" : "border-wire-light"}`}
          style={{ aspectRatio: "16/9" }}
        >
          {/* Clickable image — opens modal */}
          <button
            className="absolute inset-0 w-full h-full focus:outline-none"
            onClick={() => setModalOpen(true)}
            aria-label={`View full size: ${image.alt}`}
          >
            <img
              key={image.src}
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover transition-transform duration-500 ease-out"
              style={{ transform: hovered ? "scale(1.025)" : "scale(1)" }}
              loading="lazy"
            />
          </button>

          {/* Prev / Next arrows */}
          {total > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className={`${arrowBase} ${arrowTheme} left-3`}
                style={{
                  opacity: hovered ? 1 : 0,
                  transition: "opacity 0.2s, border-color 0.15s, color 0.15s",
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = "var(--primary-muted)"}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = ""}
                aria-label="Previous image"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="2.5">
                  <path d="M15 18l-6-6 6-6"/>
                </svg>
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className={`${arrowBase} ${arrowTheme} right-3`}
                style={{
                  opacity: hovered ? 1 : 0,
                  transition: "opacity 0.2s, border-color 0.15s, color 0.15s",
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = "var(--primary-muted)"}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = ""}
                aria-label="Next image"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="2.5">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </button>
            </>
          )}

          {/* Hover overlay — "View Full Size" pill, now themed */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300"
            style={{
              background: isDark ? "rgba(6,8,10,0.38)" : "rgba(0,0,0,0.22)",
              opacity: hovered ? 1 : 0,
            }}
            aria-hidden="true"
          >
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-md backdrop-blur-sm"
              style={{
                background: overlayPillBg,
                border: `1px solid ${overlayBorderColor}`,
              }}
            >
              <svg
                width="11" height="11" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2"
                style={{ color: "var(--primary)" }}
              >
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
              </svg>
              <span
                className="font-mono text-[11px] tracking-wider"
                style={{ color: "var(--primary)" }}
              >
                View Full Size
              </span>
            </div>
          </div>

          {/* Caption — bottom-left */}
          {image.caption && (
            <div
              className={`absolute bottom-3 left-3 font-mono text-[10px] opacity-70 pointer-events-none
                ${isDark ? "text-neutral-400" : "text-neutral-600"}`}
            >
              {image.caption}
            </div>
          )}

          {/* Counter — top-right */}
          {total > 1 && (
            <div
              className={`absolute top-3 right-3 font-mono text-[10px] px-2 py-0.5 rounded pointer-events-none
                ${isDark
                  ? "bg-ink-950/80 text-neutral-500 border border-wire"
                  : "bg-white/90 text-neutral-500 border border-neutral-200"}`}
            >
              {index + 1}/{total}
            </div>
          )}
        </div>

        {/* ── THUMBNAILS + DOTS ─────────────────────────────────────────── */}
        {total > 1 && (
          <div
            className={`border-b
              ${isDark
                ? "border-wire bg-ink-950/30"
                : "border-wire-light bg-paper-100/60"}`}
          >
            {/* Thumbnail row */}
            <div className="flex gap-2 p-3">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className="relative flex-1 overflow-hidden rounded transition-all duration-200 focus:outline-none"
                  style={{
                    aspectRatio: "16/9",
                    outline: i === index ? "1px solid var(--primary)" : "none",
                    opacity: i === index ? 1 : isDark ? 0.4 : 0.45,
                  }}
                  aria-label={`Image ${i + 1}`}
                  aria-pressed={i === index}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>

            {/* Dot row */}
            <div className="flex items-center justify-center gap-1.5 pb-3">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className="rounded-full transition-all duration-200"
                  style={{
                    width:  i === index ? "14px" : "5px",
                    height: "5px",
                    backgroundColor: i === index
                      ? "var(--primary)"
                      : isDark ? "#353d47" : "#9ca3af",  // light: grey-400
                  }}
                  aria-label={`Dot ${i + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <ImageModal
          images={images}
          startIndex={index}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
}

export const FeaturedImage = ({ image, images, projectTitle }) =>
  <ImageGallery images={images || [image]} projectTitle={projectTitle} />;

export const ThumbnailStrip = () => null;
