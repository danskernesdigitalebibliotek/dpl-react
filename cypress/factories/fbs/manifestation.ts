import { Factory } from "fishery";
import {
  WorkMediumFragment,
  AccessTypeCodeEnum,
  FictionNonfictionCodeEnum
} from "../../../src/core/dbc-gateway/generated/graphql";

// Use the fragment-narrowed type to match exactly what WorkMedium expects
export type ManifestationForWorkMedium =
  WorkMediumFragment["manifestations"]["all"][number];

const manifestationFactory = Factory.define<ManifestationForWorkMedium>(() => ({
  pid: "870970-basis:52557240",
  genreAndForm: ["roman", "slægtsromaner"],
  source: ["Bibliotekskatalog"],
  publisher: ["Cicero"],
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
      materialTypeSpecific: { display: "bog" }
    }
  ],
  creators: [
    {
      __typename: "Person",
      display: "Lucinda Riley",
      nameSort: "Riley, Lucinda"
    }
  ],
  identifiers: [{ value: "9788763844116" }],
  contributors: [
    {
      display: "Ulla Lauridsen",
      roles: [
        {
          function: { singular: "oversætter" }
        }
      ]
    }
  ],
  edition: {
    summary: "1. udgave, 2016",
    publicationYear: { display: "2016" }
  },
  dateFirstEdition: null,
  audience: {
    generalAudience: [],
    ages: [],
    childrenOrAdults: []
  },
  notes: [],
  languages: {
    main: [
      {
        display: "dansk",
        isoCode: "dan"
      }
    ],
    notes: []
  },
  physicalDescription: {
    summaryFull: "523 sider ",
    numberOfPages: 523,
    playingTime: null
  },
  hostPublication: null,
  manifestationParts: null,
  accessTypes: [{ code: AccessTypeCodeEnum.Physical }],
  access: [
    {
      __typename: "InterLibraryLoan",
      loanIsPossible: true
    }
  ],
  shelfmark: null,
  workYear: null,
  catalogueCodes: {
    nationalBibliography: ["DBF201835"],
    otherCatalogues: ["ACC201634", "BKM201835"]
  }
}));

export default manifestationFactory;
