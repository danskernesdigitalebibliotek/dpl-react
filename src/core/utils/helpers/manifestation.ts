import { first } from "lodash";
import { getFirstBookManifestation } from "../../../apps/material/helper";
import { Work } from "../types/entities";

export const getBestManifestation = (work: Work, context: "cover") => {
  const {
    manifestations: { all: allManifestations, bestRepresentation, mostRelevant }
  } = work;

  console.log("allManifestations", allManifestations);

  const bookManifestation = getFirstBookManifestation(allManifestations);

  if (context === "cover") {
    // For cover, we want to prioritize the best representation or most relevant manifestation.
    return bookManifestation || first(mostRelevant) || bestRepresentation;
  }

  return first(mostRelevant) || bestRepresentation;
};
