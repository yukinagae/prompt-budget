## ADDED Requirements

### Requirement: Calculate per-call cost
The system SHALL compute the cost of a single API call given input price, output price, cache-read price, token counts, and cache hit rate. All prices are in USD per 1,000,000 tokens.

#### Scenario: Zero cache hit rate
- **WHEN** cacheHitRate is 0
- **THEN** all input tokens are billed at inputPricePer1M and cacheReadCostPerCall is 0

#### Scenario: Full cache hit rate
- **WHEN** cacheHitRate is 1
- **THEN** all input tokens are billed at cacheReadPricePer1M and inputCostPerCall is 0

#### Scenario: Partial cache hit rate
- **WHEN** cacheHitRate is 0.5 with 1000 input tokens
- **THEN** 500 tokens are billed at inputPricePer1M and 500 tokens at cacheReadPricePer1M

#### Scenario: Cache hit rate clamped above 1
- **WHEN** cacheHitRate is 1.5
- **THEN** it is treated as 1.0 (fully cached)

#### Scenario: Cache hit rate clamped below 0
- **WHEN** cacheHitRate is -0.1
- **THEN** it is treated as 0 (no cache)

### Requirement: Calculate per-day and per-month cost
The system SHALL multiply the per-call cost by callsPerDay and daysPerMonth to produce totalCostPerDay and totalCostPerMonth.

#### Scenario: Daily and monthly aggregation
- **WHEN** totalCostPerCall is $0.01, callsPerDay is 100, daysPerMonth is 30
- **THEN** totalCostPerDay is $1.00 and totalCostPerMonth is $30.00

### Requirement: Return cost breakdown
The system SHALL return a CostBreakdown object with fields: inputCostPerCall, cacheReadCostPerCall, outputCostPerCall, totalCostPerCall, totalCostPerDay, totalCostPerMonth.

#### Scenario: Breakdown fields present
- **WHEN** calculateCost is called with valid params
- **THEN** all six fields are present in the returned object and are non-negative numbers

### Requirement: Format cost for display
The system SHALL provide a formatCost(value) helper that returns a USD string. Values ≥ $0.01 use 2 decimal places; smaller values use 6 decimal places.

#### Scenario: Large value formatting
- **WHEN** value is 1.5
- **THEN** formatCost returns "$1.50"

#### Scenario: Small value formatting
- **WHEN** value is 0.000012
- **THEN** formatCost returns "$0.000012"

#### Scenario: Zero formatting
- **WHEN** value is 0
- **THEN** formatCost returns "$0.00"
