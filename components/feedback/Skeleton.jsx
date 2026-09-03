export default function Skeleton({ className = "", shimmer = true }) {
  return (
    <div
      className={[
        "rounded-card bg-surface-elevated overflow-hidden",
        shimmer ? "skeleton-shimmer animate-shimmer" : "",
        className,
      ].join(" ")}
      aria-hidden="true"
    />
  );
}
