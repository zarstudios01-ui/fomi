import Link from "next/link";
import NavItem from "@/components/navigation/NavItem";
import {
  CREATE_NAV_ITEMS,
  WORKSPACE_NAV_ITEMS,
  EXPLORE_NAV_ITEMS,
  SETTINGS_NAV_ITEM,
} from "@/lib/constants";

function renderNavItem(item, extraProps = {}) {
  const Icon = item.icon;
  return (
    <NavItem
      key={item.href}
      href={item.href}
      label={item.label}
      icon={<Icon className="w-4 h-4 shrink-0" strokeWidth={2} />}
      {...extraProps}
    />
  );
}

function NavSection({ title, items }) {
  return (
    <div className="mb-5">
      <p className="px-2.5 mb-1.5 text-caption font-medium text-muted tracking-wide">
        {title}
      </p>
      <div className="flex flex-col gap-0.5">{items.map((item) => renderNavItem(item))}</div>
    </div>
  );
}

export default function Sidebar() {
  return (
    <aside className="hidden lg:flex flex-col w-[230px] shrink-0 h-screen sticky top-0 bg-surface border-r border-border-subtle px-3 py-4">
      <Link href="/" className="flex items-center gap-1.5 px-2 mb-6">
        <span className="text-heading-3 font-semibold text-primary">Fomi</span>
        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
      </Link>

      <nav className="flex-1 overflow-y-auto">
        <NavSection title="CREATE" items={CREATE_NAV_ITEMS} />
        <NavSection title="WORKSPACE" items={WORKSPACE_NAV_ITEMS} />
        <NavSection title="EXPLORE" items={EXPLORE_NAV_ITEMS} />
      </nav>

      <div className="pt-3 border-t border-border-subtle">
        {renderNavItem(SETTINGS_NAV_ITEM)}
      </div>
    </aside>
  );
}
