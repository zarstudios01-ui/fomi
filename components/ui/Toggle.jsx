"use client";

export default function Toggle({ checked, onChange, label, className = "" }) {
  return (
    <label
      className={["inline-flex items-center gap-2 cursor-pointer select-none", className].join(
        " "
      )}
    >
      <span
        role="switch"
        aria-checked={checked}
        tabIndex={0}
        onClick={() => onChange?.(!checked)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onChange?.(!checked);
          }
        }}
        className={[
          "relative inline-flex h-5 w-9 items-center rounded-pill transition-colors duration-150",
          checked ? "bg-accent" : "bg-surface-elevated border border-border-subtle",
        ].join(" ")}
      >
        <span
          className={[
            "inline-block h-3.5 w-3.5 transform rounded-pill bg-primary transition-transform duration-150",
            checked ? "translate-x-4.5" : "translate-x-1",
          ].join(" ")}
        />
      </span>
      {label && <span className="text-body text-secondary">{label}</span>}
    </label>
  );
}
