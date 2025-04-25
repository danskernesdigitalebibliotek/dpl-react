import {
  AccessUrl,
  DigitalArticleService,
  Ereol,
  FacetResult,
  InfomediaService,
  InterLibraryLoan,
  ManifestationReviewFieldsFragment,
  ManifestationsSimpleFieldsFragment,
  Relations,
  WorkMediumFragment,
  WorkSmallFragment
} from "../../dbc-gateway/generated/graphql";
import { PersonPatronV2 } from "../../fbs/model";
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

export type WorkSmall = Omit<WorkSmallFragment, "workId" | "manifestations"> & {
  workId: WorkId;
  manifestations: {
    all: Manifestation[];
    first: Manifestation;
    latest: Manifestation;
    bestRepresentation: Manifestation;
  };
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

export type Patron = PersonPatronV2;

export type Facets = FacetResult[] | null;

export type AccessTypes =
  | AccessUrl["__typename"]
  | DigitalArticleService["__typename"]
  | Ereol["__typename"]
  | InfomediaService["__typename"]
  | InterLibraryLoan["__typename"];
