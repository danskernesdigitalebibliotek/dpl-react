import {
  AccessUnion,
  AccessUrl,
  DigitalArticleService,
  Ereol,
  FacetResult,
  InfomediaService,
  InterLibraryLoan,
  ManifestationReviewFieldsFragment,
  ManifestationsSimpleFieldsFragment,
  Relations,
  WorkMediumFragment
} from "../../dbc-gateway/generated/graphql";
import { PatronV5 } from "../../fbs/model";
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

export type Patron = PatronV5;

export type Facets = FacetResult[] | null;

// export type Access = AccessUnion;
export type ManifestationAccess = AccessUnion[];

/*
export type AccessUnion =
  | AccessUrl
  | DigitalArticleService
  | Ereol
  | InfomediaService
  | InterLibraryLoan;


  */

export type AccessTypes =
  | AccessUrl["__typename"]
  | DigitalArticleService["__typename"]
  | Ereol["__typename"]
  | InfomediaService["__typename"]
  | InterLibraryLoan["__typename"];
