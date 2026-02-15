## ADDED Requirements

### Requirement: Render summary card with dark-mode styles
The system SHALL apply dark-mode CSS custom property values to the summary card, headings, cost values, and line items when the `dark` class is active on `<html>`.

#### Scenario: Dark theme applied to summary
- **WHEN** the `dark` class is present on `<html>`
- **THEN** the summary card background, text, and line items use the dark palette colors defined via CSS custom properties

#### Scenario: Light theme applied to summary
- **WHEN** the `dark` class is absent from `<html>`
- **THEN** the summary card background, text, and line items use the light palette colors
