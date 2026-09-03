"use client";

import { useEffect } from "react";

const FOCUSABLE_SELECTOR =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * Traps Tab/Shift+Tab focus within `containerRef` while `active` is true,
 * restores focus to whatever was focused before opening, and calls
 * `onEscape` on the Esc key. Shared by every overlay so each one doesn't
 * reimplement (and potentially get wrong) the same keyboard behavior.
 */
export function useFocusTrap(containerRef, active, onEscape) {
  useEffect(() => {
    if (!active || !containerRef.current) return;

    const previouslyFocused = document.activeElement;
    const container = containerRef.current;

    const focusables = container.querySelectorAll(FOCUSABLE_SELECTOR);
    (focusables[0] || container).focus();

    function handleKeyDown(e) {
      if (e.key === "Escape") {
        onEscape?.();
        return;
      }
      if (e.key !== "Tab") return;

      const nodes = Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR)).filter(
        (el) => !el.disabled
      );
      if (nodes.length === 0) return;

      const first = nodes[0];
      const last = nodes[nodes.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [active, containerRef, onEscape]);
}
