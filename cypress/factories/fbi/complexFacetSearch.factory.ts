import { Factory } from "fishery";
import { ComplexFacetSearchQuery } from "../../../src/core/dbc-gateway/generated/graphql";

export const complexFacetSearchFactory =
  Factory.define<ComplexFacetSearchQuery>(() => ({
    complexSearch: {
      facets: [
        {
          name: "facet.specificmaterialtype",
          values: [
            { key: "bog", score: 1500, traceId: null },
            { key: "e-bog", score: 800, traceId: null },
            { key: "lydbog (net)", score: 600, traceId: null },
            { key: "dvd", score: 400, traceId: null },
            { key: "cd", score: 300, traceId: null },
            { key: "tidsskrift", score: 200, traceId: null },
            { key: "artikel", score: 150, traceId: null }
          ]
        },
        {
          name: "facet.genreandform",
          values: [
            { key: "romaner", score: 800, traceId: null },
            { key: "krimi", score: 600, traceId: null },
            { key: "fantasy", score: 400, traceId: null },
            { key: "biografier", score: 200, traceId: null },
            { key: "science fiction", score: 180, traceId: null },
            { key: "eventyr", score: 150, traceId: null },
            { key: "humor", score: 120, traceId: null }
          ]
        },
        {
          name: "facet.source",
          values: [
            { key: "bibliotekskatalog", score: 2000, traceId: null },
            { key: "ereolen", score: 500, traceId: null },
            { key: "filmstriben", score: 300, traceId: null }
          ]
        },
        {
          name: "facet.mainlanguage",
          values: [
            { key: "dansk", score: 5000, traceId: null },
            { key: "engelsk", score: 2000, traceId: null },
            { key: "tysk", score: 500, traceId: null },
            { key: "fransk", score: 300, traceId: null },
            { key: "spansk", score: 200, traceId: null },
            { key: "svensk", score: 150, traceId: null }
          ]
        },
        {
          name: "facet.accesstype",
          values: [
            { key: "fysisk", score: 3000, traceId: null },
            { key: "online", score: 1500, traceId: null }
          ]
        },
        {
          name: "facet.primarytarget",
          values: [
            { key: "voksenmaterialer", score: 4000, traceId: null },
            { key: "børnematerialer", score: 2000, traceId: null }
          ]
        },
        {
          name: "facet.generalaudience",
          values: [
            { key: "voksne", score: 3500, traceId: null },
            { key: "børn", score: 1500, traceId: null },
            { key: "unge", score: 800, traceId: null }
          ]
        },
        {
          name: "facet.subject",
          values: [
            { key: "kærlighed", score: 500, traceId: null },
            { key: "eventyr", score: 400, traceId: null },
            { key: "venskab", score: 350, traceId: null },
            { key: "magi", score: 300, traceId: null },
            { key: "historie", score: 250, traceId: null },
            { key: "natur", score: 200, traceId: null }
          ]
        },
        {
          name: "facet.creator",
          values: [
            { key: "J.K. Rowling", score: 200, traceId: null },
            { key: "Stephen King", score: 180, traceId: null },
            { key: "Jussi Adler-Olsen", score: 150, traceId: null }
          ]
        },
        {
          name: "facet.publicationyear",
          values: [
            { key: "2024", score: 500, traceId: null },
            { key: "2023", score: 800, traceId: null },
            { key: "2022", score: 600, traceId: null },
            { key: "2021", score: 400, traceId: null }
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
