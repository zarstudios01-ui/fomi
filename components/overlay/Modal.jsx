"use client";

import { useRef } from "react";
import { X } from "lucide-react";
import { useFocusTrap } from "@/hooks/useFocusTrap";

export default function Modal({ open, onClose, title, children, footer }) {
  const dialogRef = useRef(null);
  useFocusTrap(dialogRef, open, onClose);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-background/70 animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
        className="relative w-full max-w-sm rounded-container bg-surface border border-border-subtle shadow-elevation-3 p-5 outline-none animate-scale-in"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 id="modal-title" className="text-heading-3 text-primary">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="text-secondary hover:text-primary transition-colors duration-150"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="text-body text-secondary">{children}</div>

        {footer && <div className="flex justify-end gap-2 mt-5">{footer}</div>}
      </div>
    </div>
  );
}
