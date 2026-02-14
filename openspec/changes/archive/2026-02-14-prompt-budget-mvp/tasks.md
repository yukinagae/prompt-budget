## 1. Project Setup

- [x] 1.1 Create package.json with Next.js 14, React 18, TypeScript, Vitest, eslint-config-next dependencies (pnpm)
- [x] 1.2 Create tsconfig.json for Next.js App Router with strict mode and path alias `@/*`
- [x] 1.3 Create next.config.js (minimal, no special config needed)
- [x] 1.4 Create .eslintrc.json extending next/core-web-vitals
- [x] 1.5 Create vitest.config.ts with @vitejs/plugin-react and node environment
- [x] 1.6 Run `pnpm install` to install all dependencies

## 2. Cost Calculator Module

- [x] 2.1 Create `src/lib/calculator.ts` exporting `PricingParams`, `CostBreakdown` types and `calculateCost()` pure function
- [x] 2.2 Implement cache hit rate clamping (0–1) in `calculateCost()`
- [x] 2.3 Implement `formatCost()` helper (≥$0.01 → 2dp, <$0.01 → 6dp)

## 3. Unit Tests

- [x] 3.1 Create `src/lib/calculator.test.ts` covering: zero cache, full cache, partial cache, clamping, daily/monthly aggregation, breakdown fields, formatCost variants

## 4. Presets

- [x] 4.1 Create `src/lib/presets.ts` with 3 presets: GPT-4o, Claude Sonnet 3.5, Gemini 1.5 Pro (approximate public pricing)

## 5. Next.js App Shell

- [x] 5.1 Create `src/app/layout.tsx` with html/body and global metadata
- [x] 5.2 Create `src/app/globals.css` with minimal base styles
- [x] 5.3 Create `src/app/page.tsx` composing `CostForm` and `CostSummary` components

## 6. Input Form Component

- [x] 6.1 Create `src/components/CostForm.tsx` with `"use client"` — renders all 8 input fields
- [x] 6.2 Implement preset buttons (3) that populate form fields
- [x] 6.3 Implement localStorage save on every field change (`prompt-budget-settings` key)
- [x] 6.4 Implement localStorage restore in `useEffect` on mount

## 7. Output Summary Component

- [x] 7.1 Create `src/components/CostSummary.tsx` displaying total monthly cost, per-call cost, and 3-line breakdown (input / cache-read / output)

## 8. Verification

- [x] 8.1 Run `pnpm lint` — fix any lint errors
- [x] 8.2 Run `pnpm test` — all tests pass
- [x] 8.3 Run `pnpm build` — build succeeds

## 9. README

- [x] 9.1 Create `README.md` with: project description, run instructions (pnpm install, dev, build), inputs/assumptions explanation, preset price disclaimer
