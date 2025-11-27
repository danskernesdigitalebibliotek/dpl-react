import { Factory } from "fishery";
import { ComplexSearchWithPaginationQuery } from "../../../src/core/dbc-gateway/generated/graphql";
import { workSmallFactory } from "./workSmall.factory";

/**
 * Factory for ComplexSearchWithPagination query response
 */
export const complexSearchWithPaginationFactory =
  Factory.define<ComplexSearchWithPaginationQuery>(() => ({
    complexSearch: {
      hitcount: 1,
      works: [workSmallFactory.build()]
    }
  }));

export const buildComplexSearchWithPaginationResponse = (
  data = complexSearchWithPaginationFactory.build()
) => ({
  data
});

// Helper to create response with multiple works
export const buildComplexSearchWithPaginationResponseWithWorks = (
  workCount: number
) => ({
  data: {
    complexSearch: {
      hitcount: workCount,
      works: workSmallFactory.buildList(workCount, {}, { transient: {} })
    }
  }
});

// Helper to create empty results
export const buildComplexSearchWithPaginationEmptyResponse = () => ({
  data: {
    complexSearch: {
      hitcount: 0,
      works: []
    }
  }
});
