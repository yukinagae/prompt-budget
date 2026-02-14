## ADDED Requirements

### Requirement: Build succeeds with pnpm build
The system SHALL produce a successful Next.js build using `pnpm build` with no errors.

#### Scenario: Clean build
- **WHEN** `pnpm build` is run in the project root
- **THEN** the command exits with code 0

### Requirement: No manual Vercel configuration required
The system SHALL be deployable to Vercel by connecting the GitHub repository without any additional manual configuration steps.

#### Scenario: Auto-detected as Next.js
- **WHEN** the repository is connected to Vercel
- **THEN** Vercel auto-detects the framework as Next.js and sets build command to `pnpm build`

### Requirement: No server-side secrets
The system SHALL not require any environment variables or secrets to run.

#### Scenario: Deploy without env vars
- **WHEN** the app is deployed with no environment variables set
- **THEN** the app loads and functions correctly
