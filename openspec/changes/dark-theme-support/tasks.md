## 1. CSS Custom Properties

- [x] 1.1 Add `:root` light-theme color variables to `globals.css` (`--color-bg`, `--color-surface`, `--color-text`, `--color-text-muted`, `--color-border`, `--color-input-bg`, `--color-primary`)
- [x] 1.2 Add `html.dark` dark-theme color variables to `globals.css`
- [x] 1.3 Replace all hardcoded color values in `globals.css` with the new custom properties

## 2. FOUC Prevention

- [x] 2.1 Add inline blocking `<script>` to `<head>` in `layout.tsx` that reads `localStorage.getItem('theme')` and adds `class="dark"` to `<html>` if value is `'dark'`

## 3. ThemeToggle Component

- [x] 3.1 Create `src/components/ThemeToggle.tsx` as a `'use client'` component
- [x] 3.2 Implement click handler that toggles `dark` class on `document.documentElement` and saves preference to `localStorage`
- [x] 3.3 Initialize toggle state from `document.documentElement.classList` on mount

## 4. Page Integration

- [x] 4.1 Add `<ThemeToggle />` to `src/app/page.tsx` in the header area

## 5. Component Dark-Mode Styles

- [x] 5.1 Update `CostForm.tsx` to use CSS custom property values for background, text, border, and input colors
- [x] 5.2 Update `CostSummary.tsx` to use CSS custom property values for card background, text, and line-item colors

## 6. Verification

- [x] 6.1 Run `pnpm lint` and fix any errors
- [x] 6.2 Run `pnpm build` and confirm no build errors
- [x] 6.3 Manually verify toggle works and persists across page reload in browser
