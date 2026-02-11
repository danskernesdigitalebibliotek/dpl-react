import { manifestationFactory } from "../manifestation.factory";
import { IdentifierTypeEnum } from "../../../../src/core/dbc-gateway/generated/graphql";

export const audioBookManifestation = manifestationFactory.build({
  pid: "870970-basis:52643414",

  titles: {
    main: ["De syv søstre (mp3)"],
    original: ["The seven sisters"]
  },

  materialTypes: [
    {
      materialTypeSpecific: {
        display: "lydbog (cd-mp3)"
      }
    }
  ],

  publisher: ["Rosinante"],
  identifiers: [
    {
      type: IdentifierTypeEnum.Isbn,
      value: "9788763850636"
    }
  ],
  contributors: [
    {
      display: "Maria Stokholm",
      roles: [
        {
          function: {
            singular: "indlæser"
          }
        }
      ]
    },
    {
      display: "Ulla Lauridsen",
      roles: [
        {
          function: {
            singular: "oversætter"
          }
        }
      ]
    }
  ],
  edition: {
    summary: "2016 (1. lydbogsudgave)",
    publicationYear: {
      display: "2016"
    }
  },

  notes: [
    {
      display: [
        "Gengivelse af bogen",
        "Indlæst efter 1. udgave. 2016. ISBN: 9788763844116"
      ]
    }
  ],
  physicalDescription: {
    summaryFull: "1 cd i 1 mappe (mp3, 16 t., 30 min.)",
    numberOfPages: null
  },

  access: [
    {
      __typename: "InterLibraryLoan",
      loanIsPossible: true
    }
  ],

  catalogueCodes: {
    nationalBibliography: ["DLF201642"],
    otherCatalogues: ["BKM201642", "DAT201713"]
  }
});
