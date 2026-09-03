# Fomi — Frontend Assessment

A responsive Next.js implementation of the Fomi Design Foundations / Component
Library / Prototype Flow spec sheets, built as a real project structure rather
than one page file.

## Stack

Next.js 14 (App Router) · React 18 · Tailwind CSS · plain JS · lucide-react
for icons. No Redux/Zustand, no component library, no database or auth — the
brief explicitly asked not to manufacture complexity for an assessment.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000 — it redirects to `/create`, the Image Creation
workspace.

## How the folders map to the 12-phase plan

```
tailwind.config.js       → 02  Design tokens as Tailwind theme (source of truth)
lib/tokens.js            → 02  Same tokens, JS-accessible for non-Tailwind contexts
lib/motion.js            → 10  Every animation duration, defined once
app/globals.css          → 02  Base resets, focus rings, reduced-motion, shimmer keyframe

components/layout/       → 03/09  Sidebar (desktop), CompactSidebar (tablet),
                                    MobileHeader + MobileBottomNav (mobile), AppShell,
                                    CompactSearchToggle (tablet's icon→input search)
components/navigation/   → 04  NavItem (supports a compact icon-only mode), Breadcrumb

app/create/               → 05  Creation workspace route
components/workspace/     → 05/07/08  CreationEmptyState, IntentCard, PromptComposer,
                                       CreativeDirectionPanel, GenerationGrid,
                                       GenerationCard, RefinePanel

lib/mockGenerate.js       → 06  Mock "AI backend" — swap this one file for a real
app/api/generate/route.js → 06  provider later; nothing above it needs to change
hooks/useGeneration.js    → 06  Client-side state machine: idle → generating →
                                 generated → error, talking to the API route

components/ui/            → 02/09  Button, TextInput, SearchInput, Textarea, Select,
                                    Toggle, SegmentedControl, Badge — each variant-driven
                                    per the 07/08 spec sheet rather than per-page one-offs
components/feedback/      → 10  Skeleton (shimmer), Toast, ErrorMessage
components/overlay/       → 09/10  Modal, Drawer (tablet), BottomSheet (mobile),
                                    DropdownMenu, ToastProvider
hooks/useFocusTrap.js      → 11  Shared Tab-trapping/Esc/focus-restore logic used
                                 by Modal, Drawer, and BottomSheet
```

`ToastProvider` wraps the app in `app/layout.js`; `useToast()` is called from
`app/create/page.js` to surface "Generation completed" / failure toasts off
the `useGeneration` status transitions, so the feedback layer is wired to
real state rather than a static mock.

Routes for Video/Edit/Upscale/Projects/Generations/Assets/Templates/Settings
now exist (`app/<route>/page.js`) using a shared `ComingSoonPage` shell, so
every sidebar link resolves instead of 404ing — they're intentionally not
built out yet (see below).

## 09 — Responsive architecture

Three layouts, each a real compositional swap — not one component
resized with a media query:

| | Desktop (`lg+`) | Tablet (`md`–`lg`) | Mobile (`<md`) |
|---|---|---|---|
| **Nav** | `Sidebar` — full width, icon + label | `CompactSidebar` — icon rail with tooltips, no labels | `MobileHeader` + `MobileBottomNav` |
| **Search** | `SearchInput` docked in `TopBar` | `CompactSearchToggle` — icon that expands to a field on click | folded into `MobileHeader`'s overflow |
| **Creative Direction** | persistent 300px rail, always visible | `Drawer` — slides in from the right edge, dismissible | `BottomSheet` — rises from the bottom, drag handle, thumb-reachable |

`AppShell` mounts `Sidebar`, `CompactSidebar`, and `MobileBottomNav`
simultaneously; Tailwind's `hidden`/`flex` responsive classes on each
one's own root decide which is actually visible, so `AppShell` itself
never needs to know the current breakpoint. Each route owns its own
`TopBar`/`MobileHeader` content (breadcrumb, title) via a nested
`layout.js`, so breadcrumbs stay page-specific.

