// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from "orval";

export default defineConfig({
  petstore: {
    output: {
      mode: "split",
      target: "src/material-list-api/material-list.ts",
      schemas: "src/material-list-api/model",
      client: "react-query",
      override: {
        mutator: {
          path: "src/material-list-api/mutator/fetcher.ts",
          name: "fetcher"
        },
        query: {
          useQuery: true
        }
      },
      prettier: true
    },
    input: {
      target: "./material-list.yaml",
      converterOptions: {
        indent: 2
      }
    }
  }
});
