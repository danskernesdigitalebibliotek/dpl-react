import { Factory } from "fishery";
import { ComplexSuggestQuery } from "../../../src/core/dbc-gateway/generated/graphql";

export const complexSuggestFactory = Factory.define<ComplexSuggestQuery>(
  () => ({
    complexSuggest: {
      result: [
        {
          type: "title",
          term: "Harry Potter and the Philosopher's Stone",
          traceId: "trace-1"
        },
        {
          type: "title",
          term: "Harry - a Biography",
          traceId: "trace-2"
        }
      ]
    }
  })
);

export const buildComplexSuggestResponse = (
  data = complexSuggestFactory.build()
) => ({
  data
});
