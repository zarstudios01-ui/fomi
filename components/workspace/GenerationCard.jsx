"use client";

import { Check, MoreHorizontal, RotateCw } from "lucide-react";

/**
 * Result reveal runs at 450ms (lib/motion.js) with a small per-card
 * stagger so four cards don't pop in as one flat block — restrained,
 * not a flashy cascade: ~60ms apart, capped so the whole grid settles
 * well under half a second.
 */
const STAGGER_MS = 60;

export default function GenerationCard({ variation, selected, onSelect, index = 0 }) {
  return (
    <button
      type="button"
      onClick={() => onSelect?.(variation.id)}
      aria-pressed={selected}
      className={[
        "group relative aspect-video rounded-card overflow-hidden border text-left animate-reveal",
        "transition-colors duration-150",
        selected ? "border-accent" : "border-border-subtle hover:border-border",
      ].join(" ")}
      style={{ background: variation.gradient, animationDelay: `${index * STAGGER_MS}ms` }}
    >
      {selected && (
        <span className="absolute top-2 right-2 flex items-center justify-center w-5 h-5 rounded-full bg-accent text-background">
          <Check className="w-3 h-3" strokeWidth={3} />
        </span>
      )}

      <button
        type="button"
        aria-label="More options"
        onClick={(e) => e.stopPropagation()}
        className="absolute top-2 left-2 w-6 h-6 flex items-center justify-center rounded bg-background/50 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-150"
      >
        <MoreHorizontal className="w-3.5 h-3.5" />
      </button>

      <div className="absolute bottom-0 inset-x-0 p-2.5 bg-gradient-to-t from-background/80 to-transparent">
        <p className="text-body-sm font-medium text-primary">{variation.label}</p>
        <p className="text-caption text-secondary">
          {variation.aspectRatio} · {variation.engine}
        </p>
      </div>
    </button>
  );
}

/**
 * Represents both "Queued" and "Generating" from the states sheet:
 * a queued card sits dim and still until its stagger delay elapses,
 * at which point the shimmer animation starts — so four cards visibly
 * pick up "in turn" rather than all animating in lockstep.
 */
export function GenerationCardSkeleton({ index = 0 }) {
  return (
    <div
      className="aspect-video rounded-card skeleton-shimmer animate-shimmer border border-border-subtle animate-fade-in"
      style={{ animationDelay: `${index * STAGGER_MS}ms` }}
    />
  );
}

export function GenerationCardError({ onRetry, index = 0 }) {
  return (
    <div
      className="aspect-video rounded-card border border-error/30 bg-error/5 flex flex-col items-center justify-center gap-2 p-4 animate-reveal"
      style={{ animationDelay: `${index * STAGGER_MS}ms` }}
    >
      <p className="text-body-sm text-error font-medium">Failed to generate</p>
      <button
        type="button"
        onClick={onRetry}
        className="inline-flex items-center gap-1 text-caption text-error hover:underline"
      >
        <RotateCw className="w-3 h-3" />
        Try again
      </button>
    </div>
  );
}
