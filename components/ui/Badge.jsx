const TONE_CLASSES = {
  neutral: "bg-surface-elevated text-secondary border-border-subtle",
  accent: "bg-accent/15 text-accent border-accent/30",
  success: "bg-success/15 text-success border-success/30",
  warning: "bg-warning/15 text-warning border-warning/30",
  error: "bg-error/15 text-error border-error/30",
};

export default function Badge({ tone = "neutral", children, className = "" }) {
  return (
    <span
      className={[
        "inline-flex items-center h-5 px-2 rounded-pill border text-caption font-medium leading-none",
        TONE_CLASSES[tone],
        className,
      ].join(" ")}
    >
      {children}
    </span>
  );
}
