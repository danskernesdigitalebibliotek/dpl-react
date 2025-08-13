import { Factory } from "fishery";
import type { CreatorInterface } from "../../src/core/dbc-gateway/generated/graphql";

// Create a simplified Creator type for factory use
export interface Creator extends CreatorInterface {
  __typename: "Person" | "Corporation";
}

export const creatorFactory = Factory.define<Creator>(() => ({
  __typename: "Person",
  display: "Lucinda Riley",
  nameSort: "Riley, Lucinda",
  roles: []
}));
