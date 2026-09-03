import { Sparkles } from "lucide-react";
import Select from "@/components/ui/Select";
import Drawer from "@/components/overlay/Drawer";
import BottomSheet from "@/components/overlay/BottomSheet";
import { CREATIVE_DIRECTION_FIELDS } from "@/lib/constants";

function PanelBody({ values, onChange }) {
  return (
    <div className="flex flex-col gap-4">
      {CREATIVE_DIRECTION_FIELDS.map((field) => (
        <Select
          key={field.key}
          label={field.label}
          value={values[field.key]}
          options={field.options}
          onChange={(e) => onChange(field.key, e.target.value)}
        />
      ))}
    </div>
  );
}

/**
 * Three intentional compositions, not one panel resized down:
 *  - Desktop (lg+):   persistent right rail, always visible
 *  - Tablet (md–lg):  Drawer — slides in from the edge, dismissible
 *  - Mobile (<md):    BottomSheet — rises from the bottom, thumb-reachable
 *
 * `open`/`onClose` only affect the tablet/mobile overlays; the desktop
 * rail has no open/closed state because it's never hidden.
 *
 * No "use client" here either, for the same reason as CreationEmptyState:
 * this component attaches no handlers directly — Select, Drawer, and
 * BottomSheet are the ones marked client, because that's where the
 * actual interactivity lives.
 */
export default function CreativeDirectionPanel({ values, onChange, open, onClose }) {
  return (
    <>
      {/* Desktop: persistent rail */}
      <aside className="hidden lg:block w-[300px] shrink-0 border-l border-border-subtle bg-surface p-5 overflow-y-auto">
        <div className="flex items-center gap-2 mb-5">
          <h2 className="text-heading-3 text-primary">Creative Direction</h2>
          <Sparkles className="w-4 h-4 text-accent" />
        </div>
        <PanelBody values={values} onChange={onChange} />
      </aside>

      {/* Tablet: side drawer */}
      <div className="hidden md:block lg:hidden">
        <Drawer open={open} onClose={onClose} title="Creative Direction">
          <PanelBody values={values} onChange={onChange} />
        </Drawer>
      </div>

      {/* Mobile: bottom sheet */}
      <div className="md:hidden">
        <BottomSheet open={open} onClose={onClose} title="Creative Direction">
          <PanelBody values={values} onChange={onChange} />
        </BottomSheet>
      </div>
    </>
  );
}
