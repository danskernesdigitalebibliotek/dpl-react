import {
  ManifestationReviewFieldsFragment,
  ManifestationsSimpleFieldsFragment,
  Relations,
  WorkMediumFragment
} from "../../dbc-gateway/generated/graphql";
import { Pid, WorkId } from "./ids";

export type Manifestation = Omit<ManifestationsSimpleFieldsFragment, "pid"> & {
  pid: Pid;
};

export type ReviewManifestation = Omit<
  ManifestationReviewFieldsFragment,
  "pid"
> & {
  pid: Pid;
};

export type Work = Omit<
  WorkMediumFragment,
  "workId" | "manifestations" | "relations"
> & {
  workId: WorkId;
  manifestations: {
    all: Manifestation[];
    first: Manifestation;
    latest: Manifestation;
    bestRepresentation: Manifestation;
  };
  // Nested Omit<...> unfortunately doesn't work here, so if relations property
  // ever changes it will have to be updated here as well.
  relations: {
    __typename?: "Relations" | undefined;
    hasReview: {
      __typename?: "Manifestation" | undefined;
      pid: Pid;
    }[];
    hasAdaptation: Relations["hasAdaptation"];
  };
};
