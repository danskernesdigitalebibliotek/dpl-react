import {
  AccessUrl,
  DigitalArticleService,
  Ereol,
  FacetResult,
  InfomediaService,
  InterLibraryLoan,
  ManifestationReviewFieldsFragment,
  ManifestationsSimpleFieldsFragment,
  Maybe,
  Relations,
  SearchHit,
  WorkMediumFragment,
  WorkSmallFragment
} from "../../dbc-gateway/generated/graphql";
import { AuthenticatedPatronV8, PatronV5 } from "../../fbs/model";
import { Pid, WorkId } from "./ids";

export type ManifestationWithFormattedPid<TManifestation> = Omit<
  TManifestation,
  "pid"
> & {
  pid: Pid;
};

export type Manifestation =
  ManifestationWithFormattedPid<ManifestationsSimpleFieldsFragment>;

type Manifestations = {
  __typename?: "Manifestations";
  all: Array<Manifestation>;
  bestRepresentation: Manifestation;
  bestRepresentations: Array<Manifestation>;
  first: Manifestation;
  latest: Manifestation;
  mostRelevant: Array<Manifestation>;
  /**
   * A list of manifestations that matched the search query.
   *
   * This field is populated only when a work is retrieved within a search context.
   * Each entry is a SearchHit object representing a manifestation that matched the search criteria.
   * Only one manifestation per unit is returned.
   */
  searchHits?: Maybe<Array<SearchHit>>;
};

export type ReviewManifestation =
  ManifestationWithFormattedPid<ManifestationReviewFieldsFragment>;

export type WorkSmall = Omit<WorkSmallFragment, "workId" | "manifestations"> & {
  workId: WorkId;
  manifestations: Manifestations;
};

export type Work = Omit<
  WorkMediumFragment,
  "workId" | "manifestations" | "relations"
> & {
  workId: WorkId;
  manifestations: Manifestations;
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

export type AuthenticatedPatron = AuthenticatedPatronV8;

export type Facets = FacetResult[] | null;

export type AccessTypes =
  | AccessUrl["__typename"]
  | DigitalArticleService["__typename"]
  | Ereol["__typename"]
  | InfomediaService["__typename"]
  | InterLibraryLoan["__typename"];
