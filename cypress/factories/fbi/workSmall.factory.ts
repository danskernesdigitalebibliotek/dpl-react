import { Factory } from "fishery";
import { ComplexSearchWithPaginationQuery } from "../../../src/core/dbc-gateway/generated/graphql";
import { manifestationFactory } from "../manifestation/manifestation.factory";

// Type alias for WorkSmall from the query response
export type WorkSmall =
  ComplexSearchWithPaginationQuery["complexSearch"]["works"][0];

/**
 * Factory for WorkSmall - used in search results, recommendations, etc.
 */
export const workSmallFactory = Factory.define<WorkSmall>(() => {
  const manifestation = manifestationFactory.build();

  return {
    workId: "work-of:870970-basis:12345678",
    titles: {
      full: ["Test Titel"],
      original: ["Original Title"]
    },
    abstract: ["En beskrivelse af værket"],
    creators: [
      {
        display: "Test Forfatter",
        __typename: "Person"
      }
    ],
    series: [],
    workYear: {
      year: 2024
    },
    genreAndForm: ["romaner"],
    manifestations: {
      all: [manifestation],
      latest: manifestation,
      bestRepresentation: manifestation
    }
  };
});