`Drawer` and `BottomSheet` are genuinely different components (different
markup, different entry animation, different affordance — a close X vs.
a drag handle), both mounted by `CreativeDirectionPanel` at all times and
toggled visible per-breakpoint via CSS, driven by the same `open`/`onClose`
props from `app/create/page.js`. That mirrors the brief's example directly:
Creative Direction is a right panel on desktop and a bottom sheet on
mobile — a change in composition, not in size.

## 10 — Interaction / Motion / States

All durations are pulled from `lib/motion.js` rather than typed as
magic numbers per component:

| Interaction | Duration | Where |
|---|---|---|
| Hover (color/background) | 150ms | `Button`, `NavItem`, nearly every interactive element |
| Button press | 100ms | `Button`'s `active:` state — deliberately snappier than hover |
| Panel transition (tablet drawer) | 250ms | `Drawer`'s slide-in |
| Bottom sheet (mobile) | 300ms | `BottomSheet`'s slide-up |
| Result reveal | 450ms | `GenerationCard` fade + rise, staggered ~60ms per card |

States implemented per the Interaction States sheet:

- **Buttons** — default/hover/pressed(scale)/focus(`:focus-visible` ring)/disabled/loading (spinner swap), all in `components/ui/Button.jsx`.
- **Prompt** — empty/focused/populated (border steps up once there's text)/reference (attached-image chip replaces the button)/generating (inputs disabled, button shows a spinner)/error (red border + inline message) — all in `PromptComposer`.
- **Generation** — queued (dim, pre-shimmer, staggered)/generating (shimmer)/completed/selected (accent border + check)/error (per-card retry) — `GenerationCard` + `GenerationGrid`.
- **Navigation** — default/hover/active (`aria-current="page"` + accent fill) — `NavItem`, in both full and compact modes.
- **Feedback** — success/error/loading — `Toast`, `ErrorMessage`, `Skeleton`.

Nothing here uses a flashy "AI shimmer" gimmick beyond the one shimmer
skeleton the spec sheet itself calls for — motion is restrained by design.

## 11 — Accessibility + Performance

**Accessibility:**
- Every interactive element is a real `<button>` or `<a>`/`Link`, never a `div` with a click handler.
- Form primitives (`TextInput`, `Textarea`, `Select`) associate a `<label>` via `htmlFor`/`id`; errors are linked with `aria-describedby` and `aria-invalid`.
- Icon-only controls carry `aria-label` (notifications, dismiss, close dialog, compact nav items via `title` + `aria-label`).
- `aria-current="page"` on active nav items, `aria-pressed` on toggleable cards (`IntentCard`, `GenerationCard`), `aria-haspopup`/`aria-expanded`/`role="menu"` on `DropdownMenu`.
- `useFocusTrap` (shared by `Modal`, `Drawer`, `BottomSheet`) traps Tab/Shift+Tab inside the open overlay, moves focus in on open, restores it to the trigger on close, and closes on Esc — instead of each overlay reimplementing (and risking getting wrong) the same behavior.
- A skip-to-content link + `#main-content` landmark in `app/layout.js`.
- Global `:focus-visible` ring (`app/globals.css`) instead of relying on each component to draw its own.
- `@media (prefers-reduced-motion: reduce)` collapses all animation/transition durations to near-zero.
- Toast stack is wrapped in `aria-live="polite"` so screen readers announce new notifications without needing focus moved to them.
- Not done: an actual automated audit (axe-core, Lighthouse) — no network access in this sandbox to install or run one. Treat everything above as a manual pass, not a certified result.

**Performance — Server vs. Client Components:**

The rule applied throughout: a component gets `"use client"` only if it
uses a hook (`useState`/`useEffect`/`useRef`/`useContext`) or attaches an
event handler directly to a native DOM element it renders. A component
that only *forwards* a callback prop into an already-client-marked child
(e.g. `CreationEmptyState` passing `onSubmit` through to `PromptComposer`)
doesn't need the directive itself — whether it executes server- or
client-side is then entirely determined by its caller, not a property of
the file. That's the subtlety the brief points at with the Sidebar
example, and it's genuinely true here: `Sidebar`, `TopBar`, `MobileHeader`,
`AppShell`, `CreationEmptyState`, `CreativeDirectionPanel`, and
`GenerationGrid` all ship zero client-side JS of their own.

| Component | Server / Client | Why |
|---|---|---|
| `Sidebar`, `CompactSidebar`, `TopBar`, `MobileHeader` | Server | Static structure + data, no hooks |
| `AppShell` | Server | Pure composition |
| `NavItem` | Client | Reads the current route via `usePathname()` |
| `CompactSearchToggle`, `MobileBottomNav` | Client | `useState`/`usePathname` |
| `CreationEmptyState`, `CreativeDirectionPanel`, `GenerationGrid` | Server | Compose client children; attach no handlers themselves |
| `PromptComposer`, `RefinePanel` | Client | Local `useState` (reference chip, refine text) |
| `IntentCard`, `GenerationCard` | Client | Direct `onClick` on the element they render |
| `Button`, `Select`, `TextInput`, `Textarea`, `SearchInput`, `Toggle`, `SegmentedControl` | Client | Form/interactive primitives — marked defensively so they're safe to import from a genuine Server Component page later, not just because today's only caller happens to be client |
| `Badge`, `Skeleton` | Server | Purely presentational, no interactivity ever |
| `Modal`, `Drawer`, `BottomSheet`, `DropdownMenu`, `ToastProvider` | Client | Hold open/closed state and/or use the focus-trap hook |

**Images:** there are no `<img>` tags anywhere — every "generation" is a
CSS gradient standing in for a real model output (see `lib/mockGenerate.js`),
so there's no `next/image` migration needed yet. Once a real image
backend exists, that's a one-line swap inside `GenerationCard` (replace
the `style={{ background: ... }}` div with a `next/image`), not a
structural change.

