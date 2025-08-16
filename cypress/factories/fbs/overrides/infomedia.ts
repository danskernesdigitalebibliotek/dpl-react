// Rplace cypress/fixtures/material/infomedia-fbi-api.json
import {
  WorkMediumFragment,
  FictionNonfictionCodeEnum,
  AccessTypeCodeEnum
} from "../../../../src/core/dbc-gateway/generated/graphql";
import manifestationFactory from "../manifestation";

export const infomedia: Partial<WorkMediumFragment> = {
  fictionNonfiction: {
    display: "faglitteratur",
    code: FictionNonfictionCodeEnum.Nonfiction
  },
  materialTypes: [
    { materialTypeSpecific: { display: "artikel" } },
    { materialTypeSpecific: { display: "artikel (online)" } }
  ],
  manifestations: {
    all: [
      manifestationFactory.build({
        materialTypes: [
          { materialTypeSpecific: { display: "artikel" } },
          { materialTypeSpecific: { display: "artikel (online)" } }
        ],
        source: ["Avisartikler"],
        languages: {
          main: [
            {
              display: "dansk",
              isoCode: "dan"
            }
          ]
        },
        edition: {
          summary: "2013",
          publicationYear: { display: "2013" }
        },
        physicalDescription: {
          summaryFull: "Sektion 3, s. 6-7: ill.",
          numberOfPages: 2
        },
        hostPublication: {
          summary: "Politiken, 2013-09-19"
        },
        accessTypes: [
          { code: AccessTypeCodeEnum.Physical },
          { code: AccessTypeCodeEnum.Online }
        ],
        access: [
          {
            __typename: "InfomediaService",
            id: "e3fba430"
          }
        ]
      })
    ],
    latest: manifestationFactory.build({
      materialTypes: [
        { materialTypeSpecific: { display: "artikel" } },
        { materialTypeSpecific: { display: "artikel (online)" } }
      ],
      source: ["Avisartikler"]
    }),
    bestRepresentation: manifestationFactory.build({
      materialTypes: [
        { materialTypeSpecific: { display: "artikel" } },
        { materialTypeSpecific: { display: "artikel (online)" } }
      ],
      source: ["Avisartikler"]
    })
  }
};
