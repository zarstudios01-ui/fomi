import { MoreHorizontal } from "lucide-react";

export default function MobileHeader({ title = "Fomi", subtitle }) {
  return (
    <header className="md:hidden flex items-center justify-between h-14 px-4 border-b border-border-subtle bg-background sticky top-0 z-10">
      <div className="min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="text-heading-3 font-semibold text-primary truncate">{title}</span>
        </div>
        {subtitle && <p className="text-caption text-muted truncate">{subtitle}</p>}
      </div>
      <button
        type="button"
        aria-label="More options"
        className="w-9 h-9 flex items-center justify-center rounded text-secondary hover:bg-surface-elevated"
      >
        <MoreHorizontal className="w-5 h-5" />
      </button>
    </header>
  );
}
