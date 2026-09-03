"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Folder, Plus, Sparkles, Image as ImageIcon } from "lucide-react";
import { MOBILE_NAV_ITEMS } from "@/lib/constants";

const ICONS = { home: Home, folder: Folder, plus: Plus, sparkles: Sparkles, image: ImageIcon };

export default function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-20 flex items-center justify-around h-16 bg-surface border-t border-border-subtle pb-[env(safe-area-inset-bottom)]">
      {MOBILE_NAV_ITEMS.map((item) => {
        const Icon = ICONS[item.icon];
        const active = pathname === item.href;

        if (item.isPrimary) {
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-label={item.label}
              className="flex items-center justify-center w-11 h-11 rounded-full bg-accent text-background -mt-6 shadow-elevation-2"
            >
              <Icon className="w-5 h-5" strokeWidth={2.5} />
            </Link>
          );
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={[
              "flex flex-col items-center justify-center gap-0.5 w-14 h-full text-caption",
              active ? "text-accent" : "text-muted",
            ].join(" ")}
          >
            <Icon className="w-5 h-5" strokeWidth={2} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
