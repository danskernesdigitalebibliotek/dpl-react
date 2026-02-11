import { ManifestationsSimpleFieldsFragment } from "../../../core/dbc-gateway/generated/graphql";

// Extract the contents type from the ManifestationsSimpleFieldsFragment
export type ContentsArray = NonNullable<
  ManifestationsSimpleFieldsFragment["contents"]
>;

export type ContentEntry = NonNullable<ContentsArray[0]["entries"]>[0];
export type ContentSublevel = NonNullable<ContentEntry["sublevel"]>[0];
export type ContentSublevelLast = NonNullable<ContentSublevel["sublevel"]>[0];
