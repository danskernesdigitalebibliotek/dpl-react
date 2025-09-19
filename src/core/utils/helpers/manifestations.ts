import { first } from "lodash";
import { Manifestation, Work, WorkSmall } from "../types/entities";
import { Suggestion } from "../types/autosuggest";

export type RepresentativeManifestationContextType =
  | "material-details"
  | "auto-suggest"
  | "cover"
  | "material-description"
  | "material"
  | "recommended-material";

export const getRepresentativeManifestation = ({
  work,
  context
}: {
  work: Work | Suggestion["work"] | WorkSmall;
  context: RepresentativeManifestationContextType;
}): Manifestation => {
  const mostRelevant =
    (first(work?.manifestations?.mostRelevant) as Manifestation) ?? null;
  const bestRepresentation =
    (work?.manifestations?.bestRepresentation as Manifestation) ?? null;

  const manifestationMap = {
    // Best representation is used for material details
    "material-details": bestRepresentation,
    // Most relevant is used for everything else
    "auto-suggest": mostRelevant,
    cover: mostRelevant,
    "material-description": mostRelevant,
    material: mostRelevant,
    "recommended-material": mostRelevant
  };

  const manifestation = manifestationMap[context] ?? bestRepresentation;
  if (!manifestation?.pid) {
    throw new Error("No valid pid found in representative manifestation");
  }

  return manifestation;
};
