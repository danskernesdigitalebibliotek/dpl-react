import { Factory } from "fishery";

import {
  WorkMediumFragment,
  FictionNonfictionCodeEnum,
  AccessTypeCodeEnum,
  ChildOrAdultCodeEnum,
  IdentifierTypeEnum
} from "../../../src/core/dbc-gateway/generated/graphql";

// Use the fragment-narrowed type to match exactly what WorkMedium expects
export type ManifestationForWorkMedium =
  WorkMediumFragment["manifestations"]["all"][number];

export const manifestationFactory = Factory.define<ManifestationForWorkMedium>(
  () => ({
    pid: "870970-basis:52557240",
    genreAndForm: ["romaner", "slægtsromaner"],
    source: ["Bibliotekskatalog"],
    subjects: {
      all: []
    },
    languages: {
      main: [
        {
          display: "dansk",
          isoCode: "dan"
        }
      ],
      notes: []
    },
    titles: {
      main: ["De syv søstre"],
      original: ["The seven sisters"]
    },
    fictionNonfiction: {
      display: "skønlitteratur",
      code: FictionNonfictionCodeEnum.Fiction
    },
    materialTypes: [
      {
        materialTypeSpecific: {
          display: "bog"
        }
      }
    ],
    creators: [
      {
        __typename: "Person" as const,
        display: "Lucinda Riley"
      }
    ],
    publisher: ["Cicero"],
    identifiers: [
      {
        type: IdentifierTypeEnum.Isbn,
        value: "9788763844116"
      }
    ],
    contributors: [
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
      summary: "2016 (1. udgave)",
      publicationYear: {
        display: "2016"
      }
    },
    dateFirstEdition: {
      display: "2016",
      year: 2016
    },
    audience: {
      generalAudience: [],
      ages: [],
      childrenOrAdults: [
        {
          display: "til voksne",
          code: ChildOrAdultCodeEnum.ForAdults
        }
      ]
    },
    notes: [],
    physicalDescription: {
      summaryFull: "523 sider",
      numberOfPages: 523
    },
    hostPublication: null,
    accessTypes: [
      {
        code: AccessTypeCodeEnum.Physical
      }
    ],
    access: [
      {
        __typename: "InterLibraryLoan",
        loanIsPossible: true
      }
    ],
    shelfmark: {
      shelfmark: "shelfmark",
      postfix: "postfix"
    },
    workYear: null,
    catalogueCodes: {
      nationalBibliography: ["DBF201835"],
      otherCatalogues: ["ACC201634", "BKM201835"]
    }
  })
);
