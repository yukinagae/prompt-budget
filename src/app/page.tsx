import CostForm from "@/components/CostForm";

export default function Home() {
  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: "2rem 1rem" }}>
      <h1 style={{ marginBottom: "1.5rem", fontSize: "1.75rem" }}>
        Prompt Budget
      </h1>
      <p style={{ marginBottom: "2rem", color: "#555" }}>
        Estimate your monthly LLM API costs. Enter your pricing and usage
        parameters below.
      </p>
      <CostForm />
    </main>
  );
}
