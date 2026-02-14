## Context

Greenfield Next.js application. No existing codebase to integrate with. Target deployment is Vercel (static + serverless friendly). All computation is client-side — no backend API needed because there are no secrets and no user data to persist server-side. Settings are persisted via localStorage.

## Goals / Non-Goals

**Goals:**
- Client-side-only cost estimation (no server round-trips for calculation)
- Pure, testable calculation logic separated from UI
- Preset support (3 providers) with user-editable values
- localStorage persistence across page reloads
- Zero-config Vercel deployment (connect repo → deploy)
- pnpm lint + test + build all pass

**Non-Goals:**
- Authentication or multi-user support
- Real billing reconciliation with provider APIs
- Hardcoded pricing (user always supplies prices)
- Charts or visualizations beyond a text summary (out of scope for MVP)
- Server-side rendering of user inputs

## Decisions

### Decision 1: App Router (Next.js 14)
Use Next.js 14 App Router with `"use client"` directive on interactive components.
- **Why**: App Router is the current standard; Vercel deploys it without configuration.
- **Alternative considered**: Pages Router — rejected because App Router is forward-compatible and simpler for a pure client-side page.

### Decision 2: All computation is pure TypeScript (no library)
`src/lib/calculator.ts` exports a single `calculateCost(params)` function with no side-effects.
- **Why**: Easy to unit test with Vitest; zero runtime dependencies; logic is straightforward arithmetic.
- **Alternative considered**: Using a formula library — unnecessary complexity for simple math.

### Decision 3: Vitest for unit testing
- **Why**: Native ESM support, fast, integrates with Vite/Next.js toolchain. No Jest config overhead.
- **Alternative considered**: Jest — requires more configuration for ESM + TypeScript.

### Decision 4: localStorage for settings persistence
Persist the entire form state as a single JSON blob under the key `prompt-budget-settings`.
- **Why**: Zero backend, works on Vercel static deployment, simple to implement.
- **Risk**: localStorage is not available during SSR. Mitigated by reading only inside `useEffect`.

### Decision 5: Presets as static constants
Three presets (GPT-4o, Claude Sonnet 3.5, Gemini 1.5 Pro) defined as a constant array in `src/lib/presets.ts` using approximate public pricing.
- **Why**: Gives users a starting point without hardcoding a single "correct" price; user can always override.
- **Assumption**: Prices are approximate and may drift; README will note this.

### Decision 6: Pricing unit — per 1M tokens
All price inputs and internal calculations use USD per 1,000,000 tokens (the industry standard unit).
- **Why**: Matches how major providers (OpenAI, Anthropic, Google) publish pricing.

## Risks / Trade-offs

- [Risk] localStorage unavailable in SSR → Mitigation: read in `useEffect` only; render with defaults on first server pass.
- [Risk] Preset prices become stale → Mitigation: Document in README that prices are illustrative; user must verify with provider.
- [Risk] Very small per-call costs display as `$0.000000` → Mitigation: `formatCost()` helper uses 6 decimal places for sub-cent values.

## Migration Plan

New project — no migration needed. Deploy by connecting GitHub repo to Vercel; `pnpm build` is the build command and `.next` is the output directory (Vercel detects this automatically for Next.js).

## Open Questions

_(none — all decisions made above)_
