// Replace cypress/fixtures/material/material-grid-related-recommendations.json
import { Factory } from "fishery";
import { WorkRecommendationsQuery } from "../../../src/core/dbc-gateway/generated/graphql";

// Type for the recommend data structure
export type RecommendData = WorkRecommendationsQuery["recommend"];

const WorkRecommendationsFactory = Factory.define<RecommendData>(() => ({
  result: [
    {
      work: {
        workId: "work-of:870970-basis:51753887",
        titles: {
          main: ["Midnatsrosen"]
        },
        creators: [
          {
            display: "Lucinda Riley"
          }
        ]
      }
    },
    {
      work: {
        workId: "work-of:870970-basis:138613445",
        titles: {
          main: ["Ildfuglen"]
        },
        creators: [
          {
            display: "Susanna Kearsley"
          }
        ]
      }
    },
    {
      work: {
        workId: "work-of:870970-basis:53247806",
        titles: {
          main: ["Stormsøsteren"]
        },
        creators: [
          {
            display: "Lucinda Riley"
          }
        ]
      }
    },
    {
      work: {
        workId: "work-of:870970-basis:06874908",
        titles: {
          main: ["Kærlighed i koleraens tid"]
        },
        creators: [
          {
            display: "Gabriel García Márquez"
          }
        ]
      }
    },
    {
      work: {
        workId: "work-of:870970-basis:52408725",
        titles: {
          main: ["Bedemandens datter"]
        },
        creators: [
          {
            display: "Sara Blædel"
          }
        ]
      }
    },
    {
      work: {
        workId: "work-of:870970-basis:61510141",
        titles: {
          main: ["Vand til blomster"]
        },
        creators: [
          {
            display: "Valérie Perrin"
          }
        ]
      }
    },
    {
      work: {
        workId: "work-of:870970-basis:136067265",
        titles: {
          main: ["Kærlighed i teorien"]
        },
        creators: [
          {
            display: "Ali Hazelwood"
          }
        ]
      }
    },
    {
      work: {
        workId: "work-of:870970-basis:137171112",
        titles: {
          main: ["Ærens veje"]
        },
        creators: [
          {
            display: "Jeffrey Archer"
          }
        ]
      }
    }
  ]
}));

export default WorkRecommendationsFactory;
