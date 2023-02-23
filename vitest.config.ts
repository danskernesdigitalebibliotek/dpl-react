import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "happy-dom",
    include: ["./src/tests/unit/*.test.(ts|tsx)"],
    coverage: {
      all: true,
      provider: "istanbul",
      reporter: ["clover"],
      include: ["src/**/*.{ts,tsx}"]
    }
  }
});
