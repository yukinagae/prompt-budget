## Why

Developers and teams using LLM APIs need a quick way to estimate monthly costs before committing to a usage pattern. No simple, self-hostable tool exists that lets users input their own pricing and token parameters to see a cost breakdown — this MVP fills that gap.

## What Changes

- Introduce a Next.js + TypeScript web application (App Router) deployable to Vercel
- Add a pure cost calculation module (no side-effects, fully unit-tested)
- Add an input form with 3 presets, persisting settings in localStorage
- Add an output summary showing total monthly cost, per-call cost, and a line-item breakdown
- Add a README with run instructions and documented assumptions

## Capabilities

### New Capabilities

- `cost-calculator`: Pure TypeScript module that computes per-call, per-day, and per-month LLM API costs from user-supplied pricing and usage parameters (input price, output price, cache-read price, token counts, calls/day, days/month, cache hit rate)
- `cost-form-ui`: React input form accepting all pricing/usage parameters, supporting 3 built-in presets (GPT-4o, Claude Sonnet, Gemini 1.5 Pro) and persisting values to localStorage
- `cost-summary-ui`: React output panel displaying total monthly cost, per-call cost, and a per-component breakdown (input tokens, cache-read tokens, output tokens)
- `vercel-deploy`: Vercel-ready configuration (next.config.js, no server-side secrets) enabling zero-config deployment by connecting the repo

### Modified Capabilities

_(none — greenfield project)_

## Impact

- **New dependencies**: next, react, react-dom, typescript, vitest, @vitejs/plugin-react, eslint-config-next
- **Package manager**: pnpm
- **New files**: package.json, tsconfig.json, next.config.js, .eslintrc.json, vitest.config.ts, src/lib/calculator.ts, src/app/*, README.md
- **No breaking changes** (new project)
