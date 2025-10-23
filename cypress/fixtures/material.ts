import { buildGetMaterialResponse } from "../factories/material/material.factory";
import { musicMaterial } from "../factories/material/variants/musicMaterial";

export const givenAMaterial = () => {
  cy.interceptGraphql({
    operationName: "getMaterial",
    body: buildGetMaterialResponse()
  });
};

export const givenAMaterialMusic = () => {
  cy.interceptGraphql({
    operationName: "getMaterial",
    body: buildGetMaterialResponse(musicMaterial)
  });
};
