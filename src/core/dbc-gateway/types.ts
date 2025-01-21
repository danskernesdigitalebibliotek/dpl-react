import { operationNames } from "./generated/graphql";

type QueryOperations = keyof typeof operationNames.Query;
type MutationOperations = keyof typeof operationNames.Mutation;
export type Operations = QueryOperations | MutationOperations;
