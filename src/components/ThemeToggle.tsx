"use client";

import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  // Initialize from current class on mount (set by FOUC-prevention script)
  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.classList.add("dark");
      try {
        localStorage.setItem("theme", "dark");
      } catch {
        // ignore
      }
    } else {
      document.documentElement.classList.remove("dark");
      try {
        localStorage.setItem("theme", "light");
      } catch {
        // ignore
      }
    }
  }

  return (
    <button onClick={toggle} style={styles.button} aria-label="Toggle dark mode">
      {isDark ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}

const styles: Record<string, React.CSSProperties> = {
  button: {
    padding: "0.35rem 0.85rem",
    border: "1px solid var(--color-border)",
    borderRadius: 6,
    background: "var(--color-surface)",
    color: "var(--color-text)",
    cursor: "pointer",
    fontSize: "0.875rem",
    transition: "background 0.15s",
  },
};
