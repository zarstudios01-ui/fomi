"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * @param {boolean} compact - icon-only, used by the tablet CompactSidebar.
 *   `title` provides the accessible name and native tooltip since there's
 *   no visible label to associate via aria-labelledby.
 */
export default function NavItem({ href, label, icon: Icon, compact = false }) {
  const pathname = usePathname();
  const active = pathname === href;

  if (compact) {
    return (
      <Link
        href={href}
        title={label}
        aria-label={label}
        aria-current={active ? "page" : undefined}
        className={[
          "flex items-center justify-center w-10 h-10 rounded transition-colors duration-150",
          active
            ? "bg-accent text-background"
            : "text-secondary hover:bg-surface-elevated hover:text-primary",
        ].join(" ")}
      >
        <Icon className="w-4 h-4" strokeWidth={2} />
      </Link>
    );
  }

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={[
        "flex items-center gap-2.5 h-8 px-2.5 rounded text-body-sm font-medium transition-colors duration-150",
        active
          ? "bg-accent text-background"
          : "text-secondary hover:bg-surface-elevated hover:text-primary",
      ].join(" ")}
    >
      <Icon className="w-4 h-4 shrink-0" strokeWidth={2} />
      <span className="truncate">{label}</span>
    </Link>
  );
}
