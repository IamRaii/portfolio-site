/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  // ── DARK MODE ────────────────────────────────────────────────────────────
  darkMode: "class",

  theme: {
    extend: {
      // ── TYPOGRAPHY ───────────────────────────────────────────────────────
      // Apple-inspired system font stack — no external font dependency for body.
      // "Inter" loaded in index.css for headings only (closest to SF Pro feel
      // while remaining free and widely supported).
      fontFamily: {
        display: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        body: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
        mono: [
          '"SF Mono"',
          '"JetBrains Mono"',
          '"Fira Code"',
          "Menlo",
          "Monaco",
          "Consolas",
          "monospace",
        ],
      },

      // ── COLOR PALETTE ────────────────────────────────────────────────────
      colors: {
        // Dark backgrounds
        ink: {
          950: "#06080a",
          900: "#0c0e12",
          800: "#13161b",
          700: "#1a1e24",
          600: "#222730",
          500: "#353d47",
        },
        // Light backgrounds
        paper: {
          50:  "#f9fafb",
          100: "#f3f4f6",
          200: "#e9edf2",
          300: "#dce1e8",
          400: "#c8cfd8",
        },
        // Neutral text scale (shared)
        neutral: {
          50:  "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
        },

        // ── PRIMARY — CSS-variable-driven, theme-resolved ─────────────────
        // In dark mode:  muted blue  (#4a7fa5 family)
        // In light mode: deep red    (#b04040 family)
        //
        // Used via: text-primary, bg-primary, border-primary
        // Values are defined as CSS variables in index.css on html / html.dark
        primary: {
          DEFAULT: "var(--primary)",         // main accent
          hover:   "var(--primary-hover)",   // slightly lighter/darker on hover
          muted:   "var(--primary-muted)",   // low-emphasis tint (borders, ghost states)
          subtle:  "var(--primary-subtle)",  // very light tint (backgrounds, rings)
          fg:      "var(--primary-fg)",      // text ON primary (always white or near-white)
        },

        // Border tokens
        wire:        "#1c2128",
        "wire-light":"#dde1e6",

        // Legacy aliases kept so old className strings don't break at build time.
        // These are gradually superseded by `primary` tokens above.
        accent: {
          DEFAULT: "var(--primary)",
          dim:     "var(--primary-hover)",
          glow:    "var(--primary)",
        },
        stone: {
          200: "#dde1e6",
          300: "#c2c8cf",
          400: "#9ba3ad",
          500: "#6b7482",
          600: "#4b5563",
        },
      },

      // ── SPACING ──────────────────────────────────────────────────────────
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
      },

      // ── BORDER RADIUS ────────────────────────────────────────────────────
      borderRadius: {
        "4xl": "2rem",
      },

      // ── LETTER SPACING ───────────────────────────────────────────────────
      letterSpacing: {
        tightest: "-0.04em",
        tighter:  "-0.02em",
        tight:    "-0.01em",
      },

      // ── ANIMATIONS ───────────────────────────────────────────────────────
      animation: {
        "fade-up":    "fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) forwards",
        "fade-in":    "fadeIn 0.4s ease forwards",
        blink:        "blink 1.1s step-end infinite",
      },
      keyframes: {
        fadeUp:  { "0%": { opacity: 0, transform: "translateY(20px)" }, "100%": { opacity: 1, transform: "translateY(0)" } },
        fadeIn:  { "0%": { opacity: 0 }, "100%": { opacity: 1 } },
        blink:   { "0%,100%": { opacity: 1 }, "50%": { opacity: 0 } },
      },
    },
  },

  plugins: [],
};
