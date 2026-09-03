import {
  Image as ImageIcon,
  Video,
  Edit,
  Expand,
  Folder,
  Sparkles,
  Box,
  LayoutGrid,
  Settings,
} from "lucide-react";

// Sidebar: CREATE section
export const CREATE_NAV_ITEMS = [
  { label: "Image", href: "/create", icon: ImageIcon },
  { label: "Video", href: "/video", icon: Video },
  { label: "Edit", href: "/edit", icon: Edit },
  { label: "Upscale", href: "/upscale", icon: Expand },
];

// Sidebar: WORKSPACE section
export const WORKSPACE_NAV_ITEMS = [
  { label: "Projects", href: "/projects", icon: Folder },
  { label: "Generations", href: "/generations", icon: Sparkles },
  { label: "Assets", href: "/assets", icon: Box },
];

// Sidebar: EXPLORE section
export const EXPLORE_NAV_ITEMS = [
  { label: "Templates", href: "/templates", icon: LayoutGrid },
];

export const SETTINGS_NAV_ITEM = {
  label: "Settings",
  href: "/settings",
  icon: Settings,
};

// Mobile bottom nav (subset — 4 primary destinations + create action)
export const MOBILE_NAV_ITEMS = [
  { label: "Home", href: "/", icon: "home" },
  { label: "Projects", href: "/projects", icon: "folder" },
  { label: "Create", href: "/create", icon: "plus", isPrimary: true },
  { label: "Generations", href: "/generations", icon: "sparkles" },
  { label: "Assets", href: "/assets", icon: "image" },
];

// "What are you making?" intent cards on the empty workspace state
export const INTENT_CARDS = [
  {
    id: "product",
    label: "Product",
    description: "Studio-quality product imagery",
  },
  {
    id: "campaign",
    label: "Campaign",
    description: "Marketing visuals",
  },
  {
    id: "poster",
    label: "Poster",
    description: "Bold creative compositions",
  },
  {
    id: "character",
    label: "Character",
    description: "Characters and personas",
  },
  {
    id: "environment",
    label: "Environment",
    description: "Worlds, places and scenes",
  },
  {
    id: "social",
    label: "Social",
    description: "Social-first content",
  },
];

// Creative Direction panel field definitions + their option sets
export const CREATIVE_DIRECTION_FIELDS = [
  {
    key: "subject",
    label: "Subject",
    icon: "layout",
    options: ["Product", "Campaign", "Poster", "Character", "Environment", "Social"],
  },
  {
    key: "visualStyle",
    label: "Visual style",
    icon: "style",
    options: ["Editorial", "Cinematic", "Minimal"],
  },
  {
    key: "mood",
    label: "Mood",
    icon: "mood",
    options: ["Premium", "Playful", "Moody", "Bright"],
  },
  {
    key: "lighting",
    label: "Lighting",
    icon: "lighting",
    options: ["Soft studio", "Hard direct", "Natural", "Low key"],
  },
  {
    key: "composition",
    label: "Composition",
    icon: "composition",
    options: ["Hero", "Rule of Thirds", "Detail", "Environment"],
  },
  {
    key: "aspectRatio",
    label: "Aspect ratio",
    icon: "ratio",
    options: ["16:9", "9:16", "4:3", "1:1", "2:3"],
  },
];

export const DEFAULT_CREATIVE_DIRECTION = {
  subject: "Product",
  visualStyle: "Editorial",
  mood: "Premium",
  lighting: "Soft studio",
  composition: "Hero",
  aspectRatio: "16:9",
};

// Quick-action chips shown in the Refine panel
export const REFINE_QUICK_ACTIONS = [
  "Make more cinematic",
  "Change lighting",
  "Change background",
  "Keep subject, change composition",
  "Remove object",
];
