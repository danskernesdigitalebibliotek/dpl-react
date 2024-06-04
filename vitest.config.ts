import { defineConfig } from "vitest/config";

export default defineConfig({
  define: {
    "import.meta.vitest": "undefined"
  },

  test: {
    environment: "happy-dom",
    include: ["./src/tests/unit/*.test.(ts|tsx)"],
    includeSource: ["src/**/*.{ts,tsx}"],
    coverage: {
      all: true,
      provider: "istanbul",
      reporter: ["clover"],
      include: ["src/**/*.{ts,tsx}"]
    }
  }
});

export {};
