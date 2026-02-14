# PromptBudget - Claude Code Instructions

## Goal
Build a Vercel-deployable web dashboard that estimates LLM API costs from token/call parameters and visualizes breakdowns.

## Non-goals (for MVP)
- No auth / multi-user
- No real billing reconciliation
- No hardcoded provider pricing (user inputs prices)

## Workflow (must follow)
1. Use OpenSpec to create and follow a change plan:
   - /opsx:new <change-name>
   - /opsx:ff
   - /opsx:apply
   - /opsx:verify
   - /opsx:archive
2. Track tasks in Beads when there are dependencies or parallel work.
3. Keep changes small and testable. Prefer multiple small commits.

## Commands you can run
- pnpm install
- pnpm lint
- pnpm test
- pnpm dev
- pnpm build

## Definition of Done
- Lint + tests pass
- UI works locally
- README has run steps and explanation of inputs/assumptions
- Deployable to Vercel without manual steps beyond connecting repo

## Constraints
- I will not write code manually.
- You must implement, run commands, and create PR-ready changes.
- If any assumption is needed, state it in the PR description and README.
