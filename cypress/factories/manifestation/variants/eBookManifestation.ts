import { manifestationFactory } from "../manifestation.factory";
import { AccessTypeCodeEnum } from "../../../../src/core/dbc-gateway/generated/graphql";

export const eBookManifestation = manifestationFactory.build({
  pid: "870970-basis:140969516",

  source: ["eReolen"],

  materialTypes: [
    {
      materialTypeSpecific: {
        display: "e-bog"
      }
    }
  ],

  identifiers: [
    {
      value: "9788702441000"
    },
    {
      value: "9788702441000"
    }
  ],

  edition: {
    summary: "2025 (2. e-bogsudgave)",
    publicationYear: {
      display: "2025"
    }
  },
  dateFirstEdition: null,

  physicalDescription: null,

  accessTypes: [
    {
      code: AccessTypeCodeEnum.Online
    }
  ],
  access: [
    {
      __typename: "Ereol",
      origin: "eReolen",
      url: "https://ereolen.dk/ting/object/870970-basis:140969516",
      canAlwaysBeLoaned: false
    }
  ],

  catalogueCodes: {
    nationalBibliography: ["DBF202529"],
    otherCatalogues: ["ACC202525", "ERE202529", "BKM202529"]
  }
});
