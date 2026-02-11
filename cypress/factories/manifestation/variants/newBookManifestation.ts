import { manifestationFactory } from "../manifestation.factory";
import { IdentifierTypeEnum } from "../../../../src/core/dbc-gateway/generated/graphql";

export const newBookManifestation = manifestationFactory.build({
  pid: "870970-basis:53292968",

  identifiers: [
    {
      type: IdentifierTypeEnum.Isbn,
      value: "9788763849630"
    }
  ],

  edition: {
    summary: "2017 (2. udgave)",
    publicationYear: {
      display: "2017"
    }
  },

  catalogueCodes: {
    nationalBibliography: ["DBF202510"],
    otherCatalogues: ["ACC201727", "BKM202510"]
  }
});
