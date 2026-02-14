/**
 * Pure cost calculation module for LLM API usage estimation.
 *
 * Assumptions:
 * - All prices are in USD per 1,000,000 tokens (per-million pricing).
 * - Cache hit rate applies to input tokens only: cache hits cost cacheReadPricePer1M,
 *   misses cost inputPricePer1M.
 * - Output tokens are never cached.
 * - A "call" consists of inputTokensPerCall prompt tokens + outputTokensPerCall completion tokens.
 * - Monthly cost = (cost per call) * callsPerDay * daysPerMonth.
 */

export interface PricingParams {
  /** Price per 1M input tokens (USD) */
  inputPricePer1M: number;
  /** Price per 1M output tokens (USD) */
  outputPricePer1M: number;
  /** Price per 1M cache-read tokens (USD) — typically lower than inputPricePer1M */
  cacheReadPricePer1M: number;
  /** Number of input (prompt) tokens per API call */
  inputTokensPerCall: number;
  /** Number of output (completion) tokens per API call */
  outputTokensPerCall: number;
  /** API calls made per day */
  callsPerDay: number;
  /** Days per month (billing period) */
  daysPerMonth: number;
  /** Fraction of input tokens served from cache (0–1) */
  cacheHitRate: number;
}

export interface CostBreakdown {
  /** Cost of non-cached input tokens per call (USD) */
  inputCostPerCall: number;
  /** Cost of cache-read input tokens per call (USD) */
  cacheReadCostPerCall: number;
  /** Cost of output tokens per call (USD) */
  outputCostPerCall: number;
  /** Total cost per single API call (USD) */
  totalCostPerCall: number;
  /** Total cost per day (USD) */
  totalCostPerDay: number;
  /** Total cost per month (USD) */
  totalCostPerMonth: number;
}

const PER_MILLION = 1_000_000;

/**
 * Calculate LLM API costs based on provided pricing parameters.
 * Pure function — no side-effects.
 */
export function calculateCost(params: PricingParams): CostBreakdown {
  const {
    inputPricePer1M,
    outputPricePer1M,
    cacheReadPricePer1M,
    inputTokensPerCall,
    outputTokensPerCall,
    callsPerDay,
    daysPerMonth,
    cacheHitRate,
  } = params;

  // Clamp cacheHitRate to [0, 1]
  const hitRate = Math.max(0, Math.min(1, cacheHitRate));

  const cachedInputTokens = inputTokensPerCall * hitRate;
  const uncachedInputTokens = inputTokensPerCall * (1 - hitRate);

  const inputCostPerCall =
    (uncachedInputTokens / PER_MILLION) * inputPricePer1M;
  const cacheReadCostPerCall =
    (cachedInputTokens / PER_MILLION) * cacheReadPricePer1M;
  const outputCostPerCall =
    (outputTokensPerCall / PER_MILLION) * outputPricePer1M;

  const totalCostPerCall =
    inputCostPerCall + cacheReadCostPerCall + outputCostPerCall;
  const totalCostPerDay = totalCostPerCall * callsPerDay;
  const totalCostPerMonth = totalCostPerDay * daysPerMonth;

  return {
    inputCostPerCall,
    cacheReadCostPerCall,
    outputCostPerCall,
    totalCostPerCall,
    totalCostPerDay,
    totalCostPerMonth,
  };
}

/**
 * Format a USD cost value for display.
 * Values >= $0.01 show 2 decimal places; smaller values show up to 6.
 */
export function formatCost(value: number): string {
  if (value === 0) return "$0.00";
  if (value >= 0.01) return `$${value.toFixed(2)}`;
  return `$${value.toFixed(6)}`;
}
