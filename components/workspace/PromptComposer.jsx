"use client";

import { useState } from "react";
import { Plus, Sparkles, ChevronDown, ImageIcon, X } from "lucide-react";
import Button from "@/components/ui/Button";
import DropdownMenu from "@/components/overlay/DropdownMenu";
import { CREATIVE_DIRECTION_FIELDS } from "@/lib/constants";

const STYLE_FIELD = CREATIVE_DIRECTION_FIELDS.find((f) => f.key === "visualStyle");
const RATIO_FIELD = CREATIVE_DIRECTION_FIELDS.find((f) => f.key === "aspectRatio");

export default function PromptComposer({
  prompt,
  onPromptChange,
  creativeDirection,
  onDirectionChange,
  onSubmit,
  status,
  error,
}) {
  const disabled = status === "generating";
  const populated = prompt.trim().length > 0;
  const [reference, setReference] = useState(null);

  const borderClass = error
    ? "border-error"
    : populated
    ? "border-border focus-within:border-accent"
    : "border-border-subtle focus-within:border-accent";

  const chipClass =
    "inline-flex items-center gap-1.5 h-8 px-3 rounded bg-surface border border-border-subtle text-body-sm text-secondary hover:text-primary transition-colors duration-150 disabled:opacity-50";

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
                <button type="button" aria-label="Remove reference" onClick={() => setReference(null)} disabled={disabled} className="text-muted hover:text-primary">
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ) : (
              <button type="button" disabled={disabled} onClick={() => setReference({ name: "reference.jpg" })} className={chipClass}>
                <Plus className="w-3.5 h-3.5" />
                Reference
              </button>
            )}

            <DropdownMenu
              trigger={
                <span className={chipClass} aria-disabled={disabled}>
                  <Sparkles className="w-3.5 h-3.5" />
                  {creativeDirection.visualStyle}
                  <ChevronDown className="w-3.5 h-3.5" />
                </span>
              }
              items={STYLE_FIELD.options.map((opt) => ({ label: opt, onSelect: () => onDirectionChange("visualStyle", opt) }))}
            />

            <DropdownMenu
              trigger={
                <span className={chipClass} aria-disabled={disabled}>
                  {creativeDirection.aspectRatio}
                  <ChevronDown className="w-3.5 h-3.5" />
                </span>
              }
              items={RATIO_FIELD.options.map((opt) => ({ label: opt, onSelect: () => onDirectionChange("aspectRatio", opt) }))}
            />
          </div>

          <Button variant="primary" loading={disabled} onClick={onSubmit} className="min-w-[96px]">
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
