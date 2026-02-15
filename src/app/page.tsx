import CostForm from "@/components/CostForm";
import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <h1 style={{ fontSize: "1.75rem" }}>
          Prompt Budget
        </h1>
        <ThemeToggle />
      </div>
      <p style={{ marginBottom: "2rem", color: "var(--color-text-muted)" }}>
        Estimate your monthly LLM API costs. Enter your pricing and usage
        parameters below.
      </p>
      <CostForm />
    </main>
  );
}
