## ADDED Requirements

### Requirement: Render form elements with dark-mode styles
The system SHALL apply dark-mode CSS custom property values to all form elements (inputs, labels, preset buttons, container) when the `dark` class is active on `<html>`.

#### Scenario: Dark theme applied to form
- **WHEN** the `dark` class is present on `<html>`
- **THEN** all form inputs, labels, and preset buttons use the dark palette colors (background, text, border) defined via CSS custom properties

#### Scenario: Light theme applied to form
- **WHEN** the `dark` class is absent from `<html>`
- **THEN** all form inputs, labels, and preset buttons use the light palette colors
