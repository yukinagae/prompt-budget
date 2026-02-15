## Context

The repository already has a CI workflow (`.github/workflows/ci.yml`) covering lint, test, and build, but code review is entirely manual.
GitHub Agentic Workflows (gh-aw) executes agent instructions defined in Markdown as GitHub Actions jobs.
The plan is to run the gh-aw CLI on the CI runner, have Claude read the PR diff, and post a review comment.

## Goals / Non-Goals

**Goals:**
- Trigger Claude-powered code review on PR `opened` and `synchronize` events
- Commit both the agent instruction file (`.md`) and the compiled lock file (`.lock.yml`) to the repository
- Document the setup steps (gh CLI installation, Secrets configuration) in the README

**Non-Goals:**
- Auto-approval or auto-merge of PRs
- Security vulnerability scanning (handled by dedicated tools)
- Changes to the existing `ci.yml` workflow
- Local gh-aw execution environment setup

## Decisions

### 1. Workflow format: gh-aw Markdown vs. standard GitHub Actions

**Choice**: gh-aw Markdown format (`.md` + `.lock.yml`)

**Rationale**: gh-aw generates YAML from Markdown instructions and provides built-in security guardrails: sandboxed execution, input sanitization, network isolation, and tool allowlisting. This is safer and more readable than calling the Claude API directly from a standard Actions step.

**Alternative considered**: Standard GitHub Actions + direct Anthropic API call → no guardrails, manual prompt management required.

### 2. AI engine: Claude (Anthropic)

**Choice**: `engine: claude` with `ANTHROPIC_API_KEY` stored as a GitHub Secret

**Rationale**: User-specified requirement.

### 3. safe-outputs: add-pr-review-comment only

**Choice**: Allow only `add-pr-review-comment`

**Rationale**: Minimize write permissions. PR close, merge, and branch modifications are not permitted.

### 4. Lock file management: commit to repository

**Choice**: Commit `pr-review.lock.yml` to the repository

**Rationale**: Follows gh-aw's intended design. The lock file is the actual Actions job that CI runs. Whenever `.md` changes, run `gh aw compile` locally and commit the updated lock file.

### 5. Compilation: run locally, commit result

**Choice**: Developer runs `gh extension install github/gh-aw && gh aw compile pr-review` locally and commits the generated `.lock.yml`

**Rationale**: Compiling in CI creates a chicken-and-egg problem. The lock file is a source-controlled artifact.

## Risks / Trade-offs

- **[API cost]** Each PR open/push triggers a Claude API call; large diffs increase token cost → set `timeout-minutes` as a guard; add diff-size guidance to the instruction if needed
- **[gh-aw early development]** gh-aw is in early development and may have breaking changes → committing the lock file insulates the workflow from upstream gh-aw changes
- **[Secret exposure]** `ANTHROPIC_API_KEY` could be exposed in Actions logs → gh-aw's sandbox mitigates this; ensure log visibility settings are appropriate for the repository
- **[Review quality]** Claude's automated review is not a replacement for human review → the posted comment will explicitly state it is an automated review

## Migration Plan

1. Add `ANTHROPIC_API_KEY` to GitHub Secrets in the repository settings
2. Install gh-aw locally: `gh extension install github/gh-aw`
3. Create `.github/workflows/pr-review.md`
4. Run `gh aw compile pr-review` to generate `.github/workflows/pr-review.lock.yml`
5. Commit both files and push
6. Open a test PR to verify the review comment is posted

**Rollback**: Delete `.github/workflows/pr-review.md` and `.lock.yml`, then commit and push.

## Open Questions

- Does the `add-pr-review-comment` safe-output behave correctly on `synchronize` events (additional pushes)? → Verify during initial test
- Should a diff-size limit be included in the agent instruction? → Start without one; revisit based on observed costs
