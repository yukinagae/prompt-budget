## Why

The dashboard currently only supports a light theme. Users working in low-light environments or preferring dark UIs have no option to switch, which reduces usability and accessibility. Adding a dark theme toggle improves comfort and aligns with modern web app expectations.

## What Changes

- Add a dark/light theme toggle button to the UI
- Implement CSS-based dark theme using Tailwind CSS dark mode (`dark:` variant)
- Persist the user's theme preference in localStorage
- Apply dark theme styles to all existing components (CostForm, CostSummary, layout)

## Capabilities

### New Capabilities
- `dark-theme`: Theme toggle control and persistence logic — renders a toggle button, stores preference in localStorage, applies `dark` class to the root element

### Modified Capabilities
- `cost-form-ui`: Dark-mode styles added to all form elements (inputs, labels, preset buttons)
- `cost-summary-ui`: Dark-mode styles added to summary card, text, and line items

## Impact

- `src/app/layout.tsx`: Add theme initialization script to prevent flash of unstyled content (FOUC); add `dark` class logic
- `src/app/page.tsx`: Add theme toggle button
- `src/components/CostForm.tsx`: Add `dark:` Tailwind classes
- `src/components/CostSummary.tsx`: Add `dark:` Tailwind classes
- `tailwind.config.ts`: Set `darkMode: 'class'`
- No new dependencies required
