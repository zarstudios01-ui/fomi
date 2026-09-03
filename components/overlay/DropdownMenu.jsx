"use client";

import { useEffect, useRef, useState } from "react";

/**
 * @param {{ trigger: React.ReactNode, items: { label: string, onSelect: () => void, destructive?: boolean }[] }} props
 */
export default function DropdownMenu({ trigger, items = [], align = "left" }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    function handleClick(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    function handleKeyDown(e) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative inline-block">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {trigger}
      </button>

      {open && (
        <div
          role="menu"
          className={[
            "absolute z-30 mt-1 w-48 rounded-card bg-surface-elevated border border-border-subtle shadow-elevation-2 py-1",
            align === "right" ? "right-0" : "left-0",
          ].join(" ")}
        >
          {items.map((item) => (
            <button
              key={item.label}
              role="menuitem"
              type="button"
              onClick={() => {
                item.onSelect();
                setOpen(false);
              }}
              className={[
                "w-full text-left px-3 h-8 text-body-sm transition-colors duration-150",
                item.destructive
                  ? "text-error hover:bg-error/10"
                  : "text-secondary hover:bg-surface hover:text-primary",
              ].join(" ")}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
