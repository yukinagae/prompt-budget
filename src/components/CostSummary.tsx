import { CostBreakdown, formatCost } from "@/lib/calculator";

interface Props {
  breakdown: CostBreakdown;
}

export default function CostSummary({ breakdown }: Props) {
  const {
    inputCostPerCall,
    cacheReadCostPerCall,
    outputCostPerCall,
    totalCostPerCall,
    totalCostPerMonth,
  } = breakdown;

  return (
    <section style={styles.card}>
      <h2 style={styles.heading}>Cost Estimate</h2>

      <div style={styles.total}>
        <span style={styles.totalLabel}>Total / month</span>
        <span style={styles.totalValue}>{formatCost(totalCostPerMonth)}</span>
      </div>

      <div style={styles.row}>
        <span style={styles.label}>Per call</span>
        <span style={styles.value}>{formatCost(totalCostPerCall)}</span>
      </div>

      <hr style={styles.divider} />

      <p style={styles.subheading}>Breakdown per call</p>

      <div style={styles.row}>
        <span style={styles.label}>Input tokens (uncached)</span>
        <span style={styles.value}>{formatCost(inputCostPerCall)}</span>
      </div>
      <div style={styles.row}>
        <span style={styles.label}>Input tokens (cache-read)</span>
        <span style={styles.value}>{formatCost(cacheReadCostPerCall)}</span>
      </div>
      <div style={styles.row}>
        <span style={styles.label}>Output tokens</span>
        <span style={styles.value}>{formatCost(outputCostPerCall)}</span>
      </div>
    </section>
  );
}

const styles: Record<string, React.CSSProperties> = {
  card: {
    background: "var(--color-surface)",
    border: "1px solid var(--color-border-light)",
    borderRadius: 8,
    padding: "1.5rem",
    marginTop: "1.5rem",
  },
  heading: {
    fontSize: "1.1rem",
    marginBottom: "1rem",
    color: "var(--color-field-name)",
  },
  total: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: "0.75rem",
  },
  totalLabel: {
    fontSize: "1rem",
    fontWeight: 600,
  },
  totalValue: {
    fontSize: "2rem",
    fontWeight: 700,
    color: "var(--color-primary)",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "0.4rem",
    fontSize: "0.95rem",
  },
  label: {
    color: "var(--color-text-muted)",
  },
  value: {
    fontVariantNumeric: "tabular-nums",
    fontWeight: 500,
  },
  divider: {
    border: "none",
    borderTop: "1px solid var(--color-divider)",
    margin: "0.75rem 0",
  },
  subheading: {
    fontSize: "0.85rem",
    color: "var(--color-subheading)",
    marginBottom: "0.5rem",
    textTransform: "uppercase",
    letterSpacing: "0.04em",
  },
};
