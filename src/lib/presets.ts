import { PricingParams } from "./calculator";

export interface Preset {
  name: string;
  params: PricingParams;
}

/**
 * Built-in presets with approximate public pricing (USD per 1M tokens).
 * Prices are illustrative — verify with the provider before making financial decisions.
 * Defaults: 1000 input tokens/call, 500 output tokens/call, 100 calls/day, 30 days/month, 0% cache.
 */
export const PRESETS: Preset[] = [
  {
    name: "GPT-4o",
    params: {
      inputPricePer1M: 2.5,
      outputPricePer1M: 10.0,
      cacheReadPricePer1M: 1.25,
      inputTokensPerCall: 1000,
      outputTokensPerCall: 500,
      callsPerDay: 100,
      daysPerMonth: 30,
      cacheHitRate: 0,
    },
  },
  {
    name: "Claude Sonnet 3.5",
    params: {
      inputPricePer1M: 3.0,
      outputPricePer1M: 15.0,
      cacheReadPricePer1M: 0.3,
      inputTokensPerCall: 1000,
      outputTokensPerCall: 500,
      callsPerDay: 100,
      daysPerMonth: 30,
      cacheHitRate: 0,
    },
  },
  {
    name: "Gemini 1.5 Pro",
    params: {
      inputPricePer1M: 1.25,
      outputPricePer1M: 5.0,
      cacheReadPricePer1M: 0.3125,
      inputTokensPerCall: 1000,
      outputTokensPerCall: 500,
      callsPerDay: 100,
      daysPerMonth: 30,
      cacheHitRate: 0,
    },
  },
];

export const DEFAULT_PARAMS: PricingParams = PRESETS[0].params;
