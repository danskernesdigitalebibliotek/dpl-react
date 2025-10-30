import { materialFactory } from "../material.factory";
import { manifestationFactory } from "../../manifestation/manifestation.factory";
import {
  AccessTypeCodeEnum,
  FictionNonfictionCodeEnum
} from "../../../../src/core/dbc-gateway/generated/graphql";

const nonFictionManifestation = manifestationFactory.build({
  titles: {
    main: ["Turen går til Rom"],
    original: ["Turen går til Rom"]
  },
  edition: {
    summary: "2024 (1. udgave)",
    publicationYear: { display: "2024" }
  },
  accessTypes: [{ code: AccessTypeCodeEnum.Physical }],
  fictionNonfiction: {
    display: "faglitteratur",
    code: FictionNonfictionCodeEnum.Nonfiction
  }
});

export const nonFictionMaterial = materialFactory.build({
  work: {
    titles: {
      full: ["Turen går til Rom"],
      original: null,
      tvSeries: null
    },
    genreAndForm: ["rejsebøger", "rejsebeskrivelser"],
    fictionNonfiction: {
      display: "faglitteratur",
      code: FictionNonfictionCodeEnum.Nonfiction
    },
    manifestations: {
      all: [nonFictionManifestation],
      latest: nonFictionManifestation,
      bestRepresentation: nonFictionManifestation
    }
  }
});
