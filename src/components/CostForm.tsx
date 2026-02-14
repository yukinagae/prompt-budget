"use client";

import { useState, useEffect, useCallback } from "react";
import { PricingParams, calculateCost } from "@/lib/calculator";
import { PRESETS, DEFAULT_PARAMS } from "@/lib/presets";
import CostSummary from "./CostSummary";

const STORAGE_KEY = "prompt-budget-settings";

function loadFromStorage(): PricingParams {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...DEFAULT_PARAMS, ...JSON.parse(raw) };
  } catch {
    // ignore — localStorage unavailable or corrupted
  }
  return DEFAULT_PARAMS;
}

function saveToStorage(params: PricingParams) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(params));
  } catch {
    // ignore
  }
}

interface FieldConfig {
  key: keyof PricingParams;
  label: string;
  min: number;
  step: number;
  note?: string;
}

const FIELDS: FieldConfig[] = [
  { key: "inputPricePer1M", label: "Input price ($/1M tokens)", min: 0, step: 0.01 },
  { key: "outputPricePer1M", label: "Output price ($/1M tokens)", min: 0, step: 0.01 },
  { key: "cacheReadPricePer1M", label: "Cache-read price ($/1M tokens)", min: 0, step: 0.01 },
  { key: "inputTokensPerCall", label: "Input tokens / call", min: 0, step: 1 },
  { key: "outputTokensPerCall", label: "Output tokens / call", min: 0, step: 1 },
  { key: "callsPerDay", label: "Calls / day", min: 0, step: 1 },
  { key: "daysPerMonth", label: "Days / month", min: 1, step: 1 },
  {
    key: "cacheHitRate",
    label: "Cache hit rate (%)",
    min: 0,
    step: 1,
    note: "0–100",
  },
];

export default function CostForm() {
  const [params, setParams] = useState<PricingParams>(DEFAULT_PARAMS);
  const [hydrated, setHydrated] = useState(false);

  // Restore from localStorage on mount (client-side only)
  useEffect(() => {
    setParams(loadFromStorage());
    setHydrated(true);
  }, []);

  const handleChange = useCallback(
    (key: keyof PricingParams, raw: string) => {
      const value = parseFloat(raw) || 0;
      // cacheHitRate is stored as 0–1 internally; input is 0–100
      const stored =
        key === "cacheHitRate" ? Math.max(0, Math.min(100, value)) / 100 : value;
      const next = { ...params, [key]: stored };
      setParams(next);
      saveToStorage(next);
    },
    [params]
  );

  const applyPreset = useCallback((preset: (typeof PRESETS)[number]) => {
    setParams(preset.params);
    saveToStorage(preset.params);
  }, []);

  // Display value: cacheHitRate is 0–1 internally, show as 0–100
  function displayValue(key: keyof PricingParams, value: number): string {
    if (key === "cacheHitRate") return String(Math.round(value * 100));
    return String(value);
  }

  const breakdown = calculateCost(params);

  if (!hydrated) return null; // avoid SSR/hydration mismatch

  return (
    <div>
      {/* Preset buttons */}
      <div style={styles.presetRow}>
        <span style={styles.presetLabel}>Presets:</span>
        {PRESETS.map((preset) => (
          <button
            key={preset.name}
            onClick={() => applyPreset(preset)}
            style={styles.presetButton}
          >
            {preset.name}
          </button>
        ))}
      </div>

      {/* Input fields */}
      <div style={styles.grid}>
        {FIELDS.map(({ key, label, min, step, note }) => (
          <label key={key} style={styles.fieldLabel}>
            <span style={styles.fieldName}>
              {label}
              {note && <span style={styles.note}> ({note})</span>}
            </span>
            <input
              type="number"
              min={min}
              step={step}
              value={displayValue(key, params[key])}
              onChange={(e) => handleChange(key, e.target.value)}
              style={styles.input}
            />
          </label>
        ))}
      </div>

      {/* Output summary */}
      <CostSummary breakdown={breakdown} />
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  presetRow: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    marginBottom: "1.5rem",
    flexWrap: "wrap",
  },
  presetLabel: {
    fontWeight: 600,
    fontSize: "0.9rem",
    color: "#444",
  },
  presetButton: {
    padding: "0.35rem 0.85rem",
    border: "1px solid #ccc",
    borderRadius: 6,
    background: "#fff",
    cursor: "pointer",
    fontSize: "0.875rem",
    transition: "background 0.15s",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "1rem",
  },
  fieldLabel: {
    display: "flex",
    flexDirection: "column",
    gap: "0.3rem",
    fontSize: "0.9rem",
  },
  fieldName: {
    fontWeight: 500,
    color: "#333",
  },
  note: {
    fontWeight: 400,
    color: "#888",
    fontSize: "0.8rem",
  },
  input: {
    padding: "0.45rem 0.6rem",
    border: "1px solid #ccc",
    borderRadius: 6,
    fontSize: "0.95rem",
    width: "100%",
  },
};
