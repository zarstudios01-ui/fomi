import { ChevronRight } from "lucide-react";

/** @param {{ label: string, href?: string }[]} items */
export default function Breadcrumb({ items = [] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-body-sm min-w-0">
      {items.map((item, i) => {
        const last = i === items.length - 1;
        return (
          <span key={i} className="flex items-center gap-1.5 min-w-0">
            <span
              className={[
                "truncate",
                last ? "text-primary font-medium" : "text-muted",
              ].join(" ")}
            >
              {item.label}
            </span>
            {!last && <ChevronRight className="w-3.5 h-3.5 text-muted shrink-0" />}
          </span>
        );
      })}
    </nav>
  );
}
