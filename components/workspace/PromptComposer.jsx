"use client";

import { useState } from "react";
import { Plus, Sparkles, ChevronDown, ImageIcon, X } from "lucide-react";
import Button from "@/components/ui/Button";

/**
 * Covers every Prompt state from the Interaction States sheet:
 *   Empty       → placeholder only, muted border
 *   Focused     → accent border (:focus-within)
 *   Populated   → border steps up from subtle → default once there's text
 *   Reference   → attached-image chip replaces the "Reference" button
 *   Generating  → textarea + controls disabled, button shows a spinner
 *   Disabled    → same as Generating (this composer has no separate
 *                 disabled-without-generating case in the current flow)
 *   Error       → error-colored border + inline message
 */
export default function PromptComposer({
  prompt,
  onPromptChange,
  aspectRatio,
  onSubmit,
  status,
  error,
}) {
  const disabled = status === "generating";
  const populated = prompt.trim().length > 0;

  // UI-only demo of the Reference state — no real upload backend wired
  // in this mock, but the composition (chip replacing the button,
  // removable) matches the spec sheet's "With Reference" example.
  const [reference, setReference] = useState(null);

  const borderClass = error
    ? "border-error"
    : populated
    ? "border-border focus-within:border-accent"
    : "border-border-subtle focus-within:border-accent";

  return (
    <div className="w-full">
      <div className={`rounded-container border bg-surface-elevated p-3 transition-colors duration-150 ${borderClass}`}>
        <textarea
          value={prompt}
          onChange={(e) => onPromptChange(e.target.value)}
          maxLength={2000}
          rows={2}
          disabled={disabled}
          placeholder="Describe your creative direction..."
          className="w-full bg-transparent text-body-lg text-primary placeholder:text-muted resize-none focus:outline-none disabled:opacity-60"
          onKeyDown={(e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
              e.preventDefault();
              onSubmit();
            }
          }}
        />

        <div className="flex flex-wrap items-center justify-between gap-2 mt-3">
          <div className="flex flex-wrap items-center gap-2">
            {reference ? (
              <span className="inline-flex items-center gap-1.5 h-8 pl-1.5 pr-2 rounded bg-surface border border-accent/40 text-body-sm text-primary">
                <span className="w-5 h-5 rounded bg-accent/20 flex items-center justify-center">
                  <ImageIcon className="w-3 h-3 text-accent" />
                </span>
                {reference.name}
                <button
                  type="button"
                  aria-label="Remove reference"
                  onClick={() => setReference(null)}
                  disabled={disabled}
                  className="text-muted hover:text-primary"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ) : (
              <button
                type="button"
                disabled={disabled}
                onClick={() => setReference({ name: "reference.jpg" })}
                className="inline-flex items-center gap-1.5 h-8 px-3 rounded bg-surface border border-border-subtle text-body-sm text-secondary hover:text-primary transition-colors duration-150 disabled:opacity-50"
              >
                <Plus className="w-3.5 h-3.5" />
                Reference
              </button>
            )}
            <button
              type="button"
              disabled={disabled}
              className="inline-flex items-center gap-1.5 h-8 px-3 rounded bg-surface border border-border-subtle text-body-sm text-secondary hover:text-primary transition-colors duration-150 disabled:opacity-50"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Style
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              disabled={disabled}
              className="inline-flex items-center gap-1.5 h-8 px-3 rounded bg-surface border border-border-subtle text-body-sm text-secondary hover:text-primary transition-colors duration-150 disabled:opacity-50"
            >
              {aspectRatio}
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>

          <Button
            variant="primary"
            loading={disabled}
            onClick={onSubmit}
            className="min-w-[96px]"
          >
            {disabled ? "Creating..." : "Create →"}
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between mt-2 px-1">
        {error ? (
          <p className="text-caption text-error">{error}</p>
        ) : (
          <p className="text-caption text-muted">Press Ctrl + Enter to generate</p>
        )}
        <p className="text-caption text-muted">{prompt.length} / 2000</p>
      </div>
    </div>
  );
}