**Not done:** code-splitting the overlay components (`Drawer`,
`BottomSheet`, `Modal`) behind `next/dynamic(..., { ssr: false })` so
their JS isn't in the initial bundle. I looked at this and stopped short
deliberately: `ssr: false` dynamic imports aren't allowed inside a Server
Component (`CreativeDirectionPanel` is one now — see the table above), so
doing this correctly means introducing a small client wrapper around the
dynamic import, and I didn't want to ship that unverified given I have no
way to run a build in this sandbox to confirm it compiles. Flagging it
here rather than guessing.

## What's implemented vs. what's next

Built: phases 01–11, with 09–11 covering the Image Creation flow
specifically (the other routes are stubs — see below). Phase 12 is
explicitly yours to run, per your note.

Not yet built out (left for a next pass, not because they're hard, just
scoped out of this submission):
- Video/Edit/Upscale/Projects/Generations/Assets/Templates/Settings — routes
  exist and are navigable (`ComingSoonPage`), but the actual workspaces for
  each aren't built, so 09/10/11 above haven't been exercised on them
- Export flow and asset library screens
- Automated a11y audit (axe) and Lighthouse budget check — see 11 above
- Code-split overlay components via `next/dynamic` — see 11 above
- CI on GitHub + Vercel preview deploys (phase 12) — no network access in
  this environment to run `npm install`, a build, or a deploy; none of
  phases 09–11 above have been verified with an actual `next build` for
  the same reason. Treat the static checks (every import resolves, every
  bracket balances, every hook/handler has `"use client"`) as a floor.

## Deploying

```bash
git init && git add -A && git commit -m "Fomi frontend assessment"
gh repo create fomi --source=. --push
```

Then import the repo at vercel.com/new — no environment variables required,
since `/api/generate` is fully mocked server-side.
