import { Bell } from "lucide-react";
import Breadcrumb from "@/components/navigation/Breadcrumb";
import SearchInput from "@/components/ui/SearchInput";
import CompactSearchToggle from "@/components/layout/CompactSearchToggle";

/**
 * Search itself changes composition across breakpoints, not just size:
 *   - Desktop (lg+): permanently-docked SearchInput
 *   - Tablet (md–lg): CompactSearchToggle — icon that expands on click
 * TopBar is visible from md up; MobileHeader (a separate component)
 * takes over below that, so there's no third case to handle here.
 */
export default function TopBar({ breadcrumbItems = [], actions = null }) {
  return (
    <header className="hidden md:flex items-center justify-between h-14 px-6 border-b border-border-subtle bg-background/95 backdrop-blur sticky top-0 z-10">
      <Breadcrumb items={breadcrumbItems} />

      <div className="flex items-center gap-3">
        <div className="hidden lg:block">
          <SearchInput className="w-56" placeholder="Search projects... ⌘K" />
        </div>
        <div className="lg:hidden">
          <CompactSearchToggle />
        </div>
        {actions}
        <button
          type="button"
          aria-label="Notifications"
          className="w-9 h-9 flex items-center justify-center rounded text-secondary hover:bg-surface-elevated hover:text-primary transition-colors duration-150"
        >
          <Bell className="w-4 h-4" />
        </button>
        <div
          className="w-8 h-8 rounded-full bg-surface-elevated border border-border-subtle"
          aria-hidden="true"
        />
      </div>
    </header>
  );
}
