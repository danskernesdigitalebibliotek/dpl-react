import { materialFactory } from "../material.factory";
import { manifestationFactory } from "../../manifestation/manifestation.factory";
import {
  AccessTypeCodeEnum,
  FictionNonfictionCodeEnum,
  GeneralMaterialTypeCodeEnum
} from "../../../../src/core/dbc-gateway/generated/graphql";

export const periodicalManifestation = manifestationFactory.build({
  pid: "870970-basis:06373674",
  titles: {
    main: ["Alt for damerne"],
    original: []
  },
  edition: {
    summary: "1946",
    publicationYear: { display: "1946" }
  },
  materialTypes: [
    {
      materialTypeSpecific: {
        display: "tidsskrift"
      }
    }
  ],
  genreAndForm: ["tidsskrift"],
  accessTypes: [{ code: AccessTypeCodeEnum.Physical }],
  fictionNonfiction: {
    display: "nonfiktion",
    code: FictionNonfictionCodeEnum.Nonfiction
  },
  creators: []
});

export const periodicalMaterial = materialFactory.build({
  work: {
    workId: "work-of:870970-basis:06373674",
    titles: {
      full: ["Alt for damerne"],
      original: []
    },
    abstract: [],
    genreAndForm: ["tidsskrift"],
    materialTypes: [
      {
        materialTypeGeneral: {
          code: GeneralMaterialTypeCodeEnum.NewspaperJournals
        },
        materialTypeSpecific: { display: "tidsskrift" }
      }
    ],
    fictionNonfiction: {
      display: "nonfiktion",
      code: FictionNonfictionCodeEnum.Nonfiction
    },
    creators: [],
    manifestations: {
      all: [periodicalManifestation],
      latest: periodicalManifestation,
      bestRepresentation: periodicalManifestation
    }
  }
});
