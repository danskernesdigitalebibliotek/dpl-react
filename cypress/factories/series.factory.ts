import { Factory } from "fishery";
import type { Series } from "../../src/core/dbc-gateway/generated/graphql";

export const seriesFactory = Factory.define<Series>(() => ({
  __typename: "Series",
  title: "De syv søstre-serien",
  alternativeTitles: [],
  description: null,
  hitcount: 8,
  identifyingAddition: null,
  isPopular: true,
  mainLanguages: ["dansk"],
  members: [],
  numberInSeries: null,
  parallelTitles: [],
  readThisFirst: true,
  readThisWhenever: null,
  seriesId: null,
  traceId: "traceId",
  workTypes: ["roman"]
}));
