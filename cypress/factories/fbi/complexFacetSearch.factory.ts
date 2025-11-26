import { Factory } from "fishery";
import { ComplexFacetSearchQuery } from "../../../src/core/dbc-gateway/generated/graphql";

export const complexFacetSearchFactory =
  Factory.define<ComplexFacetSearchQuery>(() => ({
    complexSearch: {
      facets: [
        {
          name: "facet.generalmaterialtype",
          values: [
            { key: "bøger", score: 1000, traceId: null },
            { key: "e-bøger", score: 500, traceId: null },
            { key: "lydbøger", score: 300, traceId: null },
            { key: "film", score: 200, traceId: null }
          ]
        },
        {
          name: "facet.genreandform",
          values: [
            { key: "romaner", score: 800, traceId: null },
            { key: "krimi", score: 600, traceId: null },
            { key: "fantasy", score: 400, traceId: null },
            { key: "biografier", score: 200, traceId: null }
          ]
        }
      ]
    }
  }));

export const buildComplexFacetSearchResponse = (
  data = complexFacetSearchFactory.build()
) => ({
  data
});
