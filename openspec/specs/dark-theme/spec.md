## ADDED Requirements

### Requirement: Provide a dark/light theme toggle
The system SHALL render a toggle button that switches between light and dark themes when clicked.

#### Scenario: Toggle from light to dark
- **WHEN** the theme is light and the user clicks the toggle button
- **THEN** the `dark` class is added to the `<html>` element and the page re-renders with dark theme colors

#### Scenario: Toggle from dark to light
- **WHEN** the theme is dark and the user clicks the toggle button
- **THEN** the `dark` class is removed from the `<html>` element and the page re-renders with light theme colors

### Requirement: Persist theme preference in localStorage
The system SHALL save the selected theme (`'light'` or `'dark'`) to `localStorage` under the key `theme` whenever the user toggles.

#### Scenario: Preference restored on reload
- **WHEN** the user has previously selected dark theme and reloads the page
- **THEN** the dark theme is applied before first paint without a flash of light theme

#### Scenario: localStorage unavailable (SSR)
- **WHEN** the component renders server-side
- **THEN** no localStorage access is attempted and no error is thrown

### Requirement: Prevent flash of unstyled content (FOUC)
The system SHALL inject an inline blocking script in `<head>` that reads the stored theme and applies the `dark` class to `<html>` before the page renders.

#### Scenario: Dark theme on first paint
- **WHEN** the user's stored preference is `'dark'` and the page loads
- **THEN** the `dark` class is present on `<html>` before any CSS is applied

### Requirement: Apply theme via CSS custom properties
The system SHALL define color tokens as CSS custom properties on `:root` (light) and `html.dark` (dark), used by all components.

#### Scenario: Light theme colors active
- **WHEN** the `dark` class is absent from `<html>`
- **THEN** `:root` custom properties (light palette) are in effect

#### Scenario: Dark theme colors active
- **WHEN** the `dark` class is present on `<html>`
- **THEN** `html.dark` custom properties (dark palette) are in effect
