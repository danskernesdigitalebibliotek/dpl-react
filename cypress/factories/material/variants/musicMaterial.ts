import { GeneralMaterialTypeCodeEnum } from "../../../../src/core/dbc-gateway/generated/graphql";
import { materialFactory } from "../material.factory";

export const musicMaterial = materialFactory.build({
  work: {
    titles: {
      full: ["Test Music Album"],
      original: null
    },
    materialTypes: [
      {
        materialTypeGeneral: { code: GeneralMaterialTypeCodeEnum.Music },
        materialTypeSpecific: { display: "musik (cd)" }
      }
    ],
    creators: [
      {
        __typename: "Person" as const,
        nameSort: "Music Artist",
        display: "Music Artist"
      }
    ]
  }
});
