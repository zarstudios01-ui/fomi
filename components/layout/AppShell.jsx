import Sidebar from "@/components/layout/Sidebar";
import CompactSidebar from "@/components/layout/CompactSidebar";
import MobileBottomNav from "@/components/layout/MobileBottomNav";

/**
 * Three navigation compositions live side by side, each responsible
 * for its own breakpoint via Tailwind's responsive display classes:
 *   - Sidebar        (lg+)     full labeled rail
 *   - CompactSidebar  (md–lg)   icon-only rail
 *   - MobileBottomNav (<md)     bottom tab bar
 * Exactly one is ever visually present; CSS `hidden`/`flex` on each
 * component's root handles that, so AppShell doesn't need to know
 * the current breakpoint itself.
 */
export default function AppShell({ children }) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <CompactSidebar />
      <div id="main-content" className="flex-1 min-w-0 flex flex-col pb-16 md:pb-0">
        {children}
      </div>
      <MobileBottomNav />
    </div>
  );
}
