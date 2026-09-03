"use client";

export default function TextInput({
  label,
  error,
  disabled = false,
  className = "",
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
      <input
        id={inputId}
        disabled={disabled}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
        className={[
          "w-full h-9 px-3 rounded bg-surface-elevated border text-body text-primary placeholder:text-muted",
          "transition-colors duration-150",
          error
            ? "border-error"
            : "border-border-subtle focus:border-accent",
          disabled ? "opacity-50 cursor-not-allowed" : "",
        ].join(" ")}
        {...props}
      />
      {error && (
        <p id={`${inputId}-error`} className="mt-1 text-caption text-error">
          {error}
        </p>
      )}
    </div>
  );
}
