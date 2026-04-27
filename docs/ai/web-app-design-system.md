# Web App Design System

This document is the repository-level UI system that all AI agents should follow
when working on frontend, admin, CMS, auth, dashboard, table, form, or theme
editing surfaces in this project.

It is based on a modern SaaS design language and is intentionally strict.

## Product Character

- Modern SaaS
- Trustworthy
- Technical
- Young
- Creative
- Academic
- Community-oriented
- Premium

Default visual direction:
- Light mode first
- Green-led primary identity
- Orange as accent
- User theme preferences may override locally
- Admin may control site defaults

## Shared System

Public pages and admin pages must share:
- the same theme logic
- the same typography family
- the same spacing logic
- the same radius scale
- the same token architecture

Public pages and admin pages must differ by density:
- Public: more breathing room, stronger storytelling, softer grouping
- Admin: denser, clearer, faster to scan, more software-like
- Data-heavy pages: densest mode, minimal decoration

## Theme Architecture

Theme model should be structured like this:

- `public.light`
- `public.dark`
- `admin.light`
- `admin.dark`

Each theme branch should contain:
- `background`
- `foreground`
- `muted`
- `surface`
- `surfaceStrong`
- `line`
- `brand`
- `brandDeep`
- `accent`
- `accentSoft`
- `success`
- `warning`
- `danger`
- `info`
- `focus`

## Theme UX Rules

- Light and dark are managed separately.
- Presets are shared first.
- Admin may adjust light and dark independently later.
- End users may choose presets and light/dark.
- End-user preferences should be stored locally first.
- Admin can define the default site theme.
- Theme switchers should open as a popup or modal layer that cannot be clipped.
- Theme editor should have:
  - Basic mode for non-designers
  - Advanced mode for experienced users
  - Preview panel
  - Save feedback
  - Draft/publish support when appropriate

## Design Priorities

Priority order:
1. Aesthetics
2. Maintainability
3. Consistency
4. Usability

Tie-break rules:
- If beauty conflicts with usability, choose usability.
- If speed conflicts with system consistency, choose consistency.

## Technology Rules

- Use Tailwind + CSS variables.
- Centralize tokens before styling page-specific UI.
- Do not hard-code page-level colors inside components when tokens should exist.
- Do not improvise spacing or radius values outside the system.
- Do not import random fonts outside the approved set.

## Approved Typography Direction

Modern sans-serif only.

Preferred family set:
- `Be Vietnam Pro`
- `Sora`
- `Manrope`
- `Plus Jakarta Sans`

Default recommendation:
- Body/UI: `Be Vietnam Pro`
- Display headings: `Sora`

Rules:
- One shared family direction across public and admin
- Strong heading scale for desktop and mobile
- Clear button scale
- Consistent weights and line heights

## Spacing System

Use a fixed scale:
- 4
- 8
- 12
- 16
- 20
- 24
- 32
- 40
- 48
- 64
- 80
- 96

No arbitrary spacing values unless there is a compelling system-level reason.

## Radius System

Use:
- `sm`: 10px
- `md`: 14px
- `lg`: 18px
- `xl`: 24px
- `pill`: 999px

Rules:
- Public may use `md` to `xl`
- Admin should mostly stay `md`
- Data-heavy screens should be tighter

## Shadow And Surface Rules

- Public pages may use soft glass or soft surface layers.
- Admin pages should reduce glass effect strongly.
- Admin hierarchy should rely more on border, spacing, and grouping than shadow.
- Shadow should be restrained and tokenized.
- No random dramatic shadows.

## Page Types

Every UI task should map to one of these page types:

- Public landing
- Public content
- Auth
- Admin dashboard
- Admin data list
- Admin form editor
- Admin settings/CMS
- Admin theme editor
- States: loading, empty, error, success, destructive confirmation

## Layout Rules

### Public

- Container and section-width based layout
- Width may vary by page type
- Landing pages can be wider
- Informational pages should be more readable and narrower

### Admin

- Fixed sidebar
- Fixed topbar
- Sidebar collapses to icons on desktop
- Sidebar becomes drawer on mobile
- Main content scrolls independently

## Component Expectations

All UI should align to reusable patterns for:
- Navbar
- Hero
- Section blocks
- Cards
- Stats
- CTA groups
- Footer
- Sidebar
- Admin topbar
- Tables
- Forms
- Popups/modals
- Drawers
- Empty states
- CMS editors
- Theme editor
- Theme switcher

### Buttons

Required variants:
- Primary
- Secondary
- Ghost
- Subtle
- Danger
- Link

## Form Rules

- Label above input
- Helper or error text below
- Strong border clarity
- Consistent radius
- Strong focus states
- Clear grouping into sections
- Sticky or obvious action area on long forms

## Table Rules

Default table behavior:
- Sticky header
- Hover state
- Minimal borders
- No zebra rows by default
- Clear toolbar above
- Search, filter, and actions grouped well
- Bulk actions only when relevant
- Dense mode for data-heavy screens

## Motion Rules

Motion should be light and deliberate across the whole app.

Allowed:
- fade
- subtle slide
- tiny hover lift
- border/color transitions

Avoid:
- parallax
- bounce
- dramatic scale
- flashy hover effects
- noisy skeleton patterns

Admin should be more static than public pages.

## Anti-Patterns

Never ship:
- Purple default gradients without brand reason
- Lifeless white cards with weak hierarchy
- Old dark admin sidebar templates
- Forms that feel stretched and ungrouped
- Tables with too many borders
- Weak CTAs
- Mobile layouts that simply stack without preserving hierarchy
- Generic AI-template UI
- Stock shadcn-looking UI left uncustomized
- Heavy glass effect in admin
- Random hard-coded visual decisions

## Required Workflow For AI

Before editing UI:
1. Identify the page type.
2. Decide whether the page is public, admin, or data-heavy.
3. Apply the correct density.
4. Use tokens first.
5. Use approved typography and spacing scale.
6. Use the correct component pattern.
7. Check hover, focus, disabled, loading, empty, and error states.
8. Review against anti-patterns before finishing.

## Review Checklist

Before considering UI done, verify:
- No hard-coded page-level colors
- No inconsistent spacing
- No inconsistent radii
- No font drift
- CTA hierarchy is clear
- Data is easy to scan
- Mobile keeps structure
- Admin still feels like software
- Public still feels polished and narrative
- Theme logic remains centralized
