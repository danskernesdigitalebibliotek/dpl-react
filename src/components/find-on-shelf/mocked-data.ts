import {
  AccessTypeCodeEnum,
  FictionNonfictionCodeEnum
} from "../../core/dbc-gateway/generated/graphql";
import { Manifestation } from "../../core/utils/types/entities";

export const mockedManifestationData: Manifestation[] = [
  {
    pid: "870970-basis:52557240",
    genreAndForm: ["slægtsromaner"],
    source: ["Bibliotekskatalog"],
    titles: {
      main: ["De syv søstre"],
      original: ["The seven sisters"]
    },
    fictionNonfiction: {
      display: "SKOENLITTERATUR",
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
        display: "Lucinda Riley",
        __typename: "Person",
        nameSort: "Riley, Lucinda"
      }
    ],
    publisher: [""],
    languages: {
      main: [
        {
          display: "dansk",
          isoCode: "dan"
        }
      ]
    },
    identifiers: [
      {
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
      summary: "1. udgave, 3. oplag (2018)",
      publicationYear: {
        display: "2016"
      }
    },
    audience: {
      generalAudience: [],
      ages: [],
      childrenOrAdults: []
    },
    notes: [],
    physicalDescription: {
      numberOfPages: null,
      summaryFull: ""
    },
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
    shelfmark: null,
    catalogueCodes: {
      nationalBibliography: [],
      otherCatalogues: []
    }
  },
  {
    pid: "870970-basis:52643414",
    genreAndForm: ["slægtsromaner"],
    source: ["Bibliotekskatalog"],
    titles: {
      main: ["De syv søstre (mp3)"],
      original: ["The seven sisters"]
    },
    fictionNonfiction: {
      display: "SKOENLITTERATUR",
      code: "FICTION" as FictionNonfictionCodeEnum
    },
    materialTypes: [
      {
        materialTypeSpecific: {
          display: "lydbog (cd-mp3)"
        }
      }
    ],
    creators: [
      {
        display: "Lucinda Riley",
        __typename: "Person",
        nameSort: "Riley, Lucinda"
      }
    ],
    publisher: [""],
    languages: {
      main: [
        {
          display: "dansk",
          isoCode: "dan"
        }
      ]
    },
    identifiers: [
      {
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
      summary: "1. lydbogsudgave",
      publicationYear: {
        display: "2016"
      }
    },
    audience: {
      generalAudience: [],
      ages: [],
      childrenOrAdults: []
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
      numberOfPages: null,
      summaryFull: ""
    },
    accessTypes: [
      {
        code: "PHYSICAL" as AccessTypeCodeEnum
      }
    ],
    access: [
      {
        __typename: "InterLibraryLoan",
        loanIsPossible: true
      }
    ],
    shelfmark: { postfix: "Postfix, 24", shelfmark: "60.7" },
    catalogueCodes: {
      nationalBibliography: [],
      otherCatalogues: []
    }
  }
];

export const mockedPeriodicalManifestationData: Manifestation[] = [
  {
    pid: "870970-basis:06373674",
    genreAndForm: [],
    source: ["Bibliotekskatalog"],
    titles: {
      main: ["Alt for damerne"],
      original: []
    },
    fictionNonfiction: {
      display: "FAGLITTERATUR",
      code: "NONFICTION" as FictionNonfictionCodeEnum
    },
    materialTypes: [
      {
        materialTypeSpecific: {
          display: "tidsskrift"
        }
      }
    ],
    creators: [],
    publisher: [""],
    languages: {
      main: [
        {
          display: "dansk",
          isoCode: "dan"
        }
      ]
    },
    identifiers: [
      {
        value: "0002-6506"
      }
    ],
    contributors: [],
    edition: {
      summary: "",
      publicationYear: {
        display: "1946"
      }
    },
    audience: {
      generalAudience: [],
      ages: [],
      childrenOrAdults: []
    },
    notes: [
      {
        display: ["[Nr. 1, 1946]-"]
      },
      {
        display: ["Ugentlig"]
      },
      {
        display: [
          "Tidligere udgivet: Kbh. : Gutenberghus Bladene",
          "Hertil findes tillæg",
          "Hertil findes årligt tillæg med titel: Skønhed"
        ]
      }
    ],
    physicalDescription: {},
    accessTypes: [
      {
        code: "PHYSICAL" as AccessTypeCodeEnum
      }
    ],
    access: [
      {
        __typename: "DigitalArticleService",
        issn: "00026506"
      },
      {
        __typename: "InterLibraryLoan",
        loanIsPossible: true
      }
    ],
    shelfmark: null,
    catalogueCodes: {
      nationalBibliography: [],
      otherCatalogues: []
    }
  }
];

export default {};
