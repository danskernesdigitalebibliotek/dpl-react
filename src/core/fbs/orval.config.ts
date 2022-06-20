// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from "orval";

export default defineConfig({
  fbsAdapter: {
    output: {
      mode: "split",
      target: "./fbs.ts",
      schemas: "./model",
      client: "react-query",
      override: {
        mutator: {
          path: "./mutator/fetcher.ts",
          name: "fetcher"
        },
        query: {
          useQuery: true
        }
      },
      prettier: true
    },
    input: {
      target: "./fbs-adapter.yaml",
      converterOptions: {
        indent: 2
      }
    }
  }
});
