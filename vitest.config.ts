import { defineConfig } from "vitest/config";
import path from "path";

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
    },
    resolveSnapshotPath: (testPath, snapExtension) =>
      `./src/tests/unit/${path.basename(testPath)}${snapExtension}`
  }
});

export {};
