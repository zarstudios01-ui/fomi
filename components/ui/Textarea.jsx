"use client";

export default function Textarea({
  label,
  maxLength,
  value = "",
  className = "",
  error,
  id,
  ...props
}) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className={className}>
      {label && (
        <label htmlFor={inputId} className="block text-label text-secondary mb-1.5">
          {label}
        </label>
      )}
      <textarea
        id={inputId}
        value={value}
        maxLength={maxLength}
        aria-invalid={!!error}
        className={[
          "w-full min-h-[96px] px-3 py-2.5 rounded bg-surface-elevated border text-body text-primary placeholder:text-muted resize-none",
          "transition-colors duration-150",
          error ? "border-error" : "border-border-subtle focus:border-accent",
        ].join(" ")}
        {...props}
      />
      <div className="flex justify-between mt-1">
        {error ? (
          <p className="text-caption text-error">{error}</p>
        ) : (
          <span />
        )}
        {maxLength && (
          <span className="text-caption text-muted">
            {value.length} / {maxLength}
          </span>
        )}
      </div>
    </div>
  );
}
