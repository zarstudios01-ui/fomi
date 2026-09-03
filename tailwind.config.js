const { fontFamily } = require("tailwindcss/defaultTheme");

/**
 * Design tokens are defined once here, sourced directly from the
 * Fomi Design Foundations (v1.0) sheet. Components should never
 * reach for a raw hex value — they use these semantic names so a
 * future palette change is a one-file edit.
 *
 * Mirrors lib/tokens.js, which exposes the same values to JS
 * (charts, inline styles, canvas, etc.) where Tailwind classes
 * can't reach.
 */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Neutrals
        background: "#0B0C0D",
        surface: "#111315",
        "surface-secondary": "#17191B",
        "surface-elevated": "#1C1F21",
        border: {
          DEFAULT: "#272A2D",
          subtle: "#202326",
        },
        // Text
        primary: "#F2F2F0",
        secondary: "#A1A4A7",
        muted: "#6E7276",
        disabled: "#4B4F52",
        // Brand
        accent: {
          DEFAULT: "#C7F368",
          hover: "#D4F585", // slightly lighter, used on :hover
          active: "#A8CE54", // slightly darker, used on :active
        },
        // Semantic
        success: "#4CD964",
        warning: "#F5B84C",
        error: "#FF5C5C",
        info: "#5DA9FF",
      },
      fontFamily: {
        sans: ["Inter", ...fontFamily.sans],
      },
      fontSize: {
        // [fontSize, { lineHeight, fontWeight }] — from the 02 TYPOGRAPHY spec
        "display-lg": ["3rem", { lineHeight: "3.5rem", fontWeight: "700" }], // 48/56
        "display-md": ["2.25rem", { lineHeight: "2.75rem", fontWeight: "600" }], // 36/44
        "heading-1": ["1.75rem", { lineHeight: "2.25rem", fontWeight: "600" }], // 28/36
        "heading-2": ["1.375rem", { lineHeight: "1.75rem", fontWeight: "600" }], // 22/28
        "heading-3": ["1.125rem", { lineHeight: "1.5rem", fontWeight: "600" }], // 18/24
        "body-lg": ["1rem", { lineHeight: "1.5rem", fontWeight: "400" }], // 16/24
        body: ["0.875rem", { lineHeight: "1.25rem", fontWeight: "400" }], // 14/20
        "body-sm": ["0.8125rem", { lineHeight: "1.125rem", fontWeight: "400" }], // 13/18
        label: ["0.75rem", { lineHeight: "1rem", fontWeight: "500" }], // 12/16
        caption: ["0.6875rem", { lineHeight: "1rem", fontWeight: "400" }], // 11/16
        metadata: ["0.6875rem", { lineHeight: "0.875rem", fontWeight: "400" }], // 11/14
      },
      spacing: {
        // Base unit 4px scale from 03 SPACING — named so intent survives at the call site
        4.5: "1.125rem",
      },
      borderRadius: {
        sm: "6px", // small controls (6–8px) — checkbox/radio/small icon buttons
        DEFAULT: "8px", // standard controls (8–10px) — buttons, inputs
        card: "12px", // cards
        container: "16px", // large containers, modals, bottom sheets
        pill: "9999px", // tag/status/category pills only
      },
      boxShadow: {
        "elevation-1": "0 1px 2px rgba(0,0,0,0.25)",
        "elevation-2": "0 2px 6px rgba(0,0,0,0.35)",
        "elevation-3": "0 4px 12px rgba(0,0,0,0.4)",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-400px 0" },
          "100%": { backgroundPosition: "400px 0" },
        },
        // Result reveal (~450ms) — generation cards fade + rise into place
        reveal: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        // Panel slide (~250ms) — tablet Creative Direction drawer
        "slide-in-right": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        // Sheet slide (~300ms) — mobile Creative Direction bottom sheet
        "slide-in-up": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        shimmer: "shimmer 1.6s linear infinite",
        reveal: "reveal 450ms cubic-bezier(0.16, 1, 0.3, 1) both",
        "slide-in-right": "slide-in-right 250ms cubic-bezier(0.16, 1, 0.3, 1) both",
        "slide-in-up": "slide-in-up 300ms cubic-bezier(0.16, 1, 0.3, 1) both",
        "fade-in": "fade-in 150ms ease-out both",
        "scale-in": "scale-in 150ms cubic-bezier(0.16, 1, 0.3, 1) both",
      },
    },
  },
  plugins: [],
};
