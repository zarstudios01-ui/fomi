"use client";

import { useState } from "react";
import { Check, MoreHorizontal, RotateCw, AlertCircle } from "lucide-react";

const STAGGER_MS = 60;

export default function GenerationCard({ variation, selected, onSelect, index = 0 }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <button
      type="button"
      onClick={() => onSelect?.(variation.id)}
      aria-pressed={selected}
      className={[
        "group relative aspect-video rounded-card overflow-hidden border text-left animate-reveal bg-surface-elevated",
        "transition-colors duration-150",
        selected ? "border-accent" : "border-border-subtle hover:border-border",
      ].join(" ")}
      style={{ animationDelay: `${index * STAGGER_MS}ms` }}
    >
      {!imgError ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={variation.imageUrl}
            alt={variation.label}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
            className={["absolute inset-0 w-full h-full object-cover transition-opacity duration-300", imgLoaded ? "opacity-100" : "opacity-0"].join(" ")}
          />
          {!imgLoaded && (
            <div className="absolute inset-0 skeleton-shimmer animate-shimmer" aria-hidden="true" />
          )}
        </>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-surface-elevated text-muted">
          <AlertCircle className="w-5 h-5" />
          <p className="text-caption">Image failed to load</p>
        </div>
      )}

      {selected && (
        <span className="absolute top-2 right-2 flex items-center justify-center w-5 h-5 rounded-full bg-accent text-background z-10">
          <Check className="w-3 h-3" strokeWidth={3} />
        </span>
      )}

      <button
        type="button"
        aria-label="More options"
        onClick={(e) => e.stopPropagation()}
        className="absolute top-2 left-2 w-6 h-6 flex items-center justify-center rounded bg-background/50 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-10"
      >
        <MoreHorizontal className="w-3.5 h-3.5" />
      </button>

      <div className="absolute bottom-0 inset-x-0 p-2.5 bg-gradient-to-t from-background/80 to-transparent z-10">
        <p className="text-body-sm font-medium text-primary">{variation.label}</p>
        <p className="text-caption text-secondary">{variation.aspectRatio} · {variation.engine}</p>
      </div>
    </button>
  );
}

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
      <button type="button" onClick={onRetry} className="inline-flex items-center gap-1 text-caption text-error hover:underline">
        <RotateCw className="w-3 h-3" />
        Try again
      </button>
    </div>
  );
}
