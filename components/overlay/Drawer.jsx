"use client";

import { useRef } from "react";
import { X } from "lucide-react";
import { useFocusTrap } from "@/hooks/useFocusTrap";

/**
 * Right-side sliding panel — the tablet composition of Creative Direction.
 * Distinct from BottomSheet (mobile) rather than the same component
 * resized: at this width there's room for a vertical panel, so the
 * interaction is "slide in from the edge," not "rise from the bottom."
 */
export default function Drawer({ open, onClose, title, children }) {
  const panelRef = useRef(null);
  useFocusTrap(panelRef, open, onClose);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-30 flex justify-end">
      <div
        className="absolute inset-0 bg-background/70 animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        className="relative w-[340px] max-w-full h-full bg-surface border-l border-border-subtle p-5 overflow-y-auto outline-none animate-slide-in-right"
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-heading-3 text-primary">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={`Close ${title}`}
            className="text-secondary hover:text-primary transition-colors duration-150"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
