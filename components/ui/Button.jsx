"use client";

import { Loader2 } from "lucide-react";

const VARIANT_CLASSES = {
  primary:
    "bg-accent text-background hover:bg-accent-hover active:bg-accent-active disabled:bg-surface-elevated disabled:text-disabled",
  secondary:
    "bg-surface-elevated text-primary border border-border hover:bg-surface-secondary active:bg-surface disabled:text-disabled disabled:border-border-subtle",
  ghost:
    "bg-transparent text-secondary hover:bg-surface-elevated hover:text-primary active:bg-surface-secondary disabled:text-disabled",
  destructive:
    "bg-error/10 text-error border border-error/30 hover:bg-error/20 active:bg-error/25 disabled:text-disabled disabled:border-border-subtle disabled:bg-transparent",
};

const SIZE_CLASSES = {
  sm: "h-8 px-3 text-body-sm gap-1.5",
  md: "h-9 px-4 text-body gap-2",
  lg: "h-10 px-5 text-body-lg gap-2",
};

/**
 * @param {"primary"|"secondary"|"ghost"|"destructive"} variant
 * @param {"sm"|"md"|"lg"} size
 * @param {boolean} loading
 * @param {boolean} icon - true for icon-only square buttons (uses Icon Button spacing)
 *
 * Motion: color transitions run on the 150ms hover timing; the press
 * itself (active:scale) is deliberately snappier at 100ms so the button
 * feels like it responds instantly, per the MOTION constants in lib/motion.js.
 */
export default function Button({
  variant = "primary",
  size = "md",
  loading = false,
  icon = false,
  disabled = false,
  className = "",
  children,
  ...props
}) {
  return (
    <button
      type="button"
      disabled={disabled || loading}
      className={[
        "inline-flex items-center justify-center rounded font-medium",
        "transition-[background-color,border-color,transform] duration-150",
        "active:duration-100 active:scale-[0.97]",
        "disabled:cursor-not-allowed disabled:active:scale-100",
        icon ? "w-9 h-9 p-0" : SIZE_CLASSES[size],
        VARIANT_CLASSES[variant],
        className,
      ].join(" ")}
      {...props}
    >
      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : children}
    </button>
  );
}
