// Replace cypress/fixtures/material/fbi-api.json
import { Factory } from "fishery";
import {
  FictionNonfictionCodeEnum,
  WorkMediumFragment,
  AccessTypeCodeEnum
} from "../../../src/core/dbc-gateway/generated/graphql";
import manifestationFactory from "./manifestation";

const workMediumFactory = Factory.define<WorkMediumFragment>(() => ({
  workId: "work-of:870970-basis:52557240",
  titles: {
    full: ["De syv søstre : Maias historie"],
    original: ["The seven sisters"],
    tvSeries: null
  },
  abstract: [],
  creators: [
    {
      __typename: "Person",
      display: "Lucinda Riley",
      nameSort: "Riley, Lucinda"
    }
  ],
  series: [
    {
      title: "De syv søstre-serien",
      isPopular: true,
      members: [
        {
          numberInSeries: "Del 1",
          work: {
            workId: "work-of:870970-basis:52557240",
            titles: {
              main: ["De syv søstre"],
              full: ["De syv søstre : Maias historie"],
              original: ["The seven sisters"]
            }
          }
        },
        {
          numberInSeries: "Del 2",
          work: {
            workId: "work-of:870970-basis:52970628",
            titles: {
              main: ["Stormsøsteren"],
              full: ["Stormsøsteren : Allys historie"],
              original: ["The storm sister"]
            }
          }
        },
        {
          numberInSeries: "Del 3",
          work: {
            workId: "work-of:870970-basis:53280749",
            titles: {
              main: ["Skyggesøsteren"],
              full: ["Skyggesøsteren : Stars historie"],
              original: ["The shadow sister"]
            }
          }
        },
        {
          numberInSeries: "Del 4",
          work: {
            workId: "work-of:870970-basis:53802001",
            titles: {
              main: ["Perlesøsteren"],
              full: ["Perlesøsteren : CeCes historie"],
              original: ["The pearl sister"]
            }
          }
        },
        {
          numberInSeries: "Del 5",
          work: {
            workId: "work-of:870970-basis:54189141",
            titles: {
              main: ["Månesøsteren"],
              full: ["Månesøsteren : Tiggys historie"],
              original: ["The moon sister"]
            }
          }
        },
        {
          numberInSeries: "Del 6",
          work: {
            workId: "work-of:870970-basis:46656172",
            titles: {
              main: ["Solsøsteren"],
              full: ["Solsøsteren : Electras historie"],
              original: ["The sun sister"]
            }
          }
        },
        {
          numberInSeries: "Del 7",
          work: {
            workId: "work-of:870970-basis:38500775",
            titles: {
              main: ["Den forsvundne søster"],
              full: ["Den forsvundne søster"],
              original: ["The missing sister"]
            }
          }
        },
        {
          numberInSeries: "Del 8",
          work: {
            workId: "work-of:870970-basis:134823658",
            titles: {
              main: ["Atlas"],
              full: ["Atlas : historien om Pa Salt"],
              original: ["Atlas (engelsk)"]
            }
          }
        }
      ],
      readThisFirst: true,
      readThisWhenever: null
    }
  ],
  workYear: { year: 2016 },
  genreAndForm: ["roman", "slægtsromaner"],
  manifestations: {
    all: [
      manifestationFactory.build({
        materialTypes: [{ materialTypeSpecific: { display: "bog" } }],
        pid: "870970-basis:52557240"
      }),
      manifestationFactory.build({
        materialTypes: [{ materialTypeSpecific: { display: "e-bog" } }],
        pid: "870970-basis:52590302",
        source: ["eReolen"],
        edition: {
          summary: "1. eBogsudgave, 2016",
          publicationYear: { display: "2016" }
        },
        accessTypes: [{ code: AccessTypeCodeEnum.Physical }],
        access: [
          {
            __typename: "Ereol",
            origin: "eReolen",
            url: "https://ereolen.dk/ting/object/870970-basis:52590302",
            canAlwaysBeLoaned: false
          }
        ]
      }),
      manifestationFactory.build({
        materialTypes: [
          { materialTypeSpecific: { display: "lydbog (cd-mp3)" } }
        ],
        pid: "870970-basis:52643414",
        titles: {
          main: ["De syv søstre (mp3)"],
          original: ["The seven sisters"]
        },
        publisher: ["Rosinante"],
        contributors: [
          {
            display: "Maria Stokholm",
            roles: [{ function: { singular: "indlæser" } }]
          },
          {
            display: "Ulla Lauridsen",
            roles: [{ function: { singular: "oversætter" } }]
          }
        ],
        edition: {
          summary: "1. lydbogsudgave, 2016",
          publicationYear: { display: "2016" }
        },
        physicalDescription: {
          summaryFull: "1 cd i 1 mappe (mp3) 16 t., 30 min.",
          numberOfPages: null
        }
      })
    ],
    latest: manifestationFactory.build({
      materialTypes: [{ materialTypeSpecific: { display: "lydbog (cd-mp3)" } }],
      pid: "870970-basis:52643414"
    }),
    bestRepresentation: manifestationFactory.build({
      materialTypes: [{ materialTypeSpecific: { display: "lydbog (cd-mp3)" } }],
      pid: "870970-basis:52643414"
    })
  },
  materialTypes: [
    { materialTypeSpecific: { display: "lydbog (cd-mp3)" } },
    { materialTypeSpecific: { display: "e-bog" } },
    { materialTypeSpecific: { display: "bog" } }
  ],
  mainLanguages: [{ display: "dansk", isoCode: "dan" }],
  subjects: {
    all: [{ display: "kærlighed" }],
    dbcVerified: [{ display: "kærlighed" }]
  },
  fictionNonfiction: {
    display: "skønlitteratur",
    code: FictionNonfictionCodeEnum.Fiction
  },
  dk5MainEntry: { display: "Skønlitteratur", code: "sk" },
  relations: {
    hasReview: [{ pid: "150005-anmeld:81092" }],
    hasAdaptation: []
  }
}));

export default workMediumFactory;
