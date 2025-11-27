import { Factory } from "fishery";
import { ComplexSuggestQuery } from "../../../src/core/dbc-gateway/generated/graphql";

export const complexSuggestFactory = Factory.define<ComplexSuggestQuery>(
  () => ({
    complexSuggest: {
      result: [
        {
          term: "harry potter",
          work: {
            workId: "work-of:870970-basis:12345678",
            titles: {
              main: ["Harry Potter and the Philosopher's Stone"]
            }
          }
        },
        {
          term: "harry",
          work: {
            workId: "work-of:870970-basis:87654321",
            titles: {
              main: ["Harry - a Biography"]
            }
          }
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
