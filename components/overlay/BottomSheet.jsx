"use client";

import { useRef } from "react";
import { X } from "lucide-react";
import { useFocusTrap } from "@/hooks/useFocusTrap";

/**
 * Bottom sheet — the mobile composition of Creative Direction (and any
 * other panel that becomes thumb-reachable controls on small screens).
 * This is a genuinely different component from Drawer, not the same
 * markup with different transform classes: a sheet has a drag handle,
 * rises from the bottom, and caps its height instead of filling it.
 */
export default function BottomSheet({ open, onClose, title, children }) {
  const sheetRef = useRef(null);
  useFocusTrap(sheetRef, open, onClose);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-30 flex items-end">
      <div
        className="absolute inset-0 bg-background/70 animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        className="relative w-full max-h-[85vh] bg-surface border-t border-border-subtle rounded-t-container p-5 overflow-y-auto outline-none animate-slide-in-up"
      >
        <div className="flex justify-center mb-3">
          <span className="w-9 h-1 rounded-pill bg-border" aria-hidden="true" />
        </div>
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
