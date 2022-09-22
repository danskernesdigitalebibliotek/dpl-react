export const mockedManifestationData = [
  {
    pid: "870970-basis:52557240",
    genreAndForm: ["slægtsromaner"],
    source: ["Bibliotekskatalog"],
    titles: {
      main: ["De syv søstre"],
      original: ["The seven sisters"]
    },
    publicationYear: {
      display: "2016"
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
    hostPublication: null,
    languages: {
      main: [
        {
          display: "dansk"
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
      summary: "1. udgave, 3. oplag (2018)"
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
        code: "PHYSICAL"
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
    publicationYear: {
      display: "2016"
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
    hostPublication: null,
    languages: {
      main: [
        {
          display: "dansk"
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
      summary: "1. lydbogsudgave"
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
        code: "PHYSICAL"
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

export default mockedManifestationData;
