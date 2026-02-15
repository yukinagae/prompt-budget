## Context

The app uses plain CSS (`globals.css`) with no Tailwind CSS installed. Styles are applied via CSS custom properties and class-based selectors. The current light theme is defined inline in `globals.css` and component-level `<style>` tags (or inline styles via React).

Components: `CostForm.tsx`, `CostSummary.tsx`, `page.tsx`, `layout.tsx`.

## Goals / Non-Goals

**Goals:**
- Add a dark/light toggle that persists across reloads
- Implement dark theme using CSS custom properties on the root element
- Prevent flash of unstyled content (FOUC) on first load

**Non-Goals:**
- No Tailwind CSS introduction
- No CSS-in-JS library
- No OS-level `prefers-color-scheme` auto-detection (user-controlled only)
- No per-component theme overrides

## Decisions

### Decision 1: CSS custom properties + `.dark` class on `<html>`

Use CSS variables (e.g., `--color-bg`, `--color-text`, `--color-surface`) defined in `globals.css` under `:root` (light) and `html.dark` (dark). Components use these variables for colors.

**Alternatives considered:**
- Tailwind `dark:` variant — rejected: not installed, adds build complexity for this scope
- `prefers-color-scheme` media query only — rejected: no user control

### Decision 2: localStorage persistence via inline `<script>` in `<head>`

Inject a tiny blocking script in `layout.tsx`'s `<head>` that reads `localStorage.getItem('theme')` and sets the `dark` class on `<html>` before first paint. This is the standard FOUC-prevention pattern for Next.js App Router.

**Alternatives considered:**
- `useEffect` in a client component — rejected: causes FOUC on every load because it runs after hydration

### Decision 3: ThemeToggle as a client component

A `ThemeToggle` component (`src/components/ThemeToggle.tsx`) handles click events, toggles the `.dark` class, and syncs to localStorage. It is `'use client'` and placed in the page header.

## Risks / Trade-offs

- [FOUC on JS-disabled browsers] → Acceptable; no-JS support is out of scope
- [Inline script in `<head>` is render-blocking] → Script is < 5 lines, impact is negligible
- [Custom property coverage] → Must audit all hardcoded colors in existing CSS and replace with variables; easy to miss one

## Migration Plan

1. Define CSS variables in `globals.css` (`:root` light, `html.dark` dark)
2. Add FOUC-prevention inline script to `layout.tsx`
3. Create `ThemeToggle.tsx` client component
4. Add toggle to `page.tsx` header area
5. Replace hardcoded colors in existing components with CSS variables

No data migration or rollback strategy needed — feature is purely additive.

## Open Questions

- None
