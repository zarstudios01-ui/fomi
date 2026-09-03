"use client";

import { useState, useEffect } from "react";
import { Check, MoreHorizontal, RotateCw, AlertCircle } from "lucide-react";

const STAGGER_MS = 60;

function useImageFetch(url) {
  const [state, setState] = useState({ status: "loading", objectUrl: null, error: null });

  useEffect(() => {
    let cancelled = false;
    let objectUrl = null;
    setState({ status: "loading", objectUrl: null, error: null });

    fetch(url)
      .then(async (res) => {
        if (!res.ok) {
          let detail = "";
          try {
            const body = await res.json();
            detail = body?.error || "";
          } catch {}
          throw new Error(`HTTP ${res.status}${detail ? ` — ${detail}` : ""}`);
        }
        const blob = await res.blob();
        if (cancelled) return;
        objectUrl = URL.createObjectURL(blob);
        setState({ status: "loaded", objectUrl, error: null });
      })
      .catch((err) => {
        if (cancelled) return;
        setState({ status: "error", objectUrl: null, error: err.message || "Failed to load" });
      });

    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [url]);

  return state;
}

export default function GenerationCard({ variation, selected, onSelect, index = 0 }) {
  const { status, objectUrl, error } = useImageFetch(variation.imageUrl);

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
      {status !== "error" ? (
        <>
          {objectUrl && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={objectUrl} alt={variation.label} className="absolute inset-0 w-full h-full object-cover" />
          )}
          {status === "loading" && (
            <div className="absolute inset-0 skeleton-shimmer animate-shimmer" aria-hidden="true" />
          )}
        </>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 p-3 bg-surface-elevated text-muted text-center">
          <AlertCircle className="w-5 h-5" />
          <p className="text-caption">Image failed to load</p>
          {error && <p className="text-caption text-error break-words">{error}</p>}
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
