"use client";

import { CheckCircle2, XCircle, X } from "lucide-react";

export default function Toast({ tone = "success", title, description, onDismiss }) {
  const Icon = tone === "success" ? CheckCircle2 : XCircle;
  const iconColor = tone === "success" ? "text-success" : "text-error";

  return (
    <div
      role="status"
      className="flex items-start gap-3 w-full max-w-sm p-3 rounded-card bg-surface-elevated border border-border-subtle shadow-elevation-2 animate-reveal"
    >
      <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${iconColor}`} />
      <div className="flex-1 min-w-0">
        <p className="text-body font-medium text-primary">{title}</p>
        {description && <p className="text-body-sm text-secondary mt-0.5">{description}</p>}
      </div>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss notification"
        className="text-muted hover:text-primary"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
