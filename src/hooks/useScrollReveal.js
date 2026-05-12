import { useEffect, useRef, useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// useScrollReveal
// ─────────────────────────────────────────────────────────────────────────────
// Returns { ref, revealed }.
// - Before the element scrolls into view: apply "fade-up" for the animation.
// - Once revealed: "fade-up visible" (fully visible, no opacity:0).
// - On theme toggle the component re-renders but `revealed` stays true
//   because it lives in a ref — so content never disappears.
//
// USAGE:
//   const { ref, revealed } = useScrollReveal();
//   <div ref={ref} className={revealed ? "fade-up visible" : "fade-up"}>
// ─────────────────────────────────────────────────────────────────────────────
export function useScrollReveal() {
  const ref = useRef(null);
  // useState so the component re-renders when revealed, but the value
  // is stable across theme-toggle re-renders (not reset to false).
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || revealed) return; // already revealed — nothing to do

    // Already in viewport on mount (e.g. hero, or after navigation)
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 40) {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // intentionally empty — we only want this to run once on mount

  return { ref, revealed };
}
