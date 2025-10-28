import { Factory } from "fishery";

import {
  GetMaterialQuery,
  FictionNonfictionCodeEnum
} from "../../../src/core/dbc-gateway/generated/graphql";

import { eBookManifestation } from "../manifestation/variants/eBookManifestation";
import { audioBookManifestation } from "../manifestation/variants/audioBookManifestation";
import { originalBookManifestation } from "../manifestation/variants/originalBookManifestation";
import { newBookManifestation } from "../manifestation/variants/newBookManifestation";

export const materialFactory = Factory.define<GetMaterialQuery>(() => ({
  work: {
    workId: "work-of:870970-basis:52557240",
    titles: {
      full: ["De syv søstre : Maias historie"],
      original: ["The seven sisters"],
      tvSeries: null
    },
    abstract: [
      "Pa Salt dør og hans seks adoptivdøtre står tilbage med muligheden for at finde deres ophav."
    ],
    genreAndForm: ["romaner", "slægtsromaner"],
    materialTypes: [
      {
        materialTypeSpecific: {
          display: "e-bog"
        }
      },
      {
        materialTypeSpecific: {
          display: "lydbog (cd-mp3)"
        }
      },
      {
        materialTypeSpecific: {
          display: "bog"
        }
      }
    ],
    creators: [
      {
        __typename: "Person" as const,
        nameSort: "riley lucinda",
        display: "Lucinda Riley"
      }
    ],
    mainLanguages: [
      {
        display: "dansk",
        isoCode: "dan"
      }
    ],
    subjects: {
      all: [
        { display: "kærlighed" },
        { display: "adoption" },
        { display: "familien" },
        { display: "slægtsromaner" }
      ],
      dbcVerified: [
        { display: "kærlighed" },
        { display: "adoption" },
        { display: "familien" },
        { display: "slægtsromaner" }
      ]
    },
    fictionNonfiction: {
      display: "skønlitteratur",
      code: FictionNonfictionCodeEnum.Fiction
    },
    dk5MainEntry: {
      display: "Skønlitteratur",
      code: "sk"
    },
    relations: {
      hasReview: [
        { pid: "870976-anmeld:129471824" },
        { pid: "150005-anmeld:81092" },
        { pid: "870971-anmeld:37104132" }
      ],
      hasAdaptation: []
    },
    series: [
      {
        title: "De syv søstre-serien",
        isPopular: true,
        readThisFirst: true,
        readThisWhenever: null,
        members: [
          {
            numberInSeries: "Del 1",
            work: {
              workId: "work-of:870970-basis:52557240",
              titles: {
                main: ["De syv søstre"]
              }
            }
          },
          {
            numberInSeries: "Del 2",
            work: {
              workId: "work-of:870970-basis:53247806",
              titles: {
                main: ["Stormsøsteren"]
              }
            }
          },
          {
            numberInSeries: "Del 3",
            work: {
              workId: "work-of:870970-basis:53557791",
              titles: {
                main: ["Skyggesøsteren"]
              }
            }
          }
        ]
      }
    ],
    workYear: null,
    manifestations: {
      all: [
        newBookManifestation,
        originalBookManifestation,
        eBookManifestation,
        audioBookManifestation
      ],
      latest: newBookManifestation,
      bestRepresentation: originalBookManifestation
    },
    traceId: "trace-12345"
  }
}));

// Helper function to build proper GraphQL response structure
export const buildGetMaterialResponse = (data = materialFactory.build()) => ({
  data
});
