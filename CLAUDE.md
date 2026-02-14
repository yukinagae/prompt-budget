# PromptBudget - Claude Code Instructions

## Goal
Build a Vercel-deployable web dashboard that estimates LLM API costs from token/call parameters and visualizes breakdowns.

## Non-goals (for MVP)
- No auth / multi-user
- No real billing reconciliation
- No hardcoded provider pricing (user inputs prices)

## Before starting any task
1. Read CLAUDE.md fully before writing any code or creating any files.
2. Verify required tools are installed: `openspec --version`
   - If missing: `npm install -g @fission-ai/openspec@latest && openspec init --tools claude`
3. Verify entire is enabled: `entire status`
   - If missing: `brew install entireio/tap/entire && entire enable`

## Workflow (must follow)
1. Use OpenSpec to create and follow a change plan:
   - /opsx:new <change-name>
   - /opsx:ff
   - /opsx:apply
   - /opsx:verify
   - /opsx:archive
   - If slash commands are unavailable, run `openspec` CLI directly and follow each command file in .claude/commands/opsx/
2. Track tasks in OpenSpec's tasks.md. Keep changes small and testable. Prefer multiple small commits.
3. If `/opsx:apply` fails or produces unwanted changes, use `entire rewind` to restore to a previous checkpoint.

## Git commits
- Use Conventional Commits: https://www.conventionalcommits.org/en/v1.0.0/
- Commit messages must be in English.
- Split commits by logical unit — one concern per commit (config, feat, docs, etc.)
- Never bundle unrelated changes in a single commit.

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
