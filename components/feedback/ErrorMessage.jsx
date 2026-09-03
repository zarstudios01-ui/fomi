"use client";

import { AlertCircle, RotateCw } from "lucide-react";

export default function ErrorMessage({ title, description, onRetry, className = "" }) {
  return (
    <div
      role="alert"
      className={[
        "flex items-start gap-3 p-3 rounded-card bg-error/10 border border-error/30 animate-reveal",
        className,
      ].join(" ")}
    >
      <AlertCircle className="w-4 h-4 mt-0.5 shrink-0 text-error" />
      <div className="flex-1 min-w-0">
        <p className="text-body font-medium text-error">{title}</p>
        {description && <p className="text-body-sm text-secondary mt-0.5">{description}</p>}
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex items-center gap-1 mt-2 text-body-sm text-error font-medium hover:underline"
          >
            <RotateCw className="w-3.5 h-3.5" />
            Try again
          </button>
        )}
      </div>
    </div>
  );
}
