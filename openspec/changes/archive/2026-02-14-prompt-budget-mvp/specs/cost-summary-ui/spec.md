## ADDED Requirements

### Requirement: Display total monthly cost prominently
The system SHALL show the total monthly cost as the primary output, formatted as a USD string.

#### Scenario: Total displayed
- **WHEN** valid inputs are provided
- **THEN** total monthly cost is shown prominently at the top of the summary

### Requirement: Display per-call cost
The system SHALL show the cost per single API call.

#### Scenario: Per-call cost shown
- **WHEN** valid inputs are provided
- **THEN** per-call cost is displayed in the summary

### Requirement: Display cost breakdown by token type
The system SHALL show a line-item breakdown: input token cost, cache-read token cost, output token cost — each per call.

#### Scenario: Breakdown visible
- **WHEN** valid inputs are provided
- **THEN** three line items are shown: input cost, cache-read cost, output cost

### Requirement: Handle zero-cost display
The system SHALL display "$0.00" when all costs are zero (e.g., all prices set to 0).

#### Scenario: Zero prices
- **WHEN** all price inputs are 0
- **THEN** all displayed costs show "$0.00"
