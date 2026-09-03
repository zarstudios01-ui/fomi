"use client";

import {
  Package,
  Megaphone,
  FileImage,
  UserRound,
  Mountain,
  Smartphone,
} from "lucide-react";

const ICONS = {
  product: Package,
  campaign: Megaphone,
  poster: FileImage,
  character: UserRound,
  environment: Mountain,
  social: Smartphone,
};

export default function IntentCard({ id, label, description, selected, onSelect }) {
  const Icon = ICONS[id] || Package;

  return (
    <button
      type="button"
      onClick={() => onSelect?.(id)}
      aria-pressed={selected}
      className={[
        "flex flex-col items-start gap-3 p-4 rounded-card border text-left transition-colors duration-150",
        selected
          ? "border-accent bg-accent/5"
          : "border-border-subtle bg-surface-elevated hover:border-border",
      ].join(" ")}
    >
      <Icon className={selected ? "w-5 h-5 text-accent" : "w-5 h-5 text-secondary"} />
      <div>
        <p className="text-body font-medium text-primary">{label}</p>
        <p className="text-body-sm text-muted mt-0.5">{description}</p>
      </div>
    </button>
  );
}
