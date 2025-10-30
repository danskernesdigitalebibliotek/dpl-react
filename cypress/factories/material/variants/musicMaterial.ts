import { materialFactory } from "../material.factory";

export const musicMaterial = materialFactory.build({
  work: {
    titles: {
      full: ["Test Music Album"],
      original: null,
      tvSeries: null
    },
    materialTypes: [
      {
        materialTypeSpecific: {
          display: "musik (cd)"
        }
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
