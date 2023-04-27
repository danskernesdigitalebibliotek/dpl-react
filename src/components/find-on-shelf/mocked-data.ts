import {
  AccessTypeCode,
  FictionNonfictionCode
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
      code: "FICTION" as FictionNonfictionCode
    },
    materialTypes: [
      {
        specific: "bog"
      }
    ],
    creators: [
      {
        display: "Lucinda Riley",
        __typename: "Person"
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
        display: "Ulla Lauridsen"
      }
    ],
    edition: {
      summary: "1. udgave, 3. oplag (2018)",
      publicationYear: {
        display: "2016"
      }
    },
    audience: {
      generalAudience: []
    },
    physicalDescriptions: [
      {
        numberOfPages: null
      }
    ],
    accessTypes: [
      {
        code: "PHYSICAL" as AccessTypeCode
      }
    ],
    access: [
      {
        __typename: "InterLibraryLoan",
        loanIsPossible: true
      }
    ],
    shelfmark: null
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
      code: "FICTION" as FictionNonfictionCode
    },
    materialTypes: [
      {
        specific: "lydbog (cd-mp3)"
      }
    ],
    creators: [
      {
        display: "Lucinda Riley",
        __typename: "Person"
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
        display: "Maria Stokholm"
      },
      {
        display: "Ulla Lauridsen"
      }
    ],
    edition: {
      summary: "1. lydbogsudgave",
      publicationYear: {
        display: "2016"
      }
    },
    audience: {
      generalAudience: []
    },
    physicalDescriptions: [
      {
        numberOfPages: null
      }
    ],
    accessTypes: [
      {
        code: "PHYSICAL" as AccessTypeCode
      }
    ],
    access: [
      {
        __typename: "InterLibraryLoan",
        loanIsPossible: true
      }
    ],
    shelfmark: { postfix: "Postfix, 24", shelfmark: "60.7" }
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
      code: "NONFICTION" as FictionNonfictionCode
    },
    materialTypes: [
      {
        specific: "tidsskrift"
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
      generalAudience: []
    },
    physicalDescriptions: [],
    accessTypes: [
      {
        code: "PHYSICAL" as AccessTypeCode
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
    shelfmark: null
  }
];

export default {};
