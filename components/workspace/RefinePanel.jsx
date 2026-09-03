"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { REFINE_QUICK_ACTIONS } from "@/lib/constants";

export default function RefinePanel({ onApply }) {
  const [change, setChange] = useState("");

  return (
    <div className="rounded-container border border-border-subtle bg-surface p-4">
      <h3 className="text-heading-3 text-primary mb-3">Refine</h3>

      <div className="flex flex-wrap gap-2 mb-3">
        {REFINE_QUICK_ACTIONS.map((action) => (
          <button
            key={action}
            type="button"
            onClick={() => setChange(action)}
            className="h-7 px-2.5 rounded-pill bg-surface-elevated border border-border-subtle text-caption text-secondary hover:text-primary hover:border-border transition-colors duration-150"
          >
            {action}
          </button>
        ))}
      </div>

      <textarea
        value={change}
        onChange={(e) => setChange(e.target.value)}
        rows={2}
        placeholder="Describe your change..."
        className="w-full bg-surface-elevated border border-border-subtle rounded px-3 py-2 text-body text-primary placeholder:text-muted resize-none focus:outline-none focus:border-accent mb-3"
      />

      <Button variant="primary" className="w-full" onClick={() => onApply?.(change)}>
        Apply / Generate
      </Button>
    </div>
  );
}
