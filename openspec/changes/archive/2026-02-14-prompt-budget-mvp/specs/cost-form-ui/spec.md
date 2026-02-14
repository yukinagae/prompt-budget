## ADDED Requirements

### Requirement: Display input form with all parameters
The system SHALL render a form with fields for: inputPricePer1M, outputPricePer1M, cacheReadPricePer1M, inputTokensPerCall, outputTokensPerCall, callsPerDay, daysPerMonth, cacheHitRate (0–100%).

#### Scenario: All fields visible
- **WHEN** the page loads
- **THEN** all eight input fields are rendered with labels and appropriate numeric inputs

### Requirement: Provide 3 built-in presets
The system SHALL provide preset buttons for GPT-4o, Claude Sonnet 3.5, and Gemini 1.5 Pro that populate the form with approximate public pricing.

#### Scenario: Select a preset
- **WHEN** user clicks a preset button
- **THEN** all pricing and token fields are populated with preset values

### Requirement: Persist settings in localStorage
The system SHALL save form values to localStorage on every change and restore them on page load.

#### Scenario: Settings restored on reload
- **WHEN** user enters values and reloads the page
- **THEN** the form is populated with the previously entered values

#### Scenario: localStorage unavailable (SSR)
- **WHEN** the component renders server-side
- **THEN** default values are used without throwing an error

### Requirement: Live calculation on input change
The system SHALL recalculate costs immediately whenever any form field changes, without requiring a submit button.

#### Scenario: Immediate update
- **WHEN** user changes any input field
- **THEN** the output summary updates without a page reload
