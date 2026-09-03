"use client";

export default function SegmentedControl({ options = [], value, onChange, className = "" }) {
  return (
    <div
      role="tablist"
      className={[
        "inline-flex p-0.5 rounded bg-surface-elevated border border-border-subtle",
        className,
      ].join(" ")}
    >
      {options.map((opt) => {
        const active = opt === value;
        return (
          <button
            key={opt}
            role="tab"
            type="button"
            aria-selected={active}
            onClick={() => onChange?.(opt)}
            className={[
              "px-3 h-7 rounded text-body-sm font-medium transition-colors duration-150",
              active ? "bg-accent text-background" : "text-secondary hover:text-primary",
            ].join(" ")}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}
