"use client";

import { Search } from "lucide-react";

export default function SearchInput({
  placeholder = "Search projects...",
  className = "",
  ...props
}) {
  return (
    <div className={["relative", className].join(" ")}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
      <input
        type="text"
        placeholder={placeholder}
        className="w-full h-9 pl-9 pr-3 rounded bg-surface-elevated border border-border-subtle text-body text-primary placeholder:text-muted focus:border-accent transition-colors duration-150"
        {...props}
      />
    </div>
  );
}
