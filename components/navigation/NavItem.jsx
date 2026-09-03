"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavItem({ href, label, icon, compact = false }) {
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
        {icon}
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
      {icon}
      <span className="truncate">{label}</span>
    </Link>
  );
}
