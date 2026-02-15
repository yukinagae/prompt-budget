## 1. Prerequisites

- [x] 1.1 Install GitHub CLI locally: `brew install gh`
- [ ] 1.2 Authenticate GitHub CLI: `gh auth login`
- [ ] 1.3 Install gh-aw extension: `gh extension install github/gh-aw`
- [ ] 1.4 Add `ANTHROPIC_API_KEY` to GitHub Secrets in repository settings

## 2. Workflow Instruction File

- [x] 2.1 Create `.github/workflows/pr-review.md` with gh-aw frontmatter (triggers: pull_request opened/synchronize, engine: claude, safe-outputs: add-pr-review-comment, permissions: pull-requests write + contents read)
- [x] 2.2 Write Claude review instruction body: review diff for correctness, TypeScript type safety, Next.js/React best practices, performance, and security; post a structured comment noting it is an automated review

## 3. Compile Lock File

- [ ] 3.1 Run `gh aw compile pr-review` in the repository root to generate `.github/workflows/pr-review.lock.yml`
- [ ] 3.2 Verify both `.github/workflows/pr-review.md` and `.github/workflows/pr-review.lock.yml` exist

## 4. Documentation

- [x] 4.1 Add "Automated PR Review" section to README describing what the workflow does
- [x] 4.2 Document `ANTHROPIC_API_KEY` Secret setup steps in README
- [x] 4.3 Document how to recompile the lock file after editing `pr-review.md`

## 5. Commit and Verify

- [ ] 5.1 Commit `.github/workflows/pr-review.md` and `.github/workflows/pr-review.lock.yml`
- [ ] 5.2 Push and open a test PR to verify Claude posts a review comment
- [ ] 5.3 Confirm the review comment includes the automated review notice
