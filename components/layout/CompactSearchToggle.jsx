"use client";

import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";

/**
 * Tablet's TopBar composition for search: there isn't room for the
 * desktop's permanently-docked input, so it collapses to an icon that
 * expands in place on click — a real interaction change, not a
 * narrower version of the same input.
 */
export default function CompactSearchToggle() {
  const [open, setOpen] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  if (open) {
    return (
      <div className="relative w-40 animate-fade-in">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search..."
          onBlur={() => setOpen(false)}
          onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
          className="w-full h-9 pl-8 pr-7 rounded bg-surface-elevated border border-accent text-body-sm text-primary placeholder:text-muted focus:outline-none"
        />
        <button
          type="button"
          aria-label="Close search"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => setOpen(false)}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-muted hover:text-primary"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      aria-label="Search projects"
      onClick={() => setOpen(true)}
      className="w-9 h-9 flex items-center justify-center rounded text-secondary hover:bg-surface-elevated hover:text-primary transition-colors duration-150"
    >
      <Search className="w-4 h-4" />
    </button>
  );
}
