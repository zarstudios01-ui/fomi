import Link from "next/link";
import NavItem from "@/components/navigation/NavItem";
import {
  CREATE_NAV_ITEMS,
  WORKSPACE_NAV_ITEMS,
  EXPLORE_NAV_ITEMS,
  SETTINGS_NAV_ITEM,
} from "@/lib/constants";

/**
 * Tablet's "compact navigation": all destinations are still one tap
 * away, but labels are dropped in favor of a narrower rail so the
 * workspace keeps most of the width. This is a separate component
 * from Sidebar (not Sidebar with a narrower class) because the
 * interaction is genuinely different — icon + tooltip vs icon + label —
 * matching the brief's "change composition, not size" instruction.
 */
export default function CompactSidebar() {
  const allItems = [...CREATE_NAV_ITEMS, ...WORKSPACE_NAV_ITEMS, ...EXPLORE_NAV_ITEMS];

  return (
    <aside className="hidden md:flex lg:hidden flex-col items-center w-16 shrink-0 h-screen sticky top-0 bg-surface border-r border-border-subtle py-4 gap-1">
      <Link
        href="/"
        aria-label="Fomi home"
        className="flex items-center justify-center w-10 h-10 mb-4"
      >
        <span className="w-2 h-2 rounded-full bg-accent" />
      </Link>

      <nav className="flex-1 flex flex-col gap-1 overflow-y-auto">
        {allItems.map((item) => (
          <NavItem key={item.href} {...item} compact />
        ))}
      </nav>

      <div className="pt-2 border-t border-border-subtle w-full flex justify-center">
        <NavItem {...SETTINGS_NAV_ITEM} compact />
      </div>
    </aside>
  );
}
