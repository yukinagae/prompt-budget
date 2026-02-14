import { describe, it, expect } from "vitest";
import { calculateCost, formatCost } from "./calculator";

const BASE = {
  inputPricePer1M: 2.0,
  outputPricePer1M: 8.0,
  cacheReadPricePer1M: 0.5,
  inputTokensPerCall: 1000,
  outputTokensPerCall: 500,
  callsPerDay: 10,
  daysPerMonth: 30,
  cacheHitRate: 0,
};

describe("calculateCost", () => {
  it("zero cache hit rate — all input billed at full price", () => {
    const result = calculateCost({ ...BASE, cacheHitRate: 0 });
    // inputCost = (1000/1_000_000) * 2.0 = 0.002
    expect(result.inputCostPerCall).toBeCloseTo(0.002);
    expect(result.cacheReadCostPerCall).toBe(0);
  });

  it("full cache hit rate — all input billed at cache-read price", () => {
    const result = calculateCost({ ...BASE, cacheHitRate: 1 });
    expect(result.inputCostPerCall).toBe(0);
    // cacheReadCost = (1000/1_000_000) * 0.5 = 0.0005
    expect(result.cacheReadCostPerCall).toBeCloseTo(0.0005);
  });

  it("partial cache hit rate — splits correctly", () => {
    const result = calculateCost({ ...BASE, cacheHitRate: 0.5 });
    // uncached 500 tokens * 2.0/1M = 0.001
    expect(result.inputCostPerCall).toBeCloseTo(0.001);
    // cached 500 tokens * 0.5/1M = 0.00025
    expect(result.cacheReadCostPerCall).toBeCloseTo(0.00025);
  });

  it("clamps cacheHitRate > 1 to 1", () => {
    const unclamped = calculateCost({ ...BASE, cacheHitRate: 1.5 });
    const clamped = calculateCost({ ...BASE, cacheHitRate: 1 });
    expect(unclamped.inputCostPerCall).toBe(clamped.inputCostPerCall);
    expect(unclamped.cacheReadCostPerCall).toBe(clamped.cacheReadCostPerCall);
  });

  it("clamps cacheHitRate < 0 to 0", () => {
    const unclamped = calculateCost({ ...BASE, cacheHitRate: -0.5 });
    const clamped = calculateCost({ ...BASE, cacheHitRate: 0 });
    expect(unclamped.inputCostPerCall).toBe(clamped.inputCostPerCall);
    expect(unclamped.cacheReadCostPerCall).toBe(clamped.cacheReadCostPerCall);
  });

  it("output cost is independent of cache hit rate", () => {
    const r0 = calculateCost({ ...BASE, cacheHitRate: 0 });
    const r1 = calculateCost({ ...BASE, cacheHitRate: 1 });
    // outputCost = (500/1_000_000) * 8.0 = 0.004
    expect(r0.outputCostPerCall).toBeCloseTo(0.004);
    expect(r1.outputCostPerCall).toBeCloseTo(0.004);
  });

  it("daily and monthly aggregation", () => {
    // totalPerCall = 0.002 + 0 + 0.004 = 0.006
    const result = calculateCost({ ...BASE, cacheHitRate: 0 });
    expect(result.totalCostPerCall).toBeCloseTo(0.006);
    expect(result.totalCostPerDay).toBeCloseTo(0.006 * 10);
    expect(result.totalCostPerMonth).toBeCloseTo(0.006 * 10 * 30);
  });

  it("returns all six breakdown fields as non-negative numbers", () => {
    const result = calculateCost(BASE);
    const fields = [
      "inputCostPerCall",
      "cacheReadCostPerCall",
      "outputCostPerCall",
      "totalCostPerCall",
      "totalCostPerDay",
      "totalCostPerMonth",
    ] as const;
    for (const field of fields) {
      expect(typeof result[field]).toBe("number");
      expect(result[field]).toBeGreaterThanOrEqual(0);
    }
  });

  it("all costs are zero when all prices are zero", () => {
    const result = calculateCost({
      ...BASE,
      inputPricePer1M: 0,
      outputPricePer1M: 0,
      cacheReadPricePer1M: 0,
    });
    expect(result.totalCostPerMonth).toBe(0);
  });
});

describe("formatCost", () => {
  it("formats zero as $0.00", () => {
    expect(formatCost(0)).toBe("$0.00");
  });

  it("formats values >= $0.01 with 2 decimal places", () => {
    expect(formatCost(1.5)).toBe("$1.50");
    expect(formatCost(0.01)).toBe("$0.01");
    expect(formatCost(100)).toBe("$100.00");
  });

  it("formats small values < $0.01 with 6 decimal places", () => {
    expect(formatCost(0.000012)).toBe("$0.000012");
    expect(formatCost(0.009999)).toBe("$0.009999");
  });
});
