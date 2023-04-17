import { defineConfig } from "orval";

export default defineConfig({
  materialList: {
    output: {
      mode: "split",
      target: "src/core/material-list-api/material-list.ts",
      schemas: "src/core/material-list-api/model",
      client: "react-query",
      override: {
        mutator: {
          path: "src/core/material-list-api/mutator/fetcher.ts",
          name: "fetcher"
        },
        query: {
          useQuery: true
        }
      },
      prettier: true
    },
    input: {
      target:
        // This should come from a url that will be updated if there are any changes
        "https://raw.githubusercontent.com/danskernesdigitalebibliotek/ddb-material-list/develop/spec/material-list-2.0.0.yaml",
      converterOptions: {
        indent: 2
      }
    }
  },
  coverService: {
    output: {
      mode: "split",
      target: "src/core/cover-service-api/cover-service.ts",
      schemas: "src/core/cover-service-api/model",
      client: "react-query",
      override: {
        mutator: {
          path: "src/core/cover-service-api/mutator/fetcher.ts",
          name: "fetcher"
        },
        query: {
          useQuery: true
        }
      },
      prettier: true
    },
    input: {
      target: "https://cover.dandigbib.org/api/v2/spec.yaml",
      converterOptions: {
        indent: 2
      }
    }
  },
  fbsAdapter: {
    output: {
      mode: "split",
      target: "src/core/fbs/fbs.ts",
      schemas: "src/core/fbs/model",
      client: "react-query",
      override: {
        mutator: {
          path: "src/core/fbs/mutator/fetcher.ts",
          name: "fetcher"
        },
        query: {
          useQuery: true
        },
        operations: {
          // The reason why we add this here is to be able to use "enabled" option in the
          // getPatronInformationByPatronIdV2 query. This lets us call it conditionally.
          getPatronInformationByPatronIdV2: {
            requestOptions: false
          }
        }
      },
      prettier: true
    },
    input: {
      target: "src/core/fbs/fbs-adapter.yaml",
      converterOptions: {
        indent: 2
      }
    }
  },
  publizonAdapter: {
    output: {
      mode: "split",
      target: "src/core/publizon/publizon.ts",
      schemas: "src/core/publizon/model",
      client: "react-query",
      override: {
        mutator: {
          path: "src/core/publizon/mutator/fetcher.ts",
          name: "fetcher"
        },
        query: {
          useQuery: true
        }
      },
      prettier: true
    },
    input: {
      target: "src/core/publizon/publizon-adapter.yaml",
      converterOptions: {
        indent: 2
      }
    }
  },
  dplCms: {
    output: {
      mode: "split",
      target: "src/core/dpl-cms/dpl-cms.ts",
      schemas: "src/core/dpl-cms/model",
      client: "react-query",
      override: {
        mutator: {
          path: "src/core/dpl-cms/mutator/fetcher.ts",
          name: "fetcher"
        },
        query: {
          useQuery: true
        },
        operations: {
          // The reason why we add this here is to be able to use "enabled" option in the
          // proxy-url:GET query. This lets us call it conditionally.
          "proxy-url:GET": {
            requestOptions: false
          }
        }
      },
      prettier: true
    },
    input: {
      target:
        "https://raw.githubusercontent.com/danskernesdigitalebibliotek/dpl-cms/develop/openapi.json",
      converterOptions: {
        indent: 2
      }
    }
  }
});
