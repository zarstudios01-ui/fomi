/**
 * JS-side mirror of tailwind.config.js's `theme.extend.colors`.
 * Use this only where a Tailwind class can't reach — inline SVG
 * fills, canvas, chart libraries. Everything else should use the
 * Tailwind semantic classes (bg-surface, text-secondary, etc.)
 * directly rather than importing this file.
 */
export const colors = {
  background: "#0B0C0D",
  surface: "#111315",
  surfaceSecondary: "#17191B",
  surfaceElevated: "#1C1F21",
  border: "#272A2D",
  borderSubtle: "#202326",
  textPrimary: "#F2F2F0",
  textSecondary: "#A1A4A7",
  textMuted: "#6E7276",
  textDisabled: "#4B4F52",
  accent: "#C7F368",
  success: "#4CD964",
  warning: "#F5B84C",
  error: "#FF5C5C",
  info: "#5DA9FF",
};

export const radius = {
  sm: 6,
  default: 8,
  card: 12,
  container: 16,
};

export const spacing = [4, 8, 12, 16, 20, 24, 32, 40, 64, 80];
